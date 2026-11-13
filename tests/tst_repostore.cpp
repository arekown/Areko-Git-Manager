// RepoStore against temporary repositories only: HOME points to a QTemporaryDir, so the default roots
// (~/projects, ~/AI, …), QSettings and the classification all live inside it. Never touches real repos.
#include "blobimageprovider.h"
#include "gitrun.h"
#include "repostore.h"

#include <QColor>
#include <QDateTime>
#include <QDir>
#include <QFile>
#include <QImage>
#include <QSignalSpy>
#include <QTemporaryDir>
#include <QtTest>

class TstRepoStore : public QObject
{
    Q_OBJECT

    QTemporaryDir m_tmp;
    QString m_home;
    QString m_oldCwd;
    RepoStore *m_store = nullptr;

    static void git(const QString &dir, const QStringList &args)
    {
        const RunResult r = runGit(dir, args, 30000);
        QVERIFY2(r.ok(), qPrintable(args.join(QLatin1Char(' ')) + QStringLiteral(": ") + r.errText()));
    }
    static void write(const QString &file, const QByteArray &data)
    {
        QDir().mkpath(QFileInfo(file).absolutePath());
        QFile f(file);
        QVERIFY(f.open(QIODevice::WriteOnly));
        f.write(data);
    }
    static void picture(const QString &file, Qt::GlobalColor c)
    {
        QImage img(4, 4, QImage::Format_RGB32);
        img.fill(c);
        QVERIFY(img.save(file, "PNG"));
    }
    static void at(int minutesAgo)
    {
        const QByteArray d = "@" + QByteArray::number(QDateTime::currentSecsSinceEpoch() - minutesAgo * 60) + " +0000";
        qputenv("GIT_AUTHOR_DATE", d);
        qputenv("GIT_COMMITTER_DATE", d);
    }
    static void commit(const QString &dir, const QString &msg, int minutesAgo)
    {
        at(minutesAgo);
        git(dir, {QStringLiteral("add"), QStringLiteral("-A")});
        git(dir, {QStringLiteral("commit"), QStringLiteral("-q"), QStringLiteral("-m"), msg});
    }
    static void repo(const QString &dir, const QString &remote = QString())
    {
        QDir().mkpath(dir);
        git(dir, {QStringLiteral("init"), QStringLiteral("-q"), QStringLiteral("-b"), QStringLiteral("main")});
        write(dir + QStringLiteral("/README"), "hallo\n");
        commit(dir, QStringLiteral("Anfang"), 30);
        if (!remote.isEmpty())
            git(dir, {QStringLiteral("remote"), QStringLiteral("add"), QStringLiteral("origin"), remote});
    }

    QString p(const QString &rel) const { return m_home + QLatin1Char('/') + rel; }

    QVariantMap summary(const QString &rel) const
    {
        for (const QVariant &v : m_store->repos())
            if (v.toMap().value(QStringLiteral("path")).toString() == p(rel))
                return v.toMap();
        return {};
    }

    QVariantList history(int count, int *total = nullptr, QVariantList *edges = nullptr, int *maxLane = nullptr)
    {
        QSignalSpy spy(m_store, &RepoStore::historyLoaded);
        m_store->loadHistory(p(QStringLiteral("projects/alpha")), count);
        if (!spy.wait(30000))
            return {};
        const QList<QVariant> a = spy.takeFirst();
        if (total)
            *total = a[4].toInt();
        if (edges)
            *edges = a[2].toList();
        if (maxLane)
            *maxLane = a[3].toInt();
        return a[1].toList();
    }

    QString hashOf(const QString &subject)
    {
        for (const QVariant &c : history(300))
            if (c.toMap().value(QStringLiteral("subject")).toString() == subject)
                return c.toMap().value(QStringLiteral("id")).toString();
        return {};
    }

private slots:
    void initTestCase()
    {
        QVERIFY(m_tmp.isValid());
        m_home = QFileInfo(m_tmp.path()).canonicalFilePath();
        qputenv("HOME", m_home.toUtf8());
        qputenv("AGM_GH", "/bin/false");   // gh logs in via the keyring, a temporary HOME alone does not keep it off GitHub
        qputenv("AGM_GITHUB_USER", "arekown");   // own = remote owner arekown, gh is never asked for the login
        qunsetenv("XDG_CONFIG_HOME");
        qunsetenv("AGM_FIXTURE");
        qputenv("GIT_CONFIG_NOSYSTEM", "1");
        qputenv("GIT_EDITOR", "true");
        qputenv("GIT_AUTHOR_NAME", "Test");
        qputenv("GIT_AUTHOR_EMAIL", "test@example.invalid");
        qputenv("GIT_COMMITTER_NAME", "Test");
        qputenv("GIT_COMMITTER_EMAIL", "test@example.invalid");
        QCoreApplication::setOrganizationName(QStringLiteral("AGM-Test"));
        QCoreApplication::setApplicationName(QStringLiteral("tst_repostore"));

        // own repo with a side branch, merge, tag, rename and a picture that changes
        const QString a = p(QStringLiteral("projects/alpha"));
        QDir().mkpath(a);
        git(a, {QStringLiteral("init"), QStringLiteral("-q"), QStringLiteral("-b"), QStringLiteral("main")});
        write(a + QStringLiteral("/a.txt"), "eins\nzwei\ndrei\n");
        commit(a, QStringLiteral("Anfang"), 100);
        git(a, {QStringLiteral("checkout"), QStringLiteral("-q"), QStringLiteral("-b"), QStringLiteral("feature")});
        picture(a + QStringLiteral("/bild.png"), Qt::red);
        commit(a, QStringLiteral("Bild"), 90);
        git(a, {QStringLiteral("checkout"), QStringLiteral("-q"), QStringLiteral("main")});
        write(a + QStringLiteral("/a.txt"), "eins\nZWEI\ndrei\n");
        commit(a, QStringLiteral("Text"), 80);
        at(70);
        git(a, {QStringLiteral("merge"), QStringLiteral("-q"), QStringLiteral("--no-ff"), QStringLiteral("feature"),
                QStringLiteral("-m"), QStringLiteral("Zusammenführung")});
        git(a, {QStringLiteral("tag"), QStringLiteral("v1")});
        git(a, {QStringLiteral("mv"), QStringLiteral("a.txt"), QStringLiteral("b.txt")});
        commit(a, QStringLiteral("Umbenannt"), 60);
        picture(a + QStringLiteral("/bild.png"), Qt::blue);
        commit(a, QStringLiteral("Bild blau"), 50);
        git(a, {QStringLiteral("worktree"), QStringLiteral("add"), QStringLiteral("-q"),
                a + QStringLiteral("/.claude/worktrees/agent1"), QStringLiteral("-b"), QStringLiteral("agent1")});

        repo(a + QStringLiteral("/sub/inner"), QStringLiteral("https://github.com/someone/inner.git"));   // nested
        repo(p(QStringLiteral("projects/own")), QStringLiteral("git@github.com:arekown/own.git"));
        repo(p(QStringLiteral("projects/node_modules/hidden")));                                         // skipped
        repo(p(QStringLiteral("AI/.Trash-1000/files/geloescht")));                                       // trash: skipped
        repo(p(QStringLiteral("outside/repo")));                                                         // only via symlink
        QVERIFY(QFile::link(p(QStringLiteral("outside")), p(QStringLiteral("projects/link"))));
        repo(p(QStringLiteral("AI/ComfyUI")), QStringLiteral("https://github.com/comfyanonymous/ComfyUI.git"));
        write(p(QStringLiteral("AI/ComfyUI/lose.txt")), "untracked\n");
        repo(p(QStringLiteral("AI/ComfyUI/user/default/geheim")));                                       // never entered
        repo(p(QStringLiteral("AI/ComfyUI/custom_nodes/node1")), QStringLiteral("https://github.com/x/node1"));
        repo(p(QStringLiteral("AI/Werkzeuge")));                                                         // own, foreign repo inside
        repo(p(QStringLiteral("AI/Werkzeuge/tool")), QStringLiteral("https://gitlab.com/y/tool.git"));
        repo(p(QStringLiteral("AI/einzeln")), QStringLiteral("https://github.com/z/einzeln.git"));       // foreign, alone
        QVERIFY(!QTest::currentTestFailed());

        m_oldCwd = QDir::currentPath();   // this process "works" in the agent worktree → active
        QVERIFY(QDir::setCurrent(a + QStringLiteral("/.claude/worktrees/agent1")));

        m_store = new RepoStore;   // scans the default roots below the temporary HOME
        QSignalSpy spy(m_store, &RepoStore::reposChanged);
        QVERIFY(spy.wait(60000));
    }

    void cleanupTestCase()
    {
        delete m_store;
        QDir::setCurrent(m_oldCwd);
    }

    void scannerFindsReposAndSkipsForbiddenFolders()
    {
        QStringList found;
        for (const QVariant &v : m_store->repos())
            found << v.toMap().value(QStringLiteral("path")).toString();
        QStringList expected{p(QStringLiteral("AI/Werkzeuge")), p(QStringLiteral("AI/Werkzeuge/tool")),
                             p(QStringLiteral("AI/einzeln")), p(QStringLiteral("AI/ComfyUI")),
                             p(QStringLiteral("AI/ComfyUI/custom_nodes/node1")), p(QStringLiteral("projects/alpha")),
                             p(QStringLiteral("projects/alpha/sub/inner")), p(QStringLiteral("projects/own"))};
        found.sort();
        expected.sort();
        QCOMPARE(found, expected);
        QVERIFY(!m_store->busy());
        QCOMPARE(m_store->roots().size(), 4);
    }

    void classificationAndSummaryFields()
    {
        QCOMPARE(summary(QStringLiteral("projects/own")).value(QStringLiteral("group")).toString(), QStringLiteral("eigen"));
        const QVariantMap inner = summary(QStringLiteral("projects/alpha/sub/inner"));
        QCOMPARE(inner.value(QStringLiteral("group")).toString(), QStringLiteral("fremd"));
        QCOMPARE(inner.value(QStringLiteral("sub")).toString(), QStringLiteral("alpha"));   // lies in the repo alpha
        QCOMPARE(inner.value(QStringLiteral("remote")).toString(), QStringLiteral("https://github.com/someone/inner.git"));
        const QVariantMap comfy = summary(QStringLiteral("AI/ComfyUI"));
        QCOMPARE(comfy.value(QStringLiteral("sub")).toString(), QStringLiteral("ComfyUI"));   // foreign repos inside
        QCOMPARE(comfy.value(QStringLiteral("dirty")).toInt(), 0);   // untracked files are not looked at
        QCOMPARE(summary(QStringLiteral("AI/ComfyUI/custom_nodes/node1")).value(QStringLiteral("sub")).toString(),
                 QStringLiteral("ComfyUI"));
        QCOMPARE(summary(QStringLiteral("AI/Werkzeuge")).value(QStringLiteral("group")).toString(), QStringLiteral("eigen"));
        QCOMPARE(summary(QStringLiteral("AI/Werkzeuge/tool")).value(QStringLiteral("sub")).toString(),
                 QStringLiteral("Werkzeuge"));
        QCOMPARE(summary(QStringLiteral("AI/einzeln")).value(QStringLiteral("sub")).toString(), QStringLiteral("Sonstige"));

        const QVariantMap a = summary(QStringLiteral("projects/alpha"));
        QCOMPARE(a.value(QStringLiteral("group")).toString(), QStringLiteral("eigen"));
        QCOMPARE(a.value(QStringLiteral("sub")).toString(), QString());
        QCOMPARE(a.value(QStringLiteral("display")).toString(), QStringLiteral("~/projects/alpha"));
        QCOMPARE(a.value(QStringLiteral("branch")).toString(), QStringLiteral("main"));
        QCOMPARE(a.value(QStringLiteral("count")).toInt(), 6);
        QCOMPARE(a.value(QStringLiteral("behind")).toInt(), -1);
        QVERIFY(a.value(QStringLiteral("dirty")).toInt() > 0);
        QVERIFY(!a.value(QStringLiteral("lastDate")).toString().isEmpty());

        QStringList refs;
        for (const QVariant &r : a.value(QStringLiteral("refs")).toList())
            refs << r.toMap().value(QStringLiteral("kind")).toString() + QLatin1Char(':') + r.toMap().value(QStringLiteral("name")).toString();
        QVERIFY2(refs.contains(QStringLiteral("tag:v1")) && refs.contains(QStringLiteral("branch:feature")), qPrintable(refs.join(' ')));

        const QVariantList wts = a.value(QStringLiteral("worktrees")).toList();
        QCOMPARE(wts.size(), 2);
        QCOMPARE(wts[0].toMap().value(QStringLiteral("agent")).toBool(), false);
        QCOMPARE(wts[1].toMap().value(QStringLiteral("agent")).toBool(), true);
        QCOMPARE(wts[1].toMap().value(QStringLiteral("branch")).toString(), QStringLiteral("agent1"));
        QCOMPARE(wts[1].toMap().value(QStringLiteral("active")).toBool(), true);

        int act = 0, bins = 0;
        const QVariantList activity = a.value(QStringLiteral("activity")).toList();
        QCOMPARE(activity.size(), 30);
        for (const QVariant &v : activity)
            act += v.toInt();
        const QVariantList bl = a.value(QStringLiteral("timeline")).toMap().value(QStringLiteral("bins")).toList();
        QCOMPARE(bl.size(), 48);
        for (const QVariant &v : bl)
            bins += v.toInt();
        QCOMPARE(act, 6);
        QCOMPARE(bins, 6);
    }

    void historyHasAllBranchesGraphAndImages()
    {
        int total = 0, maxLane = 0;
        QVariantList edges;
        const QVariantList commits = history(300, &total, &edges, &maxLane);
        QCOMPARE(commits.size(), 6);
        QCOMPARE(total, 6);
        QVERIFY(maxLane >= 1);
        QVERIFY(!edges.isEmpty());
        const QVariantMap top = commits[0].toMap();
        QCOMPARE(top.value(QStringLiteral("subject")).toString(), QStringLiteral("Bild blau"));
        QVERIFY(top.value(QStringLiteral("refs")).toStringList().contains(QStringLiteral("HEAD -> main")));
        QCOMPARE(top.value(QStringLiteral("hash")).toString().size(), 7);
        for (const QVariant &v : commits) {
            const QVariantMap c = v.toMap();
            const QString s = c.value(QStringLiteral("subject")).toString();
            if (s == QLatin1String("Zusammenführung"))
                QCOMPARE(c.value(QStringLiteral("parents")).toStringList().size(), 2);
            QCOMPARE(c.value(QStringLiteral("hasImage")).toBool(), s.startsWith(QLatin1String("Bild")));
        }

        QVariantList cutEdges;
        const QVariantList two = history(2, &total, &cutEdges);
        QCOMPARE(two.size(), 2);
        QCOMPARE(total, 6);
        bool open = false;
        for (const QVariant &e : cutEdges)
            open = open || e.toMap().value(QStringLiteral("to")).toInt() == -1;
        QVERIFY(open);   // parent beyond the loaded range runs to the bottom
    }

    void detailDiffAndPicture()
    {
        const QString repoPath = p(QStringLiteral("projects/alpha"));
        auto detail = [&](const QString &hash) {
            QSignalSpy spy(m_store, &RepoStore::detailLoaded);
            m_store->loadDetail(repoPath, hash);
            return spy.wait(30000) ? spy.takeFirst()[2].toMap() : QVariantMap();
        };

        const QVariantMap blau = detail(hashOf(QStringLiteral("Bild blau")));
        QCOMPARE(blau.value(QStringLiteral("filesTotal")).toInt(), 1);
        const QVariantMap f = blau.value(QStringLiteral("files")).toList().value(0).toMap();
        QCOMPARE(f.value(QStringLiteral("name")).toString(), QStringLiteral("bild.png"));
        QCOMPARE(f.value(QStringLiteral("status")).toString(), QStringLiteral("M"));
        QCOMPARE(f.value(QStringLiteral("add")).toInt(), -1);
        const QString prefix = QStringLiteral("image://gitblob/");
        const QString imgNew = f.value(QStringLiteral("imgNew")).toString();
        const QString imgOld = f.value(QStringLiteral("imgOld")).toString();
        QVERIFY(imgNew.startsWith(prefix) && imgOld.startsWith(prefix));
        QString err;
        const QImage now = BlobImageProvider::load(imgNew.mid(prefix.size()), QSize(), &err);
        QVERIFY2(!now.isNull(), qPrintable(err));
        QCOMPARE(QColor(now.pixel(0, 0)), QColor(Qt::blue));
        QCOMPARE(QColor(BlobImageProvider::load(imgOld.mid(prefix.size()), QSize()).pixel(0, 0)), QColor(Qt::red));

        const QVariantMap ren = detail(hashOf(QStringLiteral("Umbenannt")));
        const QVariantMap rf = ren.value(QStringLiteral("files")).toList().value(0).toMap();
        QCOMPARE(rf.value(QStringLiteral("name")).toString(), QStringLiteral("b.txt"));
        QCOMPARE(rf.value(QStringLiteral("status")).toString(), QStringLiteral("R"));

        QSignalSpy spy(m_store, &RepoStore::diffLoaded);
        m_store->loadDiff(repoPath, hashOf(QStringLiteral("Text")), QStringLiteral("a.txt"));
        QVERIFY(spy.wait(30000));
        const QStringList lines = spy.takeFirst()[3].toStringList();
        QVERIFY2(!lines.isEmpty() && lines[0].startsWith(QLatin1String("@@")), qPrintable(lines.join('\n')));
        QVERIFY(lines.contains(QStringLiteral("-zwei")) && lines.contains(QStringLiteral("+ZWEI")));
        for (const QString &l : lines)
            QVERIFY(!l.startsWith(QLatin1String("diff --git")) && !l.startsWith(QLatin1String("index ")));
    }

    // A repo that keeps its pictures in Git LFS: the blob is a pointer, the picture is read from .git/lfs/objects.
    void lfsPictureFromLocalStore()
    {
        const QString dir = p(QStringLiteral("projects/lfs"));
        repo(dir);
        const QString png = m_tmp.path() + QStringLiteral("/gruen.png");
        picture(png, Qt::green);
        QFile f(png);
        QVERIFY(f.open(QIODevice::ReadOnly));
        const QByteArray bytes = f.readAll();
        const QString oid = QString::fromLatin1(QCryptographicHash::hash(bytes, QCryptographicHash::Sha256).toHex());
        write(dir + QStringLiteral("/.git/lfs/objects/") + oid.left(2) + QLatin1Char('/') + oid.mid(2, 2) + QLatin1Char('/') + oid, bytes);
        write(dir + QStringLiteral("/bild.png"), "version https://git-lfs.github.com/spec/v1\noid sha256:" + oid.toLatin1()
                                                     + "\nsize " + QByteArray::number(bytes.size()) + "\n");
        commit(dir, QStringLiteral("LFS-Bild"), 5);
        const QString head = runGit(dir, {QStringLiteral("rev-parse"), QStringLiteral("HEAD")}).text().trimmed();
        QString err;
        const QImage img = BlobImageProvider::load(
            BlobImageProvider::url(head, dir, QStringLiteral("bild.png")).mid(QStringLiteral("image://gitblob/").size()), QSize(), &err);
        QVERIFY2(!img.isNull(), qPrintable(err));
        QCOMPARE(QColor(img.pixel(0, 0)), QColor(Qt::green));
    }
};

QTEST_MAIN(TstRepoStore)
#include "tst_repostore.moc"
