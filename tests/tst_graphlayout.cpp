#include "graphlayout.h"

#include <QtTest>

class TstGraphLayout : public QObject
{
    Q_OBJECT
private slots:
    void linearHistoryStaysOnLaneZero()
    {
        const GraphLayout g = layoutGraph({"c", "b", "a"}, {{"b"}, {"a"}, {}});
        QCOMPARE(g.laneOf, QList<int>({0, 0, 0}));
        QCOMPARE(g.edges.size(), 2);
        QCOMPARE(g.maxLane, 0);
    }
    void mergeOpensSecondLane()
    {
        // m merges f (side branch) into b; both come from a
        const GraphLayout g = layoutGraph({"m", "f", "b", "a"}, {{"b", "f"}, {"a"}, {"a"}, {}});
        QCOMPARE(g.laneOf[0], 0);
        QCOMPARE(g.laneOf[1], 1);   // side branch on its own lane
        QCOMPARE(g.laneOf[2], 0);
        QCOMPARE(g.laneOf[3], 0);
        QCOMPARE(g.maxLane, 1);
    }
    void parentOutsideLoadedRangeRunsToBottom()
    {
        const GraphLayout g = layoutGraph({"b"}, {{"a"}});
        QCOMPARE(g.edges.size(), 1);
        QCOMPARE(g.edges[0].to, -1);
    }
};

QTEST_GUILESS_MAIN(TstGraphLayout)
#include "tst_graphlayout.moc"
