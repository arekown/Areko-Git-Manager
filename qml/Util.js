.pragma library
// Helpers shared by the views: dates, numbers, ref chips, version compare, treemap layout, graph segments.

function rgba(c, a) {
    let h = String(c).replace("#", "")
    if (h.length === 8)
        h = h.slice(2)
    const n = parseInt(h, 16)
    return Qt.rgba(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255, a)
}

function esc(s) {
    return String(s === undefined || s === null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[c])
}

// ---------- dates (date format and day names of the system language) ----------
function pad(n) { return n < 10 ? "0" + n : "" + n }
const SHORT = 1          // Locale.ShortFormat (QML enums are not reachable from a .pragma library)
// short date format of the locale (de dd.MM.yy, en M/d/yy, zh yyyy/M/d), optionally with a four-digit year
function dateFmt(fullYear) {
    const f = Qt.locale().dateFormat(SHORT)
    return fullYear && f.indexOf("yyyy") < 0 ? f.replace(/y+/, "yyyy") : f
}
// a date format without the day (ch "d") or the year (ch "y"), together with one separator next to it
function dropPart(f, ch) { return f.replace(new RegExp("^" + ch + "+[^dMy]*|[^dMy]*" + ch + "+"), "") }
function fmt(d, f) { return d.toLocaleDateString(Qt.locale(), f) }
function dmy(d) { return fmt(d, dateFmt(true)) }
function weekday(d) { return Qt.locale().dayName(d.getDay(), SHORT) }
function dayKey(iso) {
    const d = new Date(iso)
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate())
}
function dayLabel(key, now) {
    const p = String(key).split("#")[0].split("-")
    const d = new Date(+p[0], +p[1] - 1, +p[2])
    const t = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const diff = Math.round((t - d) / 864e5)
    //: day heading in the history, upper case
    if (diff === 0) return qsTr("HEUTE") + " · " + dmy(d)
    //: day heading in the history, upper case
    if (diff === 1) return qsTr("GESTERN") + " · " + dmy(d)
    return weekday(d).replace(/\.$/, "").toUpperCase() + " · " + dmy(d)
}
function rel(iso, now) {
    if (!iso) return ""
    const d = new Date(iso), m = (now - d) / 6e4
    //: age of the last change, short (minutes)
    if (m < 60) return qsTr("vor %n Min", "", Math.max(1, Math.round(m)))
    //: age of the last change, short (hours)
    if (m < 1440) return qsTr("vor %n Std", "", Math.round(m / 60))
    //: age of the last change
    if (m < 2880) return qsTr("gestern")
    //: age of the last change (days)
    if (m < 43200) return qsTr("vor %n Tagen", "", Math.round(m / 1440))
    return fmt(d, dateFmt(false))
}
function time(iso) { const d = new Date(iso); return d.toLocaleTimeString(Qt.locale(), Qt.locale().timeFormat(SHORT)) }
function full(iso) { if (!iso) return ""; const d = new Date(iso); return weekday(d) + ", " + dmy(d) + ", " + time(iso) }
// day and month: German keeps its trailing dot (13.11.), others drop the year with its separator (en 11/13, zh 11/13)
function dm(iso) {
    const f = dateFmt(false)
    return fmt(new Date(iso), /\.y+$/.test(f) ? f.replace(/y+$/, "") : dropPart(f, "y"))
}
function monthYear(s) { return fmt(new Date(s * 1000), dropPart(dateFmt(true), "d")) }
function num(n) { return Math.round(n || 0).toLocaleString(Qt.locale(), "f", 0) }   // 1.234 / 1,234 by language

// ---------- remotes ----------
function webUrl(remote) {
    let u = String(remote || "").replace(/\.git$/, "")
    const m = u.match(/^[^@\/]+@([^:]+):(.+)$/)          // git@github.com:owner/repo
    if (m) u = "https://" + m[1] + "/" + m[2]
    return u
}
function shortUrl(remote) { return webUrl(remote).replace(/^https?:\/\//, "") }

// ---------- refs in the history ----------
function refChip(d) {
    if (d.indexOf("HEAD -> ") === 0) return { t: d.slice(8), k: "br" }
    if (d === "HEAD") return null
    if (d.indexOf("tag: ") === 0) return { t: "◆ " + d.slice(5), k: "tg" }
    if (d.indexOf("/") >= 0) return { t: "☁ " + d, k: "rm" }
    return { t: d, k: "br" }
}

// ---------- program versions ----------
function verNum(v) { return String(v || "").replace(/^v/, "").split(".").map(Number) }
function newer(a, b) {
    const x = verNum(a), y = verNum(b)
    for (let i = 0; i < 3; i++)
        if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0)
    return false
}
function sameVer(a, b) { return verNum(a).join(".") === verNum(b).join(".") }

// ---------- release notes (tiny markdown subset, like the draft) ----------
function notes(body) {
    const out = []
    //: release without release notes
    for (const l of String(body || qsTr("Keine Beschreibung.")).split("\n")) {
        if (/^#+\s/.test(l)) out.push({ k: "h", t: l.replace(/^#+\s/, "") })
        else if (/^\s*[-*]\s/.test(l)) out.push({ k: "li", t: l.replace(/^\s*[-*]\s/, "") })
        else if (l.trim()) out.push({ k: "p", t: l })
    }
    return out
}

// ---------- treemap (squarified), units 1000 x 250 like the draft ----------
function squarify(items, x, y, w, h) {
    const out = []
    let total = 0
    for (const i of items) total += i.v
    if (!total) return out
    let rest = items.map(i => Object.assign({}, i, { a: i.v * w * h / total }))
    const worst = (r, short) => {
        let s = 0, mx = 0, mn = Infinity
        for (const q of r) { s += q.a; mx = Math.max(mx, q.a); mn = Math.min(mn, q.a) }
        return Math.max(short * short * mx / (s * s), s * s / (short * short * mn))
    }
    while (rest.length) {
        const short = Math.min(w, h)
        const row = [rest[0]]
        let i = 1
        while (i < rest.length && worst(row.concat([rest[i]]), short) <= worst(row, short)) row.push(rest[i++])
        let s = 0
        for (const q of row) s += q.a
        if (w >= h) {
            const cw = s / h
            let cy = y
            for (const r of row) { const rh = r.a / cw; out.push(Object.assign({}, r, { x: x, y: cy, w: cw, h: rh })); cy += rh }
            x += cw; w -= cw
        } else {
            const rh = s / w
            let cx = x
            for (const r of row) { const rw = r.a / rh; out.push(Object.assign({}, r, { x: cx, y: y, w: rw, h: rh })); cx += rw }
            y += rh; h -= rh
        }
        rest = rest.slice(i)
    }
    return out
}
function topFolder(name) { return name.indexOf("/") >= 0 ? name.split("/")[0] : "(Wurzel)" }

// ---------- version graph: the draft's SVG paths cut into per-row pieces ----------
// rows[i]: pieces drawn inside commit row i; gaps[i]: lanes running through the day label above row i.
function laneX(l) { return 7 + Math.min(l, 7) * 13 }
function graphRows(n, edges, lanes) {
    const rows = [], gaps = []
    for (let i = 0; i < n; i++) { rows.push([]); gaps.push([]) }
    for (const e of edges) {
        const f = e.from
        if (f < 0 || f >= n) continue
        const t = e.to >= 0 ? e.to : n
        const col = lanes[(e.first ? e.fromLane : e.toLane) % lanes.length]
        const a = Math.min(e.fromLane, 7), b = Math.min(e.toLane, 7)
        const through = (a === b || e.first) ? a : b
        rows[f].push(a === b || e.first ? { k: "down", a: a, col: col } : { k: "out", a: a, b: b, col: col })
        for (let r = f + 1; r < Math.min(t, n); r++) rows[r].push({ k: "full", a: through, col: col })
        for (let g = f + 1; g <= Math.min(t, n - 1); g++) gaps[g].push({ a: through, col: col })
        if (t < n) rows[t].push(a === b || !e.first ? { k: "up", a: through, col: col } : { k: "in", a: a, b: b, col: col })
    }
    return { rows: rows, gaps: gaps }
}
function paintPiece(ctx, s, h) {
    const cy = h / 2, x1 = laneX(s.a)
    ctx.strokeStyle = s.col
    ctx.beginPath()
    if (s.k === "down") { ctx.moveTo(x1, cy); ctx.lineTo(x1, h) }
    else if (s.k === "up") { ctx.moveTo(x1, 0); ctx.lineTo(x1, cy) }
    else if (s.k === "full") { ctx.moveTo(x1, 0); ctx.lineTo(x1, h) }
    else if (s.k === "in") { const x2 = laneX(s.b); ctx.moveTo(x1, 0); ctx.lineTo(x1, cy - 14); ctx.quadraticCurveTo(x1, cy, x2, cy) }
    else if (s.k === "out") { const x2 = laneX(s.b); ctx.moveTo(x1, cy); ctx.quadraticCurveTo(x2, cy, x2, cy + 14); ctx.lineTo(x2, h) }
    ctx.stroke()
}
