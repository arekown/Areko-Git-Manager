#pragma once
// Fixture mode: with AGM_FIXTURE=<path to repos2.json> (data of the approved HTML draft v2) the singletons
// serve that data instead of real git, so the UI can be built and screenshot-tested without touching repos.
// Image paths in the JSON ("bilder/x.png") are relative to the JSON file.
#include <QJsonObject>
#include <QString>

namespace Fixture {
bool active();                    // AGM_FIXTURE set and readable
const QJsonObject &data();        // {repos: [...], programs: [...], generated}
QString baseDir();                // folder of the JSON file
}
