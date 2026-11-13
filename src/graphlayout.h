#pragma once
// Lane layout for the version graph (like `git log --graph`), ported from the approved HTML draft v2.
#include <QList>
#include <QString>
#include <QStringList>
#include <QVariantList>

struct GraphEdge {
    int from = 0;        // row of the child commit
    int to = -1;         // row of the parent, -1 = parent not loaded (line runs to the bottom)
    int fromLane = 0;
    int toLane = 0;
    bool first = true;   // first parent (branch line) vs. merged second parent
};

struct GraphLayout {
    QList<int> laneOf;   // lane per row
    QList<GraphEdge> edges;
    int maxLane = 0;     // capped at 7 (lanes >= 7 are drawn on lane 7)
};

// ids[i] = full hash of row i (newest first, --date-order), parents[i] = its parent hashes.
GraphLayout layoutGraph(const QStringList &ids, const QList<QStringList> &parents);

// QML form: [{from, to, fromLane, toLane, first}]
QVariantList edgesToVariant(const GraphLayout &g);
