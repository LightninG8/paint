// Подключение необходимых модулей
let general = require("./general.js");
let optionsList = require("./optionsList.js");

// Модуль
let optionsApplication = (function ({status}, {options}) {
    let optionsList = document.querySelectorAll(".option");

    optionsList.forEach(elem => {
        elem.addEventListener("mousedown", function() {
            
            status.options[elem.dataset.optionType] = options.thickness.get(this.id);

            optionsList.forEach(item => {
                    item.classList.remove("tool_actived");
            });
            this.classList.add("tool_actived");
        })
    })
    return {}
})(general, optionsList);

// Экспорт модуля
module.exports = optionsApplication;