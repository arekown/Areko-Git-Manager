import QtQuick
import "Util.js" as U

// Draft ".tmap": changed files as tiles sized by changed lines, coloured by top-level folder.
Item {
    id: tm
    property var app
    property var files: []
    property int selIdx: -1
    signal picked(int i)

    readonly property var folders: {
        const f = []
        for (const x of files) { const t = U.topFolder(x.name); if (f.indexOf(t) < 0) f.push(t) }
        return f
    }
    readonly property var rects: {
        const items = files.map((f, i) => ({ i: i, v: f.add < 0 ? 30 : Math.max(1, f.add + f.rem) }))
        items.sort((a, b) => b.v - a.v)
        return U.squarify(items, 0, 0, 1000, 250)
    }
    implicitHeight: 250 + 10 + legend.implicitHeight + 10

    Rectangle {
        id: map
        objectName: "treemap"
        x: 20
        width: tm.width - 40
        height: 250
        color: Theme.bg
        Repeater {
            model: tm.rects
            Rectangle {
                id: tile
                readonly property var f: tm.files[modelData.i] || ({ name: "", add: 0, rem: 0 })
                readonly property bool big: modelData.w > 90 && modelData.h > 34
                x: modelData.x / 1000 * map.width
                y: modelData.y / 250 * map.height
                width: modelData.w / 1000 * map.width
                height: modelData.h / 250 * map.height
                clip: true
                color: Theme.folders[Math.max(0, tm.folders.indexOf(U.topFolder(f.name))) % Theme.folders.length]
                border.width: 1
                border.color: Theme.bg2
                z: tm.selIdx === modelData.i ? 2 : 0
                Rectangle { anchors.fill: parent; color: "#ffffff"; opacity: tileMa.containsMouse ? 0.2 : 0 }
                Rectangle {
                    visible: tm.selIdx === modelData.i
                    anchors.fill: parent
                    color: "transparent"
                    border.width: 2
                    border.color: "#ffffff"
                }
                Column {
                    visible: tile.big
                    x: 5; y: 3
                    width: parent.width - 10
                    Text {
                        width: parent.width
                        elide: Text.ElideRight
                        text: tile.f.name.split("/").pop()
                        color: "#06080f"
                        font.family: Theme.num; font.weight: Font.DemiBold; font.pixelSize: 12
                    }
                    Text {
                        //: binary file, no line counts
                        text: tile.f.add < 0 ? qsTr("binär") : "+" + tile.f.add + " −" + tile.f.rem
                        color: Qt.rgba(6 / 255, 8 / 255, 15 / 255, 0.85)
                        font.family: Theme.mono; font.pixelSize: 11
                    }
                }
                MouseArea {
                    id: tileMa
                    anchors.fill: parent
                    hoverEnabled: true
                    cursorShape: Qt.PointingHandCursor
                    onClicked: tm.picked(modelData.i)
                    onPositionChanged: (m) => tm.app.tip(tile.f.name + " (+" + (tile.f.add < 0 ? "?" : tile.f.add) + " −" + (tile.f.rem < 0 ? "?" : tile.f.rem) + ")", tile, m.x, m.y)
                    onExited: tm.app.tip("")
                }
            }
        }
    }
    Flow {
        id: legend
        x: 20; y: 260
        width: tm.width - 40
        spacing: 12
        Repeater {
            model: tm.folders
            Row {
                spacing: 5
                Rectangle { width: 9; height: 9; anchors.verticalCenter: parent.verticalCenter; color: Theme.folders[index % Theme.folders.length] }
                Text { text: modelData; color: Theme.dim; font.family: Theme.mono; font.pixelSize: 11 }
            }
        }
    }
}
