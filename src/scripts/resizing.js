// Подключение необходимых модулей
let general = require("./general.js");
let archive = require("./archive.js");
let infopanel = require("./infopanel.js");

// Модуль
let resizing = (function ({
    canvas,
    ctx,
    status,
}, archive, infopanel) {

    // Изменение размера
    let canvContainer = document.querySelector(".canvas"),
        canvFrame = document.querySelector(".canvas__frame"),
        canvBottom = document.getElementById("canvBottom"),
        canvRight = document.getElementById("canvRight"),
        canvCorner = document.getElementById("canvCorner");

    // При нажатии на ползунок
    function canvasResizeStart(e) {
        status.isResizing = true;

        general.resizeElem(canvFrame, general.getCanvasSize());
        general.showElem(canvFrame);

        // Создаём данные изображения
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // меняет рамку при событии движении мыши
        let canvasResizeMove = e => {
            if (status.isResizing) {
                // дополнительно учитывая изначальный сдвиг относительно указателя мыши
                let rect = canvas.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                if (this == canvBottom) {
                    canvFrame.style.height = y + 'px';
                } else if (this == canvRight) {
                    canvFrame.style.width = x + 'px';
                } else if (this == canvCorner) {
                    canvFrame.style.width = x + 'px';
                    canvFrame.style.height = y + 'px';
                }

            }
        };
        // зафиксировать рамку, удалить ненужные обработчики
        let canvasResizeEnd = e => {
            if (status.isResizing) {
                status.isResizing = false;

                let rect = canvas.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                if (this == canvBottom) {
                    canvas.height = y;
                } else if (this == canvRight) {
                    canvas.width = x;
                } else if (this == canvCorner) {
                    canvas.width = x;
                    canvas.height = y;
                }

                general.hideElem(canvFrame);

                // Канвас
                general.resizeElem(canvContainer, general.getCanvasSize());
                ctx.putImageData(imageData, 0, 0);

                document.removeEventListener('mousemove', canvasResizeMove);
                document.removeEventListener('mouseup', canvasResizeEnd);

                // Другое из зависимостей
                archive.clearPastImageData();
                archive.save();

                infopanel.showCanvasSize();
            }

        };

        document.addEventListener('mousemove', canvasResizeMove);
        document.addEventListener("mouseup", canvasResizeEnd);
    }

    // - Обработчики на все ползунки
    [canvBottom, canvRight, canvCorner].forEach((e) => {
        e.ondragstart = function () {
            return false;
        };
        e.addEventListener("mousedown", canvasResizeStart);
    });

    // Конец Изменение размера
    return {}
})(general, archive, infopanel);

// Экспорт модуля
module.exports = resizing;