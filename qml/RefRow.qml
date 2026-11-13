import QtQuick

// Draft ".ref": branch / worktree / remote branch / tag line.
Item {
    id: rr
    property string icon
    property color iconColor: Theme.cyan
    property string name
    property bool current: false
    property string sub
    property string date
    property string hash
    property bool deletable: false          // local branch, worktree or tag: ✕ on hover
    signal deleteClicked()
    height: 34
    readonly property bool hovered: ma.containsMouse || delMa.containsMouse

    Rectangle { anchors.fill: parent; color: rr.hovered ? Theme.rowHover : "transparent" }
    MouseArea { id: ma; anchors.fill: parent; hoverEnabled: true }

    Text {
        x: 20; width: 22
        anchors.verticalCenter: parent.verticalCenter
        horizontalAlignment: Text.AlignHCenter
        text: rr.icon
        color: rr.iconColor
        font.family: Theme.mono; font.pixelSize: 14
    }
    Item {
        id: nameBox
        x: 52
        width: Math.max(120, Math.min(260, nm.implicitWidth + (cur.visible ? cur.implicitWidth + 6 : 0)))
        height: parent.height
        Text {
            id: nm
            width: Math.min(implicitWidth, nameBox.width - (cur.visible ? cur.implicitWidth + 6 : 0))
            anchors.verticalCenter: parent.verticalCenter
            elide: Text.ElideRight
            text: rr.name
            color: Theme.white
            font.family: Theme.num; font.weight: Font.DemiBold; font.pixelSize: 15
        }
        Text {
            id: cur
            visible: rr.current
            anchors.left: nm.right; anchors.leftMargin: 6
            anchors.verticalCenter: parent.verticalCenter
            //: marker next to the branch that is checked out
            text: qsTr("AKTIV")
            color: Theme.magenta
            font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 9; font.letterSpacing: 1.26
        }
    }
    Text {
        x: nameBox.x + nameBox.width + 10
        width: dt.x - x - 10
        anchors.verticalCenter: parent.verticalCenter
        elide: Text.ElideRight
        text: rr.sub
        color: Theme.dim
        font.family: Theme.num; font.pixelSize: 14
    }
    Text {
        id: dt
        x: hs.x - implicitWidth - 10
        anchors.verticalCenter: parent.verticalCenter
        text: rr.date
        color: Theme.dim
        font.family: Theme.mono; font.pixelSize: 11
    }
    Text {
        id: hs
        x: rr.width - 20 - implicitWidth - (rr.deletable ? 26 : 0)
        anchors.verticalCenter: parent.verticalCenter
        text: rr.hash
        color: Theme.teal
        font.family: Theme.mono; font.pixelSize: 11
    }
    Text {
        objectName: "refDelete"
        visible: rr.deletable && rr.hovered
        x: rr.width - 14 - 22
        width: 22
        anchors.verticalCenter: parent.verticalCenter
        horizontalAlignment: Text.AlignHCenter
        text: "✕"
        color: delMa.containsMouse ? Theme.magenta : Theme.dim
        font.pixelSize: 14
        MouseArea {
            id: delMa
            anchors.fill: parent
            anchors.margins: -5
            hoverEnabled: true
            cursorShape: Qt.PointingHandCursor
            onClicked: rr.deleteClicked()
        }
    }
}
