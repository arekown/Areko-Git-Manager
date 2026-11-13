#pragma once
// Desktop: open a folder in Dolphin, a terminal (Konsole) or the editor (Kate) at a path, open URLs, copy text.
#include <QObject>
#include <QtQml/qqmlregistration.h>

class Desktop : public QObject
{
    Q_OBJECT
    QML_ELEMENT
    QML_SINGLETON
public:
    explicit Desktop(QObject *parent = nullptr) : QObject(parent) {}
    Q_INVOKABLE void openFolder(const QString &path);
    Q_INVOKABLE void openTerminal(const QString &path);
    Q_INVOKABLE void openEditor(const QString &path);
    Q_INVOKABLE void openUrl(const QString &url);
    Q_INVOKABLE void copyText(const QString &text);
    Q_INVOKABLE QString homePath() const;
};
