// Подключение необходимых модулей
let general = require("./general.js");

// Модуль
let actionArchive = (function ({
    subcanvas,
    canvas,
    ctx
}) {
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

    function clearPastImageData() {
        // - Шаги назад
        if (backsteps != 0) {
            for (; backsteps > 0; backsteps--) {
                archive.pop();
                console.log("delete", backsteps);
            }
        }

    }

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
            general.canvContainer.style.width = canvas.width + "px";
            general.canvContainer.style.height = canvas.height + "px";

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
            general.canvContainer.style.width = canvas.width + "px";
            general.canvContainer.style.height = canvas.height + "px";

            // Вставляем изображение
            ctx.putImageData(archive[archiveCounter].imageData, 0, 0);

            backsteps--;
        }
    }

    runOnKeys(stepBack, "ControlLeft", "KeyZ");
    runOnKeys(stepNext, "ControlLeft", "KeyY");

    return {
        save: saveCache,
        clearPastImageData: clearPastImageData
    }
})(general);

// Экспорт модуля
module.exports = actionArchive;