import QtQuick
import "Util.js" as U

// Draft ".bdg" (project badges) and ".rfc" (ref chips in the history, small: true).
Rectangle {
    id: bd
    property string text
    property color tone: Theme.cyan
    property real edge: 0.4
    property bool mono: false
    property bool small: false

    implicitHeight: small ? 17 : 19
    implicitWidth: t.implicitWidth + (small ? 12 : 14)
    color: "transparent"
    border.width: 1
    border.color: U.rgba(tone, edge)

    Text {
        id: t
        anchors.centerIn: parent
        text: bd.text
        color: bd.tone
        font.family: bd.mono ? Theme.mono : Theme.head
        font.weight: bd.mono ? Font.Normal : Font.DemiBold
        font.pixelSize: bd.mono ? 11 : 9
        font.letterSpacing: bd.mono ? 0.44 : (bd.small ? 0.9 : 1.14)
    }
}
