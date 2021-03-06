// Подключение необходимых модулей
let general = require("./general.js");

// Модуль
let colors = (function ({status}) {
    let colorButtons = document.querySelectorAll(".colors__color");
    let colorList = document.querySelectorAll(".color__choose");

    colorButtons.forEach(elem => {
        elem.querySelector(".color__content").style.background = elem.dataset.optionValue;

        status.options[elem.dataset.optionType][elem.dataset.colorType] = elem.dataset.optionValue;
    });
    colorList.forEach(elem => {
        elem.querySelector(".color__content").style.background = elem.dataset.optionValue;

        elem.addEventListener("click", function() {
            if (!elem.classList.contains("color__choose_disabled")) {
                let curColorButton = document.querySelector(".colors__color.tool_actived");

                curColorButton.querySelector(".color__content").style.background = elem.dataset.optionValue;

                // Меняем цвет
                status.options.color[curColorButton.dataset.colorType] = elem.dataset.optionValue;

                curColorButton.dataset.optionValue = elem.dataset.optionValue;
            }
            
        });
    })

    return {}
})(general);

// Экспорт модуля
module.exports = colors;