// Подключение необходимых модулей
let general = require("./general.js");
let archive = require("./archive.js");

// Модуль
let draw = (function ({
    canvas,
    workspace,
    ctx,
    status
}, actionArchive) {
    function drawStart(e) {
        status.isDraw = true;
        // Рисование началось
        let mousePos = {
            x: e.layerX || e.changedTouches[0].pageX - 5,
            y: e.layerY || e.changedTouches[0].pageY - 5 - 92
        };


        // Стили рисования
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        // Начало рисования точки
        ctx.beginPath();
        ctx.moveTo(mousePos.x, mousePos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
    }
    function drawMove(e) {
        if (status.isDraw) {
            mousePos = {
                x: e.layerX || e.changedTouches[0].pageX - 5,
                y: e.layerY || e.changedTouches[0].pageY - 5 - 92
            };
            // Проведение линии
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            ctx.moveTo(mousePos.x, mousePos.y);
            ctx.closePath();
        }
    }

    function drawEnd(e) {
        // Рисование закончилось
        status.isDraw = false;


        // Удалить обработчики, чтобы не стакались
        // Заносим измекнения в архив
        archive.clearPastImageData();
        archive.save();

    }
    function drawLeave(e) {
        function mousemove(e) {
            if (status.isDraw) {
                mousePos = {
                    x: e.pageX - 5 + workspace.scrollLeft,
                    y: e.pageY - 5 - 92 + workspace.scrollTop
                };
                console.log();
                // Проведение линии
                ctx.lineTo(mousePos.x, mousePos.y);
                ctx.stroke();
                ctx.moveTo(mousePos.x, mousePos.y);
            }

        }
        document.addEventListener("mousemove", mousemove);
        canvas.addEventListener("mouseover", () => {
            document.removeEventListener("mousemove", mousemove);
        });

    }
    // desktop
    canvas.addEventListener("mouseleave", drawLeave);
    canvas.addEventListener("mousemove", drawMove);
    document.addEventListener("mouseup", drawEnd);

    canvas.addEventListener("mousedown", drawStart);

    // mobile
    canvas.addEventListener("touchmove", drawMove);
    document.addEventListener("touchend", drawEnd);

    canvas.addEventListener("touchstart", drawStart);
    return {}
})(general, archive);

// Экспорт модуля
module.exports = draw;