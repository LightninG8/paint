"use string";
// Настройки канваса
let subcanvas = document.getElementById("subcanvas"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.width = 940;
canvas.height = 540;

subcanvas.width = canvas.width + 100;
subcanvas.height = canvas.height + 100;
// Конец Настройки канваса

let workspace = document.querySelector(".workspace__body");

// Изменение размера
let canvContainer = document.querySelector(".canvas"),
    canvFrame = document.querySelector(".canvas__frame"),
    canvBottom = document.getElementById("canvBottom"),
    canvRight = document.getElementById("canvRight"),
    canvCorner = document.getElementById("canvCorner");


// Архив
let archive = [],
    archiveCounter = 1,
    backsteps = 0;

archive.push({
    imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
    width: canvas.width,
    height: canvas.height
});

// При нажатии на ползунок
function onMouseDown(e) {
    let isDraggable = false;

    canvFrame.style.width = canvas.width + 'px';
    canvFrame.style.height = canvas.height + 'px';
    canvFrame.style.display = 'block';
    canvFrame.style.zIndex = 1000;

    isDraggable = true;

    // Создаём данные изображения
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // меняет рамку при событии движении мыши
    let onMouseMove = e => {
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
            showCanvasSize(parseInt(canvFrame.style.width), parseInt(canvFrame.style.height));

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

            subcanvas.width = canvas.width + 100;
            subcanvas.height = canvas.height + 100;

            canvFrame.style.display = 'none';

            // Канвас
            canvContainer.style.width = canvas.width + "px";
            canvContainer.style.height = canvas.height + "px";
            ctx.putImageData(imageData, 0, 0);

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseUp', onMouseUp);

            // Mobile adaptation
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener("touchend", onMouseUp);

            isDraggable = false;

            archive.push({
                imageData: imageData,
                width: canvas.width,
                height: canvas.height
            });

            archiveCounter = archive.length - 1;
        }

    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener("touchend", onMouseUp);

    // Mobile adaptation
    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener("touchend", onMouseUp);
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

// Mobile adaptation
canvBottom.addEventListener("touchstart", onMouseDown);
canvRight.addEventListener("touchstart", onMouseDown);
canvCorner.addEventListener("touchstart", onMouseDown);
// Конец Изменение размера

// Рисование
function draw(e) {
    let mousePos = {
        x: e.layerX - 5,
        y: e.layerY - 5
    };

    let isDraw = true;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();


    function onMouseMove(e) {
        if (isDraw) {
            mousePos = {
                x: e.layerX - 5,
                y: e.layerY - 5
            };

            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            ctx.moveTo(mousePos.x, mousePos.y);
        }
    }

    function onMouseUp(e) {
        // Запоминаем холст
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        if (backsteps != 0) {
            for (; backsteps > 0; backsteps--) {
                archive.pop();
            }
        }

        archive.push({
            imageData: imageData,
            width: canvas.width,
            height: canvas.height
        });

        archiveCounter = archive.length - 1;

        ctx.closePath();
        isDraw = false;

        subcanvas.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        subcanvas.removeEventListener("touchmove", onMouseMove);
        document.removeEventListener("touchend", onMouseUp);
    }

    subcanvas.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    subcanvas.addEventListener("touchmove", onMouseMove);
    document.addEventListener("touchend", onMouseUp);
}
subcanvas.addEventListener("mousedown", draw);
subcanvas.addEventListener("touchstart", draw);
// Конец Рисование

// Изменение курсора
subcanvas.addEventListener("mousemove", function (e) {
    if (e.layerX - 5 <= canvas.width && e.layerY - 5 <= canvas.height) {
        subcanvas.style.cursor = "crosshair";
    } else {
        subcanvas.style.cursor = "default";
    }

});
// Конец Изменение курсора

// Комбинации клавиш
function runOnKeys(func, ...codes) {
    let pressed = new Set();

    document.addEventListener("keydown", function (e) {
        pressed.add(e.code);

        for (let code of codes) {
            if (!pressed.has(code)) {
                return;
            }
        }

        func();
    });

    document.addEventListener("keyup", function (e) {
        pressed.delete(e.code);
    });
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

        backsteps++;
        console.log(backsteps);
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

        backsteps--;
        console.log(backsteps);
    }
}
runOnKeys(stepBack, "ControlLeft", "KeyZ");
runOnKeys(stepNext, "ControlLeft", "KeyY");
// Конец Комбинации клавиш

// ******* Инфопанель *******
let canvMousePos = document.getElementById("mousepos"),
    canvFrameSize = document.getElementById("framesize"),
    canvCanvasSize = document.getElementById("canvassize"),
    canvZoom = document.getElementById("zoom");

// Отображение положения курсора
function showMousePos(x, y) {
    let container = canvMousePos.querySelector(".infocell__value");

    container.textContent = `${x} x ${y}пкс`;

    if (arguments.length != 2) {
        container.textContent = "";
    }
}

subcanvas.addEventListener("mousemove", function (e) {
    if (e.layerX >= 5 &&
        e.layerY >= 5 &&
        e.layerX - 5 <= canvas.width &&
        e.layerY - 5 <= canvas.height) {
        showMousePos(e.layerX - 5, e.layerY - 5)
    } else {
        showMousePos();
    }
});


// Отоброжение размера канваса
function showCanvasSize(w, h) {
    let container = canvCanvasSize.querySelector(".infocell__value");

    container.textContent = `${w} x ${h}пкс`;
}
showCanvasSize(canvas.width, canvas.height);