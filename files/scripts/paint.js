// Canvas settings
let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

// Resizing
let canvBottom = document.getElementById("canvBottom"),
    canvRight = document.getElementById("canvRight"),
    canvCorner = document.getElementById("canvCorner");


// canvCorner.addEventListener("mousedown", function (e) {
//     canvCorner.addEventListener("mousemove", function (e) {

//     });
//     canvCorner.addEventListener("mouseup", function (e) {

//     });

// });

// Drawing
canvas.addEventListener("mousedown", function (e) {
    let mousePos = {
        x: e.pageX - this.offsetLeft,
        y: e.pageY - this.offsetTop
    };

    let isDraw = true;

    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);

    canvas.addEventListener("mousemove", function (e) {
        if (isDraw) {
            mousePos.x = e.pageX - this.offsetLeft;
            mousePos.y = e.pageY - this.offsetTop;

            ctx.lineWidth = 4;
            ctx.lineCap = "round";

            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            ctx.moveTo(mousePos.x, mousePos.y);
        }
    });

    canvas.addEventListener("mouseup", function (e) {
        ctx.closePath();
        isDraw = false;
    });
    canvas.addEventListener("mouseleave", function (e) {
        ctx.closePath();
        isDraw = false;
    });
});
// End drawing