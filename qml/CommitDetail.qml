import QtQuick
import QtQuick.Controls.Basic
import "Util.js" as U

// Column 3 for one version: subject, meta, body, file list or file map, diff or picture comparison.
Item {
    id: cd
    property var app
    property var repo: null
    property var commit: null
    property var detail: null
    property int fileIdx: 0
    property string view: "auto"          // auto | list | map
    property var lines: []
    property bool diffReady: false

    readonly property string path: repo ? repo.path : ""
    readonly property var files: detail && detail.files ? detail.files : []
    readonly property int total: detail ? (detail.filesTotal || files.length) : 0
    readonly property bool map: view === "map" || (view === "auto" && total >= 12)
    readonly property var file: files[fileIdx] || null
    readonly property bool isImg: file !== null && (!!file.imgOld || !!file.imgNew)

    onCommitChanged: load()
    Component.onCompleted: load()

    function sameHash(h) { return commit !== null && (h === commit.id || h === commit.hash || String(commit.id).indexOf(h) === 0) }
    function load() {
        detail = null; fileIdx = 0; view = app && app.fileView ? app.fileView : "auto"; lines = []; diffReady = false
        if (commit && path) RepoStore.loadDetail(path, commit.id)
    }
    function pick(i) {
        fileIdx = i
        lines = []; diffReady = false
        const f = files[i]
        if (f && !f.imgOld && !f.imgNew) RepoStore.loadDiff(path, commit.id, f.name)
    }

    Connections {
        target: RepoStore
        function onDetailLoaded(path, hash, d) {
            if (path !== cd.path || !cd.sameHash(hash)) return
            cd.detail = d
            const fs = d.files || []
            const k = fs.findIndex(f => !!f.imgNew || !!f.imgOld)       // a picture first, so the comparison shows
            cd.pick(k >= 0 ? k : 0)
        }
        function onDiffLoaded(path, hash, file, lines) {
            if (path !== cd.path || !cd.sameHash(hash) || !cd.file || file !== cd.file.name) return
            cd.lines = lines
            cd.diffReady = true
        }
    }

    // ---------- ".chead" ----------
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
                height: Math.max(h2.implicitHeight, 30)
                Text {
                    id: h2
                    width: parent.width - 40
                    wrapMode: Text.Wrap
                    text: cd.commit ? cd.commit.subject : ""
                    color: Theme.white
                    font.family: Theme.num; font.weight: Font.DemiBold; font.pixelSize: 19
                    lineHeightMode: Text.FixedHeight; lineHeight: 24
                }
                CloseX { anchors.right: parent.right; onClicked: cd.app.closeDetail() }
            }
            Item { width: 1; height: 6 }
            Flow {
                width: parent.width
                spacing: 16
                Text { text: cd.commit ? cd.commit.hash : ""; color: Theme.text; font.family: Theme.mono; font.pixelSize: 12 }
                Text { text: cd.commit ? U.full(cd.commit.date) : ""; color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12 }
                Text { text: cd.commit ? cd.commit.author : ""; color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12 }
                Text {
                    visible: cd.commit !== null && (cd.commit.parents || []).length > 1
                    text: qsTr("Zusammenführung", "merge commit"); color: Theme.magenta; font.family: Theme.mono; font.pixelSize: 12
                }
            }
            Item { width: 1; height: bodyBox.visible ? 10 : 0 }
            Flickable {
                id: bodyBox
                visible: cd.commit !== null && !!cd.commit.body
                width: parent.width
                height: Math.min(90, bodyT.implicitHeight)
                contentHeight: bodyT.implicitHeight
                clip: true
                boundsBehavior: Flickable.StopAtBounds
                opacity: 0.85
                Text {
                    id: bodyT
                    width: bodyBox.width
                    wrapMode: Text.Wrap
                    text: cd.commit ? cd.commit.body || "" : ""
                    textFormat: Text.PlainText
                    lineHeightMode: Text.FixedHeight; lineHeight: 18
                    color: Theme.text; font.family: Theme.mono; font.pixelSize: 12
                }
            }
            Item { width: 1; height: sum.visible ? 10 : 0 }
            Item {
                id: sum
                visible: cd.detail !== null && cd.detail.loaded !== false
                width: parent.width
                height: 22
                Row {
                    spacing: 16
                    anchors.verticalCenter: parent.verticalCenter
                    Text { text: (cd.total === 1 ? qsTr("%1 Datei") : qsTr("%1 Dateien")).arg(cd.total); color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12 }
                    Text { text: "+" + U.num(cd.detail ? cd.detail.add : 0); color: Theme.ok; font.family: Theme.mono; font.pixelSize: 12 }
                    Text { text: "−" + U.num(cd.detail ? cd.detail.rem : 0); color: Theme.magenta; font.family: Theme.mono; font.pixelSize: 12 }
                }
                Row {
                    anchors.right: parent.right
                    spacing: 2
                    Repeater {
                        //: file view switch: list / map of tiles
                        model: [{ k: "list", l: qsTr("LISTE") }, { k: "map", l: qsTr("KARTE") }]
                        Rectangle {
                            readonly property bool on: (modelData.k === "map") === cd.map
                            objectName: modelData.k === "map" ? "viewMap" : "viewList"
                            width: vt.implicitWidth + 18; height: 22
                            color: "transparent"
                            border.width: 1
                            border.color: on ? Theme.lineStrong : "transparent"
                            Text {
                                id: vt
                                anchors.centerIn: parent
                                text: modelData.l
                                color: parent.on ? Theme.white : Theme.dim
                                font.family: Theme.head; font.weight: Font.DemiBold; font.pixelSize: 9; font.letterSpacing: 1.26
                            }
                            MouseArea { anchors.fill: parent; cursorShape: Qt.PointingHandCursor; onClicked: { cd.view = modelData.k; cd.app.fileView = modelData.k } }
                        }
                    }
                }
            }
        }
    }

    // ---------- files: list or map ----------
    Item {
        id: filesBox
        anchors.top: head.bottom
        width: parent.width
        visible: cd.files.length > 0
        height: !visible ? 0 : cd.map ? tmap.implicitHeight + 10 : Math.min(fileList.contentHeight, cd.height * 0.38)
        Rectangle { anchors.bottom: parent.bottom; width: parent.width; height: 1; color: Theme.line; z: 2 }
        Treemap {
            id: tmap
            visible: cd.map
            y: 10
            width: parent.width
            app: cd.app
            files: cd.files
            selIdx: cd.fileIdx
            onPicked: (i) => cd.pick(i)
        }
        ListView {
            id: fileList
            objectName: "fileList"
            visible: !cd.map
            anchors.fill: parent
            clip: true
            boundsBehavior: Flickable.StopAtBounds
            model: cd.map ? [] : cd.files
            ScrollBar.vertical: ScrollBar { }
            readonly property real mx: {
                let m = 1
                for (const f of cd.files) m = Math.max(m, Math.max(0, f.add) + Math.max(0, f.rem))
                return m
            }
            delegate: Item {
                id: fl
                readonly property var f: modelData
                readonly property bool sel: cd.fileIdx === index
                readonly property int a: Math.max(0, f.add)
                readonly property int m: Math.max(0, f.rem)
                readonly property real bw: (a + m) / fileList.mx * 64
                objectName: "file_" + index
                width: fileList.width
                height: 28
                Rectangle {
                    anchors.fill: parent
                    color: fl.sel ? U.rgba(Theme.cyan, 0.08) : flMa.containsMouse ? Theme.rowHover : "transparent"
                    Rectangle { visible: fl.sel; width: 3; height: parent.height; color: Theme.cyan }
                }
                Text {
                    x: 20; width: 22
                    anchors.verticalCenter: parent.verticalCenter
                    horizontalAlignment: Text.AlignHCenter
                    text: fl.f.status
                    color: fl.f.status === "A" ? Theme.ok : fl.f.status === "D" ? Theme.magenta : fl.f.status === "R" ? Theme.yellow : Theme.cyan
                    font.family: Theme.mono; font.bold: true; font.pixelSize: 12
                }
                Text {
                    x: 52
                    width: pm.x - x - 10
                    anchors.verticalCenter: parent.verticalCenter
                    elide: Text.ElideLeft
                    textFormat: Text.StyledText
                    readonly property var parts: fl.f.name.split("/")
                    text: (parts.length > 1 ? "<font color=\"#5f7d86\">" + U.esc(parts.slice(0, -1).join("/")) + "/</font>" : "") + U.esc(parts[parts.length - 1])
                    color: Theme.white; font.family: Theme.mono; font.pixelSize: 13
                }
                Text {
                    id: pm
                    x: bar.x - implicitWidth - 10
                    anchors.verticalCenter: parent.verticalCenter
                    textFormat: Text.StyledText
                    text: fl.f.imgNew || fl.f.imgOld ? "<font color=\"#f9f002\">" + qsTr("▣ Bild") + "</font>"
                          : fl.f.add < 0 ? qsTr("binär")
                          : "<font color=\"#00ff9f\">+" + fl.a + "</font> <font color=\"#ff2a6d\">−" + fl.m + "</font>"
                    color: Theme.dim; font.family: Theme.mono; font.pixelSize: 11
                }
                Rectangle {
                    id: bar
                    x: fl.width - 20 - 64
                    anchors.verticalCenter: parent.verticalCenter
                    width: 64; height: 6
                    color: U.rgba(Theme.dim, 0.2)
                    Rectangle { width: fl.a / Math.max(1, fl.a + fl.m) * fl.bw; height: 6; color: Theme.ok }
                    Rectangle { x: fl.a / Math.max(1, fl.a + fl.m) * fl.bw; width: fl.m / Math.max(1, fl.a + fl.m) * fl.bw; height: 6; color: Theme.magenta }
                }
                MouseArea { id: flMa; anchors.fill: parent; hoverEnabled: true; cursorShape: Qt.PointingHandCursor; onClicked: cd.pick(index) }
            }
            footer: Item {
                width: fileList.width
                height: moreFiles.visible ? moreFiles.implicitHeight : 0
                MoreText {
                    id: moreFiles
                    width: parent.width
                    visible: cd.total > cd.files.length
                    text: qsTr("+ %n weitere Dateien", "", cd.total - cd.files.length)
                }
            }
        }
    }

    // ---------- diff / pictures ----------
    Item {
        id: diffBox
        anchors.top: filesBox.bottom
        anchors.bottom: parent.bottom
        width: parent.width
        clip: true
        Text {
            visible: cd.detail !== null && (cd.detail.loaded === false || cd.files.length === 0)
            x: 24; y: 40
            width: parent.width - 48
            horizontalAlignment: Text.AlignHCenter
            wrapMode: Text.Wrap
            text: qsTr("Für diese Version liegen keine Dateiänderungen vor.")
            color: Theme.dim; font.family: Theme.num; font.weight: Font.Medium; font.pixelSize: 16
        }
        Rectangle {
            id: fh
            visible: cd.file !== null
            width: parent.width
            height: visible ? 30 : 0
            color: Theme.panel
            Rectangle { anchors.bottom: parent.bottom; width: parent.width; height: 1; color: Theme.line }
            Text {
                x: 20; width: parent.width - 40
                anchors.verticalCenter: parent.verticalCenter
                elide: Text.ElideLeft
                text: cd.file ? cd.file.name : ""
                color: Theme.white; font.family: Theme.mono; font.pixelSize: 12
            }
        }
        Flickable {
            id: picFlick
            objectName: "imgCompare"
            visible: cd.isImg
            anchors.top: fh.bottom; anchors.bottom: parent.bottom
            width: parent.width
            clip: true
            contentHeight: pics.implicitHeight
            boundsBehavior: Flickable.StopAtBounds
            ImageCompare {
                id: pics
                width: picFlick.width
                imgOld: cd.isImg ? cd.file.imgOld || "" : ""
                imgNew: cd.isImg ? cd.file.imgNew || "" : ""
            }
        }
        ListView {
            id: diffList
            objectName: "diffList"
            visible: !cd.isImg && cd.file !== null
            anchors.top: fh.bottom; anchors.bottom: parent.bottom
            anchors.topMargin: 6
            width: parent.width
            clip: true
            boundsBehavior: Flickable.StopAtBounds
            flickableDirection: Flickable.AutoFlickIfNeeded
            model: cd.isImg ? [] : cd.lines
            readonly property real wide: {
                let m = 0
                for (const l of cd.lines) m = Math.max(m, l.length)
                return m * 6.6 + 40
            }
            contentWidth: Math.max(width, wide)
            ScrollBar.vertical: ScrollBar { }
            ScrollBar.horizontal: ScrollBar { }
            delegate: DiffLine { line: modelData; width: Math.max(diffList.width, diffList.wide) }
            footer: Item { width: 1; height: 16 }
        }
        Text {
            visible: !cd.isImg && cd.file !== null && cd.diffReady && cd.lines.length === 0
            anchors.top: fh.bottom; anchors.topMargin: 10
            x: 20
            text: cd.file && cd.file.add < 0 ? qsTr("Binärdatei – kein Text-Diff.") : qsTr("Keine Textänderungen.")
            color: Theme.dim; font.family: Theme.mono; font.pixelSize: 12; font.italic: true
        }
    }
}
