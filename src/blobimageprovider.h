#pragma once
// Image provider "gitblob": serves a picture from a version of a repository (read-only).
// URL: image://gitblob/<rev>/<base64url(repo path)>/<base64url(file path)>
//   rev = commit hash (hex) or WORKTREE (the file as it is on disk).
// Contract: docs/SCHNITTSTELLE.md (Detail, imgOld/imgNew).
#include <QImage>
#include <QQuickAsyncImageProvider>
#include <QSize>
#include <QString>
#include <QThreadPool>

class BlobImageProvider : public QQuickAsyncImageProvider
{
public:
    BlobImageProvider();
    ~BlobImageProvider() override;

    QQuickImageResponse *requestImageResponse(const QString &id, const QSize &requestedSize) override;

    // "image://gitblob/…" for this file in this version (rev = hash or "WORKTREE").
    static QString url(const QString &rev, const QString &repo, const QString &file);
    // Blocking load of an id (the part after "image://gitblob/"); runs in worker threads.
    static QImage load(const QString &id, const QSize &requestedSize, QString *error = nullptr);

private:
    QThreadPool m_pool;
};
