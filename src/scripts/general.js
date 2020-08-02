let general = (function () {
    // Настройки канваса
    let subcanvas = document.getElementById("subcanvas"),
        canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");

    let workspace = document.querySelector(".workspace__body"),
        canvContainer = document.querySelector(".canvas");

    canvas.width = 940;
    canvas.height = 540;

    subcanvas.width = canvas.width + 100;
    subcanvas.height = canvas.height + 100;
    // Конец Настройки канваса

    // Функции-инструменты
    function showElem(elem) {
        elem.style.display = 'block';
    }

    function hideElem(elem) {
        elem.style.display = 'none';
    }

    function resizeElem(elem, size) {
        elem.style.width = size.width + 'px';
        elem.style.height = size.height + 'px';
    }

    function resizeCanvas(canvas, size) {
        canvas.width = size.width;
        canvas.width = size.height;
    }

    function getCanvasSize() {
        return {
            width: canvas.width,
            height: canvas.height,
        };
    }



    return {
        canvas: canvas,
        subcanvas: subcanvas,
        ctx: ctx,
        workspace: workspace,
        canvContainer: canvContainer,
        showElem: showElem,
        hideElem: hideElem,
        resizeElem: resizeElem,
        resizeCanvas: resizeCanvas,
        getCanvasSize: getCanvasSize,

    }
})();

module.exports = general;