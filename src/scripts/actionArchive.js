// Инициализируем "каркас"
let general = require("./general.js");

let actionArchive = (function ({
    subcanvas,
    canvas,
    ctx,
    canvContainer,
    showElem,
    hideElem,
    resizeElem,
    resizeCanvas,
    getCanvasSize
}) {
    // Архив
    let archive = [],
        archiveCounter = 1,
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

    // События
    // Ресайзинг
    let canvBottom = document.getElementById("canvBottom"),
        canvRight = document.getElementById("canvRight"),
        canvCorner = document.getElementById("canvCorner");

    function canvasResizeStart(e) {
        let isDraggable = true;

        let canvasResizeEnd = e => {
            if (isDraggable) {
                isDraggable = false;

                document.removeEventListener('mouseup', canvasResizeEnd);

                console.log("Before:" + archive);
                saveCache();
                console.log("After:" + archive);
            }

        };

        document.addEventListener("mouseup", canvasResizeEnd);
    }
    [canvBottom, canvRight, canvCorner].forEach((e) => {
        e.addEventListener("mousedown", canvasResizeStart);
    });
    // Рисование
    function drawStart(e) {
        let isDraw = true;

        function drawEnd(e) {
            isDraw = false;

            document.removeEventListener("mouseup", drawEnd);

            // - Сохранение кэша
            saveCache();

            // - Шаги назад
            if (backsteps != 0) {
                for (; backsteps > 0; backsteps--) {
                    archive.pop();
                }
            }
        }

        document.addEventListener("mouseup", drawEnd);

    }
    subcanvas.addEventListener("mousedown", drawStart);
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
        }
    }
    runOnKeys(stepBack, "ControlLeft", "KeyZ");
    runOnKeys(stepNext, "ControlLeft", "KeyY");
    // Конец Комбинации клавиш
    return {}
})(general);

module.exports = actionArchive;