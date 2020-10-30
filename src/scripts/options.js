// Подключение необходимых модулей
let general = require("./general.js");

// Модуль
let toolApplication = (function ({status}) {
    let optionsList = document.querySelectorAll(".option");

    optionsList.forEach(elem => {
        elem.addEventListener("mousedown", function() {
            status.options[elem.dataset.optionType] = this.id;

            optionsList.forEach(item => {
                if (item.dataset.optionType = this.id) {
                    item.classList.remove("tool_actived");
                }
            });
            this.classList.add("tool_actived");
        })
    })
    return {}
})(general);

// Экспорт модуля
module.exports = toolApplication;