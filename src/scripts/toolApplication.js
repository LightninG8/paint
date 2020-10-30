// Подключение необходимых модулей
let general = require("./general.js");
let toolsList = require("./toolsList.js");

// Модуль
let toolApplication = (function (general, {tools, buffer}) {
    tools[general.status.activeTool].action();
    
    let toolsButtons = document.querySelectorAll(".tools__tool");

    toolsButtons.forEach(elem => {
        elem.addEventListener("click", function() {
            if(!this.classList.contains("tool_actived")) {
                general.activeTool = this.id;

                // Удаляем ненужные обработчики событий
                for (let i = 0; i < buffer.eventListeners.length; i++) {
                    buffer.eventListeners[i][0].removeEventListener(buffer.eventListeners[i][1][0], buffer.eventListeners[i][1][1]);
                    // console.log(buffer.eventListeners[i][1][1]);
                }

                // Очищаем массив
                buffer.eventListeners = [];

                toolsButtons.forEach(elem => {
                    elem.classList.remove("tool_actived");
                })

                this.classList.add("tool_actived");

                tools[general.activeTool].action();
            }
        });
    });

    return {}
})(general, toolsList);

// Экспорт модуля
module.exports = toolApplication;