let general = require("./general.js");

let infopanel = (function ({
    subcanvas,
    canvas,
    ctx
}) {
    // ******* Инфопанель *******
    let canvMousePos = document.getElementById("mousepos"),
        canvFrameSize = document.getElementById("framesize"),
        canvCanvasSize = document.getElementById("canvassize"),
        canvZoom = document.getElementById("zoom");

    // Отображение положения курсора
    function showMousePos(x, y) {
        let container = canvMousePos.querySelector(".infocell__value");

        container.textContent = `${x} x ${y}пкс`;

        if (arguments.length != 2) {
            container.textContent = "";
        }
    }

    subcanvas.addEventListener("mousemove", function (e) {
        if (e.layerX >= 5 &&
            e.layerY >= 5 &&
            e.layerX - 5 <= canvas.width &&
            e.layerY - 5 <= canvas.height) {
            showMousePos(e.layerX - 5, e.layerY - 5);
        } else {
            showMousePos();
        }
    });


    // Отоброжение размера канваса
    function showCanvasSize() {
        let container = canvCanvasSize.querySelector(".infocell__value");

        container.textContent = `${canvas.width} x ${canvas.height}пкс`;
    }
    showCanvasSize();

    return {
        showCanvasSize: showCanvasSize
    }
})(general);

module.exports = infopanel;