(window["webpackJsonphome"] = window["webpackJsonphome"] || []).push([[0],{

/***/ "./src/scripts/draw.js":
/*!*****************************!*\
  !*** ./src/scripts/draw.js ***!
  \*****************************/
/*! exports provided: draw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "draw", function() { return draw; });
let general = __webpack_require__(/*! ./general.js */ "./src/scripts/general.js");
let archive = __webpack_require__(/*! ./archive.js */ "./src/scripts/archive.js");

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

// module.exports = draw;

/***/ })

}]);
//# sourceMappingURL=0.bundle.js.map