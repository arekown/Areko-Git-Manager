// GitHub visibility and "Nur noch lokal" – against throw-away repos, a fake gh script and a fake ssh only.
// HOME points into the temp dir (RepoStore scans ~/projects there), AGM_GH redirects gh, GIT_SSH_COMMAND lets
// "git@github.com:arekown/<name>.git" fetch from the bare repo servers/<name>.git, so nothing reaches GitHub.
#include "gitactions.h"
#include "gitrun.h"
#include "repostore.h"

#include <QCoreApplication>
#include <QDir>
#include <QFile>
#include <QFileInfo>
#include <QSignalSpy>
#include <QTemporaryDir>
#include <QtTest>

#include <memory>

namespace {
QString git(const QString &dir, const QStringList &args)
{
    const RunResult r = runGit(dir, args);
    if (!r.ok())
        qWarning() << "git" << args << r.errText();
    return r.text().trimmed();
}

void writeFile(const QString &path, const QByteArray &content)
{
    QVERIFY(QDir().mkpath(QFileInfo(path).absolutePath()));
    QFile f(path);
    QVERIFY(f.open(QIODevice::WriteOnly | QIODevice::Truncate));
    f.write(content);
}

QByteArray readFile(const QString &path)
{
    QFile f(path);
    return f.open(QIODevice::ReadOnly) ? f.readAll() : QByteArray();
}

void makeExecutable(const QString &path)
{
    QVERIFY(QFile::setPermissions(path, QFile::ReadOwner | QFile::WriteOwner | QFile::ExeOwner));
}

// new repo with one version and the given origin
void makeRepo(const QString &dir, const QString &origin)
{
    QVERIFY(QDir().mkpath(dir));
    QVERIFY(runTool("git", {"init", "-q", "-b", "main", dir}).ok());
    writeFile(dir + "/start.txt", "start\n");
    git(dir, {"add", "start.txt"});
    git(dir, {"commit", "-q", "-m", "Anfang"});
    if (!origin.isEmpty())
        git(dir, {"remote", "add", "origin", origin});
}
} // namespace

class TstVisibility : public QObject
{
    Q_OBJECT
    std::unique_ptr<QTemporaryDir> m_tmp;
    QString m_root, m_home;
    GitActions m_g;

    QPair<bool, QString> waitAction()
    {
        QSignalSpy spy(&m_g, &GitActions::actionFinished);
        if (!spy.wait(60000))
            return {false, QStringLiteral("kein actionFinished")};
        return {spy.first().at(2).toBool(), spy.first().at(3).toString()};
    }
    QVariantMap inspect(const QString &path)
    {
        QSignalSpy spy(&m_g, &GitActions::unpublishInspected);
        m_g.inspectUnpublish(path);
        if (!spy.wait(60000))
            return {};
        return spy.first().at(1).toMap();
    }
    // own repo whose origin is git@github.com:arekown/<name>.git, backed by the bare repo servers/<name>.git
    QString githubRepo(const QString &name)
    {
        const QString server = m_root + "/servers/" + name + ".git";
        const QString dir = m_home + "/projects/" + name;
        if (!runTool("git", {"init", "-q", "--bare", "-b", "main", server}).ok())
            return {};
        makeRepo(dir, server);
        if (!runGit(dir, {"push", "-q", "-u", "origin", "main"}).ok())
            return {};
        git(dir, {"remote", "set-url", "origin", "git@github.com:arekown/" + name + ".git"});
        return dir;
    }

private slots:
    void initTestCase()
    {
        m_tmp = std::make_unique<QTemporaryDir>(QCoreApplication::applicationDirPath() + QStringLiteral("/tst-visibility-XXXXXX"));
        QVERIFY(m_tmp->isValid());
        m_root = QFileInfo(m_tmp->path()).canonicalFilePath();
        m_home = m_root + "/home";
        QVERIFY(QDir().mkpath(m_home));
        QVERIFY(QDir().mkpath(m_root + "/xdg"));
        writeFile(m_root + "/gitconfig", "[user]\n\tname = Test\n\temail = test@example.invalid\n");
        qputenv("HOME", m_home.toUtf8());
        qunsetenv("XDG_CONFIG_HOME");
        qunsetenv("AGM_FIXTURE");
        qputenv("GIT_CONFIG_GLOBAL", (m_root + "/gitconfig").toUtf8());
        qputenv("GIT_CONFIG_NOSYSTEM", "1");
        qputenv("XDG_DATA_HOME", (m_root + "/xdg").toUtf8());
        qputenv("AGM_GH", (m_root + "/gh.sh").toUtf8());
        qputenv("AGM_GITHUB_USER", "arekown");
        qputenv("GIT_SSH_COMMAND", (m_root + "/ssh.sh").toUtf8());
        qputenv("GIT_SSH_VARIANT", "simple");
        QCoreApplication::setOrganizationName(QStringLiteral("AGM-Test"));
        QCoreApplication::setApplicationName(QStringLiteral("tst_visibility"));
        QCOMPARE(QDir::homePath(), m_home);

        // fake gh: token with delete_repo, a fixed repo list, "repo edit/delete" calls are only written down
        writeFile(m_root + "/gh.sh", QByteArray("#!/bin/sh\n"
                                                "case \"$1 $2\" in\n"
                                                "  'auth status') echo \"  - Token scopes: 'delete_repo', 'repo'\" ;;\n"
                                                "  'repo list') echo '[{\"name\":\"Vis-A\",\"visibility\":\"PRIVATE\"},"
                                                "{\"name\":\"vis-b\",\"visibility\":\"PUBLIC\"}]' ;;\n"
                                                "  'repo edit'|'repo delete') echo \"$@\" >> \"") + m_root.toUtf8() + QByteArray("/gh-calls.txt\" ;;\n"
                                                "  *) exit 1 ;;\n"
                                                "esac\n"));
        makeExecutable(m_root + "/gh.sh");
        // fake ssh (variant simple): $1 = host, $2 = "git-upload-pack 'arekown/<name>.git'" → local bare repo
        writeFile(m_root + "/ssh.sh", QByteArray("#!/bin/sh\n"
                                                 "name=$(printf '%s' \"$2\" | sed \"s/.*arekown\\/\\([A-Za-z0-9_-]*\\).*/\\1/\")\n"
                                                 "exec git upload-pack \"") + m_root.toUtf8() + QByteArray("/servers/$name.git\"\n"));
        makeExecutable(m_root + "/ssh.sh");
    }

    void visibilityIsReadIntoRepos()
    {
        makeRepo(m_home + "/projects/vis-a", "https://github.com/arekown/Vis-A.git");
        makeRepo(m_home + "/projects/vis-b", "git@github.com:arekown/vis-b.git");
        makeRepo(m_home + "/projects/fremd", "https://github.com/someone/fremd.git");

        RepoStore store;   // rescan, then one gh repo list
        auto field = [&store](const QString &name, const QString &key) {
            for (const QVariant &v : store.repos())
                if (v.toMap().value("name").toString() == name)
                    return v.toMap().value(key).toString();
            return QStringLiteral("(fehlt)");
        };
        QTRY_COMPARE_WITH_TIMEOUT(field("vis-a", "visibility"), QStringLiteral("private"), 60000);
        QCOMPARE(field("vis-a", "github"), QStringLiteral("arekown/Vis-A"));
        QCOMPARE(field("vis-b", "visibility"), QStringLiteral("public"));
        QCOMPARE(field("fremd", "github"), QString());
        QCOMPARE(field("fremd", "visibility"), QString());
    }

    void switchingVisibilityCallsGhEdit()
    {
        m_g.setVisibility(m_home + "/projects/vis-a", true);
        const auto r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QVERIFY(readFile(m_root + "/gh-calls.txt")
                    .contains("repo edit arekown/Vis-A --visibility public --accept-visibility-change-consequences\n"));
    }

    void onlyLocalDeletesOnGithubAndKeepsFiles()
    {
        const QString dir = githubRepo("nurlokal");
        QVERIFY(!dir.isEmpty());
        const QVariantMap info = inspect(dir);
        QCOMPARE(info.value("github").toString(), QStringLiteral("arekown/nurlokal"));
        QVERIFY(info.value("canDeleteGithub").toBool());
        QVERIFY2(info.value("onlyRemote").toInt() == 0, qPrintable(info.value("fetchError").toString()));

        m_g.unpublish(dir);
        const auto r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QVERIFY(readFile(m_root + "/gh-calls.txt").contains("repo delete arekown/nurlokal --yes\n"));
        QCOMPARE(git(dir, {"remote"}), QString());
        QCOMPARE(readFile(dir + "/start.txt"), QByteArray("start\n"));
        QCOMPARE(git(dir, {"rev-list", "--count", "HEAD"}), QStringLiteral("1"));
    }

    void refusedWhileVersionsExistOnlyOnGithub()
    {
        const QString dir = githubRepo("nurgithub");
        QVERIFY(!dir.isEmpty());
        // someone else pushes one more version to the server
        const QString other = m_root + "/anderer";
        QVERIFY(runTool("git", {"clone", "-q", m_root + "/servers/nurgithub.git", other}).ok());
        writeFile(other + "/neu.txt", "neu\n");
        git(other, {"add", "neu.txt"});
        git(other, {"commit", "-q", "-m", "Nur auf GitHub"});
        QVERIFY(runGit(other, {"push", "-q", "origin", "main"}).ok());

        const QVariantMap info = inspect(dir);
        QVERIFY2(info.value("onlyRemote").toInt() == 1, qPrintable(info.value("fetchError").toString()));

        m_g.unpublish(dir);
        const auto r = waitAction();
        QVERIFY(!r.first);
        QVERIFY2(r.second.contains("nur auf GitHub"), qPrintable(r.second));
        QVERIFY(!readFile(m_root + "/gh-calls.txt").contains("nurgithub"));
        QCOMPARE(git(dir, {"remote"}), QStringLiteral("origin"));
    }
};

QTEST_GUILESS_MAIN(TstVisibility)
#include "tst_visibility.moc"
