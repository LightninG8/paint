let general = require("./general.js");
let archive = require("./archive.js");

let draw = (function ({
    subcanvas,
    canvas,
    ctx
}, actionArchive) {
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

            archive.clearPastImageData();
            archive.save();

        }

        subcanvas.addEventListener("mousemove", drawMove);
        document.addEventListener("mouseup", drawEnd);

    }
    subcanvas.addEventListener("mousedown", drawStart);

    return {}
})(general, archive);
//  general.subcanvas, general.canvas, general.ctx
module.exports = draw;