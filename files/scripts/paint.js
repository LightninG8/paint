"use string";
// Настройки канваса
let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.width = 940;
canvas.height = 540;
// Конец Настройки канваса

// Изменение размера
let canvContainer = document.querySelector(".canvas"),
    canvFrame = document.querySelector(".canvas__frame"),
    canvBottom = document.getElementById("canvBottom"),
    canvRight = document.getElementById("canvRight"),
    canvCorner = document.getElementById("canvCorner");

let isDraggable = false;

// Создаём данные изображения
let imageData = ctx.createImageData(canvas.width, canvas.height);

// При нажатии на ползунок
[canvBottom, canvRight, canvCorner].forEach((e) => {
    e.addEventListener("mousedown", function (e) {
        let direction = {
            canvBottom: 0,
            canvRight: 0,
            canvCorner: 0
        }

        canvFrame.style.display = 'block';
        canvFrame.style.zIndex = 1000;

        isDraggable = true;

        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // меняет рамку при событии движении мыши
        function onMouseMove(e) {
            if (isDraggable) {
                // дополнительно учитывая изначальный сдвиг относительно указателя мыши
                canvFrame.style.width = e.pageX - 5 + 'px';
                canvFrame.style.height = e.pageY - 5 - 92 + 'px';
            }
        }
        // зафиксировать рамку, удалить ненужные обработчики
        function onMouseUp(e) {
            if (isDraggable) {
                isDraggable = false;

                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseUp', onMouseUp);

                canvContainer.style.width = e.pageX - 5 + 'px';
                canvContainer.style.height = e.pageY - 5 - 92 + 'px';

                canvFrame.style.display = 'none';

                // Канвас
                canvas.width = parseInt(canvFrame.style.width);
                canvas.height = parseInt(canvFrame.style.height);
                ctx.putImageData(imageData, 0, 0);
            }

        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    e.ondragstart = function () {
        return false;
    };
});
// Конец Изменение размера

// Рисование
canvas.addEventListener("mousedown", function (e) {
    let mousePos = {
        x: e.layerX,
        y: e.layerY
    };

    let isDraw = true;

    ctx.lineWidth = 1;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();

    canvas.addEventListener("mousemove", function (e) {
        if (isDraw) {
            mousePos = {
                x: e.layerX,
                y: e.layerY
            };

            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            ctx.moveTo(mousePos.x, mousePos.y);
        }
    });

    canvas.addEventListener("mouseup", function (e) {
        ctx.closePath();
        isDraw = false;
    });
    canvas.addEventListener("mouseleave", function (e) {
        ctx.closePath();
        isDraw = false;
    });
});
// Конец Рисование