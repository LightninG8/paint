// Подключение необходимых модулей
let general = require("./general.js");

// Модуль
let savecanvas = (function ({canvas, ctx}) {
    let saveButton = document.getElementById("savecanvas");

    saveButton.addEventListener("click", function() {
        var dataURL = canvas.toDataURL("image/jpeg");
        var link = document.createElement("a");
        link.href = dataURL;
        link.download = "Безымянный.jpg";
        link.click();

    });
    return {}
})(general);

// Экспорт модуля
module.exports = savecanvas;