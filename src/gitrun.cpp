#include "gitrun.h"

#include <QDir>
#include <QProcess>
#include <QProcessEnvironment>

RunResult runTool(const QString &program, const QStringList &args, const QString &workDir, int timeoutMs,
                  const QByteArray &stdinData)
{
    RunResult r;
    QProcess p;
    QProcessEnvironment env = QProcessEnvironment::systemEnvironment();
    env.insert(QStringLiteral("LC_ALL"), QStringLiteral("C"));
    env.insert(QStringLiteral("GIT_TERMINAL_PROMPT"), QStringLiteral("0"));
    env.insert(QStringLiteral("GIT_OPTIONAL_LOCKS"), QStringLiteral("0"));
    env.insert(QStringLiteral("GH_PROMPT_DISABLED"), QStringLiteral("1"));
    p.setProcessEnvironment(env);
    if (!workDir.isEmpty())
        p.setWorkingDirectory(workDir);
    p.start(program, args);
    if (!p.waitForStarted(5000))
        return r;
    if (!stdinData.isEmpty())
        p.write(stdinData);
    p.closeWriteChannel();
    if (!p.waitForFinished(timeoutMs)) {
        p.kill();
        p.waitForFinished(2000);
        r.timedOut = true;
        r.out = p.readAllStandardOutput();
        r.err = p.readAllStandardError();
        return r;
    }
    r.out = p.readAllStandardOutput();
    r.err = p.readAllStandardError();
    r.exitCode = p.exitStatus() == QProcess::NormalExit ? p.exitCode() : -1;
    return r;
}

RunResult runGit(const QString &repo, const QStringList &args, int timeoutMs, const QByteArray &stdinData)
{
    QStringList a{QStringLiteral("-C"), repo};
    a += args;
    return runTool(QStringLiteral("git"), a, QString(), timeoutMs, stdinData);
}

QString displayPath(const QString &absPath)
{
    const QString home = QDir::homePath();
    if (absPath == home)
        return QStringLiteral("~");
    if (absPath.startsWith(home + QLatin1Char('/')))
        return QStringLiteral("~") + absPath.mid(home.size());
    return absPath;
}
