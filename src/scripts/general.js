let general = (function () {
    // Настройки канваса
    let canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");

    let workspace = document.querySelector(".workspace"),
        workspaceBody = document.querySelector(".workspace__body"),
        canvContainer = document.querySelector(".canvas");

    let status = {
        isDraw: false,
        isResizing: false,
        technicalImageData: undefined,
    }
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
        ctx: ctx,
        workspace: workspace,
        canvContainer: canvContainer,
        status: status,
        showElem: showElem,
        hideElem: hideElem,
        resizeElem: resizeElem,
        resizeCanvas: resizeCanvas,
        getCanvasSize: getCanvasSize,

    }
})();

module.exports = general;