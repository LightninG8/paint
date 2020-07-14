// Инициализируем "каркас"
let init = require("./init.js");

let resizing = (function () {
    // Для упрощения
    let canvas = init.canvas,
        subcanvas = init.subcanvas,
        ctx = init.ctx;

    // Изменение размера
    let canvContainer = document.querySelector(".canvas"),
        canvFrame = document.querySelector(".canvas__frame"),
        canvBottom = document.getElementById("canvBottom"),
        canvRight = document.getElementById("canvRight"),
        canvCorner = document.getElementById("canvCorner");

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
    // При нажатии на ползунок
    function canvasResizeStart(e) {
        let isDraggable = true;

        resizeElem(canvFrame, init.getCanvasSize());
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
                resizeElem(canvContainer, init.getCanvasSize());
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
})();

module.exports = resizing;