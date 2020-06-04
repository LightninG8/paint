"use string";
// Настройки канваса
let subcanvas = document.getElementById("subcanvas"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

subcanvas.width = parseInt(subcanvas.parentNode.parentNode.offsetWidth);
subcanvas.height = parseInt(subcanvas.parentNode.parentNode.offsetHeight);

canvas.width = 940;
canvas.height = 540;
// Конец Настройки канваса
let canvContainer = document.querySelector(".canvas"),
    canvRight = document.getElementById("canvRight"),
    canvCorner = document.getElementById("canvCorner"),
    canvFrame = document.querySelector(".canvas__frame");

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
function resizeCanvas(e) {
    let isDraggable = true;
    // Создаём данные изображения
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvFrame.style.display = 'block';

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
                canvFrame.style.height = e.pageY - 5 - 92 + 'px';
                canvFrame.style.width = e.pageX - 5 + 'px';
            }
        }
    }

    function onMouseUp(e) {
        archive.push({
            imageData: imageData,
            width: canvas.width,
            height: canvas.height
        });

        isDraggable = false;
        canvFrame.style.display = 'none';

        // Канвас
        canvContainer.style.width = canvas.width + "px";
        canvContainer.style.height = canvas.height + "px";
        ctx.putImageData(imageData, 0, 0);



        archiveCounter = archive.length - 1;

        this.removeEventListener('mousemove', onMouseMove);
        this.removeEventListener('mouseUp', onMouseUp);
    }
    this.addEventListener('mousemove', onMouseMove);
    this.addEventListener('mouseUp', onMouseUp);

}

canvCorner.addEventListener("mousedown", resizeCanvas);
canvBottom.addEventListener("mousedown", resizeCanvas);
canvRight.addEventListener("mousedown", resizeCanvas);


// Конец Изменение размера

// Рисование
subcanvas.addEventListener("mousedown", function (e) {
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

    function onMouseMove(e) {
        if (isDraw) {
            mousePos = {
                x: e.layerX - 5,
                y: e.layerY - 5
            }
        };

        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        ctx.moveTo(mousePos.x, mousePos.y);
    }

    function onMouseUp(e) {
        // Запоминаем холст
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        archive.push({
            imageData: imageData,
            width: canvas.width,
            height: canvas.height
        });

        archiveCounter = archive.length - 1;



        console.log(archive.length, archiveCounter);

        ctx.closePath();
        isDraw = false;

        subcanvas.removeEventListener("mousemove", onMouseMove);
        subcanvas.removeEventListener("mouseup", onMouseUp);
    }


    subcanvas.addEventListener("mousemove", onMouseMove);
    subcanvas.addEventListener("mouseup", onMouseUp);
});

// Конец Рисование

// Изменение курсора
subcanvas.addEventListener("mousemove", function (e) {
    if (e.layerX <= canvas.width && e.layerY <= canvas.height) {
        subcanvas.style.cursor = "crosshair";
    } else {
        subcanvas.style.cursor = "default";
    }

});
// Конец Изменение курсора

// // Комбинации клавиш
// function runOnKeys(func, ...codes) {
//     let pressed = new Set();

//     document.addEventListener("keydown", function (e) {
//         pressed.add(e.code);

//         for (let code of codes) {
//             if (!pressed.has(code)) {
//                 return;
//             }
//         }

//         pressed.clear();

//         func();
//     });

//     document.addEventListener("mouseup", function (e) {
//         ctx.closePath();
//         isDraw = false;
//     });
//     canvas.addEventListener("mouseleave", function (e) {
//         ctx.closePath();
//         isDraw = false;

//         document.addEventListener("keyup", function (e) {
//             pressed.delete(e.code);
//         });
//     });
//     // Конец Рисование
// }

// function stepBack() {
//     if (archiveCounter > 0) {
//         --archiveCounter;
//         // Восстанавливаем размер
//         canvas.width = archive[archiveCounter].width;
//         canvas.height = archive[archiveCounter].height;
//         canvContainer.style.width = canvas.width + "px";
//         canvContainer.style.height = canvas.height + "px";

//         // Вставляем изображение
//         ctx.putImageData(archive[archiveCounter].imageData, 0, 0);

//         backsteps++;
//     }
// }

// function stepNext() {
//     if (archiveCounter < archive.length - 1) {
//         ++archiveCounter;
//         // Восстанавливаем размер
//         canvas.width = archive[archiveCounter].width;
//         canvas.height = archive[archiveCounter].height;
//         canvContainer.style.width = canvas.width + "px";
//         canvContainer.style.height = canvas.height + "px";

//         // Вставляем изображение
//         ctx.putImageData(archive[archiveCounter].imageData, 0, 0);

//         backsteps--;
//     }
// }
// runOnKeys(stepBack, "ControlLeft", "KeyZ");
// runOnKeys(stepNext, "ControlLeft", "KeyY");
// // Конец Комбинации клавиш
// });
// });