import QtQuick
import "Util.js" as U

// One row of the project column: group title, sub-group (foreign repos), repo card, program card or "nothing found".
Item {
    id: pr
    property var app
    property var row: null
    readonly property string t: row ? row.t : ""
    readonly property var repo: t === "repo" ? row.r : null
    readonly property var prog: t === "prog" ? row.p : null
    readonly property bool isCard: repo !== null || prog !== null
    readonly property bool sel: repo !== null ? (app.selKind === "repo" && app.selPath === repo.path)
                                : prog !== null ? (app.selKind === "prog" && app.selProg === prog.name) : false

    objectName: repo ? "proj_" + repo.name : prog ? "prog_" + prog.name : (t === "sub" ? "sub_" + row.l : "")
    width: parent ? parent.width : 0
    height: t === "grp" ? 14 + 12 + 6 : t === "sub" ? 10 + 20 + 4 : t === "empty" ? 100 : cardCol.implicitHeight + 20

    // ---------- group title ".grp" ----------
    Item {
        anchors.fill: parent
        visible: pr.t === "grp"
        Row {
            x: 16; y: 14
            spacing: 8
            Text {
                visible: !!pr.row && pr.row.tog === true
                text: pr.row && pr.row.open ? "▼" : "▶"
                color: Theme.cyan
                font.pixelSize: 9
                width: 10
                anchors.verticalCenter: parent.verticalCenter
            }
            Text {
                text: (pr.row ? pr.row.l || "" : "") + "  " + (pr.row ? pr.row.n || 0 : 0)
                color: grpMa.containsMouse && pr.row && pr.row.tog ? Theme.text : Theme.dim
                font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 10; font.letterSpacing: 2
            }
        }
        MouseArea {
            id: grpMa
            anchors.fill: parent
            enabled: pr.t === "grp" && pr.row.tog === true
            hoverEnabled: true
            cursorShape: Qt.PointingHandCursor
            onClicked: pr.app.foreignOpen = !pr.app.foreignOpen
        }
    }

    // ---------- foreign sub-group ".subgrp" ----------
    Item {
        anchors.fill: parent
        visible: pr.t === "sub"
        Text {
            id: subLabel
            x: 26; y: 10
            height: 20
            // never run under the update button: shorten the button first, then elide the label
            width: (updAll.visible ? updAll.x - 8 : parent.width - 16) - x
            elide: Text.ElideRight
            verticalAlignment: Text.AlignVCenter
            text: (pr.row ? pr.row.l || "" : "") + "  " + (pr.row ? pr.row.n || 0 : 0)
            color: Theme.dim
            font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 9; font.letterSpacing: 1.5
        }
        Btn {
            id: updAll
            objectName: "updAll"
            readonly property var paths: pr.t === "sub" ? pr.row.upd : []
            visible: paths.length > 0
            anchors.right: parent.right; anchors.rightMargin: 16
            y: 10
            height: 20
            kind: "ok"
            fontSize: 9
            // full label only if it fits next to the group name (a long sub-group name needs the short form)
            readonly property bool roomy: parent.width - 16 - 26 - subLabel.implicitWidth - 8 >= 190
            //: %1 = number of repos with news in this sub-group (long and short form)
            text: (roomy ? qsTr("↓ ALLE AKTUALISIEREN (%1)") : qsTr("↓ ALLE (%1)")).arg(paths.length)
            running: paths.some(p => pr.app.isRunning(p, "update"))
            onClicked: pr.app.doUpdateAll(paths)
        }
    }

    // ---------- empty ----------
    Text {
        visible: pr.t === "empty"
        anchors.fill: parent
        horizontalAlignment: Text.AlignHCenter
        verticalAlignment: Text.AlignVCenter
        text: qsTr("Kein Projekt gefunden.")
        color: Theme.dim
        font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 16
    }

    // ---------- card ".proj" ----------
    Rectangle {
        anchors.fill: parent
        visible: pr.isCard
        color: pr.sel ? U.rgba(Theme.cyan, 0.07) : cardMa.containsMouse ? Theme.rowHover : "transparent"
        Rectangle {
            visible: pr.sel
            x: 0; y: 6; width: 3; height: parent.height - 12
            color: Theme.magenta
        }
        Rectangle {
            anchors.bottom: parent.bottom
            width: parent.width; height: 1
            color: U.rgba(Theme.cyan, 0.06)
        }
    }
    Column {
        id: cardCol
        visible: pr.isCard
        x: pr.repo && pr.row.sub ? 28 : 18
        y: 10
        width: pr.width - x - 16
        Item {
            width: parent.width
            height: nm.implicitHeight
            Text {
                id: nm
                width: parent.width - when.implicitWidth - 8
                elide: Text.ElideRight
                text: pr.repo ? pr.repo.name : pr.prog ? pr.app.progTitle(pr.prog) : ""
                color: Theme.white
                font.family: Theme.num; font.weight: Font.DemiBold; font.pixelSize: 17
            }
            Text {
                id: when
                anchors.right: parent.right
                anchors.baseline: nm.baseline
                text: pr.repo ? U.rel(pr.repo.lastDate, pr.app.now) : pr.prog ? (pr.prog.version || "") : ""
                color: Theme.dim
                font.family: Theme.mono; font.pixelSize: 11
            }
        }
        Text {
            width: parent.width
            topPadding: 1; bottomPadding: 6
            elide: Text.ElideLeft
            text: pr.repo ? (pr.repo.display || pr.repo.path) : pr.prog ? (pr.prog.display || pr.prog.file || "") : ""
            color: Theme.dim
            font.family: Theme.mono; font.pixelSize: 11
        }
        Flow {
            width: parent.width
            spacing: 5
            Repeater {
                model: pr.badges()
                Badge {
                    text: modelData.t
                    tone: modelData.c
                    edge: modelData.e
                    mono: modelData.m === true
                }
            }
        }
        Item { width: 1; height: pr.repo ? 6 : 0 }
        Spark {
            visible: pr.repo !== null
            width: parent.width
            height: visible ? 16 : 0
            values: pr.repo ? (pr.repo.activity || []) : []
        }
    }
    MouseArea {
        id: cardMa
        anchors.fill: parent
        enabled: pr.isCard
        hoverEnabled: true
        cursorShape: Qt.PointingHandCursor
        onClicked: pr.repo ? pr.app.selectRepo(pr.repo.path) : pr.app.selectProg(pr.prog.name)
    }

    function badges() {
        const b = []
        if (repo) {
            const r = repo, n = app.newCount(r)
            if (r.group === "eigen")
                b.push(!r.remote ? { t: qsTr("⚠ NUR LOKAL"), c: Theme.yellow, e: 0.45 }
                                 : { t: "☁ GITHUB" + (r.visibility === "private" ? " · " + qsTr("PRIVAT") : r.visibility === "public" ? " · " + qsTr("ÖFFENTLICH") : ""),
                                     c: Theme.cyan, e: 0.4 })
            //: badge: new versions upstream
            if (n > 0) b.push({ t: "↓ " + qsTr("%n NEU", "", n), c: Theme.ok, e: 0.45 })
            //: badge: files with uncommitted changes
            if (r.dirty > 0) b.push({ t: "● " + qsTr("%n OFFEN", "", r.dirty), c: Theme.magenta, e: 0.45 })
            if (r.ahead > 0) b.push({ t: "↑ " + r.ahead, c: Theme.text, e: 0.25 })
            if ((r.worktrees || []).length > 1) b.push({ t: "⧉ " + (r.worktrees.length - 1), c: Theme.text, e: 0.25 })
            //: badge, short for "versions" (commits); %1 = formatted number
            b.push({ t: qsTr("%1 Vers.", "", r.count).arg(U.num(r.count)), c: Theme.dim, e: 0.35, m: true })
        } else if (prog) {
            b.push(prog.outdated ? { t: "↑ " + qsTr("%1 VERFÜGBAR", "a newer program version").arg(prog.latest || ""), c: Theme.ok, e: 0.45 }
                                 : { t: qsTr("✓ AKTUELL", "program is up to date"), c: Theme.cyan, e: 0.4 })
            b.push({ t: "AppImage", c: Theme.dim, e: 0.35, m: true })
        }
        return b
    }
}
