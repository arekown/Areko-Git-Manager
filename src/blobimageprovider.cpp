#include "blobimageprovider.h"

#include "gitrun.h"

#include <QDir>
#include <QFile>
#include <QFileInfo>
#include <QQuickImageResponse>
#include <QQuickTextureFactory>
#include <QRegularExpression>
#include <QRunnable>

namespace {
constexpr qint64 kMaxBytes = 64 * 1024 * 1024;   // larger files are not shown as picture
const auto kB64 = QByteArray::Base64UrlEncoding | QByteArray::OmitTrailingEquals;

QString decode(const QString &s)
{
    const auto r = QByteArray::fromBase64Encoding(s.toLatin1(), QByteArray::Base64UrlEncoding
                                                                    | QByteArray::AbortOnBase64DecodingErrors);
    return r ? QString::fromUtf8(*r) : QString();
}

class BlobResponse : public QQuickImageResponse, public QRunnable
{
public:
    BlobResponse(const QString &id, const QSize &size) : m_id(id), m_size(size) { setAutoDelete(false); }
    void run() override
    {
        m_image = BlobImageProvider::load(m_id, m_size, &m_error);
        emit finished();
    }
    QQuickTextureFactory *textureFactory() const override
    {
        return QQuickTextureFactory::textureFactoryForImage(m_image);
    }
    QString errorString() const override { return m_error; }

private:
    QString m_id;
    QSize m_size;
    QImage m_image;
    QString m_error;
};
} // namespace

BlobImageProvider::BlobImageProvider() { m_pool.setMaxThreadCount(4); }

BlobImageProvider::~BlobImageProvider() { m_pool.waitForDone(); }

QQuickImageResponse *BlobImageProvider::requestImageResponse(const QString &id, const QSize &requestedSize)
{
    auto *r = new BlobResponse(id, requestedSize);
    m_pool.start(r);
    return r;
}

QString BlobImageProvider::url(const QString &rev, const QString &repo, const QString &file)
{
    return QStringLiteral("image://gitblob/") + rev + QLatin1Char('/')
           + QString::fromLatin1(repo.toUtf8().toBase64(kB64)) + QLatin1Char('/')
           + QString::fromLatin1(file.toUtf8().toBase64(kB64));
}

QImage BlobImageProvider::load(const QString &id, const QSize &requestedSize, QString *error)
{
    auto fail = [error](const QString &m) {
        if (error)
            *error = m;
        return QImage();
    };
    const QStringList parts = id.split(QLatin1Char('/'));
    if (parts.size() != 3)
        return fail(QStringLiteral("Ungültige Bildadresse"));
    static const QRegularExpression hex(QStringLiteral("^[0-9a-fA-F]{4,64}$"));
    const QString rev = parts[0];
    const QString repo = decode(parts[1]);
    const QString file = decode(parts[2]);
    if (repo.isEmpty() || file.isEmpty() || !QDir::isAbsolutePath(repo) || file.startsWith(QLatin1Char('/')))
        return fail(QStringLiteral("Ungültige Bildadresse"));
    const QString full = QDir::cleanPath(repo + QLatin1Char('/') + file);
    if (full.contains(QStringLiteral("/ComfyUI/user/")))   // never read ComfyUI's user folder
        return fail(QStringLiteral("Gesperrter Ordner"));

    QByteArray data;
    if (rev == QLatin1String("WORKTREE")) {
        const QString canonRepo = QFileInfo(repo).canonicalFilePath();
        const QString canonFile = QFileInfo(full).canonicalFilePath();
        if (canonRepo.isEmpty() || !canonFile.startsWith(canonRepo + QLatin1Char('/')))
            return fail(QStringLiteral("Datei nicht gefunden"));
        QFile f(canonFile);
        if (f.size() > kMaxBytes || !f.open(QIODevice::ReadOnly))
            return fail(QStringLiteral("Datei nicht lesbar"));
        data = f.readAll();
    } else {
        if (!hex.match(rev).hasMatch())
            return fail(QStringLiteral("Ungültige Version"));
        const RunResult r = runGit(repo, {QStringLiteral("cat-file"), QStringLiteral("blob"), rev + QLatin1Char(':') + file},
                                   30000);
        if (!r.ok())
            return fail(QStringLiteral("Bild nicht in dieser Version"));
        if (r.out.size() > kMaxBytes)
            return fail(QStringLiteral("Bild zu groß"));
        data = r.out;
        // Git LFS: the blob is only a pointer; the picture lies in the local LFS store (no network, no smudge process)
        static const QRegularExpression lfs(QStringLiteral("^version https://git-lfs\\.github\\.com/spec/v1\\n(?:.*\\n)*?oid sha256:([0-9a-f]{64})\\n"));
        const QRegularExpressionMatch m = data.size() < 1024 ? lfs.match(QString::fromLatin1(data)) : QRegularExpressionMatch();
        if (m.hasMatch()) {
            const QString oid = m.captured(1);
            QString common = runGit(repo, {QStringLiteral("rev-parse"), QStringLiteral("--git-common-dir")}, 10000).text().trimmed();
            if (QDir::isRelativePath(common))
                common = repo + QLatin1Char('/') + common;
            QFile f(common + QStringLiteral("/lfs/objects/") + oid.left(2) + QLatin1Char('/') + oid.mid(2, 2) + QLatin1Char('/') + oid);
            if (!f.open(QIODevice::ReadOnly))
                return fail(QStringLiteral("LFS-Bild nicht lokal vorhanden"));
            if (f.size() > kMaxBytes)
                return fail(QStringLiteral("Bild zu groß"));
            data = f.readAll();
        }
    }
    QImage img;
    if (!img.loadFromData(data))
        return fail(QStringLiteral("Kein lesbares Bild"));
    if (requestedSize.isValid() && (img.width() > requestedSize.width() || img.height() > requestedSize.height())) {
        QSize s = requestedSize;
        if (s.width() <= 0)
            s.setWidth(img.width());
        if (s.height() <= 0)
            s.setHeight(img.height());
        img = img.scaled(s, Qt::KeepAspectRatio, Qt::SmoothTransformation);
    }
    return img;
}
