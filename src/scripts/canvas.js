let canvas = (function () {
    // Настройки канваса
    let subcanvas = document.getElementById("subcanvas"),
        canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = 940;
    canvas.height = 540;

    subcanvas.width = canvas.width + 100;
    subcanvas.height = canvas.height + 100;
    // Конец Настройки канваса

    return {
        getCanvasSize: function () {
            return {
                width: canvas.width,
                height: canvas.height
            }
        }
    }
})();

module.exports = canvas;