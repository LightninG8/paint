// Подключение необходимых модулей
let general = require("./general.js");

// Модуль
let optionsList = (function ({status}) {

    let options = {
        thickness: new Map([["thickness-1px", 1], ["thickness-2px", 2], ["thickness-3px", 3], ["thickness-4px", 4]]),
    }
    
    return {
        options: options
    };
})(general);

// Экспорт модуля
module.exports = optionsList;