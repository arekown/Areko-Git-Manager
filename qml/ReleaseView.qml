import QtQuick
import QtQuick.Controls.Basic
import "Util.js" as U

// Column 3 for one program release: tag, date, notes.
Item {
    id: rlv
    property var app
    property var prog: null
    property var release: null

    Item {
        id: head
        width: parent.width
        height: hc.implicitHeight + 28
        Rectangle { anchors.bottom: parent.bottom; width: parent.width; height: 1; color: Theme.line }
        Column {
            id: hc
            x: 20; y: 16
            width: parent.width - 40
            Item {
                width: parent.width
                height: 30
                Text {
                    width: parent.width - 40
                    elide: Text.ElideRight
                    text: (rlv.prog ? rlv.prog.name : "") + " " + (rlv.release ? rlv.release.tag : "")
                    color: Theme.white
                    font.family: Theme.num; font.weight: Font.DemiBold; font.pixelSize: 19
                }
                CloseX { anchors.right: parent.right; onClicked: rlv.app.closeDetail() }
            }
            Item { width: 1; height: 6 }
            Flow {
                width: parent.width
                spacing: 16
                Text { text: rlv.release ? U.full(rlv.release.date) : ""; color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12 }
                Text { text: rlv.prog ? "github.com/" + (rlv.prog.repo || "") : ""; color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12 }
            }
        }
    }
    Flickable {
        id: flick
        objectName: "releaseNotes"
        anchors.top: head.bottom
        anchors.bottom: parent.bottom
        width: parent.width
        clip: true
        contentWidth: width
        contentHeight: notes.implicitHeight + 34
        boundsBehavior: Flickable.StopAtBounds
        ScrollBar.vertical: ScrollBar { }
        Column {
            id: notes
            x: 20; y: 14
            width: flick.width - 40
            Repeater {
                model: U.notes(rlv.release ? rlv.release.body : "")
                Text {
                    width: notes.width
                    wrapMode: Text.Wrap
                    textFormat: Text.PlainText
                    topPadding: modelData.k === "h" ? 12 : 0
                    bottomPadding: modelData.k === "h" ? 4 : 0
                    leftPadding: modelData.k === "li" ? 18 : 0
                    text: modelData.k === "li" ? "•  " + modelData.t : modelData.t
                    color: modelData.k === "h" ? Theme.teal : Theme.text
                    font.family: modelData.k === "h" ? Theme.head : Theme.num
                    font.weight: modelData.k === "h" ? Font.DemiBold : Font.Medium
                    font.pixelSize: modelData.k === "h" ? 11 : 14
                    font.letterSpacing: modelData.k === "h" ? 1.76 : 0
                    lineHeightMode: Text.ProportionalHeight
                    lineHeight: modelData.k === "h" ? 1.0 : 1.2
                }
            }
        }
    }
}
