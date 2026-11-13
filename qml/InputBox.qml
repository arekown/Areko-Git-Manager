import QtQuick

// Draft ".search"-style input box (single line, or multi line with multi: true).
Rectangle {
    id: ib
    property alias text: single.text
    property string placeholder
    property bool multi: false
    property string family: Theme.mono
    property int size: 13
    readonly property string value: multi ? area.text : single.text
    signal accepted()
    function clear() { single.text = ""; area.text = "" }
    function setText(t) { if (multi) area.text = t; else single.text = t }

    implicitHeight: multi ? 70 : 34
    color: Theme.bg
    border.width: 1
    border.color: single.activeFocus || area.activeFocus ? Theme.cyan : Theme.line

    TextInput {
        id: single
        visible: !ib.multi
        x: 10; width: parent.width - 20
        anchors.verticalCenter: parent.verticalCenter
        clip: true
        color: Theme.white
        selectionColor: Theme.teal
        font.family: ib.family; font.pixelSize: ib.size; font.letterSpacing: ib.family === Theme.mono ? 0.5 : 0
        onAccepted: ib.accepted()
    }
    Flickable {
        id: fl
        visible: ib.multi
        x: 10; y: 6
        width: parent.width - 20; height: parent.height - 12
        clip: true
        contentWidth: width
        contentHeight: area.implicitHeight
        boundsBehavior: Flickable.StopAtBounds
        TextEdit {
            id: area
            width: fl.width
            wrapMode: TextEdit.Wrap
            color: Theme.white
            selectionColor: Theme.teal
            font.family: ib.family; font.pixelSize: ib.size
            onCursorRectangleChanged: {
                if (cursorRectangle.y < fl.contentY) fl.contentY = cursorRectangle.y
                else if (cursorRectangle.y + cursorRectangle.height > fl.contentY + fl.height)
                    fl.contentY = cursorRectangle.y + cursorRectangle.height - fl.height
            }
        }
    }
    Text {
        x: 10
        y: ib.multi ? 6 : (parent.height - height) / 2
        visible: ib.value === "" && !single.activeFocus && !area.activeFocus
        text: ib.placeholder
        color: Theme.dim
        font.family: ib.family; font.pixelSize: ib.size
    }
    MouseArea {
        anchors.fill: parent
        cursorShape: Qt.IBeamCursor
        acceptedButtons: Qt.NoButton
    }
    TapHandler { onTapped: ib.multi ? area.forceActiveFocus() : single.forceActiveFocus() }
}
