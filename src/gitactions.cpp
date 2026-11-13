#include "gitactions.h"

#include "fixture.h"
#include "gitrun.h"

#include <QDir>
#include <QFile>
#include <QFileInfo>
#include <QHash>
#include <QJsonArray>
#include <QJsonDocument>
#include <QJsonObject>
#include <QLocale>
#include <QMutex>
#include <QMutexLocker>
#include <QRegularExpression>
#include <QTimer>
#include <QtConcurrent/QtConcurrentRun>

#include <cstring>
#include <memory>

#include <dirent.h>
#include <fcntl.h>
#include <sys/stat.h>

namespace {

constexpr int kNetTimeout = 300000;     // pull / push / gh: 5 minutes
constexpr int kMaxDiffLines = 4000;     // shown lines per file in workingDiffLoaded

QString ghProgram()
{
    const QString gh = qEnvironmentVariable("AGM_GH");
    return gh.isEmpty() ? QStringLiteral("gh") : gh;
}

// Hard rule: ~/AI/ComfyUI/user/ is never read, searched or changed.
bool isComfy(const QString &path) { return QDir::cleanPath(path) == QDir::homePath() + QStringLiteral("/AI/ComfyUI"); }

// File names come from the UI; only plain relative paths inside the repo are accepted.
bool fileAllowed(const QString &path, const QString &file)
{
    if (file.isEmpty() || file.startsWith(QLatin1Char('/')))
        return false;
    const QStringList parts = file.split(QLatin1Char('/'));
    if (parts.contains(QStringLiteral("..")) || parts.contains(QStringLiteral(".git")))
        return false;
    if (isComfy(path) && parts.first() == QStringLiteral("user"))
        return false;
    return true;
}

// One lock per repo: staging, commit, discard etc. on the same index never run at the same time.
std::shared_ptr<QMutex> repoLock(const QString &path)
{
    static QMutex mapMutex;
    static QHash<QString, std::shared_ptr<QMutex>> locks;
    QMutexLocker l(&mapMutex);
    auto &m = locks[QDir::cleanPath(path)];
    if (!m)
        m = std::make_shared<QMutex>();
    return m;
}

QString lastLine(const QString &text)
{
    const QStringList lines = text.split(QLatin1Char('\n'), Qt::SkipEmptyParts);
    return lines.isEmpty() ? QString() : lines.last().trimmed();
}

QString gitError(const RunResult &r)
{
    if (r.timedOut)
        return GitActions::tr("Zeitüberschreitung");
    if (r.exitCode == -1)
        return GitActions::tr("git ließ sich nicht starten");
    const QString l = lastLine(r.errText());
    return l.isEmpty() ? lastLine(r.text()) : l;
}

QString trimmedOut(const RunResult &r) { return r.ok() ? r.text().trimmed() : QString(); }

QString currentBranch(const QString &path) { return trimmedOut(runGit(path, {QStringLiteral("symbolic-ref"), QStringLiteral("--short"), QStringLiteral("-q"), QStringLiteral("HEAD")})); }

bool hasHead(const QString &path) { return runGit(path, {QStringLiteral("rev-parse"), QStringLiteral("-q"), QStringLiteral("--verify"), QStringLiteral("HEAD^{commit}")}).ok(); }

// ---------- status ----------

struct StatusEntry {
    QString name, orig;   // orig: old name of a rename
    char x = '.', y = '.';
    char kind = '1';      // '1' ordinary, '2' rename/copy, 'u' unmerged, '?' untracked
};

struct StatusInfo {
    bool ok = false;
    QString error;
    QList<StatusEntry> files;
    QString branch;
    int ahead = 0, behind = -1;
};

// Remainder of rec after n space-separated fields (the path may contain spaces).
QByteArray afterFields(const QByteArray &rec, int n)
{
    int pos = 0;
    for (int i = 0; i < n; ++i) {
        pos = rec.indexOf(' ', pos);
        if (pos < 0)
            return QByteArray();
        ++pos;
    }
    return rec.mid(pos);
}

StatusInfo readStatus(const QString &path)
{
    StatusInfo s;
    const RunResult r = runGit(path, {QStringLiteral("status"), QStringLiteral("--porcelain=v2"), QStringLiteral("-z"),
                                      QStringLiteral("--branch"),
                                      isComfy(path) ? QStringLiteral("--untracked-files=no") : QStringLiteral("--untracked-files=all")},
                               120000);
    if (!r.ok()) {
        s.error = gitError(r);
        return s;
    }
    s.ok = true;
    const QList<QByteArray> recs = r.out.split('\0');
    for (int i = 0; i < recs.size(); ++i) {
        const QByteArray &rec = recs[i];
        if (rec.size() < 2)
            continue;
        if (rec.startsWith("# branch.head ")) {
            const QByteArray h = rec.mid(14);
            s.branch = h == "(detached)" ? QString() : QString::fromUtf8(h);
        } else if (rec.startsWith("# branch.ab ")) {
            const QList<QByteArray> ab = rec.mid(12).split(' ');
            if (ab.size() == 2) {
                s.ahead = ab[0].mid(1).toInt();
                s.behind = ab[1].mid(1).toInt();
            }
        } else if (rec[0] == '1' || rec[0] == '2' || rec[0] == 'u') {
            StatusEntry e;
            e.kind = rec[0];
            e.x = rec.size() > 2 ? rec[2] : '.';
            e.y = rec.size() > 3 ? rec[3] : '.';
            e.name = QString::fromUtf8(afterFields(rec, e.kind == '1' ? 8 : e.kind == '2' ? 9 : 10));
            if (e.kind == '2' && i + 1 < recs.size())
                e.orig = QString::fromUtf8(recs[++i]);
            s.files << e;
        } else if (rec[0] == '?') {
            StatusEntry e;
            e.kind = '?';
            e.x = e.y = '?';
            e.name = QString::fromUtf8(rec.mid(2));
            s.files << e;
        }
    }
    return s;
}

const StatusEntry *findEntry(const StatusInfo &s, const QString &file)
{
    for (const StatusEntry &e : s.files)
        if (e.name == file)
            return &e;
    return nullptr;
}

struct Stat {
    int add = 0, rem = 0;
    bool binary = false;
};

// git diff --numstat -z (staged: --cached); renames are keyed by the new name.
QHash<QString, Stat> numstat(const QString &path, bool cached)
{
    QStringList args{QStringLiteral("diff"), QStringLiteral("--numstat"), QStringLiteral("-z"), QStringLiteral("--no-ext-diff"),
                     QStringLiteral("--no-textconv")};
    if (cached)
        args << QStringLiteral("--cached");
    const RunResult r = runGit(path, args, 120000);
    QHash<QString, Stat> out;
    if (!r.ok())
        return out;
    const QList<QByteArray> f = r.out.split('\0');
    for (int i = 0; i < f.size(); ++i) {
        const QList<QByteArray> cols = f[i].split('\t');
        if (cols.size() < 3)
            continue;
        QByteArray name = cols[2];
        if (name.isEmpty() && i + 2 < f.size()) {   // rename: "a\tr\t\0old\0new\0"
            name = f[i + 2];
            i += 2;
        }
        Stat st;
        st.binary = cols[0] == "-";
        st.add = st.binary ? -1 : cols[0].toInt();
        st.rem = st.binary ? -1 : cols[1].toInt();
        out.insert(QString::fromUtf8(name), st);
    }
    return out;
}

// Lines of an untracked file (git counts like this for a new file); binary = NUL in the first 8000 bytes.
Stat countUntracked(const QString &absFile)
{
    Stat st;
    QFile f(absFile);
    if (!f.open(QIODevice::ReadOnly))
        return st;
    if (f.peek(8000).contains('\0')) {
        st.binary = true;
        st.add = st.rem = -1;
        return st;
    }
    char buf[65536];
    qint64 k;
    char last = '\n';
    while ((k = f.read(buf, sizeof buf)) > 0) {
        for (qint64 i = 0; i < k; ++i)
            if (buf[i] == '\n')
                ++st.add;
        last = buf[k - 1];
    }
    if (last != '\n')
        ++st.add;
    return st;
}

QVariantMap buildTree(const QString &path, QString *error)
{
    const StatusInfo s = readStatus(path);
    QVariantMap tree{{QStringLiteral("files"), QVariantList()}, {QStringLiteral("branch"), s.branch},
                     {QStringLiteral("ahead"), s.ahead}, {QStringLiteral("behind"), s.behind},
                     {QStringLiteral("remote"), trimmedOut(runGit(path, {QStringLiteral("remote"), QStringLiteral("get-url"), QStringLiteral("origin")}))}};
    if (!s.ok) {
        *error = s.error;
        return tree;
    }
    const QHash<QString, Stat> unstaged = numstat(path, false);
    const QHash<QString, Stat> staged = numstat(path, true);
    QVariantList files;
    for (const StatusEntry &e : s.files) {
        QString status;
        int stagedState = 0;
        Stat st;
        if (e.kind == '?') {
            status = QStringLiteral("?");
            st = countUntracked(path + QLatin1Char('/') + e.name);
        } else {
            if (e.kind == '2')
                status = QStringLiteral("R");
            else if (e.kind != 'u' && e.x == 'A')
                status = QStringLiteral("A");
            else if (e.kind != 'u' && (e.x == 'D' || e.y == 'D'))
                status = QStringLiteral("D");
            else
                status = QStringLiteral("M");
            if (e.kind != 'u' && e.x != '.')
                stagedState = e.y == '.' ? 2 : 1;
            for (const QHash<QString, Stat> *h : {&unstaged, &staged}) {
                const auto it = h->constFind(e.name);
                if (it == h->cend())
                    continue;
                const Stat *p = &it.value();
                if (p->binary || st.binary) {
                    st.binary = true;
                    st.add = st.rem = -1;
                } else {
                    st.add += p->add;
                    st.rem += p->rem;
                }
            }
        }
        files << QVariantMap{{QStringLiteral("name"), e.name}, {QStringLiteral("status"), status},
                             {QStringLiteral("staged"), stagedState}, {QStringLiteral("add"), st.add},
                             {QStringLiteral("rem"), st.rem}, {QStringLiteral("binary"), st.binary}};
    }
    tree[QStringLiteral("files")] = files;
    return tree;
}

// ---------- hunks ----------

struct RawHunk {
    QByteArray fileHeader;     // "diff --git …", "index …", "--- a/…", "+++ b/…" – needed to build a patch
    QByteArray header;         // "@@ -a,b +c,d @@ …"
    QList<QByteArray> lines;   // " …", "+…", "-…", "\ No newline at end of file"
    bool staged = false;
};

QList<RawHunk> parseDiff(const QByteArray &out, bool staged)
{
    QList<RawHunk> hunks;
    QList<QByteArray> lines = out.split('\n');
    if (!lines.isEmpty() && lines.last().isEmpty())
        lines.removeLast();
    QByteArray fileHeader;
    int i = 0;
    for (; i < lines.size() && !lines[i].startsWith("@@"); ++i)
        fileHeader += lines[i] + '\n';
    for (; i < lines.size(); ++i) {
        const QByteArray &l = lines[i];
        if (l.startsWith("@@")) {
            RawHunk h;
            h.fileHeader = fileHeader;
            h.header = l;
            h.staged = staged;
            hunks << h;
        } else if (l.startsWith("diff --git")) {
            break;   // only one file is diffed; never mix in a second header
        } else if (!hunks.isEmpty()) {
            hunks.last().lines << l;
        }
    }
    return hunks;
}

const QStringList kDiffOpts{QStringLiteral("--no-color"), QStringLiteral("--no-ext-diff"), QStringLiteral("--no-textconv"),
                            QStringLiteral("-U3"), QStringLiteral("--src-prefix=a/"), QStringLiteral("--dst-prefix=b/")};

// All hunks of a file: first the not staged ones (index → working tree), then the staged ones (HEAD → index).
// setHunkStaged uses the same order, so the hunk index of the UI stays valid.
QList<RawHunk> collectHunks(const QString &path, const QString &file, const StatusEntry *entry)
{
    QList<RawHunk> all;
    if (entry && entry->kind == '?') {
        QStringList args{QStringLiteral("diff"), QStringLiteral("--no-index")};
        args << kDiffOpts << QStringLiteral("--") << QStringLiteral("/dev/null") << file;
        const RunResult r = runGit(path, args, 120000);
        if (r.exitCode == 0 || r.exitCode == 1)
            all << parseDiff(r.out, false);
        return all;
    }
    QStringList args{QStringLiteral("--literal-pathspecs"), QStringLiteral("diff")};
    args << kDiffOpts << QStringLiteral("--") << file;
    all << parseDiff(runGit(path, args, 120000).out, false);
    args.insert(2, QStringLiteral("--cached"));
    all << parseDiff(runGit(path, args, 120000).out, true);
    return all;
}

QVariantList hunksToVariant(const QList<RawHunk> &raw)
{
    QVariantList out;
    int budget = kMaxDiffLines;
    for (const RawHunk &h : raw) {
        QStringList lines;
        for (const QByteArray &l : h.lines) {
            if (budget <= 0) {
                //: last line of a cut diff; keep the leading "…" (marks a note line)
                lines << GitActions::tr("… (gekürzt)");
                break;
            }
            lines << QString::fromUtf8(l);
            --budget;
        }
        out << QVariantMap{{QStringLiteral("header"), QString::fromUtf8(h.header)}, {QStringLiteral("lines"), lines},
                           {QStringLiteral("staged"), h.staged}};
    }
    return out;
}

QVariantList buildHunks(const QString &path, const QString &file)
{
    if (!fileAllowed(path, file))
        return {};
    const StatusInfo s = readStatus(path);
    return hunksToVariant(collectHunks(path, file, findEntry(s, file)));
}

QByteArray toPatch(const RawHunk &h)
{
    QByteArray p = h.fileHeader + h.header + '\n';
    for (const QByteArray &l : h.lines)
        p += l + '\n';
    return p;
}

} // namespace

// ---------- GitActions ----------

GitActions::GitActions(QObject *parent) : QObject(parent) {}

void GitActions::runAction(const QString &path, const QString &action, std::function<Outcome()> work)
{
    if (m_busy.contains(path)) {
        QTimer::singleShot(0, this, [=] {
            emit actionFinished(path, action, false, tr("Für dieses Repo läuft gerade schon eine Aktion."));
        });
        return;
    }
    m_busy << path;
    emit busyPathsChanged();
    (void)QtConcurrent::run([this, path, action, work] {
        Outcome o;
        {
            const auto lock = repoLock(path);
            QMutexLocker l(lock.get());
            o = work();
        }
        QMetaObject::invokeMethod(this, [this, path, action, o] {
            m_busy.removeAll(path);
            emit busyPathsChanged();
            emit actionFinished(path, action, o.ok, o.message);
        }, Qt::QueuedConnection);
    });
}

void GitActions::runStaging(const QString &path, const QString &file, std::function<Outcome()> work)
{
    (void)QtConcurrent::run([this, path, file, work] {
        Outcome o;
        QVariantMap tree;
        QVariantList hunks;
        QString err;
        {
            const auto lock = repoLock(path);
            QMutexLocker l(lock.get());
            o = work();
            tree = buildTree(path, &err);
            hunks = buildHunks(path, file);
        }
        QMetaObject::invokeMethod(this, [=] {
            if (!o.ok)
                emit actionFinished(path, QStringLiteral("stage"), false, o.message);
            emit workingTreeLoaded(path, tree);
            emit workingDiffLoaded(path, file, hunks);
        }, Qt::QueuedConnection);
    });
}

void GitActions::loadWorkingTree(const QString &path)
{
    if (Fixture::active()) {
        const QVariantMap tree{
            {QStringLiteral("files"),
             QVariantList{QVariantMap{{QStringLiteral("name"), QStringLiteral("src/beispiel.cpp")},
                                      {QStringLiteral("status"), QStringLiteral("M")},
                                      {QStringLiteral("staged"), 0}, {QStringLiteral("add"), 12},
                                      {QStringLiteral("rem"), 3}, {QStringLiteral("binary"), false}},
                          QVariantMap{{QStringLiteral("name"), QStringLiteral("docs/neu.md")},
                                      {QStringLiteral("status"), QStringLiteral("?")},
                                      {QStringLiteral("staged"), 0}, {QStringLiteral("add"), 20},
                                      {QStringLiteral("rem"), 0}, {QStringLiteral("binary"), false}}}}};
        QTimer::singleShot(0, this, [=] { emit workingTreeLoaded(path, tree); });
        return;
    }
    (void)QtConcurrent::run([this, path] {
        QString err;
        const QVariantMap tree = buildTree(path, &err);
        QMetaObject::invokeMethod(this, [=] {
            if (!err.isEmpty())
                emit actionFinished(path, QStringLiteral("status"), false, tr("Arbeitsstand nicht lesbar: %1").arg(err));
            emit workingTreeLoaded(path, tree);
        }, Qt::QueuedConnection);
    });
}

void GitActions::loadWorkingDiff(const QString &path, const QString &file)
{
    if (Fixture::active()) {
        const QVariantList hunks{QVariantMap{{QStringLiteral("header"), QStringLiteral("@@ -10,6 +10,15 @@ void beispiel()")},
                                             {QStringLiteral("lines"), QStringList{QStringLiteral(" {"), QStringLiteral("-    alt();"),
                                                                                   QStringLiteral("+    neu();"), QStringLiteral(" }")}},
                                             {QStringLiteral("staged"), false}}};
        QTimer::singleShot(0, this, [=] { emit workingDiffLoaded(path, file, hunks); });
        return;
    }
    (void)QtConcurrent::run([this, path, file] {
        const QVariantList hunks = buildHunks(path, file);
        QMetaObject::invokeMethod(this, [=] { emit workingDiffLoaded(path, file, hunks); }, Qt::QueuedConnection);
    });
}

void GitActions::setFileStaged(const QString &path, const QString &file, bool staged)
{
    if (Fixture::active()) {
        loadWorkingTree(path);
        return;
    }
    runStaging(path, file, [path, file, staged]() -> Outcome {
        if (!fileAllowed(path, file))
            return {false, tr("Diese Datei darf nicht bearbeitet werden.")};
        const StatusInfo s = readStatus(path);
        const StatusEntry *e = findEntry(s, file);
        if (!e)
            return {false, tr("Datei hat keine Änderungen mehr.")};
        QStringList paths{e->name};
        if (!e->orig.isEmpty())
            paths << e->orig;
        QStringList args{QStringLiteral("--literal-pathspecs")};
        if (staged)
            args << QStringLiteral("add") << QStringLiteral("-A");
        else if (hasHead(path))
            args << QStringLiteral("restore") << QStringLiteral("--staged");
        else
            args << QStringLiteral("rm") << QStringLiteral("--cached") << QStringLiteral("-q");
        args << QStringLiteral("--") << paths;
        const RunResult r = runGit(path, args, 120000);
        if (!r.ok())
            return {false, (staged ? tr("Vormerken fehlgeschlagen: %1") : tr("Zurücknehmen fehlgeschlagen: %1")).arg(gitError(r))};
        return {true, QString()};
    });
}

void GitActions::setHunkStaged(const QString &path, const QString &file, int hunk, bool staged)
{
    if (Fixture::active()) {
        loadWorkingDiff(path, file);
        return;
    }
    runStaging(path, file, [path, file, hunk, staged]() -> Outcome {
        if (!fileAllowed(path, file))
            return {false, tr("Diese Datei darf nicht bearbeitet werden.")};
        const StatusInfo s = readStatus(path);
        const StatusEntry *e = findEntry(s, file);
        if (!e)
            return {false, tr("Datei hat keine Änderungen mehr.")};
        if (e->kind == '?')
            return {false, tr("Neue Dateien lassen sich nur als ganze Datei vormerken.")};
        const QList<RawHunk> all = collectHunks(path, file, e);
        if (hunk < 0 || hunk >= all.size())
            return {false, tr("Abschnitt gibt es nicht mehr – Ansicht wurde neu geladen.")};
        const RawHunk &h = all[hunk];
        if (h.staged == staged)
            return {true, QString()};   // already in the wanted state
        QStringList args{QStringLiteral("apply"), QStringLiteral("--cached"), QStringLiteral("--whitespace=nowarn")};
        if (!staged)
            args << QStringLiteral("-R");   // take the staged hunk (HEAD → index) back out of the index
        args << QStringLiteral("-");
        const RunResult r = runGit(path, args, 120000, toPatch(h));
        if (!r.ok())
            return {false, tr("Abschnitt ließ sich nicht ändern: %1").arg(gitError(r))};
        return {true, QString()};
    });
}

bool GitActions::pullFastForward(const QString &path, QString *message)
{
    if (currentBranch(path).isEmpty()) {
        *message = tr("Kein Zweig ausgecheckt (losgelöster Stand) – Pull nicht möglich.");
        return false;
    }
    if (!runGit(path, {QStringLiteral("rev-parse"), QStringLiteral("--abbrev-ref"), QStringLiteral("--symbolic-full-name"), QStringLiteral("@{u}")}).ok()) {
        *message = tr("Kein Upstream-Zweig eingestellt – nichts zu holen.");
        return false;
    }
    const QString before = trimmedOut(runGit(path, {QStringLiteral("rev-parse"), QStringLiteral("HEAD")}));
    const RunResult r = runGit(path, {QStringLiteral("pull"), QStringLiteral("--ff-only"), QStringLiteral("--no-rebase"),
                                      QStringLiteral("--no-autostash")},
                               kNetTimeout);
    if (!r.ok()) {
        const QString err = r.errText() + QLatin1Char('\n') + r.text();
        if (err.contains(QStringLiteral("Not possible to fast-forward")) || err.contains(QStringLiteral("diverg")))
            *message = tr("Lokal und auf dem Server gibt es unterschiedliche neue Versionen. Pull holt nur ohne "
                          "Zusammenführen (fast-forward) – nichts wurde geändert.");
        else if (err.contains(QStringLiteral("would be overwritten")))
            *message = tr("Lokale Änderungen würden überschrieben – erst committen oder verwerfen.");
        else if (err.contains(QStringLiteral("CONFLICT")))
            *message = tr("Konflikt beim Holen – bitte selbst klären.");
        else
            *message = tr("Pull fehlgeschlagen: %1").arg(gitError(r));
        return false;
    }
    const QString after = trimmedOut(runGit(path, {QStringLiteral("rev-parse"), QStringLiteral("HEAD")}));
    if (before.isEmpty() || before == after) {
        *message = tr("Schon aktuell.");
        return true;
    }
    const int n = trimmedOut(runGit(path, {QStringLiteral("rev-list"), QStringLiteral("--count"), before + QStringLiteral("..") + after})).toInt();
    *message = n == 1 ? tr("1 neue Version geholt.") : tr("%1 neue Versionen geholt.").arg(n);
    return true;
}

bool GitActions::pushCurrent(const QString &path, QString *message)
{
    const QString branch = currentBranch(path);
    if (branch.isEmpty()) {
        *message = tr("Kein Zweig ausgecheckt (losgelöster Stand) – Push nicht möglich.");
        return false;
    }
    const QString remote = trimmedOut(runGit(path, {QStringLiteral("config"), QStringLiteral("--get"), QStringLiteral("branch.") + branch + QStringLiteral(".remote")}));
    const QString merge = trimmedOut(runGit(path, {QStringLiteral("config"), QStringLiteral("--get"), QStringLiteral("branch.") + branch + QStringLiteral(".merge")}));
    QStringList args{QStringLiteral("push")};
    if (!remote.isEmpty() && remote != QStringLiteral(".") && merge.startsWith(QStringLiteral("refs/heads/"))) {
        // explicit refspec without "+": configured push refspecs or push.default can never force or widen this
        args << remote << QStringLiteral("refs/heads/") + branch + QLatin1Char(':') + merge;
    } else {
        if (!runGit(path, {QStringLiteral("remote"), QStringLiteral("get-url"), QStringLiteral("origin")}).ok()) {
            *message = tr("Kein Server (origin) eingerichtet – erst „Auf GitHub sichern“.");
            return false;
        }
        args << QStringLiteral("-u") << QStringLiteral("origin") << branch;
    }
    const RunResult r = runGit(path, args, kNetTimeout);
    if (r.ok()) {
        *message = r.errText().contains(QStringLiteral("Everything up-to-date")) ? tr("Schon aktuell auf dem Server.")
                                                                                : tr("Hochgeladen.");
        return true;
    }
    const QString err = r.errText();
    if (err.contains(QStringLiteral("[rejected]")) || err.contains(QStringLiteral("non-fast-forward")) || err.contains(QStringLiteral("fetch first")))
        *message = tr("Auf dem Server gibt es neuere Versionen – erst Pull");
    else
        *message = tr("Push fehlgeschlagen: %1").arg(gitError(r));
    return false;
}

void GitActions::commit(const QString &path, const QString &subject, const QString &body, bool push)
{
    const QString action = push ? QStringLiteral("commit+push") : QStringLiteral("commit");
    if (Fixture::active()) {
        runAction(path, action, [] { return Outcome{true, tr("OK (Testdaten)")}; });
        return;
    }
    runAction(path, action, [path, subject, body, push]() -> Outcome {
        const QString s = subject.trimmed();
        if (s.isEmpty())
            return {false, tr("Kurzbeschreibung fehlt.")};
        const RunResult staged = runGit(path, {QStringLiteral("diff"), QStringLiteral("--cached"), QStringLiteral("--quiet")});
        if (staged.exitCode == 0)
            return {false, tr("Nichts vorgemerkt – erst Dateien oder Abschnitte auswählen.")};
        if (staged.exitCode != 1)
            return {false, tr("Commit fehlgeschlagen: %1").arg(gitError(staged))};
        QString msg = s;
        if (!body.trimmed().isEmpty())
            msg += QStringLiteral("\n\n") + body.trimmed();
        msg += QLatin1Char('\n');
        const RunResult r = runGit(path, {QStringLiteral("commit"), QStringLiteral("-F"), QStringLiteral("-")}, kNetTimeout, msg.toUtf8());
        if (!r.ok())
            return {false, tr("Commit fehlgeschlagen: %1").arg(gitError(r))};
        const QString hash = trimmedOut(runGit(path, {QStringLiteral("rev-parse"), QStringLiteral("--short=7"), QStringLiteral("HEAD")}));
        if (!push)
            return {true, tr("Committet (%1).").arg(hash)};
        QString pushMsg;
        if (!pushCurrent(path, &pushMsg))
            return {false, tr("Committet (%1), aber nicht hochgeladen: %2").arg(hash, pushMsg)};
        return {true, tr("Committet (%1) und hochgeladen.").arg(hash)};
    });
}

void GitActions::pull(const QString &path)
{
    if (Fixture::active()) {
        runAction(path, QStringLiteral("pull"), [] { return Outcome{true, tr("OK (Testdaten)")}; });
        return;
    }
    runAction(path, QStringLiteral("pull"), [path] {
        Outcome o;
        o.ok = pullFastForward(path, &o.message);
        return o;
    });
}

void GitActions::push(const QString &path)
{
    if (Fixture::active()) {
        runAction(path, QStringLiteral("push"), [] { return Outcome{true, tr("OK (Testdaten)")}; });
        return;
    }
    runAction(path, QStringLiteral("push"), [path] {
        Outcome o;
        o.ok = pushCurrent(path, &o.message);
        return o;
    });
}

void GitActions::discardFile(const QString &path, const QString &file)
{
    if (Fixture::active()) {
        runAction(path, QStringLiteral("discard"), [] { return Outcome{true, tr("OK (Testdaten)")}; });
        return;
    }
    runAction(path, QStringLiteral("discard"), [path, file]() -> Outcome {
        if (!fileAllowed(path, file))
            return {false, tr("Diese Datei darf nicht bearbeitet werden.")};
        const StatusInfo s = readStatus(path);
        const StatusEntry *e = findEntry(s, file);
        if (!e)
            return {false, tr("Datei hat keine Änderungen mehr.")};
        QStringList paths{e->name};
        if (!e->orig.isEmpty())
            paths << e->orig;
        bool trashed = false;
        for (const QString &p : paths) {
            const bool inHead = e->kind != '?'
                && !trimmedOut(runGit(path, {QStringLiteral("--literal-pathspecs"), QStringLiteral("ls-tree"), QStringLiteral("--name-only"),
                                             QStringLiteral("HEAD"), QStringLiteral("--"), p})).isEmpty();
            if (inHead) {
                // versioned: index and working tree back to HEAD
                const RunResult r = runGit(path, {QStringLiteral("--literal-pathspecs"), QStringLiteral("restore"), QStringLiteral("--source=HEAD"),
                                                  QStringLiteral("--staged"), QStringLiteral("--worktree"), QStringLiteral("--"), p});
                if (!r.ok())
                    return {false, tr("Verwerfen fehlgeschlagen: %1").arg(gitError(r))};
                continue;
            }
            // not in HEAD (untracked or newly added): out of the index, the file itself only into the trash
            if (e->kind != '?') {
                const RunResult r = runGit(path, {QStringLiteral("--literal-pathspecs"), QStringLiteral("rm"), QStringLiteral("--cached"),
                                                  QStringLiteral("-q"), QStringLiteral("--ignore-unmatch"), QStringLiteral("--"), p});
                if (!r.ok())
                    return {false, tr("Verwerfen fehlgeschlagen: %1").arg(gitError(r))};
            }
            const QString abs = path + QLatin1Char('/') + p;
            if (QFileInfo(abs).exists() || QFileInfo(abs).isSymLink()) {
                if (!QFile::moveToTrash(abs))
                    return {false, tr("Konnte „%1“ nicht in den Papierkorb legen – nichts gelöscht.").arg(p)};
                trashed = true;
            }
        }
        return {true, trashed ? tr("Verworfen – neue Datei liegt im Papierkorb.") : tr("Änderungen verworfen.")};
    });
}

void GitActions::publishToGitHub(const QString &path, const QString &repoName, bool makePublic)
{
    if (Fixture::active()) {
        runAction(path, QStringLiteral("publish"), [] { return Outcome{true, tr("OK (Testdaten)")}; });
        return;
    }
    runAction(path, QStringLiteral("publish"), [path, repoName, makePublic]() -> Outcome {
        static const QRegularExpression validName(QStringLiteral("^[A-Za-z0-9._-]+$"));
        if (!validName.match(repoName).hasMatch() || repoName.startsWith(QLatin1Char('.')))
            return {false, tr("Ungültiger Repo-Name (erlaubt: Buchstaben, Ziffern, . _ -).")};
        if (runGit(path, {QStringLiteral("remote"), QStringLiteral("get-url"), QStringLiteral("origin")}).ok())
            return {false, tr("Hat schon einen Server (origin) – nichts angelegt.")};
        if (!hasHead(path))
            return {false, tr("Noch keine Version – erst committen.")};
        const QString user = GitActions::githubUser();
        const QString target = user.isEmpty() ? repoName : user + QLatin1Char('/') + repoName;   // gh: signed-in user
        const RunResult r = runTool(ghProgram(),
                                    {QStringLiteral("repo"), QStringLiteral("create"), target,
                                     makePublic ? QStringLiteral("--public") : QStringLiteral("--private"),
                                     QStringLiteral("--source"), path, QStringLiteral("--remote"),
                                     QStringLiteral("origin"), QStringLiteral("--push")},
                                    path, kNetTimeout);
        if (!r.ok())
            return {false, tr("GitHub: %1").arg(gitError(r))};
        return {true, (makePublic ? tr("Öffentlich auf GitHub gesichert: %1") : tr("Privat auf GitHub gesichert: %1")).arg(target)};
    });
}

// ---------- delete ----------

namespace {

// Why path must not be deleted ("" = allowed). Hard rule: ~/AI/ComfyUI/user is never read, searched or changed, so any
// folder that is, contains or lies in it is refused before anything below it is touched. Home and "/" are refused too.
QString deleteBlockReason(const QString &path)
{
    const QString home = QDir::cleanPath(QDir::homePath());
    QStringList forms{QDir::cleanPath(path)};
    const QString canon = QFileInfo(path).canonicalFilePath();
    if (!canon.isEmpty())
        forms << canon;
    // canonical form via the parent only: the user folder itself is not even stat'ed
    QStringList users{home + QStringLiteral("/AI/ComfyUI/user")};
    const QString comfyCanon = QFileInfo(home + QStringLiteral("/AI/ComfyUI")).canonicalFilePath();
    if (!comfyCanon.isEmpty())
        users << comfyCanon + QStringLiteral("/user");
    QStringList homes{home};
    const QString homeCanon = QFileInfo(home).canonicalFilePath();
    if (!homeCanon.isEmpty())
        homes << homeCanon;
    for (const QString &p : std::as_const(forms)) {
        if (p.isEmpty() || p == QStringLiteral("/"))
            return GitActions::tr("Gesperrt: Wurzelordner");
        for (const QString &u : std::as_const(users))
            if (p == u || u.startsWith(p + QLatin1Char('/')) || p.startsWith(u + QLatin1Char('/')))
                return GitActions::tr("Gesperrt: enthält ~/AI/ComfyUI/user");
        for (const QString &h : std::as_const(homes))
            if (p == h || h.startsWith(p + QLatin1Char('/')))
                return GitActions::tr("Gesperrt: persönlicher Ordner");
    }
    return QString();
}

struct TreeScan {
    qint64 size = 0;
    QStringList nested;   // folders below the top that hold their own .git folder
};

// Walks the tree with readdir/fstatat, symlinks are never followed. skip: a folder never entered (ComfyUI user).
void scanTree(const QByteArray &dir, const QByteArray &skip, bool top, TreeScan &out)
{
    DIR *d = ::opendir(dir.constData());
    if (!d)
        return;
    const int fd = ::dirfd(d);
    QList<QByteArray> subs;
    while (const dirent *e = ::readdir(d)) {
        const char *n = e->d_name;
        if (!std::strcmp(n, ".") || !std::strcmp(n, ".."))
            continue;
        struct stat st;
        if (::fstatat(fd, n, &st, AT_SYMLINK_NOFOLLOW) != 0)
            continue;
        if (S_ISDIR(st.st_mode)) {
            if (!top && !std::strcmp(n, ".git"))
                out.nested << QFile::decodeName(dir);
            subs << QByteArray(n);
        } else {
            out.size += st.st_size;   // files and the symlinks themselves
        }
    }
    ::closedir(d);
    for (const QByteArray &s : std::as_const(subs)) {
        const QByteArray child = dir + '/' + s;
        if (child == skip)
            continue;
        scanTree(child, skip, false, out);
    }
}

QString sizeText(qint64 bytes) { return QLocale().formattedDataSize(bytes, 1, QLocale::DataSizeTraditionalFormat); }

struct Worktree {
    QString path, branch;
};

// git worktree list; [0] = main working copy
QList<Worktree> worktreeList(const QString &path)
{
    QList<Worktree> out;
    for (const QString &l : runGit(path, {QStringLiteral("worktree"), QStringLiteral("list"), QStringLiteral("--porcelain")}).text().split(QLatin1Char('\n'))) {
        if (l.startsWith(QLatin1String("worktree ")))
            out << Worktree{l.mid(9), QString()};
        else if (l.startsWith(QLatin1String("branch refs/heads/")) && !out.isEmpty())
            out.last().branch = l.mid(18);
    }
    return out;
}

bool samePath(const QString &a, const QString &b)
{
    if (QDir::cleanPath(a) == QDir::cleanPath(b))
        return true;
    const QString ca = QFileInfo(a).canonicalFilePath(), cb = QFileInfo(b).canonicalFilePath();
    return !ca.isEmpty() && ca == cb;
}

bool isInside(const QString &child, const QString &canonParent)
{
    QString c = QFileInfo(child).canonicalFilePath();
    if (c.isEmpty())
        c = QDir::cleanPath(child);
    return c == canonParent || c.startsWith(canonParent + QLatin1Char('/'));
}

// "<user>/<name>" if origin is an own GitHub repo, else "".
QString ownGithubRepo(const QString &path)
{
    return GitActions::githubRepoOf(trimmedOut(runGit(path, {QStringLiteral("remote"), QStringLiteral("get-url"), QStringLiteral("origin")})));
}

// gh may delete repos only with the token scope delete_repo.
bool ghCanDeleteRepo()
{
    const RunResult r = runTool(ghProgram(), {QStringLiteral("auth"), QStringLiteral("status")}, QString(), 30000);
    return !r.timedOut && (r.text() + r.errText()).contains(QStringLiteral("delete_repo"));
}

int dirtyCount(const QString &path)
{
    const StatusInfo s = readStatus(path);
    return s.ok ? int(s.files.size()) : -1;
}

QVariantMap inspectRepo(const QString &path)
{
    QVariantMap info{{QStringLiteral("name"), QFileInfo(path).fileName()}, {QStringLiteral("display"), displayPath(path)},
                     {QStringLiteral("size"), -1}, {QStringLiteral("sizeText"), QString()}, {QStringLiteral("dirty"), 0},
                     {QStringLiteral("unpushed"), 0}, {QStringLiteral("onlyLocal"), false}, {QStringLiteral("nested"), QVariantList()},
                     {QStringLiteral("worktrees"), QVariantList()}, {QStringLiteral("github"), QString()},
                     {QStringLiteral("canDeleteGithub"), false}, {QStringLiteral("blocked"), false}, {QStringLiteral("blockReason"), QString()}};
    QString reason = deleteBlockReason(path);   // checked before anything below path is read
    if (reason.isEmpty() && !QFileInfo(path + QStringLiteral("/.git")).isDir())
        reason = GitActions::tr("Kein Git-Repository");
    if (!reason.isEmpty()) {
        info[QStringLiteral("blocked")] = true;
        info[QStringLiteral("blockReason")] = reason;
        return info;
    }
    TreeScan t;
    const QByteArray skip = QFile::encodeName(QDir::cleanPath(QDir::homePath()) + QStringLiteral("/AI/ComfyUI/user"));
    scanTree(QFile::encodeName(QDir::cleanPath(path)), skip, true, t);
    t.nested.sort();
    QVariantList nested;
    for (const QString &n : std::as_const(t.nested))
        nested << QVariantMap{{QStringLiteral("path"), n}, {QStringLiteral("display"), displayPath(n)}};
    info[QStringLiteral("size")] = t.size;
    info[QStringLiteral("sizeText")] = sizeText(t.size);
    info[QStringLiteral("nested")] = nested;
    info[QStringLiteral("dirty")] = dirtyCount(path);
    info[QStringLiteral("unpushed")] = trimmedOut(runGit(path, {QStringLiteral("rev-list"), QStringLiteral("--count"), QStringLiteral("--branches"),
                                                                QStringLiteral("--not"), QStringLiteral("--remotes")})).toInt();
    info[QStringLiteral("onlyLocal")] = trimmedOut(runGit(path, {QStringLiteral("remote")})).isEmpty();
    const QString canon = QFileInfo(path).canonicalFilePath();
    QVariantList wts;
    const QList<Worktree> list = worktreeList(path);
    for (int i = 1; i < list.size(); ++i) {
        const bool exists = QFileInfo(list[i].path).isDir();
        wts << QVariantMap{{QStringLiteral("path"), list[i].path}, {QStringLiteral("display"), displayPath(list[i].path)},
                           {QStringLiteral("branch"), list[i].branch}, {QStringLiteral("inside"), isInside(list[i].path, canon)},
                           {QStringLiteral("exists"), exists}, {QStringLiteral("dirty"), exists ? dirtyCount(list[i].path) : 0}};
    }
    info[QStringLiteral("worktrees")] = wts;
    const QString gh = ownGithubRepo(path);
    info[QStringLiteral("github")] = gh;
    info[QStringLiteral("canDeleteGithub")] = !gh.isEmpty() && ghCanDeleteRepo();
    return info;
}

// Commits of a local branch that no other branch, remote branch or tag contains.
int uniqueCommits(const QString &path, const QString &branch)
{
    return trimmedOut(runGit(path, {QStringLiteral("rev-list"), QStringLiteral("--count"), QStringLiteral("refs/heads/") + branch,
                                    QStringLiteral("--not"), QStringLiteral("--exclude=") + branch, QStringLiteral("--branches"),
                                    QStringLiteral("--remotes"), QStringLiteral("--tags")})).toInt();
}

bool refExists(const QString &path, const QString &ref)
{
    return runGit(path, {QStringLiteral("show-ref"), QStringLiteral("--verify"), QStringLiteral("--quiet"), ref}).ok();
}

// Checks a branch / worktree / tag before deleting. reason != "" = not deletable.
QVariantMap inspectRefInfo(const QString &path, const QString &kind, const QString &name)
{
    QVariantMap info{{QStringLiteral("reason"), QString()}, {QStringLiteral("unique"), 0}, {QStringLiteral("dirty"), 0},
                     {QStringLiteral("branch"), QString()}, {QStringLiteral("display"), name}, {QStringLiteral("hasRemote"), false}};
    auto refuse = [&info](const QString &r) {
        info[QStringLiteral("reason")] = r;
        return info;
    };
    if (name.isEmpty() || name.startsWith(QLatin1Char('-')))
        return refuse(GitActions::tr("Ungültiger Name."));
    const QList<Worktree> wts = worktreeList(path);
    if (kind == QStringLiteral("branch")) {
        if (!refExists(path, QStringLiteral("refs/heads/") + name))
            return refuse(GitActions::tr("Den Zweig gibt es nicht mehr."));
        for (int i = 0; i < wts.size(); ++i) {
            if (wts[i].branch != name)
                continue;
            if (i == 0)
                return refuse(GitActions::tr("Das ist der aktuelle Zweig – erst einen anderen auschecken."));
            return refuse(GitActions::tr("Ist in der Arbeitskopie %1 ausgecheckt – erst die Arbeitskopie entfernen.").arg(displayPath(wts[i].path)));
        }
        info[QStringLiteral("unique")] = uniqueCommits(path, name);
        return info;
    }
    if (kind == QStringLiteral("worktree")) {
        int idx = -1;
        for (int i = 0; i < wts.size() && idx < 0; ++i)
            if (samePath(wts[i].path, name))
                idx = i;
        if (idx < 0)
            return refuse(GitActions::tr("Die Arbeitskopie gibt es nicht mehr."));
        info[QStringLiteral("display")] = displayPath(wts[idx].path);
        info[QStringLiteral("branch")] = wts[idx].branch;
        if (idx == 0)
            return refuse(GitActions::tr("Die Hauptarbeitskopie lässt sich nicht entfernen."));
        const QString blocked = deleteBlockReason(wts[idx].path);
        if (!blocked.isEmpty())
            return refuse(blocked);
        info[QStringLiteral("dirty")] = QFileInfo(wts[idx].path).isDir() ? dirtyCount(wts[idx].path) : 0;
        return info;
    }
    if (kind == QStringLiteral("tag")) {
        if (!refExists(path, QStringLiteral("refs/tags/") + name))
            return refuse(GitActions::tr("Den Tag gibt es nicht mehr."));
        info[QStringLiteral("hasRemote")] = !trimmedOut(runGit(path, {QStringLiteral("remote")})).isEmpty();
        return info;
    }
    return refuse(GitActions::tr("Nur lokale Zweige, Arbeitskopien und Tags lassen sich löschen."));
}

} // namespace

void GitActions::inspectDelete(const QString &path)
{
    if (Fixture::active()) {
        const QString reason = deleteBlockReason(path);
        const QVariantMap info{{QStringLiteral("name"), QFileInfo(path).fileName()}, {QStringLiteral("display"), displayPath(path)},
                               {QStringLiteral("size"), 52428800}, {QStringLiteral("sizeText"), sizeText(52428800)},
                               {QStringLiteral("dirty"), 2}, {QStringLiteral("unpushed"), 3}, {QStringLiteral("onlyLocal"), false},
                               {QStringLiteral("nested"), QVariantList()}, {QStringLiteral("worktrees"), QVariantList()},
                               {QStringLiteral("github"), QString()}, {QStringLiteral("canDeleteGithub"), false},
                               {QStringLiteral("blocked"), !reason.isEmpty()}, {QStringLiteral("blockReason"), reason}};
        QTimer::singleShot(0, this, [=] { emit deleteInspected(path, info); });
        return;
    }
    (void)QtConcurrent::run([this, path] {
        const QVariantMap info = inspectRepo(path);
        QMetaObject::invokeMethod(this, [=] { emit deleteInspected(path, info); }, Qt::QueuedConnection);
    });
}

void GitActions::deleteRepo(const QString &path, bool alsoGithub)
{
    if (Fixture::active()) {
        runAction(path, QStringLiteral("delete"), [] { return Outcome{true, tr("OK (Testdaten)")}; });
        return;
    }
    runAction(path, QStringLiteral("delete"), [path, alsoGithub]() -> Outcome {
        const QString reason = deleteBlockReason(path);
        if (!reason.isEmpty())
            //: %1 = why the folder is locked
            return {false, tr("%1 – nichts gelöscht.").arg(reason)};
        if (!QFileInfo(path + QStringLiteral("/.git")).isDir())
            return {false, tr("Kein Git-Repository – nichts gelöscht.")};
        const QString canon = QFileInfo(path).canonicalFilePath();
        QStringList external;   // linked worktrees outside the folder
        const QList<Worktree> wts = worktreeList(path);
        for (int i = 1; i < wts.size(); ++i) {
            if (isInside(wts[i].path, canon) || !QFileInfo(wts[i].path).isDir())
                continue;
            if (!deleteBlockReason(wts[i].path).isEmpty())
                return {false, tr("Arbeitskopie %1 ist gesperrt – nichts gelöscht.").arg(displayPath(wts[i].path))};
            external << wts[i].path;
        }
        QString gh;
        if (alsoGithub) {
            gh = ownGithubRepo(path);
            if (gh.isEmpty())
                return {false, tr("Kein eigenes GitHub-Repo – nichts gelöscht.")};
            if (!ghCanDeleteRepo())
                return {false, tr("gh darf keine Repos löschen (Recht delete_repo fehlt) – nichts gelöscht.")};
            const RunResult r = runTool(ghProgram(), {QStringLiteral("repo"), QStringLiteral("delete"), gh, QStringLiteral("--yes")}, QString(), kNetTimeout);
            if (!r.ok())
                return {false, tr("GitHub: %1 – nichts gelöscht.").arg(gitError(r))};
        }
        const QString name = QFileInfo(path).fileName();
        if (!QFile::moveToTrash(path))
            return {false, (gh.isEmpty() ? tr("„%1“ ließ sich nicht in den Papierkorb legen.")
                                          : tr("Auf GitHub gelöscht, aber „%1“ ließ sich nicht in den Papierkorb legen.")).arg(name)};
        QStringList failed;
        for (const QString &w : std::as_const(external))
            if (!QFile::moveToTrash(w))
                failed << displayPath(w);
        //: start of a message that goes on with the parts below and ends with "."
        QString msg = tr("„%1“ liegt im Papierkorb").arg(name);
        const qsizetype moved = external.size() - failed.size();
        if (moved > 0)
            msg += moved == 1 ? tr(" (+ 1 Arbeitskopie)") : tr(" (+ %1 Arbeitskopien)").arg(moved);
        if (!gh.isEmpty())
            msg += tr(", %1 auf GitHub gelöscht").arg(gh);
        msg += QLatin1Char('.');
        if (!failed.isEmpty())
            msg += tr(" Nicht in den Papierkorb: %1").arg(failed.join(QStringLiteral(", ")));
        return {failed.isEmpty(), msg};
    });
}

void GitActions::inspectRef(const QString &path, const QString &kind, const QString &name)
{
    if (Fixture::active()) {
        const QVariantMap info{{QStringLiteral("reason"), QString()}, {QStringLiteral("unique"), kind == QStringLiteral("branch") ? 2 : 0},
                               {QStringLiteral("dirty"), kind == QStringLiteral("worktree") ? 1 : 0}, {QStringLiteral("branch"), QString()},
                               {QStringLiteral("display"), displayPath(name)}, {QStringLiteral("hasRemote"), true}};
        QTimer::singleShot(0, this, [=] { emit refInspected(path, kind, name, info); });
        return;
    }
    (void)QtConcurrent::run([this, path, kind, name] {
        const QVariantMap info = inspectRefInfo(path, kind, name);
        QMetaObject::invokeMethod(this, [=] { emit refInspected(path, kind, name, info); }, Qt::QueuedConnection);
    });
}

void GitActions::deleteRef(const QString &path, const QString &kind, const QString &name)
{
    if (Fixture::active()) {
        runAction(path, QStringLiteral("deleteref"), [] { return Outcome{true, tr("OK (Testdaten)")}; });
        return;
    }
    runAction(path, QStringLiteral("deleteref"), [path, kind, name]() -> Outcome {
        const QVariantMap info = inspectRefInfo(path, kind, name);
        const QString reason = info.value(QStringLiteral("reason")).toString();
        if (!reason.isEmpty())
            return {false, reason};
        if (kind == QStringLiteral("branch")) {
            const bool unique = info.value(QStringLiteral("unique")).toInt() > 0;
            RunResult r = runGit(path, {QStringLiteral("branch"), unique ? QStringLiteral("-D") : QStringLiteral("-d"), name});
            // -d also wants the branch merged into HEAD; its versions are all in other refs, so -D loses nothing
            if (!r.ok() && !unique && r.errText().contains(QStringLiteral("not fully merged")))
                r = runGit(path, {QStringLiteral("branch"), QStringLiteral("-D"), name});
            if (!r.ok())
                return {false, tr("Zweig nicht gelöscht: %1").arg(gitError(r))};
            return {true, tr("Zweig „%1“ gelöscht.").arg(name)};
        }
        if (kind == QStringLiteral("worktree")) {
            // agent worktrees are locked by their tool; the user decided in the dialog, so unlock first
            runGit(path, {QStringLiteral("worktree"), QStringLiteral("unlock"), name});
            if (info.value(QStringLiteral("dirty")).toInt() > 0) {
                // uncommitted files never vanish for good: folder to the trash, then git forgets the worktree
                if (!QFile::moveToTrash(name))
                    return {false, tr("Arbeitskopie nicht in den Papierkorb verschoben.")};
                runGit(path, {QStringLiteral("worktree"), QStringLiteral("prune")});
                return {true, tr("Arbeitskopie %1 in den Papierkorb verschoben.").arg(info.value(QStringLiteral("display")).toString())};
            }
            const RunResult r = runGit(path, {QStringLiteral("worktree"), QStringLiteral("remove"), name}, 120000);
            if (!r.ok())
                return {false, tr("Arbeitskopie nicht entfernt: %1").arg(gitError(r))};
            return {true, tr("Arbeitskopie %1 entfernt.").arg(info.value(QStringLiteral("display")).toString())};
        }
        const RunResult r = runGit(path, {QStringLiteral("tag"), QStringLiteral("-d"), name});
        if (!r.ok())
            return {false, tr("Tag nicht gelöscht: %1").arg(gitError(r))};
        return {true, tr("Tag „%1“ lokal gelöscht.").arg(name)};
    });
}

// ---------- GitHub visibility / "Nur noch lokal" ----------

QString GitActions::githubUser()
{
    const QString env = qEnvironmentVariable("AGM_GITHUB_USER");
    if (!env.isEmpty() || Fixture::active())   // fixture mode never calls gh
        return env;
    static QMutex mutex;
    static bool asked = false;
    static QString login;
    QMutexLocker lock(&mutex);
    if (!asked) {
        asked = true;
        static const QRegularExpression valid(QStringLiteral("^[A-Za-z0-9-]+$"));
        const RunResult r = runTool(ghProgram(), {QStringLiteral("api"), QStringLiteral("user"), QStringLiteral("--jq"), QStringLiteral(".login")},
                                    QString(), 30000);
        const QString out = r.ok() ? r.text().trimmed() : QString();
        if (valid.match(out).hasMatch())
            login = out;
    }
    return login;
}

QString GitActions::githubRepoOf(const QString &originUrl)
{
    const QString user = githubUser();
    if (user.isEmpty())
        return QString();
    static const QRegularExpression re(
        QStringLiteral("^(?:https://github\\.com/|git@github\\.com:|ssh://git@github\\.com/)([A-Za-z0-9-]+)/([A-Za-z0-9._-]+?)(?:\\.git)?/?$"));
    const QRegularExpressionMatch m = re.match(originUrl.trimmed());
    if (!m.hasMatch() || m.captured(1).compare(user, Qt::CaseInsensitive) != 0)
        return QString();
    return user + QLatin1Char('/') + m.captured(2);
}

QVariantMap GitActions::githubVisibility(bool *ok)
{
    QVariantMap out;
    const QString user = githubUser();
    if (user.isEmpty()) {
        if (ok)
            *ok = false;
        return out;
    }
    const RunResult r = runTool(ghProgram(), {QStringLiteral("repo"), QStringLiteral("list"), user, QStringLiteral("--limit"),
                                              QStringLiteral("200"), QStringLiteral("--json"), QStringLiteral("name,visibility")},
                                QString(), 60000);
    QJsonParseError err{};
    const QJsonDocument doc = r.ok() ? QJsonDocument::fromJson(r.out, &err) : QJsonDocument();
    if (ok)
        *ok = r.ok() && err.error == QJsonParseError::NoError && doc.isArray();
    for (const QJsonValue &v : doc.array()) {
        const QString vis = v.toObject().value(QStringLiteral("visibility")).toString().toLower();
        if (vis == QStringLiteral("private") || vis == QStringLiteral("public"))
            out[v.toObject().value(QStringLiteral("name")).toString().toLower()] = vis;
    }
    return out;
}

namespace {

// Versions that exist only on GitHub (after git fetch origin); -1 = fetch failed (error in *fetchError).
int onlyOnRemote(const QString &path, QString *fetchError)
{
    const RunResult f = runGit(path, {QStringLiteral("fetch"), QStringLiteral("-q"), QStringLiteral("origin")}, kNetTimeout);
    if (!f.ok()) {
        *fetchError = gitError(f);
        return -1;
    }
    return trimmedOut(runGit(path, {QStringLiteral("rev-list"), QStringLiteral("--count"), QStringLiteral("--remotes=origin"),
                                    QStringLiteral("--not"), QStringLiteral("--branches"), QStringLiteral("--tags")})).toInt();
}

} // namespace

void GitActions::setVisibility(const QString &path, bool makePublic)
{
    if (Fixture::active()) {
        runAction(path, QStringLiteral("visibility"), [] { return Outcome{true, tr("OK (Testdaten)")}; });
        return;
    }
    runAction(path, QStringLiteral("visibility"), [path, makePublic]() -> Outcome {
        const QString gh = ownGithubRepo(path);
        if (gh.isEmpty())
            return {false, tr("Kein eigenes GitHub-Repo – nichts geändert.")};
        const RunResult r = runTool(ghProgram(),
                                    {QStringLiteral("repo"), QStringLiteral("edit"), gh, QStringLiteral("--visibility"),
                                     makePublic ? QStringLiteral("public") : QStringLiteral("private"),
                                     QStringLiteral("--accept-visibility-change-consequences")},
                                    QString(), kNetTimeout);
        if (!r.ok())
            return {false, tr("GitHub: %1").arg(gitError(r))};
        return {true, (makePublic ? tr("%1 ist jetzt öffentlich.") : tr("%1 ist jetzt privat.")).arg(gh)};
    });
}

void GitActions::inspectUnpublish(const QString &path)
{
    if (Fixture::active()) {
        const QVariantMap info{{QStringLiteral("github"), githubUser() + QLatin1Char('/') + QFileInfo(path).fileName()},
                               {QStringLiteral("canDeleteGithub"), true}, {QStringLiteral("onlyRemote"), 0},
                               {QStringLiteral("fetchError"), QString()}};
        QTimer::singleShot(0, this, [=] { emit unpublishInspected(path, info); });
        return;
    }
    (void)QtConcurrent::run([this, path] {
        QVariantMap info{{QStringLiteral("github"), QString()}, {QStringLiteral("canDeleteGithub"), false},
                         {QStringLiteral("onlyRemote"), 0}, {QStringLiteral("fetchError"), QString()}};
        const QString gh = ownGithubRepo(path);
        if (!gh.isEmpty()) {
            QString fetchError;
            info[QStringLiteral("github")] = gh;
            info[QStringLiteral("canDeleteGithub")] = ghCanDeleteRepo();
            info[QStringLiteral("onlyRemote")] = onlyOnRemote(path, &fetchError);
            info[QStringLiteral("fetchError")] = fetchError;
        }
        QMetaObject::invokeMethod(this, [=] { emit unpublishInspected(path, info); }, Qt::QueuedConnection);
    });
}

void GitActions::unpublish(const QString &path)
{
    if (Fixture::active()) {
        runAction(path, QStringLiteral("unpublish"), [] { return Outcome{true, tr("OK (Testdaten)")}; });
        return;
    }
    runAction(path, QStringLiteral("unpublish"), [path]() -> Outcome {
        const QString gh = ownGithubRepo(path);
        if (gh.isEmpty())
            return {false, tr("Kein eigenes GitHub-Repo – nichts gelöscht.")};
        if (!ghCanDeleteRepo())
            return {false, tr("gh darf keine Repos löschen (Recht delete_repo fehlt) – nichts gelöscht.")};
        QString fetchError;
        const int only = onlyOnRemote(path, &fetchError);
        if (only < 0)
            return {false, tr("Abgleich mit GitHub fehlgeschlagen: %1 – nichts gelöscht.").arg(fetchError)};
        if (only > 0)
            return {false, tr("%n Versionen gibt es nur auf GitHub – vorher Pull. Nichts gelöscht.", nullptr, only)};
        const RunResult r = runTool(ghProgram(), {QStringLiteral("repo"), QStringLiteral("delete"), gh, QStringLiteral("--yes")}, QString(), kNetTimeout);
        if (!r.ok())
            return {false, tr("GitHub: %1 – nichts gelöscht.").arg(gitError(r))};
        const RunResult rm = runGit(path, {QStringLiteral("remote"), QStringLiteral("remove"), QStringLiteral("origin")});
        if (!rm.ok())
            return {false, tr("%1 auf GitHub gelöscht, aber origin ließ sich nicht entfernen: %2").arg(gh, gitError(rm))};
        return {true, tr("%1 auf GitHub gelöscht – das Projekt ist nur noch lokal.").arg(gh)};
    });
}
