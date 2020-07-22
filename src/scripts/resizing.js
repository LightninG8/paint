// Инициализируем "каркас"
let general = require("./general.js");

let resizing = (function (subcanvas, canvas, ctx) {
    // Для упрощения
    // let canvas = init.canvas,
    //     subcanvas = init.subcanvas,
    //     ctx = init.ctx;

    // Изменение размера
    let canvContainer = document.querySelector(".canvas"),
        canvFrame = document.querySelector(".canvas__frame"),
        canvBottom = document.getElementById("canvBottom"),
        canvRight = document.getElementById("canvRight"),
        canvCorner = document.getElementById("canvCorner");
    // При нажатии на ползунок
    function canvasResizeStart(e) {
        let isDraggable = true;

        resizeElem(canvFrame, getCanvasSize());
        showElem(canvFrame);

        // Создаём данные изображения
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // меняет рамку при событии движении мыши
        let canvasResizeMove = e => {
            if (isDraggable) {
                // дополнительно учитывая изначальный сдвиг относительно указателя мыши
                if (this == canvBottom) {
                    canvFrame.style.height = e.pageY - 5 - 92 + 'px';
                } else if (this == canvRight) {
                    canvFrame.style.width = e.pageX - 5 + 'px';
                } else if (this == canvCorner) {
                    canvFrame.style.width = e.pageX - 5 + 'px';
                    canvFrame.style.height = e.pageY - 5 - 92 + 'px';
                }

            }
        };
        // зафиксировать рамку, удалить ненужные обработчики
        let canvasResizeEnd = e => {
            if (isDraggable) {
                isDraggable = false;

                if (this == canvBottom) {
                    canvas.height = e.pageY - 5 - 92;
                } else if (this == canvRight) {
                    canvas.width = e.pageX - 5;
                } else if (this == canvCorner) {
                    canvas.width = e.pageX - 5;
                    canvas.height = e.pageY - 5 - 92;
                }

                subcanvas.width = canvas.width + 100;
                subcanvas.height = canvas.height + 100;

                hideElem(canvFrame);

                // Канвас
                resizeElem(canvContainer, getCanvasSize());
                ctx.putImageData(imageData, 0, 0);

                document.removeEventListener('mousemove', canvasResizeMove);
                document.removeEventListener('mouseup', canvasResizeEnd);

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
    return {

    }
})(general.subcanvas, general.canvas, general.ctx);

module.exports = resizing;