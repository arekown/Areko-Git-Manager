import QtQuick
import QtQuick.Controls.Basic
import "Util.js" as U

// Column 2 for a program (Craft AppImage): installed vs. latest, update / start / folder, releases.
Item {
    id: pv
    property var app
    property var prog: null
    readonly property var releases: prog ? (prog.releases || []) : []
    readonly property string latest: prog ? (prog.latest || (releases.length ? releases[0].tag : prog.version) || "") : ""
    readonly property bool outdated: prog !== null && prog.outdated === true
    readonly property int newerCount: prog ? releases.filter(x => U.newer(x.tag, prog.version)).length : 0
    readonly property string fileDir: prog ? String(prog.file || "").replace(/\/[^\/]*$/, "") : ""

    Item {
        id: head
        width: parent.width
        height: hc.implicitHeight + 30
        clip: true
        Repeater {
            model: Math.ceil(head.height / 3)
            Rectangle { y: index * 3; width: head.width; height: 1; color: U.rgba(Theme.cyan, 0.02) }
        }
        Rectangle { anchors.bottom: parent.bottom; width: parent.width; height: 1; color: Theme.line }
        Column {
            id: hc
            x: 20; y: 16
            width: parent.width - 40
            Text {
                width: parent.width
                elide: Text.ElideRight
                text: pv.prog ? pv.app.progTitle(pv.prog) : ""
                color: Theme.white
                font.family: Theme.head; font.weight: Font.Bold; font.pixelSize: 20; font.letterSpacing: 2.4
            }
            Item { width: 1; height: 8 }
            Flow {
                width: parent.width
                spacing: 18
                Text { text: pv.prog ? (pv.prog.display || pv.prog.file || "") : ""; color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12 }
                Text {
                    textFormat: Text.StyledText
                    //: %1 = installed version
                    text: qsTr("installiert %1").arg("<font color=\"#cfeef2\">" + U.esc(pv.prog ? pv.prog.version : "") + "</font>")
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
                Text {
                    textFormat: Text.StyledText
                    //: %1 = newest released version
                    text: qsTr("neueste %1").arg("<font color=\"#cfeef2\">" + U.esc(pv.latest) + "</font>")
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
                Text {
                    visible: pv.prog !== null && !!pv.prog.repo
                    textFormat: Text.StyledText
                    text: "☁ <font color=\"#05d9e8\">github.com/" + U.esc(pv.prog ? pv.prog.repo || "" : "") + "</font>"
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                    MouseArea {
                        anchors.fill: parent
                        cursorShape: Qt.PointingHandCursor
                        onClicked: Desktop.openUrl("https://github.com/" + pv.prog.repo + "/releases")
                    }
                }
            }
            Item { width: 1; height: 12 }
            Flow {
                width: parent.width
                spacing: 6
                Btn {
                    objectName: "btnProgUpdate"
                    kind: pv.outdated ? "ok" : ""
                    enabled: pv.outdated
                    text: pv.outdated ? qsTr("↑ Auf %1 aktualisieren").arg(pv.latest) : qsTr("✓ Aktuell", "program is up to date")
                    running: pv.prog !== null && pv.app.isRunning(pv.prog.name, "program")
                    onClicked: pv.app.doUpdateProgram(pv.prog)
                }
                Btn {
                    objectName: "btnProgStart"
                    text: qsTr("Starten")
                    onClicked: Updates.launchProgram(pv.prog.name)
                }
                //: button: opens the folder in the file manager
                Btn { text: qsTr("Ordner"); onClicked: Desktop.openFolder(pv.fileDir) }
                Btn {
                    objectName: "btnDeleteProgram"
                    kind: "del"
                    enabled: pv.prog !== null && (!pv.app.isBusy(pv.prog.name) || running)
                    text: qsTr("Löschen")
                    running: pv.prog !== null && pv.app.isRunning(pv.prog.name, "deleteprogram")
                    onClicked: pv.app.askDeleteProgram(pv.prog)
                }
            }
            Text {
                visible: text !== "" && pv.prog !== null && pv.app.isBusy(pv.prog.name)
                topPadding: 8
                text: pv.prog ? (pv.app.progress[pv.prog.name] || "") : ""
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
        }
    }

    Flickable {
        id: flick
        anchors.top: head.bottom
        anchors.bottom: parent.bottom
        width: parent.width
        clip: true
        contentWidth: width
        contentHeight: body.implicitHeight
        boundsBehavior: Flickable.StopAtBounds
        ScrollBar.vertical: ScrollBar { }
        Column {
            id: body
            width: flick.width
            Item {
                visible: pv.outdated
                width: parent.width
                height: 10 + box.height + 4
                Rectangle {
                    id: box
                    x: 20; y: 10
                    width: parent.width - 40
                    height: nb.implicitHeight + 20
                    color: U.rgba(Theme.ok, 0.04)
                    border.width: 1
                    border.color: U.rgba(Theme.ok, 0.35)
                    Text {
                        id: nb
                        x: 12; y: 10
                        width: parent.width - 24
                        wrapMode: Text.Wrap
                        textFormat: Text.StyledText
                        text: "<font color=\"#00ff9f\"><b>" + qsTr("%n neuere Versionen", "", pv.newerCount) + "</b></font> "
                              //: %1 = installed version
                              + qsTr("seit deiner %1").arg(U.esc(pv.prog ? pv.prog.version : ""))
                              + " · " + qsTr("Startmenü-Einträge werden beim Update angepasst")
                        color: Theme.text; font.family: Theme.mono; font.pixelSize: 13
                    }
                }
            }
            SecHead { text: qsTr("VERSIONEN (RELEASES)"); note: String(pv.releases.length) }
            Repeater {
                model: pv.releases
                Item {
                    id: rel
                    readonly property bool inst: pv.prog !== null && U.sameVer(modelData.tag, pv.prog.version)
                    readonly property bool nw: pv.prog !== null && U.newer(modelData.tag, pv.prog.version)
                    readonly property bool sel: pv.app.detailMode === "release" && pv.app.selRelease === index
                    objectName: "rel_" + index
                    width: body.width
                    height: 40
                    Rectangle {
                        anchors.fill: parent
                        color: rel.sel ? U.rgba(Theme.magenta, 0.08) : relMa.containsMouse ? Theme.rowHover : "transparent"
                        Rectangle { visible: rel.sel; width: 3; height: parent.height; color: Theme.magenta }
                    }
                    Text { x: 20; width: 22; anchors.verticalCenter: parent.verticalCenter; horizontalAlignment: Text.AlignHCenter; text: "◆"; color: Theme.yellow; font.pixelSize: 13 }
                    Text {
                        x: 52; width: 110
                        anchors.verticalCenter: parent.verticalCenter
                        elide: Text.ElideRight
                        text: modelData.tag
                        color: Theme.white; font.family: Theme.num; font.weight: Font.DemiBold; font.pixelSize: 16
                    }
                    Text {
                        x: 172
                        anchors.verticalCenter: parent.verticalCenter
                        text: U.full(modelData.date)
                        color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                    }
                    Text {
                        anchors.right: parent.right; anchors.rightMargin: 20
                        anchors.verticalCenter: parent.verticalCenter
                        //: release markers: the installed one / newer than the installed one
                        text: rel.inst ? qsTr("INSTALLIERT") : rel.nw ? qsTr("NEU") : ""
                        color: rel.inst ? Theme.cyan : Theme.ok
                        font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 9; font.letterSpacing: 1.26
                    }
                    MouseArea {
                        id: relMa
                        anchors.fill: parent
                        hoverEnabled: true
                        cursorShape: Qt.PointingHandCursor
                        onClicked: pv.app.selectRelease(index)
                    }
                }
            }
            MoreText {
                visible: pv.prog !== null && pv.releases.length > 0 && !pv.releases.some(x => U.sameVer(x.tag, pv.prog.version))
                //: %1 = installed version, %n = number of listed releases
                text: qsTr("Deine Version %1 ist älter als die letzten %n Releases.", "", pv.releases.length).arg(pv.prog ? pv.prog.version : "")
            }
        }
    }
}
