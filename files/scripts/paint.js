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

// Создаём данные изображения
let imageData = ctx.createImageData(canvas.width, canvas.height);

// При нажатии на ползунок
function onMouseDown(e) {
    let isDraggable = false;

    canvFrame.style.display = 'block';
    canvFrame.style.zIndex = 1000;

    isDraggable = true;

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // меняет рамку при событии движении мыши
    let onMouseMove = e => {
        if (isDraggable) {
            console.log(this);
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
    }
    // зафиксировать рамку, удалить ненужные обработчики
    let onMouseUp = e => {
        if (isDraggable) {
            if (this == canvBottom) {
                canvas.height = e.pageY - 5 - 92;
            } else if (this == canvRight) {
                canvas.width = e.pageX - 5;
            } else if (this == canvCorner) {
                canvas.width = e.pageX - 5;
                canvas.height = e.pageY - 5 - 92;
            }


            canvFrame.style.display = 'none';

            // Канвас
            canvContainer.style.width = canvas.width + "px";
            canvContainer.style.height = canvas.height + "px";
            ctx.putImageData(imageData, 0, 0);

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseUp', onMouseUp);
            isDraggable = false;
        }

    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
}

// Обработчики на все ползунки
canvBottom.addEventListener("mousedown", onMouseDown);
canvRight.addEventListener("mousedown", onMouseDown);
canvCorner.addEventListener("mousedown", onMouseDown);

[canvBottom, canvRight, canvCorner].forEach((e) => {
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