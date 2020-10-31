let general = (function () {
    // Настройки канваса
    let canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");

    let workspace = document.querySelector(".workspace"),
        workspaceBody = document.querySelector(".workspace__body"),
        canvContainer = document.querySelector(".canvas");

    // Запрещаем контекстное меню
    document.body.oncontextmenu = function() {
        return false;
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // TODO: Сделать общий объект состояния приложения
    let status = {
        options: {
            thickness: "2",

            color: {
                main: "#000000",
                background: "#ffffff"
            },

        },
        activeTool: 'pencil',
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

    return {
        canvas: canvas,
        ctx: ctx,
        workspace: workspace,
        canvContainer: canvContainer,
        status: status,
        showElem: showElem,
        hideElem: hideElem,
    }
})();

module.exports = general;