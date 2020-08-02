let general = require("./general.js");

let subcanvasActions = (function ({
    subcanvas,
    canvas,
    ctx,
    showElem,
    hideElem,
    resizeElem,
    resizeCanvas,
    getCanvasSize
}) {
    // Изменение курсора
    subcanvas.addEventListener("mousemove", function (e) {
        if (e.layerX - 5 <= canvas.width && e.layerY - 5 <= canvas.height) {
            subcanvas.style.cursor = "crosshair";
        } else {
            subcanvas.style.cursor = "default";
        }

    });

    return {}
})(general);

module.exports = subcanvasActions;