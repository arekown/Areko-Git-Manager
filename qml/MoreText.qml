import QtQuick

// Draft ".more": dim hint line under a list.
Text {
    width: parent ? parent.width : 0
    leftPadding: 20; rightPadding: 20; topPadding: 12; bottomPadding: 18
    wrapMode: Text.Wrap
    color: Theme.dim
    font.family: Theme.mono; font.pixelSize: 12
}
