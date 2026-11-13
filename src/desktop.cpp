#include "desktop.h"

#include <QClipboard>
#include <QDesktopServices>
#include <QDir>
#include <QGuiApplication>
#include <QProcess>
#include <QUrl>

void Desktop::openFolder(const QString &path) { QDesktopServices::openUrl(QUrl::fromLocalFile(path)); }

void Desktop::openTerminal(const QString &path)
{
    QProcess::startDetached(QStringLiteral("konsole"), {QStringLiteral("--workdir"), path});
}

void Desktop::openEditor(const QString &path) { QProcess::startDetached(QStringLiteral("kate"), {path}); }

void Desktop::openUrl(const QString &url) { QDesktopServices::openUrl(QUrl(url)); }

void Desktop::copyText(const QString &text) { QGuiApplication::clipboard()->setText(text); }

QString Desktop::homePath() const { return QDir::homePath(); }
