import QtQuick
import QtQuick.Shapes
import "Util.js" as U

// Draft ".tl": whole history in 48 bins, loaded range marked (dashed magenta).
Item {
    id: tl
    property var app
    property var tlData: null          // {from, to, bins}
    property int loaded: 0
    property real loadedFrom: 0        // unix seconds of the oldest loaded version (0 = nothing loaded)
    height: 58

    readonly property var bins: tlData ? tlData.bins : []
    readonly property real peak: {
        let m = 1
        for (const v of bins) m = Math.max(m, v)
        return m
    }
    readonly property real span: tlData ? Math.max(1, tlData.to - tlData.from) : 1
    readonly property real x0: !tlData || !loadedFrom ? 1 : Math.max(0, Math.min(1, (loadedFrom - tlData.from) / span))
    readonly property real bw: bins.length ? width / bins.length : 0

    Item {
        id: chart
        width: parent.width; height: 44
        Rectangle {
            x: tl.x0 * chart.width
            width: chart.width - x; height: 44
            color: U.rgba(Theme.magenta, 0.08)
        }
        Shape {
            x: tl.x0 * chart.width
            width: chart.width - x; height: 44
            ShapePath {
                fillColor: "transparent"
                strokeColor: U.rgba(Theme.magenta, 0.5)
                strokeWidth: 1
                strokeStyle: ShapePath.DashLine
                dashPattern: [3, 3]
                startX: 0.5; startY: 0.5
                PathLine { x: chart.width - tl.x0 * chart.width - 0.5; y: 0.5 }
                PathLine { x: chart.width - tl.x0 * chart.width - 0.5; y: 43.5 }
                PathLine { x: 0.5; y: 43.5 }
                PathLine { x: 0.5; y: 0.5 }
            }
        }
        Repeater {
            model: tl.bins.length
            Rectangle {
                readonly property real v: tl.bins[index] || 0
                visible: v > 0
                x: index * tl.bw + tl.width * 0.0015
                width: Math.max(1, tl.bw - tl.width * 0.003)
                height: v ? Math.max(6, v / tl.peak * 40) : 0
                y: 42 - height
                color: index * tl.bw >= tl.x0 * chart.width - tl.bw ? Theme.cyan : Theme.teal
            }
        }
        Rectangle { y: 42; width: parent.width; height: 1; color: U.rgba(Theme.cyan, 0.3) }
        MouseArea {
            anchors.fill: parent
            hoverEnabled: true
            onPositionChanged: (m) => {
                if (!tl.tlData || !tl.bins.length) return
                const i = Math.max(0, Math.min(tl.bins.length - 1, Math.floor(m.x / Math.max(1, tl.bw))))
                const a = tl.tlData.from + tl.span * i / tl.bins.length
                //: tooltip of a timeline bar: %1 = month, %n = number of versions
                tl.app.tip(qsTr("ab %1: %n Versionen", "", tl.bins[i] || 0).arg(U.monthYear(a)), chart, m.x, m.y)
            }
            onExited: tl.app.tip("")
        }
    }
    Item {
        y: 46
        width: parent.width; height: 12
        Text {
            text: tl.tlData ? U.monthYear(tl.tlData.from) : ""
            color: Theme.dim; font.family: Theme.mono; font.pixelSize: 10
        }
        Text {
            anchors.horizontalCenter: parent.horizontalCenter
            textFormat: Text.StyledText
            //: below the timeline: the whole history is shown, the marked part is loaded (%1 = loaded versions)
            text: qsTr("gesamte Geschichte") + " · <font color=\"#ff2a6d\">" + qsTr("▭ geladen: neueste %1").arg(tl.loaded) + "</font>"
            color: Theme.dim; font.family: Theme.mono; font.pixelSize: 10
        }
        Text {
            anchors.right: parent.right
            text: tl.tlData ? U.monthYear(tl.tlData.to) : ""
            color: Theme.dim; font.family: Theme.mono; font.pixelSize: 10
        }
    }
}
