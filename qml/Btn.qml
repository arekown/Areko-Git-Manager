import QtQuick
import QtQuick.Shapes
import "Util.js" as U

// Draft ".btn": cut bottom-right corner, kinds "" / "pri" (magenta) / "ok" (green) / "del" (magenta outline);
// running = action in progress.
Item {
    id: b
    property string text
    property string kind: ""
    property bool running: false
    property int fontSize: 10
    signal clicked()

    implicitHeight: 32
    implicitWidth: label.implicitWidth + 28
    opacity: enabled ? 1 : 0.3
    readonly property bool hov: ma.containsMouse && enabled && !running
    readonly property bool tinted: kind === "ok" || kind === "del"     // outline + text in the kind's colour
    readonly property color tone: kind === "ok" ? Theme.ok : kind === "del" ? Theme.magenta : Theme.cyan

    Shape {
        anchors.fill: parent
        ShapePath {
            strokeWidth: -1
            strokeColor: "transparent"
            fillColor: b.kind === "pri" ? "transparent"
                       : b.hov ? U.rgba(b.tone, 0.1) : "transparent"
            fillGradient: b.kind === "pri" ? grad : null
            startX: 0; startY: 0
            PathLine { x: b.width; y: 0 }
            PathLine { x: b.width; y: b.height - 6 }
            PathLine { x: b.width - 6; y: b.height }
            PathLine { x: 0; y: b.height }
            PathLine { x: 0; y: 0 }
        }
        ShapePath {
            fillColor: "transparent"
            strokeWidth: 1
            strokeColor: b.kind === "pri" ? "transparent"
                         : b.tinted ? (b.hov || b.running ? b.tone : U.rgba(b.tone, 0.6))
                         : (b.hov || b.running ? Theme.cyan : Theme.lineStrong)
            startX: b.width - 0.5; startY: b.height - 6
            PathLine { x: b.width - 0.5; y: 0.5 }
            PathLine { x: 0.5; y: 0.5 }
            PathLine { x: 0.5; y: b.height - 0.5 }
            PathLine { x: b.width - 6; y: b.height - 0.5 }
        }
    }
    LinearGradient {
        id: grad
        x1: 0; y1: 0; x2: b.width; y2: b.height
        GradientStop { position: 0; color: b.hov ? Qt.lighter(Theme.magenta, 1.12) : Theme.magenta }
        GradientStop { position: 1; color: b.hov ? Qt.lighter(Theme.magentaDark, 1.12) : Theme.magentaDark }
    }

    Text {
        id: label
        anchors.centerIn: parent
        text: b.running ? b.text + " …" : b.text
        color: b.kind === "pri" ? "#ffffff" : b.tinted ? (b.hov ? "#ffffff" : b.tone) : (b.hov ? Theme.white : Theme.text)
        font.family: Theme.head
        font.weight: Font.DemiBold
        font.pixelSize: b.fontSize
        font.letterSpacing: b.fontSize * 0.14
    }

    // running: a short bar sweeps along the bottom edge
    Rectangle {
        id: sweep
        visible: b.running
        height: 2
        width: Math.max(10, b.width * 0.3)
        y: b.height - 3
        color: b.kind === "pri" ? "#ffffff" : b.tone
        SequentialAnimation on x {
            running: b.running
            loops: Animation.Infinite
            NumberAnimation { from: 2; to: Math.max(2, b.width - sweep.width - 8); duration: 650; easing.type: Easing.InOutQuad }
            NumberAnimation { from: Math.max(2, b.width - sweep.width - 8); to: 2; duration: 650; easing.type: Easing.InOutQuad }
        }
    }

    MouseArea {
        id: ma
        anchors.fill: parent
        hoverEnabled: true
        enabled: b.enabled && !b.running
        cursorShape: Qt.PointingHandCursor
        onClicked: b.clicked()
    }
}
