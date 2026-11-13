import QtQuick
import QtQuick.Controls.Basic
import "Util.js" as U

// Column 1: projects (own, foreign by sub-group, programs) and the scanned folders.
Item {
    id: pc
    property var app
    signal addRoot()

    function rows() {
        const repos = app.visibleRepos(), progs = app.visibleProgs(), out = []
        const own = repos.filter(r => r.group === "eigen"), fr = repos.filter(r => r.group === "fremd")
        if (own.length) {
            out.push({ t: "grp", l: qsTr("EIGENE PROJEKTE"), n: own.length })
            for (const r of own) out.push({ t: "repo", r: r, sub: false })
        }
        if (fr.length) {
            const open = app.foreignOpen || app.filter !== "all" || app.query !== ""
            out.push({ t: "grp", l: qsTr("FREMDE REPOS"), n: fr.length, tog: true, open: open })
            if (open) {
                const subs = []
                for (const r of fr) if (subs.indexOf(r.sub) < 0) subs.push(r.sub)
                for (const s of subs) {
                    const items = fr.filter(r => r.sub === s)
                    out.push({ t: "sub", l: (s && s !== "Sonstige" ? s : qsTr("Sonstige", "foreign repos without a sub-group")).toUpperCase(), n: items.length,
                               upd: items.filter(r => app.newCount(r) > 0).map(r => r.path) })
                    for (const r of items) out.push({ t: "repo", r: r, sub: true })
                }
            }
        }
        if (progs.length) {
            out.push({ t: "grp", l: qsTr("PROGRAMME"), n: progs.length })
            for (const p of progs) out.push({ t: "prog", p: p })
        }
        if (!out.length) out.push({ t: "empty" })
        return out
    }
    readonly property var rowList: rows()
    readonly property int shown: rowList.filter(r => r.t === "repo" || r.t === "prog").length

    function tilde(p) {
        const h = Desktop.homePath()
        return p.indexOf(h) === 0 ? "~" + p.slice(h.length) : p
    }

    // ".colhead"
    Item {
        id: colhead
        width: parent.width; height: 40
        Text {
            id: ch
            x: 16; anchors.verticalCenter: parent.verticalCenter
            text: qsTr("PROJEKTE")
            color: Theme.teal
            font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 10; font.letterSpacing: 2
        }
        Text {
            anchors.left: ch.right; anchors.leftMargin: 10; anchors.baseline: ch.baseline
            text: pc.shown
            color: Theme.dim
            font.family: Theme.mono; font.pixelSize: 10; font.letterSpacing: 0.6
        }
        Rectangle { anchors.bottom: parent.bottom; width: parent.width; height: 1; color: Theme.line }
    }

    Flickable {
        id: flick
        objectName: "projectsFlick"
        anchors.top: colhead.bottom
        anchors.bottom: rootsBox.top
        width: parent.width
        clip: true
        contentWidth: width
        contentHeight: list.implicitHeight
        boundsBehavior: Flickable.StopAtBounds
        ScrollBar.vertical: ScrollBar { }
        Column {
            id: list
            width: flick.width
            Repeater {
                model: pc.rowList
                ProjRow {
                    app: pc.app
                    row: modelData
                }
            }
        }
    }

    // ".roots"
    Item {
        id: rootsBox
        anchors.bottom: parent.bottom
        width: parent.width
        height: rc.implicitHeight + 22
        Rectangle { width: parent.width; height: 1; color: Theme.line }
        Column {
            id: rc
            x: 16; y: 10
            width: parent.width - 32
            Text {
                text: qsTr("DURCHSUCHTE ORDNER")
                bottomPadding: 3
                color: Theme.teal
                font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 9; font.letterSpacing: 1.7
            }
            Flow {
                width: parent.width
                Repeater {
                    model: RepoStore.roots
                    Row {
                        height: 18
                        Text {
                            text: pc.tilde(modelData)
                            color: Theme.dim
                            font.family: Theme.mono; font.pixelSize: 11
                            anchors.verticalCenter: parent.verticalCenter
                        }
                        Text {
                            objectName: "rootRemove"
                            text: " ✕"
                            color: rmMa.containsMouse ? Theme.magenta : Theme.dim
                            font.family: Theme.mono; font.pixelSize: 11
                            anchors.verticalCenter: parent.verticalCenter
                            MouseArea {
                                id: rmMa
                                anchors.fill: parent
                                hoverEnabled: true
                                cursorShape: Qt.PointingHandCursor
                                onClicked: pc.app.setRoots(RepoStore.roots.filter(x => x !== modelData))
                            }
                        }
                        Text {
                            text: index < RepoStore.roots.length - 1 ? " · " : ""
                            color: Theme.dim
                            font.family: Theme.mono; font.pixelSize: 11
                            anchors.verticalCenter: parent.verticalCenter
                        }
                    }
                }
            }
            Text {
                objectName: "rootAdd"
                text: qsTr("+ Ordner hinzufügen")
                topPadding: 4
                color: addMa.containsMouse ? Theme.white : Theme.cyan
                font.family: Theme.mono; font.pixelSize: 11
                MouseArea {
                    id: addMa
                    anchors.fill: parent
                    hoverEnabled: true
                    cursorShape: Qt.PointingHandCursor
                    onClicked: pc.addRoot()
                }
            }
        }
    }
}
