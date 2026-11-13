#pragma once
// GitActions: everything that changes a repository – working tree, staging, commit, pull, push, discard,
// "Auf GitHub sichern". Contract: docs/SCHNITTSTELLE.md. All signals arrive on the GUI thread.
// Hard rules: push never uses force, pull only fast-forward, discard only after the UI asked.
#include <QObject>
#include <QStringList>
#include <QVariantList>
#include <QVariantMap>
#include <QtQml/qqmlregistration.h>

#include <functional>

class GitActions : public QObject
{
    Q_OBJECT
    QML_ELEMENT
    QML_SINGLETON
    Q_PROPERTY(QStringList busyPaths READ busyPaths NOTIFY busyPathsChanged)

public:
    explicit GitActions(QObject *parent = nullptr);
    QStringList busyPaths() const { return m_busy; }

    Q_INVOKABLE void loadWorkingTree(const QString &path);
    Q_INVOKABLE void loadWorkingDiff(const QString &path, const QString &file);
    Q_INVOKABLE void setFileStaged(const QString &path, const QString &file, bool staged);
    Q_INVOKABLE void setHunkStaged(const QString &path, const QString &file, int hunk, bool staged);
    Q_INVOKABLE void commit(const QString &path, const QString &subject, const QString &body, bool push);
    Q_INVOKABLE void pull(const QString &path);
    Q_INVOKABLE void push(const QString &path);
    Q_INVOKABLE void discardFile(const QString &path, const QString &file);
    Q_INVOKABLE void publishToGitHub(const QString &path, const QString &repoName, bool makePublic = false);
    // Own GitHub repo (origin github.com/<user>/<name>): switch visibility, or "Nur noch lokal" – inspect first
    // (→ unpublishInspected: versions that exist only on GitHub), the UI asks, then delete on GitHub and drop origin.
    Q_INVOKABLE void setVisibility(const QString &path, bool makePublic);
    Q_INVOKABLE void inspectUnpublish(const QString &path);
    Q_INVOKABLE void unpublish(const QString &path);
    // Deleting: inspect first (→ deleteInspected / refInspected), the UI asks, then delete.
    // A project always goes into the trash (never deleted for good), GitHub only with alsoGithub.
    Q_INVOKABLE void inspectDelete(const QString &path);
    Q_INVOKABLE void deleteRepo(const QString &path, bool alsoGithub);
    Q_INVOKABLE void inspectRef(const QString &path, const QString &kind, const QString &name);   // kind: branch|worktree|tag
    Q_INVOKABLE void deleteRef(const QString &path, const QString &kind, const QString &name);

    // Blocking helpers (worker threads only), shared with Updates. Return ok, message is German and short.
    static bool pullFastForward(const QString &path, QString *message);   // git pull --ff-only, never merges/rebases
    static bool pushCurrent(const QString &path, QString *message);       // normal push, never force
    // Login of the signed-in GitHub user: AGM_GITHUB_USER if set, else `gh api user --jq .login`, asked once and
    // cached (call it from a worker thread). "" = no gh or not signed in – then no repo counts as own GitHub repo.
    static QString githubUser();
    // Shared with RepoStore: "<user>/<name>" for an origin URL of an own GitHub repo, else "".
    static QString githubRepoOf(const QString &originUrl);
    // gh repo list <user>: lower-case repo name → "private" | "public". ok = false if gh failed.
    static QVariantMap githubVisibility(bool *ok);

signals:
    void busyPathsChanged();
    void workingTreeLoaded(const QString &path, const QVariantMap &tree);
    void workingDiffLoaded(const QString &path, const QString &file, const QVariantList &hunks);
    void actionFinished(const QString &path, const QString &action, bool ok, const QString &message);
    void deleteInspected(const QString &path, const QVariantMap &info);
    void refInspected(const QString &path, const QString &kind, const QString &name, const QVariantMap &info);
    void unpublishInspected(const QString &path, const QVariantMap &info);

private:
    struct Outcome {
        bool ok = false;
        QString message;
    };
    // Marks path busy, runs work in a worker thread (repo lock held), ends with actionFinished.
    void runAction(const QString &path, const QString &action, std::function<Outcome()> work);
    // Runs a staging change in a worker thread, then emits workingTreeLoaded and workingDiffLoaded anew.
    void runStaging(const QString &path, const QString &file, std::function<Outcome()> work);

    QStringList m_busy;
};
