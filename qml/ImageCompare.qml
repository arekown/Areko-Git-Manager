import QtQuick
import "Util.js" as U

// Draft ".pics": old | new picture side by side (one picture when added or deleted).
Item {
    id: ic
    property string imgOld
    property string imgNew
    readonly property var pics: {
        const p = []
        if (imgOld) p.push({ src: imgOld, lb: qsTr("◀ ALT"), c: Theme.magenta })
        if (imgNew) p.push({ src: imgNew, lb: imgOld ? qsTr("NEU ▶") : qsTr("NEU HINZUGEFÜGT"), c: Theme.ok })
        return p
    }
    readonly property real pw: pics.length > 1 ? (width - 40 - 12) / 2 : width - 40
    implicitHeight: 6 + row.implicitHeight + 16

    Row {
        id: row
        x: 20; y: 6
        spacing: 12
        Repeater {
            model: ic.pics
            Column {
                width: ic.pw
                spacing: 6
                Text {
                    text: modelData.lb
                    color: modelData.c
                    font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 10; font.letterSpacing: 1.8
                }
                Item {
                    width: parent.width
                    height: (img.status === Image.Ready ? img.paintedHeight : 80) + 12
                    Checker { anchors.fill: parent }
                    Rectangle { anchors.fill: parent; color: "transparent"; border.width: 1; border.color: Theme.line }
                    Image {
                        id: img
                        objectName: "pic"
                        x: 6; y: 6
                        width: parent.width - 12
                        height: status === Image.Ready ? Math.min(360, implicitHeight * width / Math.max(1, implicitWidth)) : 80
                        fillMode: Image.PreserveAspectFit
                        asynchronous: true      // gitblob is a QQuickAsyncImageProvider; large images never block the UI
                        cache: false
                        source: modelData.src
                    }
                    Text {
                        anchors.centerIn: parent
                        visible: img.status === Image.Error || img.status === Image.Loading
                        text: img.status === Image.Loading ? qsTr("lädt …") : qsTr("Bild nicht lesbar")
                        color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                    }
                }
            }
        }
    }
}
