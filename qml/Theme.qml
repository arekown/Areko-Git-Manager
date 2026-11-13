pragma Singleton
import QtQuick

// AREKO colours and fonts (same values as the approved HTML draft v2, entwurf/areko-git-manager-entwurf-v2.html).
QtObject {
    readonly property color bg: "#06080f"
    readonly property color bg2: "#0a0e1a"
    readonly property color panel: "#0b1020"
    readonly property color side: "#090d18"
    readonly property color row: "#0e1424"
    readonly property color rowHover: "#121a2e"
    readonly property color cyan: "#05d9e8"
    readonly property color teal: "#0792a0"
    readonly property color magenta: "#ff2a6d"
    readonly property color magentaDark: "#b81e4f"
    readonly property color yellow: "#f9f002"
    readonly property color ok: "#00ff9f"
    readonly property color text: "#cfeef2"
    readonly property color white: "#e8fbff"
    readonly property color dim: "#5f7d86"
    readonly property color line: "#2e05d9e8"        // rgba(5,217,232,.18)
    readonly property color lineStrong: "#5205d9e8"  // rgba(5,217,232,.32)
    // graph lanes and treemap folder colours from the draft
    readonly property var lanes: ["#05d9e8", "#ff2a6d", "#00ff9f", "#f9f002", "#0792a0", "#9b7bff", "#ff8a3d", "#7fd1ff"]
    readonly property var folders: ["#05d9e8", "#ff2a6d", "#00ff9f", "#f9f002", "#9b7bff", "#ff8a3d", "#7fd1ff", "#0792a0", "#e8fbff"]

    readonly property string head: "Orbitron"
    readonly property string num: "Rajdhani"
    readonly property string mono: "Share Tech Mono"
}
