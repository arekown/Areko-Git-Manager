import QtQuick
import QtQuick.Controls.Basic
import "Util.js" as U

// Column 3 commit view: uncommitted files with stage boxes, hunks of the chosen file (stage / unstage each),
// discard per file (asks first), subject + details, Commit and Commit & Push.
Item {
    id: wv
    property var app
    property var repo: null
    readonly property string path: repo ? repo.path : ""
    property var tree: null
    property var files: []
    property string selFile: ""
    property var hunks: []
    property bool hunksReady: false
    property bool committing: false
    readonly property var selEntry: files.find(f => f.name === selFile) || null
    readonly property int stagedCount: files.filter(f => f.staged > 0).length
    readonly property bool busy: app.isBusy(path)
    readonly property bool hasRemote: repo !== null && !!repo.remote

    onPathChanged: reload()
    Component.onCompleted: reload()

    function reload() {
        tree = null; files = []; hunks = []; hunksReady = false; selFile = ""
        if (path) GitActions.loadWorkingTree(path)
    }
    function pickFile(name) {
        selFile = name
        hunks = []; hunksReady = false
        if (name) GitActions.loadWorkingDiff(path, name)
    }
    function setStaged(name, s) {
        const i = files.findIndex(f => f.name === name)
        if (i < 0 || files[i].staged === s) return
        const copy = files.slice()
        copy[i] = Object.assign({}, copy[i], { staged: s })
        files = copy
    }
    function commit(push) {
        const s = subjectBox.value.trim()
        if (!s) return
        committing = true
        app.doCommit(repo, s, bodyBox.value.trim(), push)
    }

    Connections {
        target: GitActions
        function onWorkingTreeLoaded(path, tree) {
            if (path !== wv.path) return
            wv.tree = tree
            wv.files = tree.files || []
            if (wv.selFile && !wv.files.some(f => f.name === wv.selFile)) wv.pickFile("")
            if (!wv.selFile && wv.files.length) wv.pickFile(wv.files[0].name)
            else if (wv.selFile) GitActions.loadWorkingDiff(wv.path, wv.selFile)
        }
        function onWorkingDiffLoaded(path, file, hunks) {
            if (path !== wv.path || file !== wv.selFile) return
            wv.hunks = hunks
            wv.hunksReady = true
            if (hunks.length) {         // keep the box state in step with the hunks
                const st = hunks.filter(h => h.staged).length
                wv.setStaged(file, st === 0 ? 0 : st === hunks.length ? 2 : 1)
            }
        }
        function onActionFinished(path, action, ok, message) {
            if (path !== wv.path) return
            if (wv.committing && ok) { subjectBox.clear(); bodyBox.clear() }
            if (action !== "stage") wv.committing = false
            if (action === "stage" || action === "discard") GitActions.loadWorkingTree(wv.path)
        }
    }
    Connections {
        target: wv.app
        function onRepoTouched(p) { if (p === wv.path) GitActions.loadWorkingTree(wv.path) }
    }

    // ---------- head ----------
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
                    text: qsTr("● Nicht committete Änderungen")
                    color: Theme.white
                    font.family: Theme.num; font.weight: Font.DemiBold; font.pixelSize: 19
                }
                CloseX { anchors.right: parent.right; onClicked: wv.app.closeDetail() }
            }
            Flow {
                width: parent.width
                spacing: 16
                Text {
                    textFormat: Text.StyledText
                    //: %1 = branch name
                    text: qsTr("Zweig %1").arg("<font color=\"#cfeef2\">" + U.esc(wv.repo && wv.repo.branch ? wv.repo.branch : "–") + "</font>")
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
                Text {
                    visible: wv.repo !== null && wv.repo.ahead > 0
                    text: "↑ " + qsTr("%n nicht gepusht", "", wv.repo ? wv.repo.ahead : 0)
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
                Text {
                    text: wv.hasRemote ? "☁ " + U.shortUrl(wv.repo.remote) : qsTr("⚠ nur lokal")
                    color: wv.hasRemote ? Theme.dim : Theme.yellow; font.family: Theme.mono; font.pixelSize: 12
                }
            }
            Item { width: 1; height: 10 }
            Row {
                spacing: 16
                Text { text: (wv.files.length === 1 ? qsTr("%1 Datei") : qsTr("%1 Dateien")).arg(wv.files.length); color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12 }
                //: files staged for the commit
                Text { text: qsTr("%n vorgemerkt", "", wv.stagedCount); color: wv.stagedCount ? Theme.cyan : Theme.dim; font.family: Theme.mono; font.pixelSize: 12 }
            }
        }
    }

    // ---------- files ----------
    Item {
        id: filesBox
        anchors.top: head.bottom
        width: parent.width
        height: wv.files.length ? Math.min(fileList.contentHeight, (wv.height - head.height - form.height) * 0.45) : 0
        Rectangle { anchors.bottom: parent.bottom; width: parent.width; height: 1; color: Theme.line; z: 2 }
        ListView {
            id: fileList
            anchors.fill: parent
            clip: true
            boundsBehavior: Flickable.StopAtBounds
            model: wv.files
            ScrollBar.vertical: ScrollBar { }
            delegate: Item {
                id: fr
                readonly property var f: modelData
                readonly property bool sel: wv.selFile === f.name
                objectName: "work_" + f.name
                width: fileList.width
                height: 30
                Rectangle {
                    anchors.fill: parent
                    color: fr.sel ? U.rgba(Theme.cyan, 0.08) : frMa.containsMouse ? Theme.rowHover : "transparent"
                    Rectangle { visible: fr.sel; width: 3; height: parent.height; color: Theme.cyan }
                }
                MouseArea { id: frMa; anchors.fill: parent; hoverEnabled: true; cursorShape: Qt.PointingHandCursor; onClicked: wv.pickFile(fr.f.name) }
                // stage box: empty / partly (bar) / fully (tick)
                Rectangle {
                    objectName: "stageBox"
                    x: 20; width: 16; height: 16
                    anchors.verticalCenter: parent.verticalCenter
                    color: fr.f.staged === 2 ? Theme.cyan : "transparent"
                    border.width: 1
                    border.color: fr.f.staged > 0 || boxMa.containsMouse ? Theme.cyan : U.rgba(Theme.dim, 0.8)
                    Text {
                        visible: fr.f.staged === 2
                        anchors.centerIn: parent
                        text: "✓"; color: Theme.bg; font.pixelSize: 12; font.bold: true
                    }
                    Rectangle { visible: fr.f.staged === 1; anchors.centerIn: parent; width: 8; height: 2; color: Theme.cyan }
                    MouseArea {
                        id: boxMa
                        anchors.fill: parent; anchors.margins: -6
                        hoverEnabled: true
                        cursorShape: Qt.PointingHandCursor
                        onClicked: GitActions.setFileStaged(wv.path, fr.f.name, fr.f.staged !== 2)
                    }
                }
                Text {
                    x: 46; width: 16
                    anchors.verticalCenter: parent.verticalCenter
                    horizontalAlignment: Text.AlignHCenter
                    text: fr.f.status
                    color: fr.f.status === "A" || fr.f.status === "?" ? Theme.ok : fr.f.status === "D" ? Theme.magenta : fr.f.status === "R" ? Theme.yellow : Theme.cyan
                    font.family: Theme.mono; font.bold: true; font.pixelSize: 12
                }
                Text {
                    x: 72
                    width: pm.x - x - 10
                    anchors.verticalCenter: parent.verticalCenter
                    elide: Text.ElideLeft
                    textFormat: Text.StyledText
                    readonly property var parts: fr.f.name.split("/")
                    text: (parts.length > 1 ? "<font color=\"#5f7d86\">" + U.esc(parts.slice(0, -1).join("/")) + "/</font>" : "") + U.esc(parts[parts.length - 1])
                    color: Theme.white; font.family: Theme.mono; font.pixelSize: 13
                }
                Text {
                    id: pm
                    x: disc.x - implicitWidth - 12
                    anchors.verticalCenter: parent.verticalCenter
                    textFormat: Text.StyledText
                    text: fr.f.binary ? qsTr("binär") : "<font color=\"#00ff9f\">+" + Math.max(0, fr.f.add) + "</font> <font color=\"#ff2a6d\">−" + Math.max(0, fr.f.rem) + "</font>"
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 11
                }
                Text {
                    id: disc
                    objectName: "discard"
                    x: fr.width - 20 - implicitWidth
                    anchors.verticalCenter: parent.verticalCenter
                    //: discard the changes of this file
                    text: qsTr("VERWERFEN")
                    color: discMa.containsMouse ? Theme.magenta : Theme.dim
                    font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 9; font.letterSpacing: 1.26
                    MouseArea {
                        id: discMa
                        anchors.fill: parent; anchors.margins: -4
                        hoverEnabled: true
                        cursorShape: Qt.PointingHandCursor
                        enabled: !wv.busy
                        onClicked: wv.app.askDiscard(wv.path, fr.f.name, fr.f.status)
                    }
                }
            }
        }
    }

    // ---------- hunks of the chosen file ----------
    Item {
        id: hunkBox
        anchors.top: filesBox.bottom
        anchors.bottom: form.top
        width: parent.width
        clip: true
        Text {
            visible: wv.tree !== null && wv.files.length === 0
            x: 24; y: 40; width: parent.width - 48
            horizontalAlignment: Text.AlignHCenter
            wrapMode: Text.Wrap
            text: qsTr("Keine Änderungen – alles committet.")
            color: Theme.dim; font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 16
        }
        Rectangle {
            id: fh
            visible: wv.selFile !== ""
            width: parent.width
            height: visible ? 30 : 0
            color: Theme.panel
            Rectangle { anchors.bottom: parent.bottom; width: parent.width; height: 1; color: Theme.line }
            Text {
                x: 20; width: parent.width - 40
                anchors.verticalCenter: parent.verticalCenter
                elide: Text.ElideLeft
                text: wv.selFile
                color: Theme.white; font.family: Theme.mono; font.pixelSize: 12
            }
        }
        Text {
            visible: wv.selFile !== "" && wv.hunksReady && wv.hunks.length === 0
            anchors.top: fh.bottom; anchors.topMargin: 10
            x: 20; width: parent.width - 40
            wrapMode: Text.Wrap
            text: wv.selEntry && wv.selEntry.binary ? qsTr("Binärdatei – nur ganz vormerken (Kästchen links).") : qsTr("Keine Abschnitte – nur ganz vormerken (Kästchen links).")
            color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12; font.italic: true
        }
        ListView {
            id: hunkList
            objectName: "hunkList"
            anchors.top: fh.bottom; anchors.bottom: parent.bottom
            width: parent.width
            clip: true
            boundsBehavior: Flickable.StopAtBounds
            model: wv.hunks
            spacing: 6
            ScrollBar.vertical: ScrollBar { }
            header: Item { width: 1; height: 6 }
            footer: Item { width: 1; height: 16 }
            delegate: Item {
                id: hk
                readonly property var h: modelData
                objectName: "hunk_" + index
                width: hunkList.width
                height: hh.height + hl.implicitHeight
                Rectangle {
                    visible: hk.h.staged
                    width: 3; height: parent.height
                    color: Theme.cyan
                    z: 2
                }
                Item {
                    id: hh
                    width: parent.width
                    height: 30
                    Text {
                        x: 17
                        width: hkBtn.x - x - 10
                        anchors.verticalCenter: parent.verticalCenter
                        elide: Text.ElideRight
                        text: hk.h.header
                        color: Theme.teal; font.family: Theme.mono; font.pixelSize: 12
                    }
                    Text {
                        visible: hk.h.staged
                        anchors.right: hkBtn.left; anchors.rightMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        //: this hunk is staged
                        text: qsTr("VORGEMERKT")
                        color: Theme.cyan
                        font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 9; font.letterSpacing: 1.26
                    }
                    Btn {
                        id: hkBtn
                        objectName: "hunkStage"
                        anchors.right: parent.right; anchors.rightMargin: 20
                        anchors.verticalCenter: parent.verticalCenter
                        height: 22
                        fontSize: 9
                        kind: hk.h.staged ? "" : "ok"
                        enabled: !wv.busy
                        //: unstage / stage this hunk
                        text: hk.h.staged ? qsTr("− Zurücknehmen") : qsTr("+ Vormerken")
                        onClicked: GitActions.setHunkStaged(wv.path, wv.selFile, index, !hk.h.staged)
                    }
                }
                Column {
                    id: hl
                    y: hh.height
                    width: parent.width
                    Repeater {
                        model: hk.h.lines || []
                        DiffLine { line: modelData; width: hl.width; clip: true }
                    }
                }
            }
        }
    }

    // ---------- commit form ----------
    Item {
        id: form
        anchors.bottom: parent.bottom
        width: parent.width
        height: fc.implicitHeight + 26
        Rectangle { width: parent.width; height: 1; color: Theme.line }
        Column {
            id: fc
            x: 20; y: 12
            width: parent.width - 40
            spacing: 6
            Text {
                //: commit subject (first line of the commit message)
                text: qsTr("KURZBESCHREIBUNG")
                color: Theme.teal
                font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 9; font.letterSpacing: 1.7
            }
            InputBox {
                id: subjectBox
                objectName: "commitSubject"
                width: parent.width
                height: 34
                family: Theme.num
                size: 15
                placeholder: qsTr("Was wurde geändert?")
                onAccepted: if (commitBtn.enabled) wv.commit(false)
            }
            Item { width: 1; height: 2 }
            Text {
                //: commit message body
                text: qsTr("DETAILS")
                color: Theme.teal
                font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 9; font.letterSpacing: 1.7
            }
            InputBox {
                id: bodyBox
                objectName: "commitBody"
                multi: true
                width: parent.width
                height: 70
                size: 12
                placeholder: qsTr("optional")
            }
            Item { width: 1; height: 4 }
            Item {
                width: parent.width
                height: 32
                Row {
                    spacing: 6
                    Btn {
                        id: commitBtn
                        objectName: "btnDoCommit"
                        kind: "pri"
                        text: qsTr("Commit")
                        enabled: wv.stagedCount > 0 && subjectBox.value.trim() !== "" && (!wv.busy || running)
                        running: wv.app.isRunning(wv.path, "commit")
                        onClicked: wv.commit(false)
                    }
                    Btn {
                        objectName: "btnDoCommitPush"
                        visible: wv.hasRemote
                        text: qsTr("Commit & Push")
                        enabled: commitBtn.enabled || running
                        running: wv.app.isRunning(wv.path, "commitpush")
                        onClicked: wv.commit(true)
                    }
                }
                Text {
                    anchors.right: parent.right
                    anchors.verticalCenter: parent.verticalCenter
                    text: wv.stagedCount === 0 ? qsTr("Nichts vorgemerkt") : subjectBox.value.trim() === "" ? qsTr("Kurzbeschreibung fehlt") : ""
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 11
                }
            }
        }
    }
}
