// UI test: loads Main in fixture mode (AGM_FIXTURE, else entwurf/repos2.json in the source folder; skipped if it
// is missing), clicks through the main views, fails on any QML warning/error and saves five window images to
// <build>/ui-shots/*.png. Project, version and program to click are taken from the fixture.
#include <QDir>
#include <QFile>
#include <QFontDatabase>
#include <QGuiApplication>
#include <QJsonArray>
#include <QJsonDocument>
#include <QJsonObject>
#include <QQmlApplicationEngine>
#include <QQuickItem>
#include <QQuickWindow>
#include <QSettings>
#include <QTemporaryDir>
#include <QTranslator>
#include <QtQml/qqmlextensionplugin.h>
#include <QtTest>

Q_IMPORT_QML_PLUGIN(ArekoGitPlugin)

static const char *kFixture = AGM_SOURCE_DIR "/entwurf/repos2.json";

static QStringList g_qmlProblems;
static QtMessageHandler g_prev = nullptr;

static void handler(QtMsgType type, const QMessageLogContext &ctx, const QString &msg)
{
    const bool qmlRelated = msg.contains(QLatin1String(".qml")) || msg.contains(QLatin1String(".js:"))
                            || msg.contains(QLatin1String("QML")) || QByteArray(ctx.category) .startsWith("qt.qml")
                            || (ctx.file && QByteArray(ctx.file).endsWith(".qml"));
    // Some pictures in the fixture are Git-LFS pointer files, so Image reports a decode error for them.
    const bool lfsPointer = msg.contains(QLatin1String("/bilder/")) && msg.contains(QLatin1String("Error decoding"))
                            && (msg.contains(QLatin1String("QML Image")) || msg.contains(QLatin1String("QQuickImage")));
    if (type != QtDebugMsg && type != QtInfoMsg && qmlRelated && !lfsPointer)
        g_qmlProblems << msg;
    if (g_prev)
        g_prev(type, ctx, msg);
}

class TstUi : public QObject
{
    Q_OBJECT
    QQmlApplicationEngine *m_engine = nullptr;
    QQuickWindow *m_win = nullptr;
    QString m_shots;
    QString m_proj, m_top, m_imgHash, m_prog;   // from the fixture: project, its newest version, a picture version, program
    int m_imgIdx = -1;

    static QQuickItem *find(QQuickItem *root, const QString &name)
    {
        if (!root)
            return nullptr;
        for (QQuickItem *c : root->childItems()) {
            if (c->objectName() == name && c->isVisible())
                return c;
            if (!c->isVisible())
                continue;
            if (QQuickItem *r = find(c, name))
                return r;
        }
        return nullptr;
    }
    QQuickItem *item(const QString &name) { return find(m_win->contentItem(), name); }

    void click(QQuickItem *it)
    {
        QVERIFY2(it, "item not found");
        const QPoint p = it->mapToScene(QPointF(it->width() / 2, it->height() / 2)).toPoint();
        QVERIFY2(QRect(QPoint(0, 0), m_win->size()).contains(p), "item outside the window");
        QTest::mouseClick(m_win, Qt::LeftButton, Qt::NoModifier, p);
    }
    void shot(const QString &name)
    {
        QTest::qWait(400);   // column animation + canvas paint
        const QImage img = m_win->grabWindow();
        QVERIFY(!img.isNull());
        QVERIFY(img.save(m_shots + QLatin1Char('/') + name));
    }
    void noProblems() { QVERIFY2(g_qmlProblems.isEmpty(), qPrintable(g_qmlProblems.join(QLatin1Char('\n')))); }

private slots:
    void initTestCase()
    {
        // an own project whose versions change a picture, and a program with releases
        QFile f(QString::fromLocal8Bit(qgetenv("AGM_FIXTURE")));
        if (!f.open(QIODevice::ReadOnly))
            QSKIP("Fixture fehlt (AGM_FIXTURE oder entwurf/repos2.json) – UI-Test übersprungen.");
        const QJsonObject fx = QJsonDocument::fromJson(f.readAll()).object();
        for (const QJsonValue &r : fx.value(QStringLiteral("repos")).toArray()) {
            if (!m_proj.isEmpty() || r.toObject().value(QStringLiteral("group")).toString() != QLatin1String("eigen"))
                continue;
            const QJsonArray cs = r.toObject().value(QStringLiteral("commits")).toArray();
            for (int i = 0; i < cs.size() && m_imgIdx < 0; ++i)
                for (const QJsonValue &fv : cs[i].toObject().value(QStringLiteral("files")).toArray())
                    if (fv.toObject().value(QStringLiteral("imgNew")).isString()) {
                        m_imgIdx = i;
                        m_imgHash = cs[i].toObject().value(QStringLiteral("hash")).toString();
                        break;
                    }
            if (m_imgIdx >= 0) {
                m_proj = r.toObject().value(QStringLiteral("name")).toString();
                m_top = cs[0].toObject().value(QStringLiteral("hash")).toString();
            }
        }
        for (const QJsonValue &p : fx.value(QStringLiteral("programs")).toArray())
            if (m_prog.isEmpty() && !p.toObject().value(QStringLiteral("releases")).toArray().isEmpty())
                m_prog = p.toObject().value(QStringLiteral("name")).toString();
        QVERIFY2(!m_proj.isEmpty(), "fixture has no own project with a picture version");
        QVERIFY2(!m_prog.isEmpty(), "fixture has no program with releases");

        g_prev = qInstallMessageHandler(handler);
        for (const char *f : {"Orbitron-Variable.ttf", "Rajdhani-Medium.ttf", "Rajdhani-SemiBold.ttf", "Rajdhani-Bold.ttf",
                              "ShareTechMono-Regular.ttf"})
            QFontDatabase::addApplicationFont(QStringLiteral(":/qt/qml/ArekoGit/fonts/") + QLatin1String(f));
        m_shots = QCoreApplication::applicationDirPath() + QStringLiteral("/ui-shots");
        // AGM_TEST_LANG=en|es|it|zh_CN|ja: same walk with that translation, pictures in ui-shots/<lang>/
        const QString lang = qEnvironmentVariable("AGM_TEST_LANG");
        if (!lang.isEmpty()) {
            auto *tr = new QTranslator(this);
            QVERIFY2(tr->load(QCoreApplication::applicationDirPath() + QStringLiteral("/agm_") + lang + QStringLiteral(".qm")),
                     "translation not built");
            QCoreApplication::installTranslator(tr);
            m_shots += QLatin1Char('/') + lang;
        }
        QDir().mkpath(m_shots);

        m_engine = new QQmlApplicationEngine(this);
        m_engine->loadFromModule("ArekoGit", "Main");
        QVERIFY(!m_engine->rootObjects().isEmpty());
        m_win = qobject_cast<QQuickWindow *>(m_engine->rootObjects().first());
        QVERIFY(m_win);
        m_win->resize(1800, 1000);
        m_win->show();
        QVERIFY(QTest::qWaitForWindowExposed(m_win));
    }

    void walkThrough()
    {
        // 1. select the project, its history appears
        QTRY_VERIFY(item(QStringLiteral("proj_") + m_proj));
        click(item(QStringLiteral("proj_") + m_proj));
        QTRY_VERIFY(item(QStringLiteral("commit_") + m_top));
        shot(QStringLiteral("1-repo.png"));
        noProblems();

        // 2. a version with a picture
        QQuickItem *hist = item(QStringLiteral("historyList"));
        QVERIFY(hist);
        QMetaObject::invokeMethod(hist, "positionViewAtIndex", Q_ARG(int, m_imgIdx), Q_ARG(int, 1 /* Center */));
        QTRY_VERIFY(item(QStringLiteral("commit_") + m_imgHash));
        click(item(QStringLiteral("commit_") + m_imgHash));
        QTRY_VERIFY(item(QStringLiteral("imgCompare")));
        QTRY_VERIFY(item(QStringLiteral("pic")));
        QTRY_VERIFY(item(QStringLiteral("pic"))->property("status").toInt() != 2 /* Loading */);
        shot(QStringLiteral("2-bild.png"));
        noProblems();

        // 3. file map, then back to the list
        click(item(QStringLiteral("viewMap")));
        QTRY_VERIFY(item(QStringLiteral("treemap")));
        shot(QStringLiteral("3-karte.png"));
        click(item(QStringLiteral("viewList")));
        QTRY_VERIFY(item(QStringLiteral("fileList")));
        noProblems();

        // 4. commit view with the working tree and the hunks of the first file
        click(item(QStringLiteral("btnCommit")));
        QTRY_VERIFY(item(QStringLiteral("workView")));
        QTRY_VERIFY(item(QStringLiteral("hunk_0")));
        shot(QStringLiteral("4-commit.png"));
        noProblems();

        // 5. a program and its newest release
        auto *flick = item(QStringLiteral("projectsFlick"));
        QVERIFY(flick);
        QTRY_VERIFY(find(flick, QStringLiteral("prog_") + m_prog));
        QQuickItem *prog = find(flick, QStringLiteral("prog_") + m_prog);
        auto *content = flick->property("contentItem").value<QQuickItem *>();
        const qreal y = prog->mapToItem(content, QPointF(0, 0)).y();
        const qreal maxY = qMax<qreal>(0, flick->property("contentHeight").toReal() - flick->height());
        flick->setProperty("contentY", qMin(maxY, qMax<qreal>(0, y - 40)));
        QTest::qWait(50);
        click(prog);
        QTRY_VERIFY(item(QStringLiteral("rel_0")));
        click(item(QStringLiteral("rel_0")));
        QTRY_VERIFY(item(QStringLiteral("releaseNotes")));
        shot(QStringLiteral("5-release.png"));
        noProblems();
    }

    void cleanupTestCase()
    {
        delete m_engine;
        m_engine = nullptr;
        qInstallMessageHandler(g_prev);
    }
};

int main(int argc, char **argv)
{
    if (qEnvironmentVariableIsEmpty("AGM_FIXTURE"))
        qputenv("AGM_FIXTURE", kFixture);
    QQuickWindow::setGraphicsApi(QSGRendererInterface::Software);
    QGuiApplication app(argc, argv);
    // Main.qml keeps UI state in QtCore Settings: give them an organisation and a fresh folder, never the user's settings
    QTemporaryDir settingsDir;
    QCoreApplication::setOrganizationName(QStringLiteral("AGM-Test"));
    QCoreApplication::setApplicationName(QStringLiteral("tst_ui"));
    QSettings::setPath(QSettings::NativeFormat, QSettings::UserScope, settingsDir.path());
    QSettings::setPath(QSettings::IniFormat, QSettings::UserScope, settingsDir.path());
    TstUi t;
    return QTest::qExec(&t, argc, argv);
}

#include "tst_ui.moc"
