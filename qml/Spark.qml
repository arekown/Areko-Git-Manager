import QtQuick
import "Util.js" as U

// Draft ".spark": versions per day over the last 30 days, [29] = today (magenta outline).
Item {
    id: sp
    property var values: []
    implicitHeight: 16
    readonly property real peak: {
        let m = 1
        for (const v of values) m = Math.max(m, v)
        return m
    }
    readonly property real bw: (width - 29) / 30

    Repeater {
        model: sp.values.length
        Rectangle {
            readonly property real v: sp.values[index] || 0
            x: index * (sp.bw + 1)
            width: sp.bw
            height: Math.max(1, sp.height * (v ? Math.max(18, v / sp.peak * 100) : 8) / 100)
            y: sp.height - height
            color: v ? Theme.cyan : U.rgba(Theme.cyan, 0.18)
            border.width: index === 29 ? 1 : 0
            border.color: U.rgba(Theme.magenta, 0.6)
        }
    }
}
