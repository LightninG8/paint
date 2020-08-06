// Подключение необходимых модулей
let general = require("./general.js");

// Модуль
let subcanvasActions = (function ({
    subcanvas,
    canvas,
    ctx
}) {
    // Изменение курсора
    subcanvas.addEventListener("mousemove", function (e) {
        // При наведении на холст
        if (e.layerX >= 5 &&
            e.layerY >= 5 &&
            e.layerX - 5 <= canvas.width &&
            e.layerY - 5 <= canvas.height) {
            subcanvas.style.cursor = "crosshair";
        } else {
            subcanvas.style.cursor = "default";
        }

    });

    return {}
})(general);

// Экспорт модуля
module.exports = subcanvasActions;