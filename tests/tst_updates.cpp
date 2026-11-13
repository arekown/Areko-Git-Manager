// Updates against temporary repos and a fake gh script only. Program folder, launcher folder and gh are
// redirected via AGM_HOMESUITE / AGM_APPS_DIR / AGM_GH; XDG_DATA_HOME points the trash into the temp dir.
#include "gitrun.h"
#include "updates.h"

#include <QCoreApplication>
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

void commitFile(const QString &repo, const QString &name, const QString &subject)
{
    writeFile(repo + "/" + name, subject.toUtf8() + '\n');
    git(repo, {"add", name});
    git(repo, {"commit", "-q", "-m", subject});
}
} // namespace

class TstUpdates : public QObject
{
    Q_OBJECT
    std::unique_ptr<QTemporaryDir> m_tmp;
    std::unique_ptr<Updates> m_u;
    QString m_root, m_server, m_a, m_b, m_suite, m_apps;

    QPair<bool, QString> waitAction()
    {
        QSignalSpy spy(m_u.get(), &Updates::actionFinished);
        if (!spy.wait(60000))
            return {false, QStringLiteral("kein actionFinished")};
        return {spy.first().at(2).toBool(), spy.first().at(3).toString()};
    }

private slots:
    void initTestCase()
    {
        m_tmp = std::make_unique<QTemporaryDir>(QCoreApplication::applicationDirPath() + QStringLiteral("/tst-updates-XXXXXX"));
        QVERIFY(m_tmp->isValid());
        m_root = m_tmp->path();
        m_suite = m_root + "/homesuite";
        m_apps = m_root + "/apps";
        writeFile(m_root + "/gitconfig", "[user]\n\tname = Test\n\temail = test@example.invalid\n");
        qputenv("GIT_CONFIG_GLOBAL", (m_root + "/gitconfig").toUtf8());
        qputenv("GIT_CONFIG_NOSYSTEM", "1");
        qunsetenv("AGM_FIXTURE");   // real git, even if the fixture for tst_ui is set in the environment
        QVERIFY(QDir().mkpath(m_root + "/xdg"));
        qputenv("XDG_DATA_HOME", (m_root + "/xdg").toUtf8());
        qputenv("AGM_HOMESUITE", m_suite.toUtf8());
        qputenv("AGM_APPS_DIR", m_apps.toUtf8());
        qputenv("AGM_GH", (m_root + "/gh.sh").toUtf8());

        // fake gh: "api …" prints the releases, "release download … -D dir" drops the new AppImage into dir
        writeFile(m_root + "/releases.json",
                  R"([{"tag_name":"v0.2.0","published_at":"2026-11-12T00:00:00Z","body":"Neu","draft":false,"prerelease":false},
                      {"tag_name":"v0.1.0","published_at":"2026-11-01T00:00:00Z","body":"Alt","draft":false,"prerelease":false}])");
        writeFile(m_root + "/gh.sh", QByteArray("#!/bin/sh\n"
                                                "case \"$1\" in\n"
                                                "  api) cat \"") + m_root.toUtf8() + QByteArray("/releases.json\" ;;\n"
                                                "  release)\n"
                                                "    dir=\"\"\n"
                                                "    while [ $# -gt 0 ]; do\n"
                                                "      if [ \"$1\" = \"-D\" ]; then dir=\"$2\"; fi\n"
                                                "      shift\n"
                                                "    done\n"
                                                "    printf 'neu' > \"$dir/foocraft-0.2.0-linux-x86_64.AppImage\" ;;\n"
                                                "  *) exit 1 ;;\n"
                                                "esac\n"));
        QVERIFY(QFile::setPermissions(m_root + "/gh.sh", QFile::ReadOwner | QFile::WriteOwner | QFile::ExeOwner));

        // the release repo comes from the embedded update information (as in the .upd_info section of an AppImage)
        const QString oldApp = m_suite + "/foocraft-0.1.0-linux-x86_64.AppImage";
        writeFile(oldApp, QByteArray("alt\0gh-releases-zsync|tester|foocraft|latest|foocraft-*-linux-x86_64.AppImage.zsync\0", 84));
        writeFile(m_apps + "/foocraft.desktop", "[Desktop Entry]\nExec=" + oldApp.toUtf8() + " %f\n");
        writeFile(m_apps + "/.versteckt/Craft/FooCraft.desktop", "[Desktop Entry]\nExec=\"" + oldApp.toUtf8() + "\"\n");
        writeFile(m_apps + "/anderes.desktop", "[Desktop Entry]\nExec=/usr/bin/true\n");

        m_server = m_root + "/server.git";
        m_a = m_root + "/a";
        m_b = m_root + "/b";
        QVERIFY(runTool("git", {"init", "-q", "--bare", "-b", "main", m_server}).ok());
        QVERIFY(runTool("git", {"init", "-q", "-b", "main", m_b}).ok());
        commitFile(m_b, "start.txt", "Start");
        git(m_b, {"remote", "add", "origin", m_server});
        QVERIFY(runGit(m_b, {"push", "-q", "-u", "origin", "main"}).ok());
        QVERIFY(runTool("git", {"clone", "-q", m_server, m_a}).ok());

        m_u = std::make_unique<Updates>();   // after the environment is set: refreshPrograms runs right away
    }

    void checkCountsNewVersions()
    {
        commitFile(m_b, "x1.txt", "B1");
        commitFile(m_b, "x2.txt", "B2");
        commitFile(m_b, "x3.txt", "B3");
        QVERIFY(runGit(m_b, {"push", "-q"}).ok());

        QSignalSpy checking(m_u.get(), &Updates::checkingChanged);
        m_u->checkAll({m_a});
        QVERIFY(m_u->checking());
        while (m_u->checking())
            QVERIFY(checking.wait(60000));
        const QVariantMap news = m_u->news().value(m_a).toMap();
        QCOMPARE(news["n"].toInt(), 3);
        const QVariantList c = news["c"].toList();
        QCOMPARE(c.size(), 3);
        QCOMPARE(c.first().toMap()["s"].toString(), QStringLiteral("B3"));   // newest first
        QCOMPARE(c.first().toMap()["h"].toString().size(), 7);

        m_u->updateRepo(m_a);
        const auto r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QVERIFY(!m_u->news().contains(m_a));
        QCOMPARE(git(m_a, {"rev-parse", "HEAD"}), git(m_b, {"rev-parse", "HEAD"}));
    }

    void programUpdateSwapsFileAndRewritesLaunchers()
    {
        if (m_u->programs().isEmpty()) {
            QSignalSpy progs(m_u.get(), &Updates::programsChanged);
            QVERIFY(progs.wait(30000));
        }
        QCOMPARE(m_u->programs().size(), 1);
        const QVariantMap p = m_u->programs().first().toMap();
        QCOMPARE(p["version"].toString(), QStringLiteral("0.1.0"));
        QCOMPARE(p["repo"].toString(), QStringLiteral("tester/foocraft"));
        QCOMPARE(p["latest"].toString(), QStringLiteral("v0.2.0"));
        QVERIFY(p["outdated"].toBool());

        m_u->updateProgram("foocraft");
        const auto r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));

        const QString oldApp = m_suite + "/foocraft-0.1.0-linux-x86_64.AppImage";
        const QString newApp = m_suite + "/foocraft-0.2.0-linux-x86_64.AppImage";
        QVERIFY(QFileInfo(newApp).isExecutable());
        QCOMPARE(readFile(newApp), QByteArray("neu"));
        QVERIFY(!QFile::exists(oldApp));
        QVERIFY(QFile::exists(m_root + "/xdg/Trash/files/foocraft-0.1.0-linux-x86_64.AppImage"));   // trash, not deleted
        for (const QString &d : {m_apps + "/foocraft.desktop", m_apps + "/.versteckt/Craft/FooCraft.desktop"}) {
            const QByteArray content = readFile(d);
            QVERIFY2(content.contains(newApp.toUtf8()), qPrintable(d));
            QVERIFY2(!content.contains(oldApp.toUtf8()), qPrintable(d));
        }
        QCOMPARE(readFile(m_apps + "/anderes.desktop"), QByteArray("[Desktop Entry]\nExec=/usr/bin/true\n"));
        QCOMPARE(m_u->programs().first().toMap()["version"].toString(), QStringLiteral("0.2.0"));
    }
};

QTEST_GUILESS_MAIN(TstUpdates)
#include "tst_updates.moc"
