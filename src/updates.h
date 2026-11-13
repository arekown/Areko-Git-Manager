#pragma once
// Updates: new versions of foreign repos (upstream) and of the Craft AppImages (GitHub releases).
// Contract: docs/SCHNITTSTELLE.md. All signals arrive on the GUI thread.
#include <QObject>
#include <QStringList>
#include <QThreadPool>
#include <QVariantList>
#include <QVariantMap>
#include <QtQml/qqmlregistration.h>

class Updates : public QObject
{
    Q_OBJECT
    QML_ELEMENT
    QML_SINGLETON
    Q_PROPERTY(QVariantMap news READ news NOTIFY newsChanged)
    Q_PROPERTY(bool checking READ checking NOTIFY checkingChanged)
    Q_PROPERTY(QVariantList programs READ programs NOTIFY programsChanged)
    Q_PROPERTY(QStringList busyPaths READ busyPaths NOTIFY busyPathsChanged)

public:
    explicit Updates(QObject *parent = nullptr);

    QVariantMap news() const { return m_news; }
    bool checking() const { return m_checking; }
    QVariantList programs() const { return m_programs; }
    QStringList busyPaths() const { return m_busy; }

    Q_INVOKABLE void checkAll(const QStringList &repoPaths);
    Q_INVOKABLE void updateRepo(const QString &path);
    Q_INVOKABLE void updateRepos(const QStringList &paths);
    Q_INVOKABLE void refreshPrograms();
    Q_INVOKABLE void updateProgram(const QString &name);
    Q_INVOKABLE void launchProgram(const QString &name);
    Q_INVOKABLE void inspectProgramDelete(const QString &name);   // → programDeleteInspected
    Q_INVOKABLE void deleteProgram(const QString &name);          // AppImage(s) + launchers into the trash

signals:
    void newsChanged();
    void checkingChanged();
    void programsChanged();
    void busyPathsChanged();
    void progress(const QString &path, const QString &text);
    void actionFinished(const QString &path, const QString &action, bool ok, const QString &message);
    void programDeleteInspected(const QString &name, const QVariantMap &info);

private:
    void setBusy(const QString &key, bool busy);

    QVariantMap m_news;
    QVariantList m_programs;
    QStringList m_busy;
    bool m_checking = false;
    bool m_refreshing = false;
    int m_pending = 0;            // repos of the running checkAll still to answer
    QThreadPool m_checkPool;      // checkAll: at most 4 repos at the same time
};
