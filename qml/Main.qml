import QtCore
import QtQuick
import QtQuick.Window
import QtQuick.Layouts
import QtQuick.Shapes
import QtQuick.Dialogs
import "Util.js" as U

// Areko Git Manager – main window (draft v2: entwurf/areko-git-manager-entwurf-v2.html, contract: docs/SCHNITTSTELLE.md).
Window {
    id: root
    width: 1600; height: 940
    minimumWidth: 1050; minimumHeight: 600
    visible: true
    title: "Areko Git Manager"
    color: Theme.bg2

    // ---------- state ----------
    property string filter: "all"
    property string query: ""
    property bool foreignOpen: true
    property string selKind: "repo"          // repo | prog
    property string selPath: ""
    property string selProg: ""
    property string detailMode: ""           // "" | commit | work | release
    property var selCommit: null
    property string selCommitId: ""
    property int selRelease: -1
    property var running: ({})               // path (or program name) -> action started from this window
    property var progress: ({})              // path -> last progress text from Updates
    property var now: new Date()
    property bool scanPending: true
    property var discardReq: null
    property var publishRepo: null
    property var deleteReq: null             // {path, name, wts, info}  info from GitActions.deleteInspected
    property var refReq: null                // {path, kind, key, label, wts, info}
    property var progReq: null               // {name, title, info}
    property var visReq: null                // {path, name, github, toPublic}
    property var unpubReq: null              // {path, name, github, info}  info from GitActions.unpublishInspected
    property string fileView: ""             // "" = automatic; list | map once the user switched it in column 3
    property bool restoring: ui.lastKey !== ""   // the saved project may still appear (scan / programs pending)
    property bool progsSeen: false
    property bool geomReady: false

    // ---------- saved UI state (the scanned folders are saved by RepoStore) ----------
    Settings {
        id: ui
        category: "ui"
        property alias filter: root.filter
        property alias foreignOpen: root.foreignOpen
        property alias fileView: root.fileView
        property real col1: 330                  // column 1 width
        property real col3: -1                   // column 3 width, -1 = default rule
        property string lastKind: ""             // repo | prog
        property string lastKey: ""              // path or program name
        property int winX: 0
        property int winY: 0
        property int winW: 0                     // 0 = never saved
        property int winH: 0
        property bool winMax: false
    }
    Component.onCompleted: {
        if (ui.winW > 0) {
            width = Math.max(minimumWidth, ui.winW)
            height = Math.max(minimumHeight, ui.winH)
            if (Qt.application.screens.some(s => ui.winX >= s.virtualX && ui.winX < s.virtualX + s.width
                                                && ui.winY >= s.virtualY && ui.winY < s.virtualY + s.height)) {
                x = ui.winX; y = ui.winY
            }
        }
        if (ui.winMax) visibility = Window.Maximized
        geomReady = true
    }
    function saveGeometry() {
        if (visibility === Window.Windowed) { ui.winX = x; ui.winY = y; ui.winW = width; ui.winH = height; ui.winMax = false }
        else if (visibility === Window.Maximized) ui.winMax = true
    }
    Timer { id: geomSave; interval: 400; onTriggered: root.saveGeometry() }
    onXChanged: if (geomReady) geomSave.restart()
    onYChanged: if (geomReady) geomSave.restart()
    onWidthChanged: if (geomReady) geomSave.restart()
    onHeightChanged: if (geomReady) geomSave.restart()
    onVisibilityChanged: if (geomReady) geomSave.restart()

    readonly property var repos: RepoStore.repos
    readonly property var programs: Updates.programs
    readonly property var selRepo: {
        for (const r of repos) if (r.path === selPath) return r
        return null
    }
    readonly property var selProgram: {
        for (const p of programs) if (p.name === selProg) return p
        return null
    }

    signal repoTouched(string path)          // a successful action changed this repo

    // ---------- filters ----------
    readonly property var filters: [
        //: filter chips in the header
        { k: "all", l: qsTr("ALLE") }, { k: "own", l: qsTr("EIGENE") }, { k: "local", l: qsTr("NUR LOKAL") },
        { k: "dirty", l: qsTr("GEÄNDERT") }, { k: "upd", l: qsTr("UPDATES") }, { k: "foreign", l: qsTr("FREMD") }]
    function newCount(r) { const n = Updates.news[r.path]; return n ? (n.n || 0) : 0 }
    function progTitle(p) { return p.name.charAt(0).toUpperCase() + p.name.slice(1) }
    function repoMatch(k, r) {
        if (k === "own") return r.group === "eigen"
        if (k === "local") return r.group === "eigen" && !r.remote
        if (k === "dirty") return r.dirty > 0
        if (k === "upd") return newCount(r) > 0
        if (k === "foreign") return r.group === "fremd"
        return true
    }
    function progMatch(k, p) { return k === "all" || k === "foreign" || (k === "upd" && p.outdated === true) }
    function textMatch(s) { return query === "" || s.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
    function visibleRepos() { return repos.filter(r => repoMatch(filter, r) && textMatch(r.name + " " + (r.display || r.path))) }
    function visibleProgs() { return programs.filter(p => progMatch(filter, p) && textMatch(p.name)) }
    function filterCount(k) { return repos.filter(r => repoMatch(k, r)).length + programs.filter(p => progMatch(k, p)).length }

    // ---------- selection ----------
    function selectRepo(path, auto) { selKind = "repo"; selPath = path; closeDetail(); if (!auto) remember("repo", path) }
    function selectProg(name, auto) { selKind = "prog"; selProg = name; closeDetail(); if (!auto) remember("prog", name) }
    function remember(kind, key) { restoring = false; ui.lastKind = kind; ui.lastKey = key }
    function selectCommit(c) { selCommit = c; selCommitId = c.id; detailMode = "commit" }
    function openWork() { selCommit = null; selCommitId = ""; detailMode = "work" }
    function selectRelease(i) { selRelease = i; detailMode = "release" }
    function closeDetail() { detailMode = ""; selCommit = null; selCommitId = ""; selRelease = -1 }
    function ensureSelection() {
        if (restoring) {
            const r = ui.lastKind === "repo" ? repos.find(x => x.path === ui.lastKey) : null
            const p = ui.lastKind === "prog" ? programs.find(x => x.name === ui.lastKey) : null
            if (r || p) {
                restoring = false
                if (r) selectRepo(r.path, true)
                else selectProg(p.name, true)
                return
            }
        }
        if ((selKind === "repo" && selRepo) || (selKind === "prog" && selProgram)) return
        let best = null
        for (const r of repos)
            if (r.group === "eigen" && (!best || new Date(r.lastDate || 0) > new Date(best.lastDate || 0))) best = r
        if (!best && repos.length) best = repos[0]
        if (best) selectRepo(best.path, true)
    }
    // once repos and programs are loaded, a saved project that is gone no longer takes over the selection
    function settleRestore() {
        if (!restoring) return
        ensureSelection()
        if (!scanPending && progsSeen) restoring = false
    }

    // ---------- actions ----------
    function isBusy(p) {
        return running[p] !== undefined || GitActions.busyPaths.indexOf(p) >= 0 || Updates.busyPaths.indexOf(p) >= 0
    }
    function isRunning(p, action) { return running[p] === action }
    function start(p, action) { const m = Object.assign({}, running); m[p] = action; running = m }
    function finish(p) {
        if (running[p] === undefined) return
        const m = Object.assign({}, running); delete m[p]; running = m
    }
    function doPull(r) { start(r.path, "pull"); GitActions.pull(r.path) }
    function doPush(r) { start(r.path, "push"); GitActions.push(r.path) }
    function doCommit(r, subject, body, push) { start(r.path, push ? "commitpush" : "commit"); GitActions.commit(r.path, subject, body, push) }
    function doUpdate(r) { start(r.path, "update"); Updates.updateRepo(r.path) }
    function doUpdateAll(paths) {
        const m = Object.assign({}, running)
        for (const p of paths) m[p] = "update"
        running = m
        Updates.updateRepos(paths)
    }
    function doUpdateProgram(p) { start(p.name, "program"); Updates.updateProgram(p.name) }
    function askPublish(r) {
        publishRepo = r
        publishName.setText(String(r.name).replace(/[^A-Za-z0-9._-]+/g, "-"))
        publishDlg.makePublic = false
        publishDlg.visible = true
    }
    function askVisibility(r) { visReq = { path: r.path, name: r.name, github: r.github, toPublic: r.visibility === "private" }; visDlg.visible = true }
    function askUnpublish(r) {
        unpubReq = { path: r.path, name: r.name, github: r.github, info: null }
        unpubDlg.visible = true
        GitActions.inspectUnpublish(r.path)
    }
    function askDiscard(path, file, status) { discardReq = { path: path, file: file, status: status }; discardDlg.visible = true }
    function askDeleteRepo(r) {
        deleteReq = { path: r.path, name: r.name, wts: r.worktrees || [], info: null }
        deleteDlg.alsoGithub = false
        deleteDlg.visible = true
        GitActions.inspectDelete(r.path)
    }
    function askDeleteRef(r, kind, key, label) {
        refReq = { path: r.path, kind: kind, key: key, label: label, wts: r.worktrees || [], info: null }
        refDlg.visible = true
        GitActions.inspectRef(r.path, kind, key)
    }
    function askDeleteProgram(p) {
        progReq = { name: p.name, title: progTitle(p), info: null }
        progDlg.visible = true
        Updates.inspectProgramDelete(p.name)
    }
    function agentIn(wts, path) { const w = (wts || []).find(x => x.path === path); return !!w && w.agent && w.active }
    function setRoots(list) { scanPending = true; RepoStore.setRoots(list) }
    function rescan() { scanPending = true; RepoStore.rescan(); Updates.refreshPrograms() }
    function checkUpdates() {
        const ps = repos.filter(r => r.group === "fremd" && !!r.remote).map(r => r.path)
        if (ps.length) Updates.checkAll(ps)
    }
    function scanDone() { if (!scanPending || RepoStore.busy) return; scanPending = false; checkUpdates(); settleRestore() }
    function finished(path, action, ok, message) {
        finish(path)
        if (message && (!ok || (action !== "stage" && action !== "status")))
            toast(ok, message)
        if (action === "delete") {
            // refreshRepo drops entries that are no repo any more; ensureSelection then picks another project
            const nested = deleteReq && deleteReq.path === path && deleteReq.info ? (deleteReq.info.nested || []) : []
            for (const n of nested) RepoStore.refreshRepo(n.path)
            RepoStore.refreshRepo(path)
            return
        }
        if (action === "deleteprogram") { Qt.callLater(ensureSelection); return }
        if (ok && (action === "visibility" || action === "publish")) RepoStore.reloadVisibility()
        if (ok && String(path).charAt(0) === "/" && action !== "status" && action !== "launch" && action !== "stage") {
            RepoStore.refreshRepo(path)
            repoTouched(path)
        }
    }

    Connections {
        target: GitActions
        function onActionFinished(path, action, ok, message) { root.finished(path, action, ok, message) }
    }
    Connections {
        target: GitActions
        function onDeleteInspected(path, info) {
            if (root.deleteReq && root.deleteReq.path === path) root.deleteReq = Object.assign({}, root.deleteReq, { info: info })
        }
        function onRefInspected(path, kind, name, info) {
            const q = root.refReq
            if (q && q.path === path && q.kind === kind && q.key === name) root.refReq = Object.assign({}, q, { info: info })
        }
        function onUnpublishInspected(path, info) {
            if (root.unpubReq && root.unpubReq.path === path) root.unpubReq = Object.assign({}, root.unpubReq, { info: info })
        }
    }
    Connections {
        target: Updates
        function onProgramDeleteInspected(name, info) {
            if (root.progReq && root.progReq.name === name) root.progReq = Object.assign({}, root.progReq, { info: info })
        }
        function onProgramsChanged() { root.progsSeen = true; if (root.restoring) Qt.callLater(root.settleRestore) }
    }
    Connections {
        target: Updates
        function onActionFinished(path, action, ok, message) { root.finished(path, action, ok, message) }
        function onProgress(path, text) { const m = Object.assign({}, root.progress); m[path] = text; root.progress = m }
    }
    Connections {
        target: RepoStore
        function onError(path, message) { root.toast(false, message) }
        function onBusyChanged() {
            if (RepoStore.busy) root.scanPending = true
            else Qt.callLater(root.scanDone)
        }
        function onReposChanged() {
            Qt.callLater(root.ensureSelection)
            if (!RepoStore.busy) Qt.callLater(root.scanDone)
        }
    }
    Timer { interval: 30 * 60 * 1000; repeat: true; running: true; onTriggered: root.checkUpdates() }
    Timer { interval: 30 * 1000; repeat: true; running: true; onTriggered: root.now = new Date() }

    Shortcut {
        sequences: [StandardKey.Cancel]
        onActivated: {
            if (discardDlg.visible) discardDlg.visible = false
            else if (publishDlg.visible) publishDlg.visible = false
            else if (deleteDlg.visible) deleteDlg.visible = false
            else if (refDlg.visible) refDlg.visible = false
            else if (progDlg.visible) progDlg.visible = false
            else if (visDlg.visible) visDlg.visible = false
            else if (unpubDlg.visible) unpubDlg.visible = false
            else if (root.detailMode !== "") root.closeDetail()
        }
    }

    FolderDialog {
        id: folderDlg
        title: qsTr("Ordner zum Durchsuchen wählen")
        onAccepted: {
            const p = decodeURIComponent(String(selectedFolder).replace(/^file:\/\//, ""))
            if (p && RepoStore.roots.indexOf(p) < 0) root.setRoots(RepoStore.roots.concat([p]))
        }
    }

    // ---------- toasts ----------
    ListModel { id: toasts }
    property int toastSeq: 0
    function toast(ok, text) {
        if (!text) return
        toastSeq++
        toasts.append({ tid: toastSeq, ok: ok, text: String(text) })
        while (toasts.count > 4) toasts.remove(0)
    }
    function dropToast(tid) {
        for (let i = 0; i < toasts.count; i++) if (toasts.get(i).tid === tid) { toasts.remove(i); return }
    }

    // ---------- tooltip ----------
    property string tipText: ""
    property point tipPos: Qt.point(0, 0)
    function tip(text, item, x, y) {
        tipText = text || ""
        if (item && tipText) tipPos = item.mapToItem(frame, x, y)
    }

    // =====================================================================
    Item {
        id: frame
        anchors.fill: parent

        // ---------- header ----------
        Item {
            id: header
            width: parent.width
            height: 60
            Rectangle { anchors.bottom: parent.bottom; width: parent.width; height: 1; color: Theme.line }
            RowLayout {
                x: 18; width: parent.width - 36; height: parent.height
                spacing: 18
                Row {
                    spacing: 10
                    Item {
                        width: 22; height: 22
                        anchors.verticalCenter: parent.verticalCenter
                        Shape {
                            width: 24; height: 24
                            scale: 22 / 24
                            transformOrigin: Item.TopLeft
                            ShapePath {
                                strokeColor: Theme.cyan; strokeWidth: 1.8; fillColor: "transparent"; capStyle: ShapePath.RoundCap
                                PathAngleArc { centerX: 6; centerY: 5; radiusX: 2.4; radiusY: 2.4; startAngle: 0; sweepAngle: 360 }
                            }
                            ShapePath {
                                strokeColor: Theme.cyan; strokeWidth: 1.8; fillColor: "transparent"; capStyle: ShapePath.RoundCap
                                PathAngleArc { centerX: 6; centerY: 19; radiusX: 2.4; radiusY: 2.4; startAngle: 0; sweepAngle: 360 }
                            }
                            ShapePath {
                                strokeColor: Theme.magenta; strokeWidth: 1.8; fillColor: "transparent"; capStyle: ShapePath.RoundCap
                                PathAngleArc { centerX: 18; centerY: 9; radiusX: 2.4; radiusY: 2.4; startAngle: 0; sweepAngle: 360 }
                            }
                            ShapePath {
                                strokeColor: Theme.cyan; strokeWidth: 1.8; fillColor: "transparent"; capStyle: ShapePath.RoundCap
                                startX: 6; startY: 7.4
                                PathLine { x: 6; y: 16.6 }
                                PathMove { x: 18; y: 11.4 }
                                PathCubic { control1X: 18; control1Y: 15.4; control2X: 12; control2Y: 14.4; x: 7; y: 17 }
                            }
                        }
                    }
                    Text {
                        anchors.verticalCenter: parent.verticalCenter
                        textFormat: Text.StyledText
                        text: "AREKO <font color=\"#ff2a6d\">//</font> GIT"
                        color: Theme.white
                        font.family: Theme.head; font.weight: Font.Bold; font.pixelSize: 15; font.letterSpacing: 3.3
                    }
                }
                Rectangle {
                    id: search
                    Layout.fillWidth: true
                    Layout.maximumWidth: 300
                    Layout.minimumWidth: 140
                    Layout.preferredWidth: 300
                    height: 34
                    color: Theme.bg
                    border.width: 1
                    border.color: q.activeFocus ? Theme.cyan : Theme.line
                    Text {
                        id: lens
                        x: 10; anchors.verticalCenter: parent.verticalCenter
                        text: "⌕"; color: Theme.teal; font.pixelSize: 14
                    }
                    TextInput {
                        id: q
                        objectName: "search"
                        x: lens.x + lens.width + 8
                        width: parent.width - x - 10
                        anchors.verticalCenter: parent.verticalCenter
                        clip: true
                        color: Theme.white
                        selectionColor: Theme.teal
                        font.family: Theme.mono; font.pixelSize: 13; font.letterSpacing: 0.52
                        onTextChanged: root.query = text
                        Keys.onEscapePressed: text = ""
                    }
                    Text {
                        x: q.x; anchors.verticalCenter: parent.verticalCenter
                        visible: q.text === ""
                        text: qsTr("Projekt suchen …")
                        color: Theme.dim; font.family: Theme.mono; font.pixelSize: 13; font.letterSpacing: 0.52
                    }
                    TapHandler { onTapped: q.forceActiveFocus() }
                }
                Row {
                    spacing: 4
                    Repeater {
                        model: root.filters
                        Rectangle {
                            readonly property bool on: root.filter === modelData.k
                            objectName: "chip_" + modelData.k
                            width: chipT.implicitWidth + 24; height: 30
                            color: on ? U.rgba(Theme.cyan, 0.08) : chipMa.containsMouse ? U.rgba(Theme.cyan, 0.06) : "transparent"
                            border.width: 1
                            border.color: on ? Theme.lineStrong : "transparent"
                            Text {
                                id: chipT
                                anchors.centerIn: parent
                                textFormat: Text.StyledText
                                text: modelData.l + "&nbsp;&nbsp;<font color=\"#05d9e8\">" + root.filterCount(modelData.k) + "</font>"
                                color: parent.on ? Theme.white : chipMa.containsMouse ? Theme.text : Theme.dim
                                font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 10; font.letterSpacing: 1.4
                            }
                            MouseArea { id: chipMa; anchors.fill: parent; hoverEnabled: true; cursorShape: Qt.PointingHandCursor; onClicked: root.filter = modelData.k }
                        }
                    }
                }
                Item {
                    Layout.fillWidth: true
                    Layout.minimumWidth: 0
                    height: 20
                    clip: true
                    Text {
                        objectName: "status"
                        anchors.right: parent.right
                        anchors.verticalCenter: parent.verticalCenter
                        textFormat: Text.StyledText
                        readonly property int unsafe: root.repos.filter(r => r.group === "eigen" && !r.remote).length
                        readonly property int upd: root.repos.filter(r => root.newCount(r) > 0).length + root.programs.filter(p => p.outdated === true).length
                        //: status line in the header; the counters are upper case like the rest of the line
                        text: (RepoStore.busy ? "<font color=\"#05d9e8\">" + qsTr("⟳ LESE EIN …") + "</font> · " : "")
                              + qsTr("%n REPOS", "", root.repos.length) + " · " + qsTr("%n PROGRAMME", "", root.programs.length) + " · "
                              + "<font color=\"#f9f002\">" + qsTr("%n OHNE SICHERUNG", "", unsafe) + "</font> · "
                              + "<font color=\"#00ff9f\">" + qsTr("%n UPDATES", "", upd) + (Updates.checking ? " …" : "") + "</font>"
                        color: Theme.dim
                        font.family: Theme.mono; font.pixelSize: 12; font.letterSpacing: 0.96
                    }
                }
                Btn {
                    objectName: "btnRescan"
                    text: qsTr("⟳ Neu einlesen")
                    running: RepoStore.busy
                    onClicked: root.rescan()
                }
            }
        }

        // ---------- three columns ----------
        Item {
            id: cols
            anchors.top: header.bottom
            anchors.bottom: parent.bottom
            width: parent.width
            readonly property bool open: root.detailMode !== ""
            // minimum widths 240 | 420 | 360; saved widths are only limited here, never overwritten
            readonly property real c1max: width - 421 - (open ? 361 : 0)
            readonly property real c1: Math.max(0, Math.min(Math.max(240, ui.col1), c1max))
            readonly property real c3max: width - c1 - 421
            readonly property real target: Math.max(0, Math.min(Math.max(360, ui.col3 < 0 ? Math.max(460, width * 0.46) : ui.col3), c3max))
            property real c3: open ? target : 0
            Behavior on c3 { enabled: !grip1.pressed && !grip2.pressed; NumberAnimation { duration: 180; easing.type: Easing.OutCubic } }

            ProjectColumn {
                id: col1
                width: cols.c1
                height: parent.height
                app: root
                onAddRoot: folderDlg.open()
            }
            Rectangle { x: cols.c1; width: 1; height: parent.height; color: grip1.containsMouse || grip1.pressed ? Theme.cyan : Theme.line }

            Item {
                id: col2
                x: cols.c1 + 1
                width: cols.width - cols.c1 - 1 - cols.c3
                height: parent.height
                clip: true
                RepoView {
                    anchors.fill: parent
                    visible: root.selKind === "repo"
                    app: root
                    repo: root.selKind === "repo" ? root.selRepo : null
                }
                ProgramView {
                    anchors.fill: parent
                    visible: root.selKind === "prog"
                    app: root
                    prog: root.selKind === "prog" ? root.selProgram : null
                }
                Text {
                    visible: root.repos.length === 0 && root.programs.length === 0
                    anchors.centerIn: parent
                    text: RepoStore.busy ? qsTr("Lese Repositories ein …") : qsTr("Keine Repositories gefunden.")
                    color: Theme.dim; font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 16
                }
            }
            Rectangle { visible: cols.c3 > 0; x: cols.width - cols.c3 - 1; width: 1; height: parent.height
                        color: grip2.containsMouse || grip2.pressed ? Theme.cyan : Theme.line }

            Item {
                id: col3
                x: cols.width - cols.c3
                width: cols.c3
                height: parent.height
                clip: true
                Loader {
                    width: Math.max(cols.target, 1)
                    height: parent.height
                    active: root.detailMode !== ""
                    sourceComponent: root.detailMode === "commit" ? commitComp
                                     : root.detailMode === "work" ? workComp
                                     : root.detailMode === "release" ? releaseComp : null
                }
            }

            // drag handles centred on the border lines; double click restores the default width
            MouseArea {
                id: grip1
                objectName: "grip1"
                property real off: 0
                x: cols.c1 - 3; z: 10
                width: 6; height: parent.height
                hoverEnabled: true
                preventStealing: true
                cursorShape: Qt.SplitHCursor
                onPressed: mouse => off = mouse.x - 3
                onPositionChanged: mouse => {
                    if (pressed) ui.col1 = Math.max(240, Math.min(mapToItem(cols, mouse.x, 0).x - off, cols.c1max))
                }
                onDoubleClicked: ui.col1 = 330
            }
            MouseArea {
                id: grip2
                objectName: "grip2"
                property real off: 0
                visible: cols.open
                x: cols.width - cols.c3 - 4; z: 10
                width: 6; height: parent.height
                hoverEnabled: true
                preventStealing: true
                cursorShape: Qt.SplitHCursor
                onPressed: mouse => off = mouse.x - 3
                onPositionChanged: mouse => {
                    if (pressed) ui.col3 = Math.max(360, Math.min(cols.width - 1 - (mapToItem(cols, mouse.x, 0).x - off), cols.c3max))
                }
                onDoubleClicked: ui.col3 = -1
            }
        }

        // ---------- frame + corner brackets ----------
        Rectangle { anchors.fill: parent; color: "transparent"; border.width: 1; border.color: Theme.lineStrong; z: 50 }
        Item {
            anchors.fill: parent
            z: 51
            Rectangle { width: 20; height: 2; color: Theme.cyan }
            Rectangle { width: 2; height: 20; color: Theme.cyan }
            Rectangle { x: parent.width - 20; width: 20; height: 2; color: Theme.cyan }
            Rectangle { x: parent.width - 2; width: 2; height: 20; color: Theme.cyan }
            Rectangle { y: parent.height - 2; width: 20; height: 2; color: Theme.magenta }
            Rectangle { y: parent.height - 20; width: 2; height: 20; color: Theme.magenta }
            Rectangle { x: parent.width - 20; y: parent.height - 2; width: 20; height: 2; color: Theme.magenta }
            Rectangle { x: parent.width - 2; y: parent.height - 20; width: 2; height: 20; color: Theme.magenta }
        }

        // ---------- toasts ----------
        Column {
            z: 90
            anchors.right: parent.right; anchors.rightMargin: 18
            anchors.bottom: parent.bottom; anchors.bottomMargin: 18
            spacing: 8
            Repeater {
                model: toasts
                Rectangle {
                    objectName: "toast"
                    width: Math.min(440, tt.implicitWidth + 36)
                    height: tt.implicitHeight + 20
                    color: Theme.panel
                    border.width: 1
                    border.color: model.ok ? U.rgba(Theme.ok, 0.6) : U.rgba(Theme.magenta, 0.7)
                    Rectangle { width: 3; height: parent.height; color: model.ok ? Theme.ok : Theme.magenta }
                    Text {
                        id: tt
                        x: 18; y: 10
                        width: Math.min(implicitWidth, 404)
                        wrapMode: Text.Wrap
                        text: (model.ok ? "✓ " : "✕ ") + model.text
                        color: model.ok ? Theme.ok : Theme.magenta
                        font.family: Theme.mono; font.pixelSize: 12
                    }
                    id: toastItem
                    readonly property int tid: model.tid
                    Timer { interval: model.ok ? 4000 : 8000; running: true; onTriggered: root.dropToast(toastItem.tid) }
                    MouseArea { anchors.fill: parent; onClicked: root.dropToast(toastItem.tid) }
                }
            }
        }

        // ---------- tooltip ----------
        Rectangle {
            z: 95
            visible: root.tipText !== ""
            x: Math.min(root.tipPos.x + 12, frame.width - width - 4)
            y: Math.min(root.tipPos.y + 18, frame.height - height - 4)
            width: tipT.implicitWidth + 16
            height: tipT.implicitHeight + 10
            color: Theme.panel
            border.width: 1
            border.color: Theme.lineStrong
            Text { id: tipT; x: 8; y: 5; text: root.tipText; color: Theme.text; font.family: Theme.mono; font.pixelSize: 11 }
        }

        // ---------- dialogs ----------
        Modal {
            id: discardDlg
            title: qsTr("ÄNDERUNGEN VERWERFEN")
            accent: Theme.magenta
            onDismissed: visible = false
            Text {
                width: parent.width
                wrapMode: Text.Wrap
                text: !root.discardReq ? "" : root.discardReq.status === "?"
                      ? qsTr("Die neue Datei „%1“ kommt in den Papierkorb.").arg(root.discardReq.file)
                      : qsTr("Alle Änderungen an „%1“ werden verworfen.").arg(root.discardReq.file)
                color: Theme.white; font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 16
            }
            Text {
                visible: !!root.discardReq && root.discardReq.status !== "?"
                text: qsTr("Das lässt sich nicht rückgängig machen.")
                color: Theme.magenta; font.family: Theme.mono; font.pixelSize: 12
            }
            Item { width: 1; height: 4 }
            Row {
                spacing: 6
                Btn { objectName: "discardConfirm"; kind: "pri"; text: qsTr("Verwerfen")
                      onClicked: { discardDlg.visible = false; root.start(root.discardReq.path, "discard"); GitActions.discardFile(root.discardReq.path, root.discardReq.file) } }
                Btn { text: qsTr("Abbrechen"); onClicked: discardDlg.visible = false }
            }
        }
        Modal {
            id: publishDlg
            title: qsTr("☁ AUF GITHUB SICHERN")
            onDismissed: visible = false
            readonly property bool valid: /^[A-Za-z0-9._-]+$/.test(publishName.text)
            property bool makePublic: false
            function go() {
                if (!valid || !root.publishRepo) return
                publishDlg.visible = false
                root.start(root.publishRepo.path, "publish")
                GitActions.publishToGitHub(root.publishRepo.path, publishName.text, makePublic)
            }
            Text {
                width: parent.width
                wrapMode: Text.Wrap
                text: qsTr("Legt auf GitHub ein Repository an und lädt alle Versionen von „%1“ hoch.").arg(root.publishRepo ? root.publishRepo.name : "")
                color: Theme.white; font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 16
            }
            Text {
                //: name of the new GitHub repository
                text: qsTr("NAME")
                color: Theme.teal
                font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 9; font.letterSpacing: 1.7
            }
            InputBox {
                id: publishName
                objectName: "publishName"
                width: parent.width
                height: 34
                onAccepted: publishDlg.go()
            }
            Text {
                text: qsTr("SICHTBARKEIT")
                color: Theme.teal
                font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 9; font.letterSpacing: 1.7
            }
            Row {
                spacing: 4
                Repeater {
                    model: [{ pub: false, l: qsTr("🔒 PRIVAT"), c: Theme.yellow, n: "publishPrivate" },
                            { pub: true, l: qsTr("◉ ÖFFENTLICH"), c: Theme.ok, n: "publishPublic" }]
                    Rectangle {
                        readonly property bool on: publishDlg.makePublic === modelData.pub
                        objectName: modelData.n
                        width: visT.implicitWidth + 24; height: 30
                        color: on ? U.rgba(modelData.c, 0.08) : visMa.containsMouse ? U.rgba(Theme.cyan, 0.06) : "transparent"
                        border.width: 1
                        border.color: on ? U.rgba(modelData.c, 0.6) : Theme.lineStrong
                        Text {
                            id: visT
                            anchors.centerIn: parent
                            text: modelData.l
                            color: parent.on ? modelData.c : visMa.containsMouse ? Theme.text : Theme.dim
                            font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 10; font.letterSpacing: 1.4
                        }
                        MouseArea { id: visMa; anchors.fill: parent; hoverEnabled: true; cursorShape: Qt.PointingHandCursor; onClicked: publishDlg.makePublic = modelData.pub }
                    }
                }
            }
            Text {
                width: parent.width
                wrapMode: Text.Wrap
                text: !publishDlg.valid ? qsTr("Nur Buchstaben, Ziffern, Punkt, Minus und Unterstrich.")
                      : (publishDlg.makePublic ? qsTr("öffentlich") : qsTr("privat")) + " · github.com/" + (RepoStore.githubUser ? RepoStore.githubUser + "/" : "") + publishName.text
                color: !publishDlg.valid ? Theme.magenta : publishDlg.makePublic ? Theme.ok : Theme.yellow
                font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: publishDlg.makePublic
                width: parent.width
                wrapMode: Text.Wrap
                text: qsTr("Jeder kann den Code und alle bisherigen Versionen sehen.")
                color: Theme.magenta; font.family: Theme.mono; font.pixelSize: 12
            }
            Item { width: 1; height: 4 }
            Row {
                spacing: 6
                Btn { objectName: "publishConfirm"; kind: "pri"; text: publishDlg.makePublic ? qsTr("☁ Öffentlich sichern") : qsTr("☁ Privat sichern")
                      enabled: publishDlg.valid; onClicked: publishDlg.go() }
                Btn { text: qsTr("Abbrechen"); onClicked: publishDlg.visible = false }
            }
        }
        Modal {
            id: deleteDlg
            title: qsTr("PROJEKT LÖSCHEN")
            accent: Theme.magenta
            onDismissed: visible = false
            property bool alsoGithub: false
            readonly property var info: root.deleteReq ? root.deleteReq.info : null
            readonly property bool ready: !!info && !info.blocked
            readonly property var wts: info ? (info.worktrees || []) : []
            readonly property var agents: root.deleteReq ? wts.filter(w => root.agentIn(root.deleteReq.wts, w.path)) : []
            function go() {
                if (!ready) return
                deleteDlg.visible = false
                root.start(root.deleteReq.path, "delete")
                GitActions.deleteRepo(root.deleteReq.path, alsoGithub && info.canDeleteGithub === true)
            }
            Text {
                width: parent.width
                wrapMode: Text.Wrap
                text: qsTr("„%1“ kommt mit dem ganzen Ordner in den Papierkorb.").arg(root.deleteReq ? root.deleteReq.name : "")
                color: Theme.white; font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 16
            }
            Text {
                width: parent.width
                elide: Text.ElideMiddle
                text: deleteDlg.info ? deleteDlg.info.display : root.deleteReq ? root.deleteReq.path : ""
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: !deleteDlg.info
                text: qsTr("Prüfe Ordner …")
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: !!deleteDlg.info && deleteDlg.info.blocked
                width: parent.width
                wrapMode: Text.Wrap
                //: %1 = why the folder is locked
                text: deleteDlg.info ? qsTr("%1 – wird nicht gelöscht.").arg(deleteDlg.info.blockReason) : ""
                color: Theme.magenta; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: deleteDlg.ready
                width: parent.width
                wrapMode: Text.Wrap
                textFormat: Text.StyledText
                //: %1 = size of the folder
                text: !deleteDlg.ready ? "" : qsTr("Größe %1").arg("<font color=\"#cfeef2\">" + U.esc(deleteDlg.info.sizeText) + "</font>")
                      + " · " + (deleteDlg.info.dirty > 0 ? "<font color=\"#f9f002\">" + qsTr("%n Dateien nicht committet", "", deleteDlg.info.dirty) + "</font>"
                                 : deleteDlg.info.dirty < 0 ? qsTr("Arbeitsstand nicht lesbar") : qsTr("alles committet"))
                      //: %1 = formatted number of versions (commits) not pushed anywhere
                      + " · " + (deleteDlg.info.unpushed > 0 ? "<font color=\"#f9f002\">" + qsTr("%1 Versionen auf keinem Server", "", deleteDlg.info.unpushed).arg(U.num(deleteDlg.info.unpushed)) + "</font>"
                                 : deleteDlg.info.onlyLocal ? qsTr("keine Versionen") : qsTr("alle Versionen auf dem Server"))
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                objectName: "deleteOnlyCopy"
                visible: deleteDlg.ready && deleteDlg.info.onlyLocal
                text: qsTr("Das ist die einzige Kopie")
                color: Theme.magenta
                font.family: Theme.head; font.weight: Font.Bold; font.pixelSize: 16; font.letterSpacing: 1.6
            }
            Column {
                visible: deleteDlg.ready && (deleteDlg.info.nested || []).length > 0
                width: parent.width
                spacing: 2
                Text {
                    text: qsTr("Enthält weitere Repos – werden mitgelöscht:")
                    color: Theme.yellow; font.family: Theme.mono; font.pixelSize: 12
                }
                Repeater {
                    model: deleteDlg.info ? (deleteDlg.info.nested || []).slice(0, 8) : []
                    Text {
                        width: parent.width
                        elide: Text.ElideMiddle
                        text: "  " + modelData.display
                        color: Theme.text; font.family: Theme.mono; font.pixelSize: 12
                    }
                }
                Text {
                    visible: !!deleteDlg.info && (deleteDlg.info.nested || []).length > 8
                    text: "  " + qsTr("+ %n weitere", "", deleteDlg.info ? (deleteDlg.info.nested || []).length - 8 : 0)
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
            }
            Column {
                visible: deleteDlg.ready && deleteDlg.wts.length > 0
                width: parent.width
                spacing: 2
                Text {
                    text: qsTr("Arbeitskopien – kommen mit in den Papierkorb:")
                    color: Theme.yellow; font.family: Theme.mono; font.pixelSize: 12
                }
                Repeater {
                    model: deleteDlg.wts.slice(0, 8)
                    Text {
                        width: parent.width
                        elide: Text.ElideMiddle
                        //: worktree outside the project folder / its uncommitted files
                        text: "  ⧉ " + modelData.display + (modelData.inside ? "" : "  " + qsTr("(außerhalb)"))
                              + (modelData.dirty > 0 ? " · " + qsTr("%n nicht committet", "", modelData.dirty) : "")
                        color: Theme.text; font.family: Theme.mono; font.pixelSize: 12
                    }
                }
                Text {
                    visible: deleteDlg.wts.length > 8
                    text: "  " + qsTr("+ %n weitere", "", deleteDlg.wts.length - 8)
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
            }
            Text {
                visible: deleteDlg.ready && deleteDlg.agents.length > 0
                width: parent.width
                wrapMode: Text.Wrap
                //: %1 = worktree folders an AI agent is working in
                text: qsTr("⚠ Ein Agent arbeitet in %1").arg(deleteDlg.agents.map(w => w.display).join(", "))
                color: Theme.yellow; font.family: Theme.mono; font.pixelSize: 12
            }
            Item {
                objectName: "deleteGithub"
                visible: deleteDlg.ready && !!deleteDlg.info.github
                width: parent.width
                height: ghRow.implicitHeight
                opacity: deleteDlg.ready && deleteDlg.info.canDeleteGithub ? 1 : 0.4
                Row {
                    id: ghRow
                    spacing: 10
                    Rectangle {
                        width: 16; height: 16
                        anchors.verticalCenter: parent.verticalCenter
                        color: deleteDlg.alsoGithub ? U.rgba(Theme.magenta, 0.15) : "transparent"
                        border.width: 1
                        border.color: deleteDlg.alsoGithub || ghMa.containsMouse ? Theme.magenta : Theme.lineStrong
                        Text { anchors.centerIn: parent; visible: deleteDlg.alsoGithub; text: "✓"; color: Theme.magenta; font.pixelSize: 12 }
                    }
                    Text {
                        anchors.verticalCenter: parent.verticalCenter
                        textFormat: Text.StyledText
                        text: qsTr("Auch auf GitHub löschen") + " <font color=\"#ff2a6d\">" + qsTr("(endgültig)") + "</font> · "
                              + U.esc(deleteDlg.info && deleteDlg.info.github ? deleteDlg.info.github : "")
                        color: Theme.text; font.family: Theme.mono; font.pixelSize: 12
                    }
                }
                MouseArea {
                    id: ghMa
                    anchors.fill: parent
                    enabled: deleteDlg.ready && deleteDlg.info.canDeleteGithub === true
                    hoverEnabled: true
                    cursorShape: Qt.PointingHandCursor
                    onClicked: deleteDlg.alsoGithub = !deleteDlg.alsoGithub
                }
            }
            Text {
                visible: deleteDlg.ready && !!deleteDlg.info.github && !deleteDlg.info.canDeleteGithub
                width: parent.width
                wrapMode: Text.Wrap
                //: keep the command "gh auth refresh -s delete_repo" unchanged
                text: qsTr("gh darf keine Repos löschen – erst im Terminal: gh auth refresh -s delete_repo")
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 11
            }
            Item { width: 1; height: 4 }
            Row {
                spacing: 6
                Btn { objectName: "deleteConfirm"; kind: "pri"; text: qsTr("In den Papierkorb"); enabled: deleteDlg.ready; onClicked: deleteDlg.go() }
                Btn { text: qsTr("Abbrechen"); onClicked: deleteDlg.visible = false }
            }
        }
        Modal {
            id: visDlg
            title: root.visReq && root.visReq.toPublic ? qsTr("◉ ÖFFENTLICH MACHEN") : qsTr("🔒 PRIVAT MACHEN")
            accent: root.visReq && root.visReq.toPublic ? Theme.magenta : Theme.cyan
            onDismissed: visible = false
            function go() {
                if (!root.visReq) return
                visDlg.visible = false
                root.start(root.visReq.path, "visibility")
                GitActions.setVisibility(root.visReq.path, root.visReq.toPublic)
            }
            Text {
                width: parent.width
                wrapMode: Text.Wrap
                text: !root.visReq ? "" : root.visReq.toPublic ? qsTr("„%1“ wird auf GitHub öffentlich.").arg(root.visReq.name)
                      : qsTr("„%1“ wird auf GitHub privat – nur du siehst es dann.").arg(root.visReq.name)
                color: Theme.white; font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 16
            }
            Text {
                text: root.visReq ? "github.com/" + root.visReq.github : ""
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: !!root.visReq && root.visReq.toPublic
                width: parent.width
                wrapMode: Text.Wrap
                text: qsTr("Jeder kann den Code und alle bisherigen Versionen sehen.")
                color: Theme.magenta; font.family: Theme.mono; font.pixelSize: 12
            }
            Item { width: 1; height: 4 }
            Row {
                spacing: 6
                Btn { objectName: "visibilityConfirm"; kind: "pri"; text: root.visReq && root.visReq.toPublic ? qsTr("Öffentlich machen") : qsTr("Privat machen")
                      onClicked: visDlg.go() }
                Btn { text: qsTr("Abbrechen"); onClicked: visDlg.visible = false }
            }
        }
        Modal {
            id: unpubDlg
            title: qsTr("NUR NOCH LOKAL")
            accent: Theme.magenta
            onDismissed: visible = false
            readonly property var info: root.unpubReq ? root.unpubReq.info : null
            readonly property bool ready: !!info && !!info.github && info.canDeleteGithub === true && info.onlyRemote === 0
            function go() {
                if (!ready) return
                unpubDlg.visible = false
                root.start(root.unpubReq.path, "unpublish")
                GitActions.unpublish(root.unpubReq.path)
            }
            Text {
                width: parent.width
                wrapMode: Text.Wrap
                text: qsTr("Das Repo auf GitHub wird endgültig gelöscht (auch Issues/Releases). Dein Ordner hier bleibt vollständig.")
                color: Theme.white; font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 16
            }
            Text {
                text: root.unpubReq ? "github.com/" + root.unpubReq.github : ""
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: !unpubDlg.info
                text: qsTr("Gleiche mit GitHub ab …")
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                objectName: "unpublishOnlyRemote"
                visible: !!unpubDlg.info && unpubDlg.info.onlyRemote > 0
                width: parent.width
                wrapMode: Text.Wrap
                //: %1 = formatted number of versions (commits)
                text: unpubDlg.info ? qsTr("%1 Versionen gibt es nur auf GitHub – vorher Pull", "", unpubDlg.info.onlyRemote).arg(U.num(unpubDlg.info.onlyRemote)) : ""
                color: Theme.magenta
                font.family: Theme.head; font.weight: Font.Bold; font.pixelSize: 16; font.letterSpacing: 1.6
            }
            Text {
                visible: !!unpubDlg.info && unpubDlg.info.onlyRemote < 0
                width: parent.width
                wrapMode: Text.Wrap
                //: %1 = error message of git fetch
                text: unpubDlg.info ? qsTr("Abgleich mit GitHub fehlgeschlagen – %1").arg(unpubDlg.info.fetchError || qsTr("unbekannt")) : ""
                color: Theme.magenta; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: !!unpubDlg.info && unpubDlg.info.onlyRemote === 0
                text: qsTr("✓ alle Versionen von GitHub liegen auch hier")
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: !!unpubDlg.info && !!unpubDlg.info.github && !unpubDlg.info.canDeleteGithub
                width: parent.width
                wrapMode: Text.Wrap
                //: keep the command "gh auth refresh -s delete_repo" unchanged
                text: qsTr("gh darf keine Repos löschen – erst im Terminal: gh auth refresh -s delete_repo")
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 11
            }
            Item { width: 1; height: 4 }
            Row {
                spacing: 6
                Btn { objectName: "unpublishConfirm"; kind: "pri"; text: qsTr("Auf GitHub löschen"); enabled: unpubDlg.ready; onClicked: unpubDlg.go() }
                Btn { text: qsTr("Abbrechen"); onClicked: unpubDlg.visible = false }
            }
        }
        Modal {
            id: refDlg
            title: !root.refReq ? "" : root.refReq.kind === "branch" ? qsTr("ZWEIG LÖSCHEN")
                   : root.refReq.kind === "worktree" ? qsTr("ARBEITSKOPIE ENTFERNEN") : qsTr("TAG LÖSCHEN")
            accent: Theme.magenta
            onDismissed: visible = false
            readonly property var info: root.refReq ? root.refReq.info : null
            readonly property string kind: root.refReq ? root.refReq.kind : ""
            readonly property bool ready: !!info && !info.reason
            function go() {
                if (!ready) return
                refDlg.visible = false
                root.start(root.refReq.path, "deleteref")
                GitActions.deleteRef(root.refReq.path, root.refReq.kind, root.refReq.key)
            }
            Text {
                width: parent.width
                wrapMode: Text.Wrap
                text: !root.refReq ? ""
                      : refDlg.kind === "branch" ? qsTr("Zweig „%1“ wird gelöscht.").arg(root.refReq.label)
                      : refDlg.kind === "worktree" ? (refDlg.info && refDlg.info.branch
                                                      ? qsTr("Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht, der Zweig „%1“ bleibt.").arg(refDlg.info.branch)
                                                      : qsTr("Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht."))
                      : refDlg.info && refDlg.info.hasRemote ? qsTr("Tag „%1“ wird nur lokal gelöscht – auf dem Server bleibt er.").arg(root.refReq.label)
                      : qsTr("Tag „%1“ wird nur lokal gelöscht.").arg(root.refReq.label)
                color: Theme.white; font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 16
            }
            Text {
                visible: refDlg.kind === "worktree"
                width: parent.width
                elide: Text.ElideMiddle
                text: refDlg.info ? refDlg.info.display : root.refReq ? root.refReq.key : ""
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: !refDlg.info
                text: qsTr("Prüfe …")
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: !!refDlg.info && !!refDlg.info.reason
                width: parent.width
                wrapMode: Text.Wrap
                text: refDlg.info ? refDlg.info.reason || "" : ""
                color: Theme.magenta; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                objectName: "refUnique"
                visible: refDlg.ready && refDlg.kind === "branch" && refDlg.info.unique > 0
                width: parent.width
                wrapMode: Text.Wrap
                text: refDlg.info ? (refDlg.info.unique === 1 ? qsTr("1 Version gibt es nur in diesem Zweig")
                                                              : qsTr("%1 Versionen gibt es nur in diesem Zweig").arg(refDlg.info.unique)) : ""
                color: Theme.magenta
                font.family: Theme.head; font.weight: Font.Bold; font.pixelSize: 14; font.letterSpacing: 1.4
            }
            Text {
                visible: refDlg.ready && refDlg.kind === "branch"
                width: parent.width
                wrapMode: Text.Wrap
                text: refDlg.info && refDlg.info.unique > 0 ? qsTr("Sie gehen mit dem Zweig verloren.") : qsTr("Alle Versionen liegen auch in anderen Zweigen.")
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: refDlg.ready && refDlg.kind === "worktree" && refDlg.info.dirty > 0
                width: parent.width
                wrapMode: Text.Wrap
                text: refDlg.info ? qsTr("%n Dateien nicht committet – sie kommen in den Papierkorb.", "", refDlg.info.dirty) : ""
                color: Theme.magenta; font.family: Theme.mono; font.pixelSize: 12
            }
            Text {
                visible: refDlg.ready && refDlg.kind === "worktree" && root.agentIn(root.refReq.wts, root.refReq.key)
                width: parent.width
                wrapMode: Text.Wrap
                text: qsTr("⚠ Ein Agent arbeitet in dieser Arbeitskopie")
                color: Theme.yellow; font.family: Theme.mono; font.pixelSize: 12
            }
            Item { width: 1; height: 4 }
            Row {
                spacing: 6
                Btn { objectName: "refDeleteConfirm"; kind: "pri"; text: refDlg.kind === "worktree" ? qsTr("Entfernen") : qsTr("Löschen")
                      enabled: refDlg.ready; onClicked: refDlg.go() }
                Btn { text: qsTr("Abbrechen"); onClicked: refDlg.visible = false }
            }
        }
        Modal {
            id: progDlg
            title: qsTr("PROGRAMM LÖSCHEN")
            accent: Theme.magenta
            onDismissed: visible = false
            readonly property var info: root.progReq ? root.progReq.info : null
            readonly property var files: info ? (info.files || []) : []
            readonly property var launchers: info ? (info.launchers || []) : []
            function go() {
                if (files.length === 0) return
                progDlg.visible = false
                root.start(root.progReq.name, "deleteprogram")
                Updates.deleteProgram(root.progReq.name)
            }
            Text {
                width: parent.width
                wrapMode: Text.Wrap
                text: qsTr("„%1“ kommt in den Papierkorb.").arg(root.progReq ? root.progReq.title : "")
                color: Theme.white; font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 16
            }
            Text {
                visible: !progDlg.info
                //: looking for .desktop launchers of the program
                text: qsTr("Suche Starter …")
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Column {
                visible: progDlg.files.length > 0
                width: parent.width
                spacing: 2
                Repeater {
                    model: progDlg.files
                    Text {
                        width: parent.width
                        elide: Text.ElideMiddle
                        textFormat: Text.StyledText
                        text: U.esc(modelData.display) + " · <font color=\"#cfeef2\">" + U.esc(modelData.sizeText) + "</font>"
                        color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                    }
                }
            }
            Column {
                visible: !!progDlg.info
                width: parent.width
                spacing: 2
                Text {
                    text: progDlg.launchers.length ? qsTr("Starter – kommen mit in den Papierkorb:") : qsTr("Keine Starter gefunden.")
                    color: progDlg.launchers.length ? Theme.yellow : Theme.dim
                    font.family: Theme.mono; font.pixelSize: 12
                }
                Repeater {
                    model: progDlg.launchers
                    Text {
                        width: parent.width
                        elide: Text.ElideMiddle
                        text: "  " + modelData.display
                        color: Theme.text; font.family: Theme.mono; font.pixelSize: 12
                    }
                }
            }
            Item { width: 1; height: 4 }
            Row {
                spacing: 6
                Btn { objectName: "progDeleteConfirm"; kind: "pri"; text: qsTr("In den Papierkorb"); enabled: progDlg.files.length > 0; onClicked: progDlg.go() }
                Btn { text: qsTr("Abbrechen"); onClicked: progDlg.visible = false }
            }
        }
    }

    Component {
        id: commitComp
        CommitDetail { app: root; repo: root.selRepo; commit: root.selCommit }
    }
    Component {
        id: workComp
        WorkView { objectName: "workView"; app: root; repo: root.selRepo }
    }
    Component {
        id: releaseComp
        ReleaseView {
            app: root
            prog: root.selProgram
            release: root.selProgram && root.selRelease >= 0 ? (root.selProgram.releases || [])[root.selRelease] || null : null
        }
    }
}
