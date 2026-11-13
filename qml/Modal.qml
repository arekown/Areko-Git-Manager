import QtQuick
import "Util.js" as U

// Small in-window dialog (no system dialog): dimmed window, panel with AREKO corner brackets.
Rectangle {
    id: m
    property string title
    property color accent: Theme.cyan
    default property alias content: body.data
    signal dismissed()

    anchors.fill: parent
    visible: false
    z: 100
    color: U.rgba(Theme.bg, 0.72)

    MouseArea { anchors.fill: parent; hoverEnabled: true; onClicked: m.dismissed() }

    Rectangle {
        id: box
        anchors.centerIn: parent
        width: Math.min(480, m.width - 40)
        height: bc.implicitHeight + 44
        color: Theme.panel
        border.width: 1
        border.color: Theme.lineStrong
        MouseArea { anchors.fill: parent; hoverEnabled: true }
        Rectangle { width: 20; height: 2; color: m.accent }
        Rectangle { width: 2; height: 20; color: m.accent }
        Rectangle { x: box.width - 20; width: 20; height: 2; color: m.accent }
        Rectangle { x: box.width - 2; width: 2; height: 20; color: m.accent }
        Rectangle { y: box.height - 2; width: 20; height: 2; color: Theme.magenta }
        Rectangle { y: box.height - 20; width: 2; height: 20; color: Theme.magenta }
        Rectangle { x: box.width - 20; y: box.height - 2; width: 20; height: 2; color: Theme.magenta }
        Rectangle { x: box.width - 2; y: box.height - 20; width: 2; height: 20; color: Theme.magenta }
        Column {
            id: bc
            x: 22; y: 22
            width: box.width - 44
            spacing: 14
            Text {
                text: m.title
                color: m.accent
                font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 11; font.letterSpacing: 1.76
            }
            Column {
                id: body
                width: parent.width
                spacing: 10
            }
        }
    }
}
