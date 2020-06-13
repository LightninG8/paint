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
    archiveCounter = 0,
    backsteps = 0;

function saveCache() {
    archive.push({
        imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
        width: canvas.width,
        height: canvas.height
    });

    archiveCounter = archive.length - 1;
}
saveCache();

// 
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
    }
}

// При нажатии на ползунок
function canvasResizeStart(e) {
    let isDraggable = true;

    resizeElem(canvFrame, getCanvasSize());
    showElem(canvFrame)

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
            showCanvasSize(parseInt(canvFrame.style.width), parseInt(canvFrame.style.height));

        }
    }
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

            saveCache();
        }

    }

    document.addEventListener('mousemove', canvasResizeMove);
    document.addEventListener("mouseup", canvasResizeEnd);
}

// Обработчики на все ползунки
[canvBottom, canvRight, canvCorner].forEach((e) => {
    e.ondragstart = function () {
        return false;
    };
    e.addEventListener("mousedown", canvasResizeStart);
});
// // Конец Изменение размера

// Рисование
function drawStart(e) {
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


    function drawMove(e) {
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

    function drawEnd(e) {
        isDraw = false;
        ctx.closePath();

        if (backsteps != 0) {
            for (; backsteps > 0; backsteps--) {
                archive.pop();
            }
        }

        saveCache();

        subcanvas.removeEventListener("mousemove", drawMove);
        document.removeEventListener("mouseup", drawEnd);
    }

    subcanvas.addEventListener("mousemove", drawMove);
    document.addEventListener("mouseup", drawEnd);

}
subcanvas.addEventListener("mousedown", drawStart);

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