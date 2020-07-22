let general = (function () {
    // Настройки канваса
    let subcanvas = document.getElementById("subcanvas"),
        canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");

    let workspace = document.querySelector(".workspace__body");

    canvas.width = 940;
    canvas.height = 540;

    subcanvas.width = canvas.width + 100;
    subcanvas.height = canvas.height + 100;
    // Конец Настройки канваса

    return {
        canvas: canvas,
        subcanvas: subcanvas,
        ctx: ctx,
        workspace: workspace
    }
})();

module.exports = general;