import QtQuick

// Draft picture frame background: 8 px checkerboard (#0c1222 / #101828).
Canvas {
    onWidthChanged: requestPaint()
    onHeightChanged: requestPaint()
    onPaint: {
        const ctx = getContext("2d")
        ctx.reset()
        ctx.fillStyle = "#0c1222"
        ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = "#101828"
        for (let y = 0; y < height; y += 8)
            for (let x = ((y / 8) % 2) * 8; x < width; x += 16)
                ctx.fillRect(x, y, 8, 8)
    }
}
