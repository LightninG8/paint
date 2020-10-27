// Подключение необходимых модулей
let general = require("./general.js");

// Модуль
let statusbar = (function ({
    canvas,
    ctx
}) {
    let canvMousePos = document.getElementById("mousepos"),
        canvFrameSize = document.getElementById("framesize"),
        canvCanvasSize = document.getElementById("canvassize"),
        canvZoom = document.getElementById("zoom");

    // Отображение положения курсора
    function showMousePos(x, y) {
        let container = canvMousePos.querySelector(".infocell__value");

        container.textContent = arguments.length != 2 ? "" : `${x} x ${y}пкс`;
    }

    // Если наведён на холст
    canvas.addEventListener("mousemove", function (e) {
        showMousePos(e.layerX, e.layerY);
    });
    canvas.addEventListener("mouseleave", e => {
        showMousePos();
    })


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

// Экспорт модуля
module.exports = statusbar;