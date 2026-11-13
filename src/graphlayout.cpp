#include "graphlayout.h"

#include <QHash>
#include <QVariantMap>
#include <algorithm>

GraphLayout layoutGraph(const QStringList &ids, const QList<QStringList> &parents)
{
    GraphLayout g;
    QHash<QString, int> idx;
    for (int i = 0; i < ids.size(); ++i)
        idx.insert(ids[i], i);
    QStringList lanes;   // commit id expected in each lane, empty = free
    g.laneOf.resize(ids.size());
    int maxLane = 0;
    auto freeLane = [&lanes]() {
        int l = lanes.indexOf(QString());
        return l < 0 ? int(lanes.size()) : l;
    };
    for (int i = 0; i < ids.size(); ++i) {
        int l = lanes.indexOf(ids[i]);
        if (l < 0)
            l = freeLane();
        for (int k = 0; k < lanes.size(); ++k)
            if (k != l && lanes[k] == ids[i])
                lanes[k].clear();
        while (lanes.size() <= l)
            lanes.append(QString());
        g.laneOf[i] = l;
        lanes[l].clear();
        const QStringList &ps = parents.value(i);
        for (int pi = 0; pi < ps.size(); ++pi) {
            int pl = lanes.indexOf(ps[pi]);
            if (pi == 0) {
                // the first parent continues this lane even if another lane already waits for it;
                // the parent later takes the lowest waiting lane, so the main line stays left (like git log --graph)
                if (pl < 0)
                    pl = l;
                lanes[l] = ps[pi];
            } else if (pl < 0) {
                pl = freeLane();
                while (lanes.size() <= pl)
                    lanes.append(QString());
                lanes[pl] = ps[pi];
            }
            GraphEdge e;
            e.from = i;
            e.to = idx.value(ps[pi], -1);
            e.fromLane = l;
            e.toLane = pl;
            e.first = pi == 0;
            g.edges.append(e);
        }
        maxLane = std::max({maxLane, l, int(lanes.size()) - 1});
        while (!lanes.isEmpty() && lanes.last().isEmpty())
            lanes.removeLast();
    }
    for (GraphEdge &e : g.edges)
        if (e.to >= 0)
            e.toLane = g.laneOf[e.to];
    g.maxLane = std::min(maxLane, 7);
    return g;
}

QVariantList edgesToVariant(const GraphLayout &g)
{
    QVariantList out;
    out.reserve(g.edges.size());
    for (const GraphEdge &e : g.edges)
        out.append(QVariantMap{{QStringLiteral("from"), e.from}, {QStringLiteral("to"), e.to},
                               {QStringLiteral("fromLane"), e.fromLane}, {QStringLiteral("toLane"), e.toLane},
                               {QStringLiteral("first"), e.first}});
    return out;
}
