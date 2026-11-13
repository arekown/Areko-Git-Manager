import QtQuick

// Draft ".sec": section title in the history column, optional dim count/note.
Item {
    id: s
    property string text
    property string note
    width: parent ? parent.width : 0
    height: 14 + label.implicitHeight + 6

    Text {
        id: label
        x: 20; y: 14
        text: s.text
        color: Theme.teal
        font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 10; font.letterSpacing: 2
    }
    Text {
        anchors.left: label.right; anchors.leftMargin: 10
        anchors.right: parent.right; anchors.rightMargin: 20
        anchors.baseline: label.baseline
        text: s.note
        elide: Text.ElideRight
        color: Theme.dim
        font.family: Theme.mono; font.pixelSize: 10; font.letterSpacing: 0.6
    }
}
