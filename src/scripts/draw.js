// Подключение необходимых модулей
let general = require("./general.js");
let archive = require("./archive.js");

// Модуль
let draw = (function ({
    subcanvas,
    canvas,
    ctx
}, actionArchive) {
    function drawStart(e) {
        // Рисование началось
        let isDraw = true;

        let mousePos = {
            x: e.layerX - 5,
            y: e.layerY - 5
        };

        // Стили рисования
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        // Начало рисования точки
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

                // Проведение линии
                ctx.lineTo(mousePos.x, mousePos.y);
                ctx.stroke();
                ctx.moveTo(mousePos.x, mousePos.y);
            }
        }

        function drawEnd(e) {
            // Рисование закончилось
            isDraw = false;

            ctx.closePath();

            // Удалить обработчики, чтобы не стакались
            subcanvas.removeEventListener("mousemove", drawMove);
            document.removeEventListener("mouseup", drawEnd);

            // Заносим измекнения в архив
            archive.clearPastImageData();
            archive.save();

        }

        subcanvas.addEventListener("mousemove", drawMove);
        document.addEventListener("mouseup", drawEnd);

    }
    subcanvas.addEventListener("mousedown", drawStart);

    return {}
})(general, archive);

// Экспорт модуля
module.exports = draw;