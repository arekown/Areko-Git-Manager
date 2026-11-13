import QtQuick
import QtQuick.Controls.Basic
import "Util.js" as U

// Column 2 for a repository: head with actions + timeline, branches/worktrees/tags, news from upstream,
// working state entry and the history by day with the version graph over all branches (loaded in steps of 300).
Item {
    id: rv
    property var app
    property var repo: null
    readonly property string path: repo ? repo.path : ""
    readonly property bool own: repo !== null && repo.group === "eigen"
    readonly property var news: repo ? (Updates.news[repo.path] || null) : null
    readonly property int newN: news ? (news.n || 0) : 0
    readonly property bool busy: repo !== null && app.isBusy(repo.path)
    // hard rule: a folder that is, contains or lies in ~/AI/ComfyUI/user is never deleted (C++ checks again)
    readonly property bool deleteLocked: {
        if (!repo) return false
        const u = Desktop.homePath() + "/AI/ComfyUI/user", p = String(repo.path).replace(/\/+$/, "")
        return p === u || u.indexOf(p + "/") === 0 || p.indexOf(u + "/") === 0
    }

    readonly property var emptyHist: ({ commits: [], rows: [], gaps: [], maxLane: 0, total: 0 })
    property var hist: emptyHist
    property var dayFirst: ({})
    property bool loading: false
    property bool exhausted: false
    readonly property int gw: 14 + Math.min(hist.maxLane, 7) * 13
    readonly property int headLane: {
        const cs = hist.commits
        for (let i = 0; i < cs.length; i++)
            if ((cs[i].refs || []).some(r => r === "HEAD" || r.indexOf("HEAD -> ") === 0)) return Math.min(cs[i].lane || 0, 7)
        return 0
    }

    onPathChanged: reset()
    Component.onCompleted: reset()

    function reset() {
        hm.clear()
        hist = emptyHist
        dayFirst = {}
        exhausted = false
        loading = false
        list.positionViewAtBeginning()
        if (path) load(300)
    }
    function load(n) {
        loading = true
        RepoStore.loadHistory(path, n)
    }
    function reload() {
        const n = Math.max(300, hist.commits.length)
        hm.clear()
        hist = emptyHist
        dayFirst = {}
        exhausted = false
        load(n)
    }
    function maybeMore() {
        if (loading || exhausted || !path || hist.commits.length === 0 || hist.commits.length >= hist.total) return
        if (list.contentY - list.originY + list.height >= list.contentHeight - 600)
            load(hist.commits.length + 300)
    }

    Connections {
        target: RepoStore
        function onHistoryLoaded(path, commits, edges, maxLane, total) {
            if (path !== rv.path) return
            rv.loading = false
            let old = rv.hist.commits.length
            if (old > 0 && (commits.length < old || commits.length === 0 || commits[0].id !== rv.hist.commits[0].id)) {
                hm.clear()
                old = 0
            }
            if (old > 0 && commits.length === old) rv.exhausted = true
            const g = U.graphRows(commits.length, edges, Theme.lanes)
            const keys = [], df = {}
            let last = "", run = 0
            for (let i = 0; i < commits.length; i++) {
                const k = U.dayKey(commits[i].date)
                if (k !== last) { run++; last = k; df[k + "#" + run] = i }
                keys.push(k + "#" + run)
            }
            rv.dayFirst = df
            rv.hist = { commits: commits, rows: g.rows, gaps: g.gaps, maxLane: maxLane, total: total }
            for (let i = old; i < commits.length; i++) hm.append({ day: keys[i] })
            if (old === 0) Qt.callLater(list.positionViewAtBeginning)   // header (branches) fully visible
        }
    }
    Connections {
        target: rv.app
        function onRepoTouched(p) { if (p === rv.path) rv.reload() }
    }

    function refItems() {
        const r = repo, items = []
        if (!r) return items
        const refs = r.refs || []
        for (const x of refs) if (x.kind === "branch")
            items.push({ ic: "⎇", c: Theme.cyan, name: x.name, cur: x.name === r.branch, date: x.date, hash: x.hash, sub: x.subject,
                         kind: "branch", key: x.name })
        for (const w of (r.worktrees || []).slice(1)) {
            const b = refs.find(x => x.kind === "branch" && x.name === w.branch)
            const i = items.findIndex(x => x.name === w.branch)
            if (i >= 0) items.splice(i, 1)
            const d = String(w.display || w.path).split("/")
            items.push({ ic: "⧉", c: Theme.ok, name: w.branch || qsTr("(losgelöst)", "worktree on a detached HEAD"), cur: false,
                         sub: qsTr("Arbeitskopie %1", "%1 = last two folders of a worktree").arg(d.slice(-2).join("/")),
                         date: b ? b.date : "", hash: b ? b.hash : "", kind: "worktree", key: w.path })
        }
        for (const x of refs) if (x.kind === "remote")
            items.push({ ic: "☁", c: Theme.teal, name: x.name, cur: false, date: x.date, hash: x.hash, sub: x.subject, kind: "remote", key: "" })
        items.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
        return items
    }
    readonly property var refList: refItems()
    readonly property var tagList: repo ? (repo.refs || []).filter(x => x.kind === "tag") : []
    readonly property var agentWts: repo ? (repo.worktrees || []).filter(w => w.agent && w.active) : []

    // ---------- ".phead" ----------
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
                text: rv.repo ? rv.repo.name : ""
                color: Theme.white
                font.family: Theme.head; font.weight: Font.Bold; font.pixelSize: 20; font.letterSpacing: 2.4
            }
            Item { width: 1; height: 8 }
            Flow {
                width: parent.width
                spacing: 18
                Text { text: rv.repo ? (rv.repo.display || rv.repo.path) : ""; color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12 }
                Text {
                    objectName: "remoteLink"
                    visible: rv.repo !== null && !!rv.repo.remote
                    textFormat: Text.StyledText
                    text: rv.repo && rv.repo.remote ? "☁ <font color=\"#05d9e8\">" + U.esc(U.shortUrl(rv.repo.remote)) + "</font>" : ""
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                    MouseArea {
                        anchors.fill: parent
                        cursorShape: Qt.PointingHandCursor
                        onClicked: Desktop.openUrl(U.webUrl(rv.repo.remote))
                    }
                }
                Badge {
                    objectName: "visibilityBadge"
                    visible: rv.own && !!rv.repo.visibility
                    text: rv.repo && rv.repo.visibility === "public" ? qsTr("◉ ÖFFENTLICH") : qsTr("🔒 PRIVAT")
                    tone: rv.repo && rv.repo.visibility === "public" ? Theme.ok : Theme.yellow
                    edge: 0.45
                }
                Text {
                    visible: rv.repo !== null && !rv.repo.remote
                    text: qsTr("⚠ nur lokal – keine Sicherung außerhalb dieses Rechners")
                    color: Theme.yellow; font.family: Theme.mono; font.pixelSize: 12
                }
                Text {
                    textFormat: Text.StyledText
                    //: %1 = branch name
                    text: qsTr("Zweig %1").arg("<font color=\"#cfeef2\">" + U.esc(rv.repo && rv.repo.branch ? rv.repo.branch : "–") + "</font>")
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
                Text {
                    textFormat: Text.StyledText
                    //: number of versions (commits); %1 = formatted number
                    text: qsTr("%1 Versionen", "", rv.repo ? rv.repo.count : 0).arg("<font color=\"#cfeef2\">" + U.num(rv.repo ? rv.repo.count : 0) + "</font>")
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
                Text {
                    visible: rv.repo !== null && rv.repo.dirty >= 0
                    textFormat: Text.StyledText
                    text: !rv.repo ? "" : rv.repo.dirty > 0 ? "● " + qsTr("%1 Dateien nicht committet", "", rv.repo.dirty).arg("<font color=\"#cfeef2\">" + rv.repo.dirty + "</font>")
                          : qsTr("✓ alles committet")
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
            }
            Item { width: 1; height: rv.agentWts.length ? 8 : 0 }
            Text {
                objectName: "agentWarning"
                visible: rv.agentWts.length > 0
                width: parent.width
                wrapMode: Text.Wrap
                //: %1 = worktree folders an AI agent is working in
                text: qsTr("⚠ Ein Agent arbeitet in %1 – vor Commit/Pull abstimmen").arg(rv.agentWts.map(w => w.display || w.path).join(", "))
                color: Theme.yellow; font.family: Theme.mono; font.pixelSize: 12
            }
            Item { width: 1; height: 12 }
            Flow {
                width: parent.width
                spacing: 6
                Btn {
                    objectName: "btnUpdate"
                    visible: rv.repo !== null && !rv.own
                    kind: rv.newN ? "ok" : ""
                    enabled: rv.newN > 0 && (!rv.busy || running)
                    //: %1 = number of new versions upstream / repo is up to date
                    text: rv.newN ? qsTr("↓ Aktualisieren (%1)").arg(rv.newN) : qsTr("✓ Aktuell")
                    running: rv.repo !== null && rv.app.isRunning(rv.repo.path, "update")
                    onClicked: rv.app.doUpdate(rv.repo)
                }
                Btn {
                    objectName: "btnCommit"
                    visible: rv.own
                    kind: "pri"
                    text: qsTr("Commit …")
                    running: rv.repo !== null && (rv.app.isRunning(rv.repo.path, "commit") || rv.app.isRunning(rv.repo.path, "commitpush"))
                    onClicked: rv.app.openWork()
                }
                Btn {
                    objectName: "btnPull"
                    visible: rv.own
                    enabled: rv.repo !== null && !!rv.repo.remote && (!rv.busy || running)
                    text: qsTr("↓ Pull")
                    running: rv.repo !== null && rv.app.isRunning(rv.repo.path, "pull")
                    onClicked: rv.app.doPull(rv.repo)
                }
                Btn {
                    objectName: "btnPush"
                    visible: rv.own
                    enabled: rv.repo !== null && !!rv.repo.remote && (!rv.busy || running)
                    text: qsTr("↑ Push")
                    running: rv.repo !== null && rv.app.isRunning(rv.repo.path, "push")
                    onClicked: rv.app.doPush(rv.repo)
                }
                Btn {
                    objectName: "btnPublish"
                    visible: rv.own && !rv.repo.remote
                    enabled: !rv.busy || running
                    text: qsTr("☁ Auf GitHub sichern")
                    running: rv.repo !== null && rv.app.isRunning(rv.repo.path, "publish")
                    onClicked: rv.app.askPublish(rv.repo)
                }
                Btn {
                    objectName: "btnVisibility"
                    visible: rv.own && !!rv.repo.github && !!rv.repo.visibility
                    enabled: !rv.busy || running
                    text: rv.repo && rv.repo.visibility === "private" ? qsTr("◉ Öffentlich machen") : qsTr("🔒 Privat machen")
                    running: rv.repo !== null && rv.app.isRunning(rv.repo.path, "visibility")
                    onClicked: rv.app.askVisibility(rv.repo)
                }
                Btn {
                    objectName: "btnUnpublish"
                    visible: rv.own && !!rv.repo.github
                    kind: "del"
                    enabled: !rv.busy || running
                    //: button: delete the GitHub copy, keep the local folder
                    text: qsTr("Nur noch lokal")
                    running: rv.repo !== null && rv.app.isRunning(rv.repo.path, "unpublish")
                    onClicked: rv.app.askUnpublish(rv.repo)
                }
                //: button: opens the folder in the file manager
                Btn { text: qsTr("Ordner"); onClicked: Desktop.openFolder(rv.path) }
                Btn { text: qsTr("Terminal"); onClicked: Desktop.openTerminal(rv.path) }
                Btn { text: "Kate"; onClicked: Desktop.openEditor(rv.path) }
                Btn {
                    objectName: "btnDeleteRepo"
                    kind: "del"
                    enabled: !rv.deleteLocked && (!rv.busy || running)
                    text: qsTr("Löschen")
                    running: rv.repo !== null && rv.app.isRunning(rv.repo.path, "delete")
                    onClicked: rv.app.askDeleteRepo(rv.repo)
                }
                Text {
                    visible: rv.deleteLocked
                    height: 32
                    verticalAlignment: Text.AlignVCenter
                    text: qsTr("Löschen gesperrt – enthält ~/AI/ComfyUI/user")
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
            }
            Item { width: 1; height: tline.visible ? 12 : 0 }
            Timeline {
                id: tline
                app: rv.app
                visible: rv.repo !== null && !!rv.repo.timeline && rv.repo.count >= 3
                width: parent.width
                height: visible ? 58 : 0
                tlData: rv.repo ? rv.repo.timeline || null : null
                loaded: rv.hist.commits.length
                loadedFrom: rv.hist.commits.length ? new Date(rv.hist.commits[rv.hist.commits.length - 1].date).getTime() / 1000 : 0
            }
        }
    }

    ListModel { id: hm }

    ListView {
        id: list
        objectName: "historyList"
        anchors.top: head.bottom
        anchors.bottom: parent.bottom
        width: parent.width
        clip: true
        model: hm
        cacheBuffer: 800
        boundsBehavior: Flickable.StopAtBounds
        ScrollBar.vertical: ScrollBar { }
        onContentYChanged: Qt.callLater(rv.maybeMore)
        onContentHeightChanged: Qt.callLater(rv.maybeMore)

        section.property: "day"
        section.criteria: ViewSection.FullString
        section.labelPositioning: ViewSection.InlineLabels | ViewSection.CurrentLabelAtStart
        section.delegate: Item {
            id: dh
            required property string section
            readonly property int first: rv.dayFirst[section] !== undefined ? rv.dayFirst[section] : -1
            readonly property bool sticky: Math.abs(y - list.contentY) < 0.5 && first > 0
            width: list.width
            height: 28
            z: 3
            // background leaves the graph strip open, so lanes run through the label
            Rectangle { width: 74; height: parent.height; color: Theme.bg2 }
            Rectangle { x: 74 + rv.gw; width: parent.width - x; height: parent.height; color: Theme.bg2 }
            Canvas {
                id: gapCanvas
                x: 74; width: rv.gw; height: dh.height
                visible: !dh.sticky
                readonly property var pieces: dh.first >= 0 ? (rv.hist.gaps[dh.first] || []) : []
                onPiecesChanged: requestPaint()
                onHeightChanged: requestPaint()
                onPaint: {
                    const ctx = getContext("2d")
                    ctx.reset()
                    ctx.lineWidth = 2
                    ctx.globalAlpha = 0.75
                    for (const s of pieces) U.paintPiece(ctx, { k: "full", a: s.a, col: s.col }, height)
                }
            }
            Text {
                id: dl
                x: 84 + rv.gw; y: 10
                text: U.dayLabel(dh.section, rv.app.now)
                color: Theme.text
                font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 10; font.letterSpacing: 1.8
            }
            Rectangle {
                x: dl.x + dl.implicitWidth + 10
                anchors.verticalCenter: dl.verticalCenter
                width: Math.max(0, parent.width - x - 20); height: 1
                gradient: Gradient {
                    orientation: Gradient.Horizontal
                    GradientStop { position: 0; color: Theme.lineStrong }
                    GradientStop { position: 1; color: "transparent" }
                }
            }
        }

        header: Column {
            width: list.width

            SecHead { text: qsTr("ZWEIGE & ARBEITSKOPIEN"); note: String(rv.refList.length) }
            Repeater {
                model: rv.refList.slice(0, 8)
                RefRow {
                    width: list.width
                    icon: modelData.ic; iconColor: modelData.c
                    name: modelData.name; current: modelData.cur
                    sub: modelData.sub || ""
                    date: U.rel(modelData.date, rv.app.now); hash: modelData.hash || ""
                    deletable: modelData.kind !== "remote"
                    onDeleteClicked: rv.app.askDeleteRef(rv.repo, modelData.kind, modelData.key, modelData.name)
                }
            }
            MoreText { visible: rv.refList.length > 8; text: qsTr("+ %n weitere", "", rv.refList.length - 8) }

            SecHead { visible: rv.tagList.length > 0; text: qsTr("VERSIONEN (TAGS)"); note: String(rv.tagList.length) }
            Repeater {
                model: rv.tagList.slice(0, 6)
                RefRow {
                    width: list.width
                    icon: "◆"; iconColor: Theme.yellow
                    name: modelData.name; sub: modelData.subject || ""
                    date: U.rel(modelData.date, rv.app.now); hash: modelData.hash || ""
                    deletable: true
                    onDeleteClicked: rv.app.askDeleteRef(rv.repo, "tag", modelData.name, modelData.name)
                }
            }

            // incoming versions from upstream (not downloaded yet)
            SecHead { visible: rv.newN > 0; text: qsTr("NEU AUF GITHUB"); note: qsTr("%n Versionen noch nicht geladen", "", rv.newN) }
            Repeater {
                model: rv.newN > 0 ? (rv.news.c || []) : []
                Item {
                    width: list.width
                    height: inS.implicitHeight + inA.implicitHeight + 2 + 14
                    opacity: 0.78
                    Text { x: 20; y: 10; width: 44; text: "↓ " + U.dm(modelData.d); color: Theme.ok; font.family: Theme.mono; font.pixelSize: 12 }
                    Text {
                        id: inS
                        x: 74 + 24; y: 7
                        width: parent.width - x - 20 - inH.implicitWidth - 10
                        text: modelData.s || ""
                        wrapMode: Text.Wrap; maximumLineCount: 2; elide: Text.ElideRight
                        lineHeightMode: Text.FixedHeight; lineHeight: 20
                        color: Theme.text; font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 15
                    }
                    Text { id: inA; x: inS.x; y: inS.y + inS.height + 2; text: modelData.a || ""; color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12 }
                    Text { id: inH; anchors.right: parent.right; anchors.rightMargin: 20; y: 10; text: modelData.h || ""; color: Theme.teal; font.family: Theme.mono; font.pixelSize: 12 }
                }
            }
            MoreText {
                visible: rv.newN > 0 && rv.newN > (rv.news.c || []).length
                text: qsTr("… und %n weitere", "", rv.newN - (rv.newN > 0 ? (rv.news.c || []).length : 0))
            }

            //: %1 = loaded versions, %2 = all versions (formatted number)
            SecHead { text: qsTr("VERLAUF"); note: qsTr("neueste %1 von %2 · alle Zweige").arg(rv.hist.commits.length).arg(U.num(rv.hist.total || (rv.repo ? rv.repo.count : 0))) }

            // working state: uncommitted changes as the topmost entry
            Item {
                id: wip
                objectName: "wipRow"
                readonly property bool sel: rv.app.detailMode === "work"
                visible: rv.own && rv.repo.dirty > 0
                width: list.width
                height: visible ? 50 : 0
                Rectangle {
                    anchors.fill: parent
                    color: wip.sel ? U.rgba(Theme.magenta, 0.08) : wipMa.containsMouse ? Theme.rowHover : "transparent"
                    Rectangle { visible: wip.sel; x: 0; y: 4; width: 3; height: parent.height - 8; color: Theme.magenta }
                }
                Text { x: 20; y: 10; text: qsTr("jetzt", "time column of the working state row"); color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12 }
                Canvas {
                    x: 74; width: rv.gw; height: wip.height
                    readonly property int lane: rv.headLane
                    readonly property bool hasHist: rv.hist.commits.length > 0
                    onLaneChanged: requestPaint()
                    onHasHistChanged: requestPaint()
                    onHeightChanged: requestPaint()
                    onPaint: {
                        const ctx = getContext("2d")
                        ctx.reset()
                        const x = U.laneX(lane), cy = height / 2
                        ctx.strokeStyle = Theme.magenta
                        ctx.lineWidth = 2
                        ctx.globalAlpha = 0.75
                        if (hasHist) {          // dashed link down to the current version
                            ctx.beginPath()
                            for (let y = cy + 6; y < height; y += 6) { ctx.moveTo(x, y); ctx.lineTo(x, Math.min(height, y + 3)) }
                            ctx.stroke()
                        }
                        ctx.globalAlpha = 1
                        ctx.fillStyle = String(Theme.bg2)
                        ctx.beginPath(); ctx.arc(x, cy, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
                    }
                }
                Text {
                    x: 74 + rv.gw + 10; y: 7
                    text: "● " + qsTr("NICHT COMMITTET") + " · " + (rv.repo && rv.repo.dirty === 1 ? qsTr("%1 Datei") : qsTr("%1 Dateien")).arg(rv.repo ? rv.repo.dirty : 0)
                    color: Theme.magenta; font.family: Theme.num; font.weight: Font.DemiBold; font.pixelSize: 15
                    lineHeightMode: Text.FixedHeight; lineHeight: 20
                }
                Text {
                    x: 74 + rv.gw + 10; y: 29
                    text: qsTr("Arbeitskopie · Zweig %1").arg(rv.repo && rv.repo.branch ? rv.repo.branch : "–")
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
                MouseArea {
                    id: wipMa
                    anchors.fill: parent
                    hoverEnabled: true
                    cursorShape: Qt.PointingHandCursor
                    onClicked: rv.app.openWork()
                }
            }
        }

        delegate: Item {
            id: row
            required property int index
            readonly property var c: rv.hist.commits[index] || null
            readonly property bool sel: c !== null && rv.app.selCommitId === c.id
            readonly property var chips: {
                const out = []
                if (!c) return out
                for (const d of (c.refs || [])) { const x = U.refChip(d); if (x) out.push(x) }
                if (c.hasImage) out.push({ t: qsTr("▣ BILD", "chip: this version changes a picture"), k: "tg" })
                return out
            }
            objectName: c ? "commit_" + c.hash : ""
            width: list.width
            height: 7 + subj.height + 2 + auth.implicitHeight + 7

            Rectangle {
                anchors.fill: parent
                color: row.sel ? U.rgba(Theme.magenta, 0.08) : rowMa.containsMouse ? Theme.rowHover : "transparent"
                Rectangle { visible: row.sel; x: 0; y: 4; width: 3; height: parent.height - 8; color: Theme.magenta }
            }
            Text {
                x: 20; y: 10; width: 44
                text: row.c ? U.time(row.c.date) : ""
                color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
            }
            Canvas {
                id: gcan
                x: 74; width: rv.gw; height: row.height
                readonly property var pieces: rv.hist.rows[row.index] || []
                readonly property bool merge: row.c !== null && (row.c.parents || []).length > 1
                readonly property int lane: row.c ? Math.min(row.c.lane || 0, 7) : 0
                onPiecesChanged: requestPaint()
                onHeightChanged: requestPaint()
                onWidthChanged: requestPaint()
                Connections { target: row; function onSelChanged() { gcan.requestPaint() } }
                onPaint: {
                    const ctx = getContext("2d")
                    ctx.reset()
                    ctx.lineWidth = 2
                    ctx.globalAlpha = 0.75
                    for (const s of pieces) U.paintPiece(ctx, s, height)
                    ctx.globalAlpha = 1
                    const col = Theme.lanes[lane % Theme.lanes.length]
                    ctx.strokeStyle = col
                    ctx.fillStyle = row.sel ? col : String(Theme.bg2)
                    ctx.beginPath()
                    ctx.arc(U.laneX(lane), height / 2, merge ? 4 : 4.5, 0, Math.PI * 2)
                    ctx.fill()
                    ctx.stroke()
                }
            }
            Item {
                id: content
                x: 74 + rv.gw + 10; y: 7
                width: row.width - x - 20 - hashT.implicitWidth - 10
                height: subj.height + 2 + auth.implicitHeight
                Row {
                    id: chipRow
                    y: 2
                    spacing: 4
                    width: Math.min(implicitWidth, content.width * 0.6)
                    clip: true
                    Repeater {
                        model: row.chips
                        Badge {
                            small: true
                            text: modelData.t
                            tone: modelData.k === "tg" ? Theme.yellow : modelData.k === "rm" ? Theme.cyan : Theme.magenta
                            edge: modelData.k === "rm" ? 0.45 : 0.5
                        }
                    }
                }
                Text {
                    id: subj
                    readonly property real indent: row.chips.length ? chipRow.width + 10 : 0
                    onIndentChanged: forceLayout()
                    width: parent.width
                    text: row.c ? row.c.subject : ""
                    wrapMode: Text.Wrap
                    maximumLineCount: 2
                    elide: Text.ElideRight
                    lineHeightMode: Text.FixedHeight
                    lineHeight: 20
                    color: Theme.white
                    font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 15
                    onLineLaidOut: (line) => {
                        if (line.number === 0 && indent > 0) {
                            line.x = indent
                            line.width = Math.max(10, width - indent)
                        }
                    }
                }
                Text {
                    id: auth
                    y: subj.height + 2
                    text: row.c ? row.c.author : ""
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12
                }
            }
            Text {
                id: hashT
                anchors.right: parent.right; anchors.rightMargin: 20
                y: 10
                text: row.c ? row.c.hash : ""
                color: Theme.teal; font.family: Theme.mono; font.pixelSize: 12
            }
            MouseArea {
                id: rowMa
                anchors.fill: parent
                hoverEnabled: true
                cursorShape: Qt.PointingHandCursor
                onClicked: if (row.c) rv.app.selectCommit(row.c)
            }
        }

        footer: Item {
            width: list.width
            height: more.visible ? more.implicitHeight : 0
            MoreText {
                id: more
                width: parent.width
                visible: rv.hist.commits.length > 0 && rv.hist.commits.length < rv.hist.total && !rv.exhausted
                text: qsTr("… ältere Versionen werden beim Scrollen nachgeladen")
            }
        }
    }
}
