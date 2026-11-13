#include "blobimageprovider.h"

#include <QDir>
#include <QFontDatabase>
#include <QGuiApplication>
#include <QIcon>
#include <QLocale>
#include <QQmlApplicationEngine>
#include <QTranslator>
#include <QtQml/qqmlextensionplugin.h>

Q_IMPORT_QML_PLUGIN(ArekoGitPlugin)

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);
    QGuiApplication::setOrganizationName(QStringLiteral("Areko"));
    QGuiApplication::setApplicationName(QStringLiteral("Areko Git Manager"));
    QGuiApplication::setApplicationVersion(QStringLiteral(AGM_VERSION));
    QGuiApplication::setDesktopFileName(QStringLiteral("de.areko.GitManager"));
    QGuiApplication::setWindowIcon(QIcon(QStringLiteral(":/qt/qml/ArekoGit/icons/de.areko.GitManager.svg")));
    for (const char *f : {"Orbitron-Variable.ttf", "Rajdhani-Medium.ttf", "Rajdhani-SemiBold.ttf", "Rajdhani-Bold.ttf",
                          "ShareTechMono-Regular.ttf"})
        QFontDatabase::addApplicationFont(QStringLiteral(":/qt/qml/ArekoGit/fonts/") + QLatin1String(f));

    // UI language follows the system language. The texts in the sources are German, so German needs no file;
    // any other language without its own translation gets English.
    QTranslator translator;
    // German is the source language; agm_de only carries its plural forms ("1 Datei" / "2 Dateien").
    // Any language without its own file falls back to English.
    if (translator.load(QLocale(), QStringLiteral("agm"), QStringLiteral("_"), QStringLiteral(":/i18n"))
        || (QLocale().language() != QLocale::German && translator.load(QStringLiteral(":/i18n/agm_en"))))
        QGuiApplication::installTranslator(&translator);

    QQmlApplicationEngine engine;
    engine.addImageProvider(QStringLiteral("gitblob"), new BlobImageProvider);
    QObject::connect(&engine, &QQmlApplicationEngine::objectCreationFailed, &app,
                     [] { QCoreApplication::exit(1); }, Qt::QueuedConnection);
    engine.loadFromModule("ArekoGit", "Main");
    return QGuiApplication::exec();
}
