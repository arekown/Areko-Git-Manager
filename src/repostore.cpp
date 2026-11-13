#include "repostore.h"

#include "blobimageprovider.h"
#include "fixture.h"
#include "gitactions.h"
#include "gitrun.h"
#include "graphlayout.h"

#include <QDate>
#include <QDateTime>
#include <QDir>
#include <QFile>
#include <QFileInfo>
#include <QJsonArray>
#include <QJsonObject>
#include <QRegularExpression>
#include <QSet>
#include <QSettings>
#include <QThreadPool>
#include <QTimer>
#include <QUrl>
#include <QtConcurrent>

#include <algorithm>
#include <climits>
#include <utility>
#include <cstring>
#include <dirent.h>
#include <sys/stat.h>
#include <unistd.h>

namespace {
QString expand(const QString &p) { return p.startsWith(QLatin1Char('~')) ? QDir::homePath() + p.mid(1) : p; }

QJsonObject fixtureRepo(const QString &absPath)
{
    for (const QJsonValue &v : Fixture::data().value(QStringLiteral("repos")).toArray())
        if (expand(v.toObject().value(QStringLiteral("path")).toString()) == absPath)
            return v.toObject();
    return {};
}

QString fixtureImage(const QJsonValue &v)
{
    const QString rel = v.toString();
    return rel.isEmpty() ? QString() : QUrl::fromLocalFile(Fixture::baseDir() + QLatin1Char('/') + rel).toString();
}

// ---------------------------------------------------------------------------------------------------------------
// Real git (read-only). Everything below runs in worker threads.

constexpr int kMaxDepth = 8;          // folder levels below a root
constexpr int kMaxRefs = 40;
constexpr int kMaxFiles = 2000;       // files per version in the detail
constexpr int kMaxDiffLines = 4000;
constexpr int kMaxLineLength = 500;   // longer diff lines are cut (minified files)
constexpr int kBins = 48;
constexpr int kDays = 30;
constexpr int kSummaryThreads = 16;

const QChar kRec(0x1e), kField(0x1f), kEnd(0x1d);

bool isImageFile(const QString &name)
{
    static const QRegularExpression re(QStringLiteral("\\.(png|jpe?g|webp|gif)$"),
                                       QRegularExpression::CaseInsensitiveOption);
    return re.match(name).hasMatch();
}

bool isRev(const QString &s)
{
    static const QRegularExpression re(QStringLiteral("^[0-9a-fA-F]{4,64}$"));
    return re.match(s).hasMatch();
}

// ComfyUI's user folder is never read, searched or changed (user rule).
bool isComfyUser(const QString &path) { return path.endsWith(QLatin1String("/ComfyUI/user")); }
bool isComfyRepo(const QString &path) { return QFileInfo(path).fileName() == QLatin1String("ComfyUI"); }

bool skipDir(const char *n)
{
    static const char *const names[] = {".git", "node_modules", ".venv", "venv", "__pycache__",
                                        "Intermediate", "Saved", "DerivedDataCache", "Binaries"};
    for (const char *s : names)
        if (!std::strcmp(n, s))
            return true;
    // trash folders (.Trash-1000 on other file systems like ~/AI): deleted repos must not come back on rescan
    return !std::strncmp(n, ".Trash", 6);
}

// Depth-first walk with readdir (no stat per entry); symlinks are never followed.
void walk(const QByteArray &dir, int depth, QStringList &out)
{
    DIR *d = ::opendir(dir.constData());
    if (!d)
        return;
    bool repo = false;
    QList<QByteArray> subs;
    while (const dirent *e = ::readdir(d)) {
        const char *n = e->d_name;
        if (!std::strcmp(n, ".") || !std::strcmp(n, ".."))
            continue;
        unsigned char t = e->d_type;
        if (t == DT_UNKNOWN) {
            struct stat st;
            if (::lstat(QByteArray(dir + '/' + n).constData(), &st) != 0)
                continue;
            t = S_ISDIR(st.st_mode) ? DT_DIR : S_ISLNK(st.st_mode) ? DT_LNK : DT_REG;
        }
        if (!std::strcmp(n, ".git")) {
            repo = repo || t == DT_DIR;   // a .git file (linked worktree, submodule) is no own entry
            continue;
        }
        if (t == DT_DIR && !skipDir(n))
            subs << QByteArray(n);
    }
    ::closedir(d);
    if (repo)
        out << QFile::decodeName(dir);
    if (depth >= kMaxDepth)
        return;
    for (const QByteArray &s : std::as_const(subs)) {
        const QByteArray child = dir.endsWith('/') ? dir + s : dir + '/' + s;
        if (isComfyUser(QFile::decodeName(child)))
            continue;
        walk(child, depth + 1, out);
    }
}

QStringList findRepos(const QStringList &roots)
{
    QStringList found;
    for (const QString &r : roots) {
        const QString root = QDir::cleanPath(expand(r));
        if (root.isEmpty() || isComfyUser(root))
            continue;
        walk(QFile::encodeName(root), 0, found);
    }
    QStringList out;
    QSet<QString> seen;   // overlapping roots
    for (const QString &p : std::as_const(found)) {
        const QString real = QFileInfo(p).canonicalFilePath();
        if (seen.contains(real))
            continue;
        seen.insert(real);
        out << p;
    }
    std::sort(out.begin(), out.end(),
              [](const QString &a, const QString &b) { return a.compare(b, Qt::CaseInsensitive) < 0; });
    return out;
}

// Working directories of the running processes (only the own user's are readable).
QStringList processCwds()
{
    QStringList out;
    const QStringList pids = QDir(QStringLiteral("/proc")).entryList(QDir::Dirs | QDir::NoDotAndDotDot);
    char buf[PATH_MAX];
    for (const QString &pid : pids) {
        if (pid.isEmpty() || !pid.at(0).isDigit())
            continue;
        const QByteArray link = QByteArrayLiteral("/proc/") + pid.toLatin1() + QByteArrayLiteral("/cwd");
        const ssize_t n = ::readlink(link.constData(), buf, sizeof(buf) - 1);
        if (n > 0)
            out << QFile::decodeName(QByteArray(buf, int(n)));
    }
    out.removeDuplicates();
    return out;
}

QString remoteOwner(const QString &url)
{
    static const QRegularExpression re(
        QStringLiteral("^(?:[A-Za-z][A-Za-z0-9+.-]*://)?(?:[^@/]+@)?[^/:]+[:/]+([^/]+)/"));
    const auto m = re.match(url);
    return m.hasMatch() ? m.captured(1) : QString();
}

// Sub-group of every foreign repo: the name of the outermost repo whose folder contains it; a foreign repo that lies
// in no other repo but contains foreign repos itself gets its own name; everything else is "Sonstige".
void assignSubGroups(QVariantList &repos)
{
    QStringList paths, foreign;
    for (const QVariant &v : std::as_const(repos)) {
        const QVariantMap m = v.toMap();
        paths << m.value(QStringLiteral("path")).toString();
        if (m.value(QStringLiteral("group")).toString() == QLatin1String("fremd"))
            foreign << paths.last();
    }
    for (QVariant &v : repos) {
        QVariantMap m = v.toMap();
        if (m.value(QStringLiteral("group")).toString() != QLatin1String("fremd"))
            continue;
        const QString path = m.value(QStringLiteral("path")).toString();
        QString top;
        for (const QString &p : std::as_const(paths))
            if (path.startsWith(p + QLatin1Char('/')) && (top.isEmpty() || p.size() < top.size()))
                top = p;
        if (top.isEmpty() && std::any_of(foreign.cbegin(), foreign.cend(),
                                         [&](const QString &f) { return f.startsWith(path + QLatin1Char('/')); }))
            top = path;
        const QString sub = top.isEmpty() ? QStringLiteral("Sonstige") : QFileInfo(top).fileName();
        if (m.value(QStringLiteral("sub")).toString() == sub)
            continue;
        m[QStringLiteral("sub")] = sub;
        v = m;
    }
}

QStringList lines(const RunResult &r) { return r.text().split(QLatin1Char('\n'), Qt::SkipEmptyParts); }

QVariantMap readSummary(const QString &path, const QStringList &cwds)
{
    QVariantMap r;
    r[QStringLiteral("name")] = QFileInfo(path).fileName();
    r[QStringLiteral("path")] = path;
    r[QStringLiteral("display")] = displayPath(path);

    // remote and group
    QString origin, anyRemote;
    for (const QString &l : lines(runGit(path, {QStringLiteral("config"), QStringLiteral("--get-regexp"),
                                                QStringLiteral("^remote\\..*\\.url$")}, 10000))) {
        const int sp = l.indexOf(QLatin1Char(' '));
        if (sp < 0)
            continue;
        const QString url = l.mid(sp + 1).trimmed();
        if (l.left(sp) == QLatin1String("remote.origin.url"))
            origin = url;
        if (anyRemote.isEmpty())
            anyRemote = url;
    }
    const QString user = GitActions::githubUser();
    const bool own = anyRemote.isEmpty()
                     || (!user.isEmpty() && remoteOwner(origin.isEmpty() ? anyRemote : origin).compare(user, Qt::CaseInsensitive) == 0);
    r[QStringLiteral("group")] = own ? QStringLiteral("eigen") : QStringLiteral("fremd");
    r[QStringLiteral("sub")] = QString();   // set by assignSubGroups over the whole list
    r[QStringLiteral("remote")] = origin;
    r[QStringLiteral("github")] = own ? GitActions::githubRepoOf(origin) : QString();
    r[QStringLiteral("visibility")] = QString();   // filled from RepoStore::m_visibility on the GUI thread
    r[QStringLiteral("branch")] = runGit(path, {QStringLiteral("branch"), QStringLiteral("--show-current")}, 10000)
                                      .text().trimmed();

    // status: ComfyUI without untracked files (its user folder is off limits)
    QStringList st{QStringLiteral("status"), QStringLiteral("--porcelain")};
    if (isComfyRepo(path))
        st << QStringLiteral("--untracked-files=no");
    const RunResult status = runGit(path, st, 60000);
    r[QStringLiteral("dirty")] = status.ok() ? int(lines(status).size()) : -1;

    int ahead = 0, behind = -1;
    const RunResult ab = runGit(path, {QStringLiteral("rev-list"), QStringLiteral("--left-right"),
                                       QStringLiteral("--count"), QStringLiteral("@{u}...HEAD")}, 20000);
    if (ab.ok()) {
        const QStringList p = ab.text().split(QRegularExpression(QStringLiteral("\\s+")), Qt::SkipEmptyParts);
        if (p.size() == 2) {
            behind = p[0].toInt();
            ahead = p[1].toInt();
        }
    }
    r[QStringLiteral("ahead")] = ahead;
    r[QStringLiteral("behind")] = behind;
    r[QStringLiteral("count")] =
        runGit(path, {QStringLiteral("rev-list"), QStringLiteral("--count"), QStringLiteral("HEAD")}, 30000)
            .text().trimmed().toInt();

    // refs, newest first
    QVariantList refs;
    for (const QString &l : lines(runGit(
             path, {QStringLiteral("for-each-ref"), QStringLiteral("--sort=-creatordate"),
                    QStringLiteral("--format=%(refname)%1f%(refname:short)%1f%(creatordate:iso8601-strict)%1f"
                                   "%(if)%(*objectname)%(then)%(*objectname:short=7)%(else)%(objectname:short=7)%(end)"
                                   "%1f%(contents:subject)"),
                    QStringLiteral("refs/heads"), QStringLiteral("refs/remotes"), QStringLiteral("refs/tags")},
             30000))) {
        if (refs.size() >= kMaxRefs)
            break;
        const QStringList f = l.split(kField);
        if (f.size() < 5)
            continue;
        const QString full = f[0];
        if (full.startsWith(QLatin1String("refs/remotes/")) && full.endsWith(QLatin1String("/HEAD")))
            continue;
        const QString kind = full.startsWith(QLatin1String("refs/tags/"))      ? QStringLiteral("tag")
                             : full.startsWith(QLatin1String("refs/remotes/")) ? QStringLiteral("remote")
                                                                               : QStringLiteral("branch");
        refs.append(QVariantMap{{QStringLiteral("kind"), kind}, {QStringLiteral("name"), f[1]},
                                {QStringLiteral("date"), f[2]}, {QStringLiteral("hash"), f[3]},
                                {QStringLiteral("subject"), f.mid(4).join(kField)}});
    }
    r[QStringLiteral("refs")] = refs;

    // worktrees: [0] = main working copy
    QList<QVariantMap> wts;
    QVariantMap cur;
    for (const QString &l : runGit(path, {QStringLiteral("worktree"), QStringLiteral("list"), QStringLiteral("--porcelain")},
                                   10000).text().split(QLatin1Char('\n'))) {
        if (l.startsWith(QLatin1String("worktree "))) {
            if (!cur.isEmpty())
                wts << cur;
            cur = {{QStringLiteral("path"), l.mid(9)}, {QStringLiteral("branch"), QString()}};
        } else if (l.startsWith(QLatin1String("branch "))) {
            QString b = l.mid(7);
            if (b.startsWith(QLatin1String("refs/heads/")))
                b = b.mid(11);
            cur[QStringLiteral("branch")] = b;
        }
    }
    if (!cur.isEmpty())
        wts << cur;
    if (wts.isEmpty())
        wts << QVariantMap{{QStringLiteral("path"), QFileInfo(path).canonicalFilePath()},
                           {QStringLiteral("branch"), r.value(QStringLiteral("branch"))}};
    QList<bool> active(wts.size(), false);
    for (const QString &c : cwds) {   // a process belongs to the deepest worktree containing its cwd
        int best = -1;
        qsizetype bestLen = -1;
        for (int i = 0; i < wts.size(); ++i) {
            const QString p = wts[i].value(QStringLiteral("path")).toString();
            if ((c == p || c.startsWith(p + QLatin1Char('/'))) && p.size() > bestLen) {
                best = i;
                bestLen = p.size();
            }
        }
        if (best >= 0)
            active[best] = true;
    }
    QVariantList wtList;
    for (int i = 0; i < wts.size(); ++i) {
        QVariantMap w = wts[i];
        const QString p = w.value(QStringLiteral("path")).toString();
        w[QStringLiteral("display")] = displayPath(p);
        w[QStringLiteral("agent")] = p.contains(QStringLiteral("/.claude/worktrees/")) || p.contains(QStringLiteral("/.worktrees/"));
        w[QStringLiteral("active")] = active[i];
        wtList.append(w);
    }
    r[QStringLiteral("worktrees")] = wtList;

    // activity (last 30 days), timeline (whole history) and lastDate, all branches
    QList<qint64> stamps;
    qint64 newest = LLONG_MIN;
    QString lastDate;
    for (const QString &l : lines(runGit(path, {QStringLiteral("log"), QStringLiteral("--all"),
                                                QStringLiteral("--format=%at %aI")}, 120000))) {
        const int sp = l.indexOf(QLatin1Char(' '));
        bool ok = false;
        const qint64 at = l.left(sp).toLongLong(&ok);
        if (!ok)
            continue;
        stamps << at;
        if (at > newest) {
            newest = at;
            lastDate = l.mid(sp + 1).trimmed();
        }
    }
    QVariantList activity;
    QList<int> days(kDays, 0);
    const QDate today = QDate::currentDate();
    for (qint64 s : std::as_const(stamps)) {
        const qint64 ago = QDateTime::fromSecsSinceEpoch(s).date().daysTo(today);
        if (ago >= 0 && ago < kDays)
            ++days[kDays - 1 - int(ago)];
    }
    for (int d : std::as_const(days))
        activity.append(d);
    r[QStringLiteral("activity")] = activity;
    r[QStringLiteral("lastDate")] = lastDate;
    if (stamps.isEmpty()) {
        r[QStringLiteral("timeline")] = QVariant::fromValue(nullptr);
    } else {
        const auto [mn, mx] = std::minmax_element(stamps.cbegin(), stamps.cend());
        const qint64 a = *mn, b = std::max(*mx, a + 1);
        QList<int> bins(kBins, 0);
        for (qint64 s : std::as_const(stamps))
            ++bins[int(std::min<qint64>(kBins - 1, (s - a) * kBins / (b - a)))];
        QVariantList bl;
        for (int v : std::as_const(bins))
            bl.append(v);
        r[QStringLiteral("timeline")] = QVariantMap{{QStringLiteral("from"), a}, {QStringLiteral("to"), b},
                                                    {QStringLiteral("bins"), bl}};
    }
    return r;
}

QVariantList scanAll(const QStringList &roots)
{
    const QStringList paths = findRepos(roots);
    const QStringList cwds = processCwds();
    QThreadPool pool;
    pool.setMaxThreadCount(kSummaryThreads);
    QVariantList out = QtConcurrent::blockingMapped<QVariantList>(
        &pool, paths, [cwds](const QString &p) { return QVariant(readSummary(p, cwds)); });
    assignSubGroups(out);
    return out;
}

bool isRepo(const QString &path) { return QFileInfo(path + QStringLiteral("/.git")).isDir(); }

// First parent of a version ("" for the first version).
QString firstParent(const QString &path, const QString &hash, bool *ok)
{
    const RunResult r = runGit(path, {QStringLiteral("rev-list"), QStringLiteral("--parents"), QStringLiteral("-n"),
                                      QStringLiteral("1"), hash}, 20000);
    *ok = r.ok();
    return r.text().split(QLatin1Char(' '), Qt::SkipEmptyParts).value(1).trimmed();
}

QStringList diffTreeArgs(const QString &parent, const QString &hash, const QString &mode)
{
    QStringList a{QStringLiteral("diff-tree"), QStringLiteral("-r"), QStringLiteral("-z"), QStringLiteral("-M"),
                  QStringLiteral("--no-commit-id"), mode};
    if (parent.isEmpty())
        a << QStringLiteral("--root") << hash;
    else
        a << parent << hash;
    return a;
}

struct NameStatus {
    QString status;
    QString oldName;
};

// `diff-tree --name-status -z` → new name → (A|M|D|R, old name)
QHash<QString, NameStatus> nameStatus(const QByteArray &out)
{
    QHash<QString, NameStatus> m;
    const QList<QByteArray> t = out.split('\0');
    for (int i = 0; i < t.size(); ++i) {
        const QByteArray s = t[i];
        if (s.isEmpty())
            continue;
        const char c = s.at(0);
        if ((c == 'R' || c == 'C') && i + 2 < t.size()) {
            m.insert(QString::fromUtf8(t[i + 2]), {QStringLiteral("R"), QString::fromUtf8(t[i + 1])});
            i += 2;
        } else if (i + 1 < t.size()) {
            const QString st = c == 'A' ? QStringLiteral("A") : c == 'D' ? QStringLiteral("D") : QStringLiteral("M");
            m.insert(QString::fromUtf8(t[i + 1]), {st, QString()});
            i += 1;
        }
    }
    return m;
}

QVariantMap readHistory(const QString &path, int count)
{
    QVariantMap res;
    const RunResult lg = runGit(
        path, {QStringLiteral("-c"), QStringLiteral("core.quotePath=false"), QStringLiteral("log"), QStringLiteral("--all"),
               QStringLiteral("--date-order"), QStringLiteral("-n"), QString::number(count), QStringLiteral("--name-only"),
               QStringLiteral("--format=%x1e%H%x1f%P%x1f%aI%x1f%an%x1f%D%x1f%s%x1f%b%x1d")},
        120000);
    if (!lg.ok()) {
        res[QStringLiteral("error")] = RepoStore::tr("Verlauf konnte nicht gelesen werden: %1").arg(lg.errText());
        return res;
    }
    QVariantList commits;
    QStringList ids;
    QList<QStringList> parents;
    for (const QString &rec : lg.text().split(kRec, Qt::SkipEmptyParts)) {
        const qsizetype end = rec.indexOf(kEnd);
        const QStringList f = (end < 0 ? rec : rec.left(end)).split(kField);
        if (f.size() < 7)
            continue;
        bool img = false;
        if (end >= 0)
            for (QString n : rec.mid(end + 1).split(QLatin1Char('\n'), Qt::SkipEmptyParts)) {
                if (n.startsWith(QLatin1Char('"')) && n.endsWith(QLatin1Char('"')))
                    n = n.mid(1, n.size() - 2);
                if (isImageFile(n)) {
                    img = true;
                    break;
                }
            }
        const QStringList ps = f[1].split(QLatin1Char(' '), Qt::SkipEmptyParts);
        QStringList refs;
        for (const QString &d : f[4].split(QStringLiteral(", "), Qt::SkipEmptyParts))
            refs << d.trimmed();
        commits.append(QVariantMap{{QStringLiteral("id"), f[0]}, {QStringLiteral("hash"), f[0].left(7)},
                                   {QStringLiteral("parents"), ps}, {QStringLiteral("date"), f[2]},
                                   {QStringLiteral("author"), f[3]}, {QStringLiteral("refs"), refs},
                                   {QStringLiteral("subject"), f[5]},
                                   {QStringLiteral("body"), f.mid(6).join(kField).trimmed().left(600)},
                                   {QStringLiteral("hasImage"), img}});
        ids << f[0];
        parents << ps;
    }
    const GraphLayout g = layoutGraph(ids, parents);
    for (int i = 0; i < commits.size(); ++i) {
        QVariantMap c = commits[i].toMap();
        c[QStringLiteral("lane")] = g.laneOf.value(i);
        commits[i] = c;
    }
    res[QStringLiteral("commits")] = commits;
    res[QStringLiteral("edges")] = edgesToVariant(g);
    res[QStringLiteral("maxLane")] = g.maxLane;
    res[QStringLiteral("total")] =
        runGit(path, {QStringLiteral("rev-list"), QStringLiteral("--all"), QStringLiteral("--count")}, 60000)
            .text().trimmed().toInt();
    return res;
}

QVariantMap readDetail(const QString &path, const QString &hash, QString *error)
{
    bool ok = false;
    const QString parent = firstParent(path, hash, &ok);
    const RunResult num = runGit(path, diffTreeArgs(parent, hash, QStringLiteral("--numstat")), 60000);
    const RunResult ns = runGit(path, diffTreeArgs(parent, hash, QStringLiteral("--name-status")), 60000);
    if (!ok || !num.ok() || !ns.ok()) {
        *error = RepoStore::tr("Änderungen konnten nicht gelesen werden: %1").arg(num.ok() ? ns.errText() : num.errText());
        return {};
    }
    const QHash<QString, NameStatus> status = nameStatus(ns.out);
    QVariantList images, others;
    int add = 0, rem = 0, total = 0;
    const QList<QByteArray> t = num.out.split('\0');
    for (int i = 0; i < t.size(); ++i) {
        const QList<QByteArray> cols = t[i].split('\t');
        if (cols.size() < 3)
            continue;
        QString name = QString::fromUtf8(cols[2]);
        if (cols[2].isEmpty() && i + 2 < t.size()) {   // rename: "add\trem\t" NUL old NUL new
            name = QString::fromUtf8(t[i + 2]);
            i += 2;
        }
        const int a = cols[0] == "-" ? -1 : cols[0].toInt();
        const int m = cols[1] == "-" ? -1 : cols[1].toInt();
        add += std::max(0, a);
        rem += std::max(0, m);
        ++total;
        if (images.size() + others.size() >= kMaxFiles)
            continue;
        const NameStatus s = status.value(name, {QStringLiteral("M"), QString()});
        QString imgOld, imgNew;
        if (isImageFile(name)) {
            if (s.status != QLatin1String("D"))
                imgNew = BlobImageProvider::url(hash, path, name);
            if (s.status != QLatin1String("A") && !parent.isEmpty())
                imgOld = BlobImageProvider::url(parent, path, s.oldName.isEmpty() ? name : s.oldName);
        }
        const QVariantMap f{{QStringLiteral("name"), name}, {QStringLiteral("status"), s.status},
                            {QStringLiteral("add"), a}, {QStringLiteral("rem"), m},
                            {QStringLiteral("imgOld"), imgOld}, {QStringLiteral("imgNew"), imgNew}};
        (imgOld.isEmpty() && imgNew.isEmpty() ? others : images).append(f);   // pictures first, like the draft
    }
    return {{QStringLiteral("files"), images + others}, {QStringLiteral("filesTotal"), total},
            {QStringLiteral("add"), add}, {QStringLiteral("rem"), rem}, {QStringLiteral("loaded"), true}};
}

QStringList readDiff(const QString &path, const QString &hash, const QString &file, QString *error)
{
    bool ok = false;
    const QString parent = firstParent(path, hash, &ok);
    QStringList spec{file};
    if (ok && !parent.isEmpty()) {   // renamed file: diff against its old name
        const RunResult ns = runGit(path, diffTreeArgs(parent, hash, QStringLiteral("--name-status")), 60000);
        const QString old = nameStatus(ns.out).value(file).oldName;
        if (!old.isEmpty())
            spec.prepend(old);
    }
    QStringList args{QStringLiteral("diff-tree"), QStringLiteral("-p"), QStringLiteral("-M"),
                     QStringLiteral("--no-commit-id"), QStringLiteral("--no-color")};
    if (parent.isEmpty())
        args << QStringLiteral("--root") << hash;
    else
        args << parent << hash;
    args << QStringLiteral("--") << spec;
    const RunResult r = ok ? runGit(path, args, 60000) : RunResult();
    if (!r.ok()) {
        *error = RepoStore::tr("Diff konnte nicht gelesen werden: %1").arg(r.errText());
        return {};
    }
    QStringList out;
    bool header = false;
    bool cut = false;
    for (const QString &l : r.text().split(QLatin1Char('\n'))) {
        if (l.startsWith(QLatin1String("diff --git "))) {   // file header until the first hunk
            header = true;
            continue;
        }
        if (header) {
            if (l.startsWith(QLatin1String("Binary files ")))
                //: diff line for a binary file; keep the "@@" at the start (marks a hunk header)
                out << RepoStore::tr("@@ Binärdatei geändert @@");
            if (!l.startsWith(QLatin1String("@@")))
                continue;
            header = false;
        }
        if (l.isEmpty() && out.isEmpty())
            continue;
        if (out.size() >= kMaxDiffLines) {
            cut = true;
            break;
        }
        out << (l.size() > kMaxLineLength ? l.left(kMaxLineLength) + QStringLiteral("…") : l);
    }
    while (!out.isEmpty() && out.last().isEmpty())
        out.removeLast();
    if (cut)
        //: last line of a cut diff; keep the leading "…" (marks a note line)
        out << RepoStore::tr("… (gekürzt)");
    return out;
}
} // namespace

RepoStore::RepoStore(QObject *parent) : QObject(parent)
{
    const QStringList defaults{QDir::homePath() + QStringLiteral("/projects"), QDir::homePath() + QStringLiteral("/src"),
                               QDir::homePath() + QStringLiteral("/git"), QDir::homePath() + QStringLiteral("/code")};
    m_roots = Fixture::active() ? defaults : QSettings().value(QStringLiteral("roots"), defaults).toStringList();
    QTimer::singleShot(0, this, &RepoStore::rescan);
}

bool RepoStore::fixture() const { return Fixture::active(); }

void RepoStore::setBusy(bool b)
{
    if (m_busy == b)
        return;
    m_busy = b;
    emit busyChanged();
}

void RepoStore::rescan()
{
    if (!Fixture::active()) {
        const int gen = ++m_scanGen;
        setBusy(true);
        const QStringList roots = m_roots;
        QtConcurrent::run([roots] {
            const QString user = GitActions::githubUser();   // gh is asked once, before the parallel summaries
            return std::make_pair(user, scanAll(roots));
        }).then(this, [this, gen](const std::pair<QString, QVariantList> &res) {
            if (gen != m_scanGen)
                return;
            setGithubUser(res.first);
            m_repos = res.second;
            applyVisibility();   // last known values right away, fresh ones follow
            emit reposChanged();
            setBusy(false);
            reloadVisibility();
        });
        return;
    }
    QVariantList out;
    for (const QJsonValue &v : Fixture::data().value(QStringLiteral("repos")).toArray()) {
        QVariantMap r = v.toObject().toVariantMap();
        r.remove(QStringLiteral("commits"));
        r.remove(QStringLiteral("news"));
        const QString display = r.value(QStringLiteral("path")).toString();
        r[QStringLiteral("display")] = display;
        r[QStringLiteral("path")] = expand(display);
        if (r.value(QStringLiteral("dirty")).isNull())
            r[QStringLiteral("dirty")] = -1;
        if (r.value(QStringLiteral("ahead")).isNull())
            r[QStringLiteral("ahead")] = 0;
        if (r.value(QStringLiteral("behind")).isNull())
            r[QStringLiteral("behind")] = -1;
        const QJsonArray commits = v.toObject().value(QStringLiteral("commits")).toArray();
        r[QStringLiteral("lastDate")] = commits.isEmpty() ? QString() : commits[0].toObject().value(QStringLiteral("date")).toString();
        QVariantList wts;
        for (const QVariant &w : r.value(QStringLiteral("worktrees")).toList()) {
            QVariantMap m = w.toMap();
            m[QStringLiteral("display")] = m.value(QStringLiteral("path"));
            m[QStringLiteral("path")] = expand(m.value(QStringLiteral("path")).toString());
            const QString p = m.value(QStringLiteral("path")).toString();
            m[QStringLiteral("agent")] = p.contains(QStringLiteral("/.claude/worktrees/")) || p.contains(QStringLiteral("/.worktrees/"));
            m[QStringLiteral("active")] = false;
            wts.append(m);
        }
        r[QStringLiteral("worktrees")] = wts;
        r[QStringLiteral("github")] = r.value(QStringLiteral("group")).toString() == QStringLiteral("eigen")
                                          ? GitActions::githubRepoOf(r.value(QStringLiteral("remote")).toString()) : QString();
        r[QStringLiteral("visibility")] = r.value(QStringLiteral("visibility")).toString();
        out.append(r);
    }
    setGithubUser(GitActions::githubUser());
    m_repos = out;
    emit reposChanged();
}

void RepoStore::setGithubUser(const QString &user)
{
    if (m_githubUser == user)
        return;
    m_githubUser = user;
    emit githubUserChanged();
}

void RepoStore::setRoots(const QStringList &absPaths)
{
    QStringList roots;
    for (const QString &p : absPaths) {
        const QString c = QDir::cleanPath(expand(p.trimmed()));
        if (!p.trimmed().isEmpty() && !roots.contains(c))
            roots << c;
    }
    m_roots = roots;
    if (!Fixture::active())
        QSettings().setValue(QStringLiteral("roots"), m_roots);
    emit rootsChanged();
    rescan();
}

void RepoStore::refreshRepo(const QString &path)
{
    if (Fixture::active())
        return;
    QtConcurrent::run([path] { return isRepo(path) ? readSummary(path, processCwds()) : QVariantMap(); })
        .then(this, [this, path](const QVariantMap &r) {
            for (int i = 0; i < m_repos.size(); ++i) {
                if (m_repos[i].toMap().value(QStringLiteral("path")).toString() != path)
                    continue;
                if (r.isEmpty())
                    m_repos.removeAt(i);
                else
                    m_repos[i] = r;
                assignSubGroups(m_repos);
                applyVisibility();
                emit reposChanged();
                return;
            }
            if (!r.isEmpty()) {
                m_repos.append(r);
                assignSubGroups(m_repos);
                applyVisibility();
                emit reposChanged();
            }
        });
}

bool RepoStore::applyVisibility()
{
    bool changed = false;
    for (QVariant &v : m_repos) {
        QVariantMap m = v.toMap();
        const QString gh = m.value(QStringLiteral("github")).toString();
        const QString vis = gh.isEmpty() ? QString() : m_visibility.value(gh.section(QLatin1Char('/'), 1).toLower()).toString();   // after "<user>/"
        if (m.value(QStringLiteral("visibility")).toString() == vis)
            continue;
        m[QStringLiteral("visibility")] = vis;
        v = m;
        changed = true;
    }
    return changed;
}

void RepoStore::reloadVisibility()
{
    if (Fixture::active())
        return;
    // gh is only asked when there is an own GitHub repo at all
    if (std::none_of(m_repos.cbegin(), m_repos.cend(),
                     [](const QVariant &v) { return !v.toMap().value(QStringLiteral("github")).toString().isEmpty(); }))
        return;
    const int gen = ++m_visGen;
    QtConcurrent::run([] {
        bool ok = false;
        const QVariantMap vis = GitActions::githubVisibility(&ok);
        return std::make_pair(ok, vis);
    }).then(this, [this, gen](const std::pair<bool, QVariantMap> &res) {
        if (gen != m_visGen || !res.first)
            return;   // gh failed: keep the last known values
        m_visibility = res.second;
        if (applyVisibility())
            emit reposChanged();
    });
}

void RepoStore::loadHistory(const QString &path, int count)
{
    if (!Fixture::active()) {
        const int n = std::max(1, count);
        QtConcurrent::run([path, n] { return readHistory(path, n); }).then(this, [this, path](const QVariantMap &r) {
            if (r.contains(QStringLiteral("error"))) {
                emit error(path, r.value(QStringLiteral("error")).toString());
                return;
            }
            emit historyLoaded(path, r.value(QStringLiteral("commits")).toList(), r.value(QStringLiteral("edges")).toList(),
                               r.value(QStringLiteral("maxLane")).toInt(), r.value(QStringLiteral("total")).toInt());
        });
        return;
    }
    const QJsonObject r = fixtureRepo(path);
    QVariantList commits;
    QStringList ids;
    QList<QStringList> parents;
    const QJsonArray arr = r.value(QStringLiteral("commits")).toArray();
    for (int i = 0; i < arr.size() && i < count; ++i) {
        QVariantMap c = arr[i].toObject().toVariantMap();
        bool img = false;
        for (const QVariant &f : c.value(QStringLiteral("files")).toList())
            img = img || !f.toMap().value(QStringLiteral("imgNew")).isNull() || !f.toMap().value(QStringLiteral("imgOld")).isNull();
        c.remove(QStringLiteral("files"));
        c.remove(QStringLiteral("filesTotal"));
        c[QStringLiteral("hasImage")] = img;
        ids << c.value(QStringLiteral("id")).toString();
        parents << c.value(QStringLiteral("parents")).toStringList();
        commits.append(c);
    }
    const GraphLayout g = layoutGraph(ids, parents);
    for (int i = 0; i < commits.size(); ++i) {
        QVariantMap c = commits[i].toMap();
        c[QStringLiteral("lane")] = g.laneOf[i];
        commits[i] = c;
    }
    const int total = r.value(QStringLiteral("count")).toInt();
    QTimer::singleShot(0, this, [=] { emit historyLoaded(path, commits, edgesToVariant(g), g.maxLane, total); });
}

void RepoStore::loadDetail(const QString &path, const QString &hash)
{
    if (!Fixture::active()) {
        if (!isRev(hash)) {
            QTimer::singleShot(0, this, [=] { emit error(path, tr("Ungültige Version")); });
            return;
        }
        QtConcurrent::run([path, hash] {
            QString err;
            QVariantMap d = readDetail(path, hash, &err);
            if (!err.isEmpty())
                d = {{QStringLiteral("error"), err}};
            return d;
        }).then(this, [this, path, hash](const QVariantMap &d) {
            if (d.contains(QStringLiteral("error")))
                emit error(path, d.value(QStringLiteral("error")).toString());
            else
                emit detailLoaded(path, hash, d);
        });
        return;
    }
    QVariantMap detail;
    for (const QJsonValue &cv : fixtureRepo(path).value(QStringLiteral("commits")).toArray()) {
        const QJsonObject c = cv.toObject();
        if (c.value(QStringLiteral("id")).toString() != hash)
            continue;
        QVariantList files;
        int add = 0, rem = 0;
        for (const QJsonValue &fv : c.value(QStringLiteral("files")).toArray()) {
            const QJsonObject f = fv.toObject();
            const int a = f.value(QStringLiteral("add")).isNull() ? -1 : f.value(QStringLiteral("add")).toInt();
            const int m = f.value(QStringLiteral("rem")).isNull() ? -1 : f.value(QStringLiteral("rem")).toInt();
            add += qMax(0, a);
            rem += qMax(0, m);
            files.append(QVariantMap{{QStringLiteral("name"), f.value(QStringLiteral("name")).toString()},
                                     {QStringLiteral("status"), f.value(QStringLiteral("status")).toString()},
                                     {QStringLiteral("add"), a}, {QStringLiteral("rem"), m},
                                     {QStringLiteral("imgOld"), fixtureImage(f.value(QStringLiteral("imgOld")))},
                                     {QStringLiteral("imgNew"), fixtureImage(f.value(QStringLiteral("imgNew")))}});
        }
        detail = {{QStringLiteral("files"), files},
                  {QStringLiteral("filesTotal"), c.value(QStringLiteral("filesTotal")).toInt(int(files.size()))},
                  {QStringLiteral("add"), add}, {QStringLiteral("rem"), rem},
                  {QStringLiteral("loaded"), c.contains(QStringLiteral("files"))}};
    }
    QTimer::singleShot(0, this, [=] { emit detailLoaded(path, hash, detail); });
}

void RepoStore::loadDiff(const QString &path, const QString &hash, const QString &file)
{
    if (!Fixture::active()) {
        if (!isRev(hash)) {
            QTimer::singleShot(0, this, [=] { emit error(path, tr("Ungültige Version")); });
            return;
        }
        QtConcurrent::run([path, hash, file] {
            QString err;
            const QStringList l = readDiff(path, hash, file, &err);
            return std::make_pair(l, err);
        }).then(this, [this, path, hash, file](const std::pair<QStringList, QString> &r) {
            if (!r.second.isEmpty())
                emit error(path, r.second);
            else
                emit diffLoaded(path, hash, file, r.first);
        });
        return;
    }
    QStringList lines;
    for (const QJsonValue &cv : fixtureRepo(path).value(QStringLiteral("commits")).toArray())
        if (cv.toObject().value(QStringLiteral("id")).toString() == hash)
            for (const QJsonValue &fv : cv.toObject().value(QStringLiteral("files")).toArray())
                if (fv.toObject().value(QStringLiteral("name")).toString() == file)
                    for (const QJsonValue &l : fv.toObject().value(QStringLiteral("diff")).toArray())
                        lines << l.toString();
    QTimer::singleShot(0, this, [=] { emit diffLoaded(path, hash, file, lines); });
}
