// Подключение необходимых модулей
let general = require("./general.js");

// Модуль
let dropdown = (function () {
    let dropdownAll = document.querySelectorAll(".dropdown");

    dropdownAll.forEach(elem => {
        elem.addEventListener("click", function() {
            elem.querySelector(".dropdown__item").classList.toggle("isHidden");
        })
    })
    return {

    }
})(general);

// Экспорт модуля
module.exports = dropdown;