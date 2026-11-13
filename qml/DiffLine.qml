import QtQuick
import "Util.js" as U

// Draft ".dl": one diff line (hunk header teal, added green, removed magenta, note dim italic).
Rectangle {
    id: dl
    property string line
    readonly property string cls: line.indexOf("@@") === 0 ? "hk" : line.charAt(0) === "+" ? "ad" : line.charAt(0) === "-" ? "rm"
                                  : line.charAt(0) === "…" ? "nt" : ""
    implicitWidth: t.implicitWidth + 34 + 3
    height: (cls === "hk" ? 6 : 0) + 19
    color: cls === "ad" ? U.rgba(Theme.ok, 0.07) : cls === "rm" ? U.rgba(Theme.magenta, 0.08) : "transparent"
    Rectangle {
        width: 3; height: parent.height
        color: dl.cls === "ad" ? Theme.ok : dl.cls === "rm" ? Theme.magenta : "transparent"
    }
    Text {
        id: t
        x: 17
        y: dl.cls === "hk" ? 6 : 0
        height: 19
        verticalAlignment: Text.AlignVCenter
        text: dl.line
        textFormat: Text.PlainText
        color: dl.cls === "ad" ? "#c9ffe9" : dl.cls === "rm" ? "#ffd0dd" : dl.cls === "hk" ? Theme.teal : dl.cls === "nt" ? Theme.dim : Theme.text
        font.family: Theme.mono; font.pixelSize: 12; font.italic: dl.cls === "nt"
    }
}
