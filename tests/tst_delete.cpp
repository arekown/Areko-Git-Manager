// Deleting projects, branches, worktrees and programs – against throw-away repos and a fake gh script only.
// HOME points into the temp dir (so ~/AI/ComfyUI/user is a test folder), XDG_DATA_HOME puts the trash there,
// AGM_HOMESUITE / AGM_APPS_DIR / AGM_GH redirect the program folder, the launchers and gh; AGM_GITHUB_USER sets the login.
#include "gitactions.h"
#include "gitrun.h"
#include "updates.h"

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

// new repo with one version
void makeRepo(const QString &dir)
{
    QVERIFY(QDir().mkpath(dir));
    QVERIFY(runTool("git", {"init", "-q", "-b", "main", dir}).ok());
    writeFile(dir + "/start.txt", "start\n");
    git(dir, {"add", "start.txt"});
    git(dir, {"commit", "-q", "-m", "Anfang"});
}

void commitFile(const QString &repo, const QString &name)
{
    writeFile(repo + "/" + name, name.toUtf8() + '\n');
    git(repo, {"add", name});
    git(repo, {"commit", "-q", "-m", name});
}
} // namespace

class TstDelete : public QObject
{
    Q_OBJECT
    std::unique_ptr<QTemporaryDir> m_tmp;
    QString m_root, m_home, m_trash, m_suite, m_apps;
    GitActions m_g;

    QPair<bool, QString> waitAction(QObject *sender = nullptr)
    {
        std::unique_ptr<QSignalSpy> spy;
        if (auto *u = qobject_cast<Updates *>(sender))
            spy = std::make_unique<QSignalSpy>(u, &Updates::actionFinished);
        else
            spy = std::make_unique<QSignalSpy>(&m_g, &GitActions::actionFinished);
        if (!spy->wait(60000))
            return {false, QStringLiteral("kein actionFinished")};
        return {spy->first().at(2).toBool(), spy->first().at(3).toString()};
    }
    QVariantMap inspect(const QString &path)
    {
        QSignalSpy spy(&m_g, &GitActions::deleteInspected);
        m_g.inspectDelete(path);
        if (!spy.wait(30000))
            return {};
        return spy.first().at(1).toMap();
    }
    QVariantMap inspectRef(const QString &path, const QString &kind, const QString &name)
    {
        QSignalSpy spy(&m_g, &GitActions::refInspected);
        m_g.inspectRef(path, kind, name);
        if (!spy.wait(30000))
            return {};
        return spy.first().at(3).toMap();
    }

private slots:
    void initTestCase()
    {
        m_tmp = std::make_unique<QTemporaryDir>(QCoreApplication::applicationDirPath() + QStringLiteral("/tst-delete-XXXXXX"));
        QVERIFY(m_tmp->isValid());
        m_root = m_tmp->path();
        m_home = m_root + "/home";
        m_trash = m_root + "/xdg/Trash/files";
        m_suite = m_home + "/Anwendungen/HomeSuite";
        m_apps = m_root + "/apps";
        QVERIFY(QDir().mkpath(m_home));
        QVERIFY(QDir().mkpath(m_root + "/xdg"));
        writeFile(m_root + "/gitconfig", "[user]\n\tname = Test\n\temail = test@example.invalid\n");
        qputenv("HOME", m_home.toUtf8());
        qputenv("GIT_CONFIG_GLOBAL", (m_root + "/gitconfig").toUtf8());
        qputenv("GIT_CONFIG_NOSYSTEM", "1");
        qunsetenv("AGM_FIXTURE");   // real git, even if the fixture for tst_ui is set in the environment
        qputenv("XDG_DATA_HOME", (m_root + "/xdg").toUtf8());
        qputenv("AGM_HOMESUITE", m_suite.toUtf8());
        qputenv("AGM_APPS_DIR", m_apps.toUtf8());
        qputenv("AGM_GH", (m_root + "/gh.sh").toUtf8());
        qputenv("AGM_GITHUB_USER", "arekown");
        QCOMPARE(QDir::homePath(), m_home);

        // fake gh: no releases, a token with delete_repo, "repo …" calls are only written down
        writeFile(m_root + "/gh.sh", QByteArray("#!/bin/sh\n"
                                                "case \"$1\" in\n"
                                                "  api) echo '[]' ;;\n"
                                                "  auth) echo \"  - Token scopes: 'delete_repo', 'repo'\" ;;\n"
                                                "  repo) echo \"$@\" >> \"") + m_root.toUtf8() + QByteArray("/gh-calls.txt\" ;;\n"
                                                "  *) exit 1 ;;\n"
                                                "esac\n"));
        QVERIFY(QFile::setPermissions(m_root + "/gh.sh", QFile::ReadOwner | QFile::WriteOwner | QFile::ExeOwner));
    }

    void repoGoesToTrashWithNestedRepoAndExternalWorktree()
    {
        const QString proj = m_home + "/projects/proj";
        const QString inner = proj + "/sub/inner";
        const QString wt = m_home + "/wt-extern";
        makeRepo(proj);
        makeRepo(inner);
        git(proj, {"worktree", "add", "-q", "-b", "extern", wt});
        QVERIFY(QFileInfo(wt + "/start.txt").exists());
        writeFile(proj + "/offen.txt", "nicht committet\n");

        const QVariantMap info = inspect(proj);
        QVERIFY2(!info.value("blocked").toBool(), qPrintable(info.value("blockReason").toString()));
        QVERIFY(info.value("size").toLongLong() > 0);
        QVERIFY(info.value("dirty").toInt() >= 1);
        QVERIFY(info.value("onlyLocal").toBool());
        QCOMPARE(info.value("unpushed").toInt(), 1);
        const QVariantList nested = info.value("nested").toList();
        QCOMPARE(nested.size(), 1);
        QCOMPARE(nested.first().toMap().value("path").toString(), inner);
        const QVariantList wts = info.value("worktrees").toList();
        QCOMPARE(wts.size(), 1);
        QVERIFY(!wts.first().toMap().value("inside").toBool());

        m_g.deleteRepo(proj, false);
        const auto r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QVERIFY(!QFileInfo::exists(proj));
        QVERIFY(!QFileInfo::exists(wt));
        QVERIFY(QFileInfo(m_trash + "/proj/offen.txt").exists());          // in the trash, not deleted
        QVERIFY(QFileInfo(m_trash + "/proj/sub/inner/.git").isDir());
        QVERIFY(QFileInfo(m_trash + "/wt-extern/start.txt").exists());
    }

    void comfyUserFolderIsRefusedWithoutEnteringIt()
    {
        const QString comfy = m_home + "/AI/ComfyUI";
        makeRepo(comfy);
        makeRepo(comfy + "/user/inner");
        const QVariantMap info = inspect(comfy);
        QVERIFY(info.value("blocked").toBool());
        QVERIFY(info.value("blockReason").toString().contains("ComfyUI/user"));
        QCOMPARE(info.value("size").toLongLong(), -1);                    // nothing below was read
        QVERIFY(info.value("nested").toList().isEmpty());
        QVERIFY(inspect(m_home + "/AI").value("blocked").toBool());

        m_g.deleteRepo(comfy, false);
        QVERIFY(!waitAction().first);
        QVERIFY(QFileInfo(comfy + "/user/inner/.git").isDir());
        QVERIFY(!QFileInfo::exists(m_trash + "/ComfyUI"));
    }

    void branchWithOwnVersionsAndWorktree()
    {
        const QString repo = m_home + "/projects/zweige";
        makeRepo(repo);
        git(repo, {"checkout", "-q", "-b", "eigen"});
        commitFile(repo, "e1.txt");
        commitFile(repo, "e2.txt");
        git(repo, {"checkout", "-q", "main"});

        QVERIFY(!inspectRef(repo, "branch", "main").value("reason").toString().isEmpty());   // current branch
        const QVariantMap b = inspectRef(repo, "branch", "eigen");
        QVERIFY2(b.value("reason").toString().isEmpty(), qPrintable(b.value("reason").toString()));
        QCOMPARE(b.value("unique").toInt(), 2);
        m_g.deleteRef(repo, "branch", "eigen");
        auto r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QVERIFY(!runGit(repo, {"show-ref", "--verify", "--quiet", "refs/heads/eigen"}).ok());

        const QString wt = m_home + "/wt-zweig";
        git(repo, {"worktree", "add", "-q", "-b", "wtzweig", wt});
        writeFile(wt + "/neu.txt", "neu\n");
        QVERIFY(!inspectRef(repo, "branch", "wtzweig").value("reason").toString().isEmpty());   // checked out there
        const QVariantMap w = inspectRef(repo, "worktree", wt);
        QVERIFY2(w.value("reason").toString().isEmpty(), qPrintable(w.value("reason").toString()));
        QCOMPARE(w.value("dirty").toInt(), 1);
        QVERIFY(!inspectRef(repo, "worktree", repo).value("reason").toString().isEmpty());     // main working copy
        m_g.deleteRef(repo, "worktree", wt);
        r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QVERIFY(!QFileInfo::exists(wt));
        QVERIFY(!git(repo, {"worktree", "list"}).contains("wt-zweig"));
    }

    void githubDeleteOnlyWithCheckbox()
    {
        const QString a = m_home + "/projects/gh-a";
        const QString b = m_home + "/projects/gh-b";
        makeRepo(a);
        makeRepo(b);
        git(a, {"remote", "add", "origin", "https://github.com/arekown/gh-a.git"});
        git(b, {"remote", "add", "origin", "git@github.com:arekown/gh-b.git"});
        const QVariantMap info = inspect(a);
        QCOMPARE(info.value("github").toString(), QStringLiteral("arekown/gh-a"));
        QVERIFY(info.value("canDeleteGithub").toBool());

        m_g.deleteRepo(a, false);
        auto r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QVERIFY(!QFileInfo::exists(a));
        QVERIFY(!readFile(m_root + "/gh-calls.txt").contains("delete"));

        m_g.deleteRepo(b, true);
        r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QVERIFY(!QFileInfo::exists(b));
        QCOMPARE(readFile(m_root + "/gh-calls.txt"), QByteArray("repo delete arekown/gh-b --yes\n"));
    }

    void programDeleteTrashesAppImagesAndLaunchers()
    {
        const QString oldApp = m_suite + "/foocraft-0.1.0-linux-x86_64.AppImage";
        const QString newApp = m_suite + "/foocraft-0.2.0-linux-x86_64.AppImage";
        const QString other = m_suite + "/barcraft-1.0.0-linux-x86_64.AppImage";
        writeFile(oldApp, "alt");
        writeFile(newApp, "neu");
        writeFile(other, "bar");
        writeFile(m_apps + "/foocraft.desktop", "[Desktop Entry]\nExec=" + newApp.toUtf8() + " %f\n");
        writeFile(m_apps + "/.versteckt/FooCraft.desktop", "[Desktop Entry]\nExec=\"" + newApp.toUtf8() + "\"\n");
        writeFile(m_apps + "/barcraft.desktop", "[Desktop Entry]\nExec=" + other.toUtf8() + "\n");

        Updates u;   // refreshPrograms runs right away
        QSignalSpy progs(&u, &Updates::programsChanged);
        QVERIFY(progs.wait(30000));
        QCOMPARE(u.programs().size(), 2);

        QSignalSpy inspected(&u, &Updates::programDeleteInspected);
        u.inspectProgramDelete("foocraft");
        QVERIFY(inspected.wait(30000));
        const QVariantMap info = inspected.first().at(1).toMap();
        QCOMPARE(info.value("files").toList().size(), 2);
        QCOMPARE(info.value("launchers").toList().size(), 2);

        QSignalSpy changed(&u, &Updates::programsChanged);
        u.deleteProgram("foocraft");
        const auto r = waitAction(&u);
        QVERIFY2(r.first, qPrintable(r.second));
        if (changed.count() < 2)   // entry removed, then the fresh scan (Updates.refreshPrograms) has to finish
            QVERIFY(changed.wait(30000));
        QVERIFY(!QFileInfo::exists(oldApp));
        QVERIFY(!QFileInfo::exists(newApp));
        QVERIFY(QFileInfo::exists(m_trash + "/foocraft-0.2.0-linux-x86_64.AppImage"));
        QVERIFY(QFileInfo::exists(m_trash + "/foocraft.desktop"));
        QVERIFY(QFileInfo::exists(m_trash + "/FooCraft.desktop"));
        QVERIFY(QFileInfo::exists(other));
        QVERIFY(QFileInfo::exists(m_apps + "/barcraft.desktop"));
        QCOMPARE(u.programs().size(), 1);
        QCOMPARE(u.programs().first().toMap().value("name").toString(), QStringLiteral("barcraft"));
    }
};

QTEST_GUILESS_MAIN(TstDelete)
#include "tst_delete.moc"
