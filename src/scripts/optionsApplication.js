// Подключение необходимых модулей
let general = require("./general.js");

// Модуль
let optionsApplication = (function ({status}) {
    let optionsList = document.querySelectorAll(".option");

    optionsList.forEach(elem => {
        elem.addEventListener("mousedown", function() {
            
            if (elem.dataset.optionType == "color") {                  
                status.options[elem.dataset.optionType][elem.dataset.colorType] = this.dataset.optionValue;
                                
            } else {
                status.options[elem.dataset.optionType] = this.dataset.optionValue;
            }
            

            optionsList.forEach(item => {
                if (item.dataset.optionType == elem.dataset.optionType) {
                    item.classList.remove("tool_actived");
                }
                    
            });
            this.classList.add("tool_actived");
        })
    })
    return {}
})(general);

// Экспорт модуля
module.exports = optionsApplication;