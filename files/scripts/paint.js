"use string";
// Настройки канваса
let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.width = 940;
canvas.height = 540;
// Конец Настройки канваса

let workspace = document.querySelector(".workspace__body");

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
[canvBottom, canvRight, canvCorner].forEach((e) => {
    e.ondragstart = function () {
        return false;
    };
});

canvBottom.addEventListener("mousedown", onMouseDown);
canvRight.addEventListener("mousedown", onMouseDown);
canvCorner.addEventListener("mousedown", onMouseDown);
// Конец Изменение размера

// Рисование
<<<<<<< HEAD
subcanvas.addEventListener("mousedown", function (e) {
    // ......
=======
canvas.addEventListener("mousedown", function (e) {
>>>>>>> parent of 0c0afa3... Add: steps + modify drawing
    let mousePos = {
        x: e.layerX - 5,
        y: e.layerY - 5
    };

    let isDraw = true;

    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();

<<<<<<< HEAD


    function onMouseMove(e) {
=======
    canvas.addEventListener("mousemove", function (e) {
>>>>>>> parent of 0c0afa3... Add: steps + modify drawing
        if (isDraw) {
            mousePos = {
                x: e.layerX - 5,
                y: e.layerY - 5
            };

            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            ctx.moveTo(mousePos.x, mousePos.y);
        }
<<<<<<< HEAD
    }

    function onMouseUp(e) {
        console.log(e);
        // Запоминаем холст
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        archive.push({
            imageData: imageData,
            width: canvas.width,
            height: canvas.height
        });

        archiveCounter = archive.length - 1;

=======
    });

    document.addEventListener("mouseup", function (e) {
>>>>>>> parent of 0c0afa3... Add: steps + modify drawing
        ctx.closePath();
        isDraw = false;
    });
    canvas.addEventListener("mouseleave", function (e) {
        ctx.closePath();
        isDraw = false;
    });
<<<<<<< HEAD
}

function stepBack() {
    if (archiveCounter > 0) {
        --archiveCounter;
        // Восстанавливаем размер
        canvas.width = archive[archiveCounter].width;
        canvas.height = archive[archiveCounter].height;
        canvContainer.style.width = canvas.width + "px";
        canvContainer.style.height = canvas.height + "px";

        // Вставляем изображение
        ctx.putImageData(archive[archiveCounter].imageData, 0, 0);
    }
}

function stepNext() {
    if (archiveCounter < archive.length - 1) {
        ++archiveCounter;
        // Восстанавливаем размер
        canvas.width = archive[archiveCounter].width;
        canvas.height = archive[archiveCounter].height;
        canvContainer.style.width = canvas.width + "px";
        canvContainer.style.height = canvas.height + "px";

        // Вставляем изображение
        ctx.putImageData(archive[archiveCounter].imageData, 0, 0);
    }
}
runOnKeys(stepBack, "ControlLeft", "KeyZ");
runOnKeys(stepNext, "ControlLeft", "KeyY");
// Конец Комбинации клавиш
=======
});
// Конец Рисование
>>>>>>> parent of 0c0afa3... Add: steps + modify drawing
