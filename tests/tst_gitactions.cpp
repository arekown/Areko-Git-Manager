// GitActions against temporary repos only: a bare repo as "server" and clones of it.
// The temp dir lives below the build dir (same file system as $HOME), XDG_DATA_HOME points into it,
// so QFile::moveToTrash uses a trash inside the temp dir and never the real one.
#include "gitactions.h"
#include "gitrun.h"

#include <QCoreApplication>
#include <QFile>
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
    QFile f(path);
    QVERIFY(f.open(QIODevice::WriteOnly | QIODevice::Truncate));
    f.write(content);
}

QByteArray twentyLines(int changedA = 0, int changedB = 0)
{
    QByteArray out;
    for (int i = 1; i <= 20; ++i)
        out += "zeile " + QByteArray::number(i) + (i == changedA || i == changedB ? " neu" : "") + '\n';
    return out;
}
} // namespace

class TstGitActions : public QObject
{
    Q_OBJECT
    std::unique_ptr<QTemporaryDir> m_tmp;
    QString m_root, m_server, m_a, m_b, m_c;
    GitActions m_g;

    // waits for the next actionFinished and returns {ok, message}
    QPair<bool, QString> waitAction()
    {
        QSignalSpy spy(&m_g, &GitActions::actionFinished);
        if (!spy.wait(60000))
            return {false, QStringLiteral("kein actionFinished")};
        return {spy.first().at(2).toBool(), spy.first().at(3).toString()};
    }

private slots:
    void initTestCase()
    {
        m_tmp = std::make_unique<QTemporaryDir>(QCoreApplication::applicationDirPath() + QStringLiteral("/tst-gitactions-XXXXXX"));
        QVERIFY(m_tmp->isValid());
        m_root = m_tmp->path();
        writeFile(m_root + "/gitconfig", "[user]\n\tname = Test\n\temail = test@example.invalid\n");
        qputenv("GIT_CONFIG_GLOBAL", (m_root + "/gitconfig").toUtf8());
        qputenv("GIT_CONFIG_NOSYSTEM", "1");
        qunsetenv("AGM_FIXTURE");   // real git, even if the fixture for tst_ui is set in the environment
        QVERIFY(QDir().mkpath(m_root + "/xdg"));
        qputenv("XDG_DATA_HOME", (m_root + "/xdg").toUtf8());

        m_server = m_root + "/server.git";
        m_a = m_root + "/a";
        m_b = m_root + "/b";
        m_c = m_root + "/c";
        QVERIFY(runTool("git", {"init", "-q", "--bare", "-b", "main", m_server}).ok());
        QVERIFY(runTool("git", {"init", "-q", "-b", "main", m_a}).ok());
        writeFile(m_a + "/a.txt", twentyLines());
        git(m_a, {"add", "a.txt"});
        git(m_a, {"commit", "-q", "-m", "Anfang"});
        git(m_a, {"remote", "add", "origin", m_server});
        QVERIFY(runGit(m_a, {"push", "-q", "-u", "origin", "main"}).ok());
        QVERIFY(runTool("git", {"clone", "-q", m_server, m_b}).ok());
        QVERIFY(runTool("git", {"clone", "-q", m_server, m_c}).ok());
    }

    void hunkStagingHitsExactlyThatHunk()
    {
        writeFile(m_a + "/a.txt", twentyLines(2, 18));   // two changes far apart → two hunks
        QSignalSpy diffs(&m_g, &GitActions::workingDiffLoaded);
        QSignalSpy trees(&m_g, &GitActions::workingTreeLoaded);
        m_g.loadWorkingDiff(m_a, "a.txt");
        QVERIFY(diffs.wait(10000));
        QVariantList hunks = diffs.takeLast().at(2).toList();
        QCOMPARE(hunks.size(), 2);
        QVERIFY(!hunks[0].toMap()["staged"].toBool() && !hunks[1].toMap()["staged"].toBool());

        m_g.setHunkStaged(m_a, "a.txt", 1, true);   // only the second hunk (line 18)
        QVERIFY(diffs.wait(10000));
        const QString cached = git(m_a, {"diff", "--cached"});
        QVERIFY(cached.contains("+zeile 18 neu"));
        QVERIFY(!cached.contains("zeile 2 neu"));
        const QString open = git(m_a, {"diff"});
        QVERIFY(open.contains("+zeile 2 neu"));
        QVERIFY(!open.contains("zeile 18 neu"));
        hunks = diffs.takeLast().at(2).toList();
        QCOMPARE(hunks.size(), 2);
        QVERIFY(!hunks[0].toMap()["staged"].toBool());
        QVERIFY(hunks[1].toMap()["staged"].toBool());
        QVERIFY(!trees.isEmpty());
        QCOMPARE(trees.last().at(1).toMap()["files"].toList().first().toMap()["staged"].toInt(), 1);   // partly staged

        m_g.setHunkStaged(m_a, "a.txt", 1, false);  // take the staged hunk back
        QVERIFY(diffs.wait(10000));
        QCOMPARE(git(m_a, {"diff", "--cached"}), QString());
        QVERIFY(git(m_a, {"diff"}).contains("+zeile 18 neu"));
    }

    void commitWithMessage()
    {
        m_g.commit(m_a, "Leer", QString(), false);
        QCOMPARE(waitAction().first, false);   // nothing staged

        QSignalSpy trees(&m_g, &GitActions::workingTreeLoaded);
        m_g.setFileStaged(m_a, "a.txt", true);
        QVERIFY(trees.wait(10000));
        QCOMPARE(trees.last().at(1).toMap()["files"].toList().first().toMap()["staged"].toInt(), 2);

        m_g.commit(m_a, "Betreff", "Details\nZeile zwei", false);
        const auto r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QCOMPARE(git(m_a, {"log", "-1", "--format=%s"}), QStringLiteral("Betreff"));
        QCOMPARE(git(m_a, {"log", "-1", "--format=%b"}), QStringLiteral("Details\nZeile zwei"));
    }

    void pushNeverForcesAndPullOnlyFastForwards()
    {
        writeFile(m_b + "/b.txt", "b\n");
        git(m_b, {"add", "b.txt"});
        git(m_b, {"commit", "-q", "-m", "B"});
        m_g.push(m_b);
        auto r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        const QString serverHead = git(m_server, {"rev-parse", "main"});
        QCOMPARE(serverHead, git(m_b, {"rev-parse", "HEAD"}));

        // A has its own new version and is behind B → push must be refused, server unchanged
        m_g.push(m_a);
        r = waitAction();
        QVERIFY(!r.first);
        QVERIFY2(r.second.contains("erst Pull"), qPrintable(r.second));
        QCOMPARE(git(m_server, {"rev-parse", "main"}), serverHead);

        // diverged → pull refuses, nothing merged
        const QString headA = git(m_a, {"rev-parse", "HEAD"});
        m_g.pull(m_a);
        QVERIFY(!waitAction().first);
        QCOMPARE(git(m_a, {"rev-parse", "HEAD"}), headA);
        QCOMPARE(git(m_a, {"rev-list", "--merges", "--count", "HEAD"}), QStringLiteral("0"));

        // C is only behind → fast-forward
        m_g.pull(m_c);
        r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QCOMPARE(git(m_c, {"rev-parse", "HEAD"}), serverHead);
    }

    void discardTrackedAndUntracked()
    {
        writeFile(m_c + "/a.txt", "geändert\n");
        git(m_c, {"add", "a.txt"});
        writeFile(m_c + "/a.txt", "nochmal geändert\n");
        writeFile(m_c + "/neu.txt", "neu\n");

        m_g.discardFile(m_c, "a.txt");
        auto r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QCOMPARE(git(m_c, {"status", "--porcelain", "--", "a.txt"}), QString());
        QFile a(m_c + "/a.txt");
        QVERIFY(a.open(QIODevice::ReadOnly));
        QCOMPARE(a.readAll(), twentyLines());

        m_g.discardFile(m_c, "neu.txt");
        r = waitAction();
        QVERIFY2(r.first, qPrintable(r.second));
        QVERIFY(!QFile::exists(m_c + "/neu.txt"));
        QVERIFY(QFile::exists(m_root + "/xdg/Trash/files/neu.txt"));   // in the trash, not deleted
    }
};

QTEST_GUILESS_MAIN(TstGitActions)
#include "tst_gitactions.moc"
