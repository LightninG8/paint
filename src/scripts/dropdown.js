// Подключение необходимых модулей
let general = require("./general.js");

// Модуль
let dropdown = (function () {
    let dropdownList = document.querySelectorAll(".dropdown");

    dropdownList.forEach(elem => {
        let dropdownButton = elem.querySelector(".dropdown__shortcut");
        let content = elem.querySelector(".dropdown__menu");

        dropdownButton.addEventListener("click", function() {
            content.classList.toggle("isHidden");
        });
        document.addEventListener("mousedown", function dropdownDocumentMouseDown(e) {
            if (e.target != content && !dropdownButton.contains(e.target)) {
                content.classList.add("isHidden"); 
            }
        });
    })
    return {

    }
})(general);

// Экспорт модуля
module.exports = dropdown;