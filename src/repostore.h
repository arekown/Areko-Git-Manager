#pragma once
// RepoStore: finds the repositories below the scanned folders and reads them (read-only).
// Contract: docs/SCHNITTSTELLE.md. All signals arrive on the GUI thread; git runs in worker threads.
#include <QObject>
#include <QStringList>
#include <QVariantList>
#include <QVariantMap>
#include <QtQml/qqmlregistration.h>

class RepoStore : public QObject
{
    Q_OBJECT
    QML_ELEMENT
    QML_SINGLETON
    Q_PROPERTY(QVariantList repos READ repos NOTIFY reposChanged)
    Q_PROPERTY(bool busy READ busy NOTIFY busyChanged)
    Q_PROPERTY(QStringList roots READ roots NOTIFY rootsChanged)
    Q_PROPERTY(bool fixture READ fixture CONSTANT)
    // login of the signed-in GitHub user ("" = no gh or not signed in), known after the first scan
    Q_PROPERTY(QString githubUser READ githubUser NOTIFY githubUserChanged)

public:
    explicit RepoStore(QObject *parent = nullptr);

    QVariantList repos() const { return m_repos; }
    bool busy() const { return m_busy; }
    QStringList roots() const { return m_roots; }
    bool fixture() const;
    QString githubUser() const { return m_githubUser; }

    Q_INVOKABLE void rescan();
    Q_INVOKABLE void setRoots(const QStringList &absPaths);
    Q_INVOKABLE void refreshRepo(const QString &path);
    // GitHub visibility of the own repos (one gh repo list call), written into repos[i].visibility
    Q_INVOKABLE void reloadVisibility();
    Q_INVOKABLE void loadHistory(const QString &path, int count);
    Q_INVOKABLE void loadDetail(const QString &path, const QString &hash);
    Q_INVOKABLE void loadDiff(const QString &path, const QString &hash, const QString &file);

signals:
    void reposChanged();
    void busyChanged();
    void rootsChanged();
    void githubUserChanged();
    void historyLoaded(const QString &path, const QVariantList &commits, const QVariantList &edges, int maxLane,
                       int total);
    void detailLoaded(const QString &path, const QString &hash, const QVariantMap &detail);
    void diffLoaded(const QString &path, const QString &hash, const QString &file, const QStringList &lines);
    void error(const QString &path, const QString &message);

private:
    void setBusy(bool b);
    void setGithubUser(const QString &user);
    bool applyVisibility();   // m_visibility → repos[i].visibility; true if anything changed
    QVariantList m_repos;
    QVariantMap m_visibility;   // lower-case GitHub repo name → "private" | "public" (last gh repo list)
    int m_visGen = 0;           // results of an older reloadVisibility are dropped
    QStringList m_roots;
    QString m_githubUser;
    bool m_busy = false;
    int m_scanGen = 0;   // results of an older rescan are dropped
};
