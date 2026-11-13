#include "updates.h"

#include "fixture.h"
#include "gitactions.h"
#include "gitrun.h"

#include <QDir>
#include <QDirIterator>
#include <QFile>
#include <QFileInfo>
#include <QJsonArray>
#include <QJsonDocument>
#include <QJsonObject>
#include <QLocale>
#include <QProcess>
#include <QRegularExpression>
#include <QSaveFile>
#include <QSettings>
#include <QSet>
#include <QStandardPaths>
#include <QTemporaryDir>
#include <QTimer>
#include <QVersionNumber>
#include <QtConcurrent/QtConcurrentRun>

namespace {

QString expand(const QString &p) { return p.startsWith(QLatin1Char('~')) ? QDir::homePath() + p.mid(1) : p; }

// Folders and the gh program can be redirected (tests never touch real files or GitHub).
QString ghProgram()
{
    const QString gh = qEnvironmentVariable("AGM_GH");
    return gh.isEmpty() ? QStringLiteral("gh") : gh;
}

// Folder of the AppImages: AGM_HOMESUITE, else the setting programs/dir, else ~/Anwendungen/HomeSuite.
QString homeSuiteDir()
{
    const QString d = qEnvironmentVariable("AGM_HOMESUITE");
    if (!d.isEmpty())
        return d;
    return expand(QSettings().value(QStringLiteral("programs/dir"), QDir::homePath() + QStringLiteral("/Anwendungen/HomeSuite")).toString());
}

// Where the .desktop launchers of the AppImages live (searched recursively): ~/.local/share/applications and the
// desktop folder. AGM_APPS_DIR: colon-separated list instead.
QStringList launcherDirs()
{
    const QString env = qEnvironmentVariable("AGM_APPS_DIR");
    if (!env.isEmpty())
        return env.split(QLatin1Char(':'), Qt::SkipEmptyParts);
    QStringList dirs{QDir::homePath() + QStringLiteral("/.local/share/applications"),
                     QStandardPaths::writableLocation(QStandardPaths::DesktopLocation)};
    dirs.removeDuplicates();
    return dirs;
}

// <name>-<version>-linux-x86_64.AppImage (same pattern as the collection script of the draft)
const QRegularExpression &appImageRe()
{
    static const QRegularExpression re(QStringLiteral("^([a-z]+)-([0-9.]+)-linux-x86_64\\.AppImage$"));
    return re;
}

QVersionNumber versionOf(QString v)
{
    if (v.startsWith(QLatin1Char('v')))
        v.remove(0, 1);
    return QVersionNumber::fromString(v);
}

QString trimmedOut(const RunResult &r) { return r.ok() ? r.text().trimmed() : QString(); }

// GitHub repo "<owner>/<repo>" from the update information embedded in an AppImage (section .upd_info,
// "gh-releases-zsync|<owner>|<repo>|…"). Read from the start of the file, the AppImage is never run. "" = none.
QString appImageReleaseRepo(const QString &file)
{
    QFile f(file);
    if (!f.open(QIODevice::ReadOnly))
        return QString();
    const QByteArray head = f.read(8 * 1024 * 1024);   // the runtime with .upd_info is at the front
    const int at = head.indexOf("gh-releases-zsync|");
    if (at < 0)
        return QString();
    int end = at;
    while (end < head.size() && end - at < 1024 && head.at(end) != '\0' && head.at(end) != '\n')
        ++end;
    const QStringList parts = QString::fromUtf8(head.mid(at, end - at)).split(QLatin1Char('|'));
    static const QRegularExpression valid(QStringLiteral("^[A-Za-z0-9._-]+$"));
    if (parts.size() < 3 || !valid.match(parts[1]).hasMatch() || !valid.match(parts[2]).hasMatch())
        return QString();
    return parts[1] + QLatin1Char('/') + parts[2];
}

// ---------- foreign repos ----------

struct News {
    int n = 0;
    QVariantList c;
};

// ls-remote against the local remote-tracking ref; fetch (only this branch) only if they differ.
News checkRepo(const QString &path)
{
    News out;
    const QString branch = trimmedOut(runGit(path, {QStringLiteral("symbolic-ref"), QStringLiteral("--short"), QStringLiteral("-q"), QStringLiteral("HEAD")}));
    if (branch.isEmpty())
        return out;
    const QString remote = trimmedOut(runGit(path, {QStringLiteral("config"), QStringLiteral("--get"), QStringLiteral("branch.") + branch + QStringLiteral(".remote")}));
    const QString merge = trimmedOut(runGit(path, {QStringLiteral("config"), QStringLiteral("--get"), QStringLiteral("branch.") + branch + QStringLiteral(".merge")}));
    const QString tracking = trimmedOut(runGit(path, {QStringLiteral("rev-parse"), QStringLiteral("--symbolic-full-name"), QStringLiteral("@{u}")}));
    if (remote.isEmpty() || remote == QStringLiteral(".") || merge.isEmpty() || !tracking.startsWith(QStringLiteral("refs/remotes/")))
        return out;

    const RunResult ls = runGit(path, {QStringLiteral("ls-remote"), remote, merge}, 60000);
    QString remoteSha;
    for (const QString &line : ls.text().split(QLatin1Char('\n'), Qt::SkipEmptyParts)) {
        const QStringList cols = line.split(QLatin1Char('\t'));
        if (cols.size() == 2 && cols[1] == merge)
            remoteSha = cols[0].trimmed();
    }
    const QString localSha = trimmedOut(runGit(path, {QStringLiteral("rev-parse"), QStringLiteral("-q"), QStringLiteral("--verify"), tracking + QStringLiteral("^{commit}")}));
    if (!remoteSha.isEmpty() && remoteSha != localSha)
        runGit(path, {QStringLiteral("fetch"), QStringLiteral("--no-tags"), QStringLiteral("--quiet"), remote, merge}, 300000);

    const QString range = QStringLiteral("HEAD..") + tracking;
    out.n = trimmedOut(runGit(path, {QStringLiteral("rev-list"), QStringLiteral("--count"), range})).toInt();
    if (out.n <= 0)
        return out;
    const RunResult log = runGit(path, {QStringLiteral("log"), QStringLiteral("-15"), QStringLiteral("--format=%H%x1f%aI%x1f%an%x1f%s"), range});
    for (const QString &line : log.text().split(QLatin1Char('\n'), Qt::SkipEmptyParts)) {
        const QStringList f = line.split(QChar(0x1f));
        if (f.size() < 4)
            continue;
        out.c << QVariantMap{{QStringLiteral("h"), f[0].left(7)}, {QStringLiteral("d"), f[1]}, {QStringLiteral("a"), f[2]}, {QStringLiteral("s"), f[3]}};
    }
    return out;
}

// ---------- programs ----------

QVariantList scanPrograms()
{
    // newest version per name
    QMap<QString, QPair<QVersionNumber, QString>> found;
    const QDir dir(homeSuiteDir());
    for (const QString &fn : dir.entryList({QStringLiteral("*.AppImage")}, QDir::Files, QDir::Name)) {
        const QRegularExpressionMatch m = appImageRe().match(fn);
        if (!m.hasMatch())
            continue;
        const QVersionNumber v = versionOf(m.captured(2));
        if (!found.contains(m.captured(1)) || found[m.captured(1)].first < v)
            found[m.captured(1)] = {v, fn};
    }
    QVariantList out;
    for (auto it = found.cbegin(); it != found.cend(); ++it) {
        const QString name = it.key();
        const QString file = dir.absoluteFilePath(it.value().second);
        const QString version = appImageRe().match(it.value().second).captured(2);
        const QString repo = appImageReleaseRepo(file);   // "" = no update information: version only, no releases
        QVariantList releases;
        const RunResult r = repo.isEmpty() ? RunResult()
                                           : runTool(ghProgram(), {QStringLiteral("api"), QStringLiteral("repos/") + repo + QStringLiteral("/releases?per_page=8")},
                                                     QString(), 60000);
        if (!repo.isEmpty() && r.ok()) {
            for (const QJsonValue &v : QJsonDocument::fromJson(r.out).array()) {
                const QJsonObject o = v.toObject();
                if (o.value(QStringLiteral("draft")).toBool() || o.value(QStringLiteral("prerelease")).toBool())
                    continue;
                releases << QVariantMap{{QStringLiteral("tag"), o.value(QStringLiteral("tag_name")).toString()},
                                        {QStringLiteral("date"), o.value(QStringLiteral("published_at")).toString()},
                                        {QStringLiteral("body"), o.value(QStringLiteral("body")).toString().left(1500)}};
            }
        }
        const QString latest = releases.isEmpty() ? version : releases.first().toMap().value(QStringLiteral("tag")).toString();
        out << QVariantMap{{QStringLiteral("name"), name}, {QStringLiteral("file"), file}, {QStringLiteral("display"), displayPath(file)},
                           {QStringLiteral("version"), version}, {QStringLiteral("repo"), repo}, {QStringLiteral("latest"), latest},
                           {QStringLiteral("outdated"), versionOf(latest) > versionOf(version)}, {QStringLiteral("releases"), releases}};
    }
    return out;
}

// Rewrites every .desktop launcher that contains oldPath to newPath. Returns the number of changed launchers.
int rewriteLaunchers(const QString &oldPath, const QString &newPath, QStringList *failed)
{
    int changed = 0;
    QSet<QString> seen;
    const QByteArray from = oldPath.toUtf8(), to = newPath.toUtf8();
    for (const QString &d : launcherDirs()) {
        if (!QFileInfo(d).isDir())
            continue;
        QDirIterator it(d, {QStringLiteral("*.desktop")}, QDir::Files | QDir::Hidden | QDir::NoDotAndDotDot, QDirIterator::Subdirectories);
        while (it.hasNext()) {
            const QString f = QFileInfo(it.next()).canonicalFilePath();
            if (f.isEmpty() || seen.contains(f))
                continue;
            seen.insert(f);
            QFile in(f);
            if (in.size() > 1024 * 1024 || !in.open(QIODevice::ReadOnly))
                continue;
            QByteArray content = in.readAll();
            in.close();
            if (!content.contains(from))
                continue;
            content.replace(from, to);
            const QFile::Permissions perms = QFile::permissions(f);
            QSaveFile out(f);
            if (!out.open(QIODevice::WriteOnly) || out.write(content) != content.size() || !out.commit()) {
                *failed << displayPath(f);
                continue;
            }
            QFile::setPermissions(f, perms);
            ++changed;
        }
    }
    return changed;
}

struct ProgramResult {
    bool ok = false;
    QString message, newFile, newVersion;
};

ProgramResult installLatest(const QString &name, const QString &oldFile, const QString &tag, const QString &repo)
{
    ProgramResult res;
    const QString dir = QFileInfo(oldFile).absolutePath();
    QTemporaryDir tmp(dir + QStringLiteral("/.agm-download-XXXXXX"));   // same file system → plain rename afterwards
    if (!tmp.isValid()) {
        res.message = Updates::tr("Kein Platz für den Download in %1.").arg(displayPath(dir));
        return res;
    }
    const RunResult r = runTool(ghProgram(),
                                {QStringLiteral("release"), QStringLiteral("download"), tag, QStringLiteral("-R"), repo, QStringLiteral("-p"),
                                 name + QStringLiteral("-*-linux-x86_64.AppImage"), QStringLiteral("-D"), tmp.path()},
                                QString(), 30 * 60000);
    if (!r.ok()) {
        res.message = Updates::tr("Download fehlgeschlagen: %1").arg(r.timedOut ? Updates::tr("Zeitüberschreitung") : r.errText().section(QLatin1Char('\n'), -1));
        return res;
    }
    QString fn;
    QVersionNumber best;
    for (const QString &f : QDir(tmp.path()).entryList(QDir::Files)) {
        const QRegularExpressionMatch m = appImageRe().match(f);
        if (m.hasMatch() && m.captured(1) == name && (fn.isEmpty() || versionOf(m.captured(2)) > best)) {
            fn = f;
            best = versionOf(m.captured(2));
        }
    }
    if (fn.isEmpty()) {
        res.message = Updates::tr("Im Release %1 ist keine passende AppImage-Datei.").arg(tag);
        return res;
    }
    const QString newFile = dir + QLatin1Char('/') + fn;
    if (QFileInfo(newFile).absoluteFilePath() == QFileInfo(oldFile).absoluteFilePath() || QFileInfo::exists(newFile)) {
        res.message = Updates::tr("%1 liegt schon im Ordner – nichts geändert.").arg(fn);
        return res;
    }
    if (!QFile::rename(tmp.path() + QLatin1Char('/') + fn, newFile)) {
        res.message = Updates::tr("Konnte %1 nicht ablegen.").arg(fn);
        return res;
    }
    QFile::setPermissions(newFile, QFile::permissions(newFile) | QFile::ReadOwner | QFile::ReadUser | QFile::ExeOwner | QFile::ExeUser
                                       | QFile::ReadGroup | QFile::ExeGroup | QFile::ReadOther | QFile::ExeOther);
    QStringList failed;
    const int changed = rewriteLaunchers(QFileInfo(oldFile).absoluteFilePath(), newFile, &failed);
    const bool trashed = QFile::moveToTrash(oldFile);

    res.newFile = newFile;
    res.newVersion = appImageRe().match(fn).captured(2);
    res.ok = failed.isEmpty() && trashed;
    //: %1 = program, %2 = new version, %3 = number of changed .desktop launchers
    res.message = Updates::tr("%1 auf %2 aktualisiert, %3 Starter angepasst.").arg(name, res.newVersion).arg(changed);
    if (!failed.isEmpty())
        res.message += Updates::tr(" Nicht änderbar: %1").arg(failed.join(QStringLiteral(", ")));
    if (!trashed)
        res.message += Updates::tr(" Alte Datei konnte nicht in den Papierkorb.");
    return res;
}

QString sizeText(qint64 bytes) { return QLocale().formattedDataSize(bytes, 1, QLocale::DataSizeTraditionalFormat); }

// Everything that goes into the trash when a program is deleted: all its AppImages in the folder (every version,
// otherwise an older one would show up as the program again) and the .desktop launchers pointing to one of them.
struct ProgramFiles {
    QStringList files, launchers;
    qint64 size = 0;
};

ProgramFiles programFiles(const QString &name, const QString &file)
{
    ProgramFiles out;
    const QDir dir(QFileInfo(file).absolutePath());
    for (const QString &fn : dir.entryList({QStringLiteral("*.AppImage")}, QDir::Files, QDir::Name)) {
        const QRegularExpressionMatch m = appImageRe().match(fn);
        if (!m.hasMatch() || m.captured(1) != name)
            continue;
        out.files << dir.absoluteFilePath(fn);
        out.size += QFileInfo(dir.absoluteFilePath(fn)).size();
    }
    QSet<QString> seen;
    for (const QString &d : launcherDirs()) {
        if (!QFileInfo(d).isDir())
            continue;
        QDirIterator it(d, {QStringLiteral("*.desktop")}, QDir::Files | QDir::Hidden | QDir::NoDotAndDotDot, QDirIterator::Subdirectories);
        while (it.hasNext()) {
            const QString f = QFileInfo(it.next()).canonicalFilePath();
            if (f.isEmpty() || seen.contains(f))
                continue;
            seen.insert(f);
            QFile in(f);
            if (in.size() > 1024 * 1024 || !in.open(QIODevice::ReadOnly))
                continue;
            const QByteArray content = in.readAll();
            for (const QString &app : std::as_const(out.files))
                if (content.contains(app.toUtf8())) {
                    out.launchers << f;
                    break;
                }
        }
    }
    return out;
}

QVariantMap programDeleteInfo(const ProgramFiles &pf)
{
    QVariantList files, launchers;
    for (const QString &f : pf.files)
        files << QVariantMap{{QStringLiteral("path"), f}, {QStringLiteral("display"), displayPath(f)},
                             {QStringLiteral("sizeText"), sizeText(QFileInfo(f).size())}};
    for (const QString &l : pf.launchers)
        launchers << QVariantMap{{QStringLiteral("path"), l}, {QStringLiteral("display"), displayPath(l)}};
    return {{QStringLiteral("files"), files}, {QStringLiteral("launchers"), launchers}, {QStringLiteral("size"), pf.size},
            {QStringLiteral("sizeText"), sizeText(pf.size)}};
}

} // namespace

Updates::Updates(QObject *parent) : QObject(parent)
{
    m_checkPool.setMaxThreadCount(4);
    QTimer::singleShot(0, this, &Updates::refreshPrograms);
}

void Updates::setBusy(const QString &key, bool busy)
{
    if (busy)
        m_busy << key;
    else
        m_busy.removeAll(key);
    emit busyPathsChanged();
}

void Updates::checkAll(const QStringList &repoPaths)
{
    if (Fixture::active()) {
        QVariantMap n;
        for (const QJsonValue &v : Fixture::data().value(QStringLiteral("repos")).toArray()) {
            const QJsonObject r = v.toObject();
            if (r.value(QStringLiteral("news")).isObject())
                n[expand(r.value(QStringLiteral("path")).toString())] = r.value(QStringLiteral("news")).toObject().toVariantMap();
        }
        m_news = n;
        emit newsChanged();
        return;
    }
    if (m_checking || repoPaths.isEmpty())
        return;
    m_checking = true;
    m_pending = repoPaths.size();
    emit checkingChanged();
    for (const QString &path : repoPaths) {
        (void)QtConcurrent::run(&m_checkPool, [this, path] {
            const News n = checkRepo(path);
            QMetaObject::invokeMethod(this, [this, path, n] {
                if (n.n > 0)
                    m_news[path] = QVariantMap{{QStringLiteral("n"), n.n}, {QStringLiteral("c"), n.c}};
                else
                    m_news.remove(path);
                emit newsChanged();
                if (--m_pending == 0) {
                    m_checking = false;
                    emit checkingChanged();
                }
            }, Qt::QueuedConnection);
        });
    }
}

void Updates::updateRepo(const QString &path)
{
    if (m_busy.contains(path)) {
        QTimer::singleShot(0, this, [this, path] {
            emit actionFinished(path, QStringLiteral("update"), false, tr("Für dieses Repo läuft gerade schon eine Aktion."));
        });
        return;
    }
    setBusy(path, true);
    if (Fixture::active()) {
        QTimer::singleShot(800, this, [this, path] {
            setBusy(path, false);
            m_news.remove(path);
            emit newsChanged();
            emit actionFinished(path, QStringLiteral("update"), true, tr("Aktualisiert (Testdaten)"));
        });
        return;
    }
    emit progress(path, tr("Hole neue Versionen …"));
    (void)QtConcurrent::run([this, path] {
        QString msg;
        const bool ok = GitActions::pullFastForward(path, &msg);
        QMetaObject::invokeMethod(this, [this, path, ok, msg] {
            setBusy(path, false);
            if (ok) {
                m_news.remove(path);
                emit newsChanged();
            }
            emit actionFinished(path, QStringLiteral("update"), ok, msg);
        }, Qt::QueuedConnection);
    });
}

void Updates::updateRepos(const QStringList &paths)
{
    for (const QString &p : paths)
        updateRepo(p);
}

void Updates::refreshPrograms()
{
    if (Fixture::active()) {
        QVariantList out;
        for (const QJsonValue &v : Fixture::data().value(QStringLiteral("programs")).toArray()) {
            QVariantMap p = v.toObject().toVariantMap();
            p[QStringLiteral("display")] = p.value(QStringLiteral("file"));
            p[QStringLiteral("file")] = expand(p.value(QStringLiteral("file")).toString());
            const QVariantList rel = p.value(QStringLiteral("releases")).toList();
            const QString latest = rel.isEmpty() ? p.value(QStringLiteral("version")).toString()
                                                 : rel.first().toMap().value(QStringLiteral("tag")).toString();
            p[QStringLiteral("latest")] = latest;
            p[QStringLiteral("outdated")] = latest.mid(latest.startsWith(QLatin1Char('v')) ? 1 : 0) != p.value(QStringLiteral("version")).toString();
            out.append(p);
        }
        m_programs = out;
        emit programsChanged();
        return;
    }
    if (m_refreshing)
        return;
    m_refreshing = true;
    (void)QtConcurrent::run([this] {
        const QVariantList progs = scanPrograms();
        QMetaObject::invokeMethod(this, [this, progs] {
            m_refreshing = false;
            m_programs = progs;
            emit programsChanged();
        }, Qt::QueuedConnection);
    });
}

void Updates::updateProgram(const QString &name)
{
    QVariantMap prog;
    for (const QVariant &v : std::as_const(m_programs))
        if (v.toMap().value(QStringLiteral("name")).toString() == name)
            prog = v.toMap();
    auto finish = [this, name](bool ok, const QString &msg) {
        QTimer::singleShot(0, this, [=] { emit actionFinished(name, QStringLiteral("program"), ok, msg); });
    };
    if (prog.isEmpty())
        return finish(false, tr("Programm %1 nicht gefunden.").arg(name));
    if (m_busy.contains(name))
        return finish(false, tr("%1 wird gerade schon aktualisiert.").arg(name));
    if (!prog.value(QStringLiteral("outdated")).toBool())
        return finish(true, tr("%1 ist schon aktuell.").arg(name));
    if (Fixture::active())
        return finish(true, tr("Aktualisiert (Testdaten)"));

    const QString file = prog.value(QStringLiteral("file")).toString();
    const QString tag = prog.value(QStringLiteral("latest")).toString();
    const QString repo = prog.value(QStringLiteral("repo")).toString();
    setBusy(name, true);
    //: %1 = release tag being downloaded
    emit progress(name, tr("Lade %1 …").arg(tag));
    (void)QtConcurrent::run([this, name, file, tag, repo] {
        const ProgramResult res = installLatest(name, file, tag, repo);
        QMetaObject::invokeMethod(this, [this, name, res] {
            setBusy(name, false);
            if (!res.newFile.isEmpty()) {
                for (QVariant &v : m_programs) {
                    QVariantMap p = v.toMap();
                    if (p.value(QStringLiteral("name")).toString() != name)
                        continue;
                    p[QStringLiteral("file")] = res.newFile;
                    p[QStringLiteral("display")] = displayPath(res.newFile);
                    p[QStringLiteral("version")] = res.newVersion;
                    p[QStringLiteral("outdated")] = versionOf(p.value(QStringLiteral("latest")).toString()) > versionOf(res.newVersion);
                    v = p;
                }
                emit programsChanged();
            }
            emit actionFinished(name, QStringLiteral("program"), res.ok, res.message);
        }, Qt::QueuedConnection);
    });
}

void Updates::launchProgram(const QString &name)
{
    QString file;
    for (const QVariant &v : std::as_const(m_programs))
        if (v.toMap().value(QStringLiteral("name")).toString() == name)
            file = v.toMap().value(QStringLiteral("file")).toString();
    if (Fixture::active())
        return;
    const bool ok = !file.isEmpty() && QProcess::startDetached(file, {}, QFileInfo(file).absolutePath());
    QTimer::singleShot(0, this, [=] {
        emit actionFinished(name, QStringLiteral("launch"), ok, ok ? tr("%1 gestartet.").arg(name)
                                                                   : tr("%1 ließ sich nicht starten.").arg(name));
    });
}

void Updates::inspectProgramDelete(const QString &name)
{
    QString file;
    for (const QVariant &v : std::as_const(m_programs))
        if (v.toMap().value(QStringLiteral("name")).toString() == name)
            file = v.toMap().value(QStringLiteral("file")).toString();
    if (Fixture::active() || file.isEmpty()) {
        ProgramFiles pf;
        if (!file.isEmpty())
            pf.files << file;
        const QVariantMap info = programDeleteInfo(pf);
        QTimer::singleShot(0, this, [=] { emit programDeleteInspected(name, info); });
        return;
    }
    (void)QtConcurrent::run([this, name, file] {
        const QVariantMap info = programDeleteInfo(programFiles(name, file));
        QMetaObject::invokeMethod(this, [=] { emit programDeleteInspected(name, info); }, Qt::QueuedConnection);
    });
}

void Updates::deleteProgram(const QString &name)
{
    QString file;
    for (const QVariant &v : std::as_const(m_programs))
        if (v.toMap().value(QStringLiteral("name")).toString() == name)
            file = v.toMap().value(QStringLiteral("file")).toString();
    auto finish = [this, name](bool ok, const QString &msg) {
        QTimer::singleShot(0, this, [=] { emit actionFinished(name, QStringLiteral("deleteprogram"), ok, msg); });
    };
    if (file.isEmpty())
        return finish(false, tr("Programm %1 nicht gefunden.").arg(name));
    if (m_busy.contains(name))
        return finish(false, tr("Für %1 läuft gerade schon eine Aktion.").arg(name));
    if (Fixture::active())
        return finish(true, tr("OK (Testdaten)"));

    setBusy(name, true);
    (void)QtConcurrent::run([this, name, file] {
        const ProgramFiles pf = programFiles(name, file);
        QStringList failed;
        int files = 0, launchers = 0;
        for (const QString &f : pf.files) {
            if (QFile::moveToTrash(f))
                ++files;
            else
                failed << displayPath(f);
        }
        for (const QString &l : pf.launchers) {
            if (QFile::moveToTrash(l))
                ++launchers;
            else
                failed << displayPath(l);
        }
        //: %1 = program, %2 = number of files, %3 = number of .desktop launchers
        QString msg = (files == 1 ? tr("%1 liegt im Papierkorb (%2 Datei, %3 Starter).") : tr("%1 liegt im Papierkorb (%2 Dateien, %3 Starter)."))
                          .arg(name).arg(files).arg(launchers);
        if (!failed.isEmpty())
            msg += tr(" Nicht in den Papierkorb: %1").arg(failed.join(QStringLiteral(", ")));
        const bool gone = files > 0;
        QMetaObject::invokeMethod(this, [this, name, msg, gone, ok = failed.isEmpty()] {
            setBusy(name, false);
            if (gone) {
                for (int i = 0; i < m_programs.size(); ++i)
                    if (m_programs[i].toMap().value(QStringLiteral("name")).toString() == name)
                        m_programs.removeAt(i--);
                emit programsChanged();
                refreshPrograms();
            }
            emit actionFinished(name, QStringLiteral("deleteprogram"), ok, msg);
        }, Qt::QueuedConnection);
    });
}
