#pragma once
// Blocking process helpers. Call them only from worker threads (QtConcurrent::run), never from the GUI thread.
#include <QByteArray>
#include <QString>
#include <QStringList>

struct RunResult {
    int exitCode = -1;          // -1 = could not start or timed out
    bool timedOut = false;
    QByteArray out;
    QByteArray err;
    bool ok() const { return exitCode == 0 && !timedOut; }
    QString text() const { return QString::fromUtf8(out); }
    QString errText() const { return QString::fromUtf8(err).trimmed(); }
};

// Runs `program args` in workDir (empty = current). The process is killed after timeoutMs.
// Environment: LC_ALL=C, GIT_TERMINAL_PROMPT=0 and GIT_OPTIONAL_LOCKS=0, so git never asks for input,
// prints parseable English and read-only commands never take the index lock of a repo someone works in.
RunResult runTool(const QString &program, const QStringList &args, const QString &workDir = QString(),
                  int timeoutMs = 60000, const QByteArray &stdinData = QByteArray());

// git -C <repo> args...
RunResult runGit(const QString &repo, const QStringList &args, int timeoutMs = 60000,
                 const QByteArray &stdinData = QByteArray());

// "~/AI/x" for paths below $HOME, otherwise unchanged.
QString displayPath(const QString &absPath);
