// Подключение необходимых модулей
let general = require("./general.js");

// Модуль
let actionArchive = (function ({
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
        });

        archiveCounter = archive.length - 1;
    }
    saveCache();

    function clearPastImageData() {
        // - Шаги назад
        if (backsteps != 0) {
            for (; backsteps > 0; backsteps--) {
                archive.pop();
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
    function recovery() {
        // Восстанавливаем размер
        canvas.width = archive[archiveCounter].imageData.width;
        canvas.height = archive[archiveCounter].imageData.height;
        general.canvContainer.style.width = canvas.width + "px";
        general.canvContainer.style.height = canvas.height + "px";

        // Вставляем изображение
        ctx.putImageData(archive[archiveCounter].imageData, 0, 0);
    }

    function stepBack() {
        if (archiveCounter > 0) {
            --archiveCounter;
            
            recovery();

            backsteps++;   
        }
    }

    function stepNext() {
        if (archiveCounter < archive.length - 1) {
            ++archiveCounter;
            
            recovery();

            backsteps--;
        }
    }

    runOnKeys(stepBack, "ControlLeft", "KeyZ");
    runOnKeys(stepNext, "ControlLeft", "KeyY");

    return {
        archive: archive,
        save: saveCache,
        clearPastImageData: clearPastImageData
    }
})(general);

// Экспорт модуля
module.exports = actionArchive;