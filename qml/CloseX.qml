import QtQuick
import "Util.js" as U

// Draft ".x": close button of column 3.
Rectangle {
    id: cx
    signal clicked()
    objectName: "closeDetail"
    width: 30; height: 30
    color: ma.containsMouse ? U.rgba(Theme.magenta, 0.1) : "transparent"
    Text {
        anchors.centerIn: parent
        text: "✕"
        color: ma.containsMouse ? Theme.magenta : Theme.dim
        font.pixelSize: 18
    }
    MouseArea {
        id: ma
        anchors.fill: parent
        hoverEnabled: true
        cursorShape: Qt.PointingHandCursor
        onClicked: cx.clicked()
    }
}
