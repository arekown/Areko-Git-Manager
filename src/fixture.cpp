#include "fixture.h"

#include <QFile>
#include <QFileInfo>
#include <QJsonDocument>

namespace {
struct Store {
    QJsonObject obj;
    QString dir;
    bool ok = false;
    Store()
    {
        const QString path = qEnvironmentVariable("AGM_FIXTURE");
        if (path.isEmpty())
            return;
        QFile f(path);
        if (!f.open(QIODevice::ReadOnly))
            return;
        obj = QJsonDocument::fromJson(f.readAll()).object();
        dir = QFileInfo(path).absolutePath();
        ok = !obj.isEmpty();
    }
};
const Store &store()
{
    static const Store s;
    return s;
}
} // namespace

bool Fixture::active() { return store().ok; }
const QJsonObject &Fixture::data() { return store().obj; }
QString Fixture::baseDir() { return store().dir; }
