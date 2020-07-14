// Инициализируем "каркас"
let init = require("./init.js");

let draw = (function () {
    // Для упрощения
    let canvas = init.canvas,
        subcanvas = init.subcanvas,
        ctx = init.ctx;

    function drawStart(e) {
        let isDraw = true;

        let mousePos = {
            x: e.layerX - 5,
            y: e.layerY - 5
        };

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


            subcanvas.removeEventListener("mousemove", drawMove);
            document.removeEventListener("mouseup", drawEnd);
        }

        subcanvas.addEventListener("mousemove", drawMove);
        document.addEventListener("mouseup", drawEnd);

    }
    subcanvas.addEventListener("mousedown", drawStart);

    return {

    }
})();

module.exports = draw;