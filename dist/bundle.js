var home =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/scss/style.scss */ "./src/styles/scss/style.scss");
/* harmony import */ var _styles_scss_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__);
// webpack refactoring

// scss


// js
__webpack_require__(/*! ./optionsApplication.js */ "./src/scripts/optionsApplication.js");
__webpack_require__(/*! ./optionsList.js */ "./src/scripts/optionsList.js");
__webpack_require__(/*! ./toolApplication.js */ "./src/scripts/toolApplication.js");
__webpack_require__(/*! ./toolsList.js */ "./src/scripts/toolsList.js");
__webpack_require__(/*! ./resizing.js */ "./src/scripts/resizing.js");
__webpack_require__(/*! ./archive.js */ "./src/scripts/archive.js");
__webpack_require__(/*! ./statusbar.js */ "./src/scripts/statusbar.js");
__webpack_require__(/*! ./dropdown.js */ "./src/scripts/dropdown.js");


/***/ }),

/***/ "./src/scripts/archive.js":
/*!********************************!*\
  !*** ./src/scripts/archive.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Подключение необходимых модулей
let general = __webpack_require__(/*! ./general.js */ "./src/scripts/general.js");

// Модуль
let actionArchive = (function ({
    canvas,
    ctx
}) {
    // Архив
    let archive = [],
        archiveCounter = 0,
        backsteps = 0;

    function saveCache() {
        archive.push({
            imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
            strokeStyle: ctx.strokeStyle,
            fillStyle: ctx.fillStyle,
            lineCap: ctx.lineCap,
        });

        archiveCounter = archive.length - 1;
    }
    saveCache();

    function clearPastImageData() {
        // - Шаги назад
        if (backsteps != 0) {
            for (; backsteps > 0; backsteps--) {
                archive.pop();
            }
        }

    }

    // Комбинации клавиш
    function runOnKeys(func, ...codes) {
        let pressed = new Set();

        document.addEventListener("keydown", function (e) {
            pressed.add(e.code);

            for (let code of codes) {
                if (!pressed.has(code)) {
                    return;
                }
            }

            func();
        });

        document.addEventListener("keyup", function (e) {
            pressed.delete(e.code);
        });
    }
    function recovery() {
        // Восстанавливаем размер
        canvas.width = archive[archiveCounter].imageData.width;
        canvas.height = archive[archiveCounter].imageData.height;
        general.canvContainer.style.width = canvas.width + "px";
        general.canvContainer.style.height = canvas.height + "px";

        // Вставляем изображение
        ctx.putImageData(archive[archiveCounter].imageData, 0, 0);

        // Восстанавливаем настройки
        ctx.strokeStyle = archive[archiveCounter].strokeStyle;
        ctx.fillStyle = archive[archiveCounter].fillStyle;
        ctx.lineCap = archive[archiveCounter].lineCap;
    }

    function stepBack() {
        if (archiveCounter > 0) {
            --archiveCounter;
            
            recovery();

            backsteps++;   
        }
    }

    function stepNext() {
        if (archiveCounter < archive.length - 1) {
            ++archiveCounter;
            
            recovery();

            backsteps--;
        }
    }

    runOnKeys(stepBack, "ControlLeft", "KeyZ");
    runOnKeys(stepNext, "ControlLeft", "KeyY");

    return {
        archive: archive,
        save: saveCache,
        clearPastImageData: clearPastImageData
    }
})(general);

// Экспорт модуля
module.exports = actionArchive;

/***/ }),

/***/ "./src/scripts/dropdown.js":
/*!*********************************!*\
  !*** ./src/scripts/dropdown.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Подключение необходимых модулей
let general = __webpack_require__(/*! ./general.js */ "./src/scripts/general.js");

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

/***/ }),

/***/ "./src/scripts/general.js":
/*!********************************!*\
  !*** ./src/scripts/general.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

let general = (function () {
    // Настройки канваса
    let canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");

    let workspace = document.querySelector(".workspace"),
        workspaceBody = document.querySelector(".workspace__body"),
        canvContainer = document.querySelector(".canvas");

    // TODO: Сделать общий объект состояния приложения
    let status = {
        options: {
            thickness: "thickness-2px",
        },
        activeTool: 'pencil',
        isDraw: false,
        isResizing: false,
        technicalImageData: undefined,
    }
    // Функции-инструменты
    function showElem(elem) {
        elem.style.display = 'block';
    }

    function hideElem(elem) {
        elem.style.display = 'none';
    }

    return {
        canvas: canvas,
        ctx: ctx,
        workspace: workspace,
        canvContainer: canvContainer,
        status: status,
        showElem: showElem,
        hideElem: hideElem,
    }
})();

module.exports = general;

/***/ }),

/***/ "./src/scripts/optionsApplication.js":
/*!*******************************************!*\
  !*** ./src/scripts/optionsApplication.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Подключение необходимых модулей
let general = __webpack_require__(/*! ./general.js */ "./src/scripts/general.js");
let optionsList = __webpack_require__(/*! ./optionsList.js */ "./src/scripts/optionsList.js");

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

/***/ }),

/***/ "./src/scripts/optionsList.js":
/*!************************************!*\
  !*** ./src/scripts/optionsList.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Подключение необходимых модулей
let general = __webpack_require__(/*! ./general.js */ "./src/scripts/general.js");

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

/***/ }),

/***/ "./src/scripts/resizing.js":
/*!*********************************!*\
  !*** ./src/scripts/resizing.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Подключение необходимых модулей
let general = __webpack_require__(/*! ./general.js */ "./src/scripts/general.js");
let archive = __webpack_require__(/*! ./archive.js */ "./src/scripts/archive.js");
let statusbar = __webpack_require__(/*! ./statusbar.js */ "./src/scripts/statusbar.js");

// Модуль
let resizing = (function ({
    canvas,
    ctx,
    status,
}, archive, statusbar) {

    // Изменение размера
    let canvContainer = document.querySelector(".canvas"),
        canvFrame = document.querySelector(".canvas__frame"),
        canvBottom = document.getElementById("canvBottom"),
        canvRight = document.getElementById("canvRight"),
        canvCorner = document.getElementById("canvCorner");

    // При нажатии на ползунок
    function canvasResizeStart(e) {
        status.isResizing = true;

        canvFrame.style.width = canvas.width;
        canvFrame.style.height = canvas.height;

        general.showElem(canvFrame);

        // Создаём данные изображения
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // меняет рамку при событии движении мыши
        let canvasResizeMove = e => {
            if (status.isResizing) {
                // дополнительно учитывая изначальный сдвиг относительно указателя мыши
                let rect = canvas.getBoundingClientRect(),
                    x = e.clientX - rect.left || e.changedTouches[0].clientX - rect.left,
                    y = e.clientY - rect.top || e.changedTouches[0].clientY - rect.top;

                if (this == canvBottom) {
                    canvFrame.style.height = y + 'px';
                } else if (this == canvRight) {
                    canvFrame.style.width = x + 'px';
                } else if (this == canvCorner) {
                    canvFrame.style.width = x + 'px';
                    canvFrame.style.height = y + 'px';
                }

            }
        };
        // зафиксировать рамку, удалить ненужные обработчики
        let canvasResizeEnd = e => {
            if (status.isResizing) {
                status.isResizing = false;

                let rect = canvas.getBoundingClientRect(),
                    x = e.clientX - rect.left || e.changedTouches[0].clientX - rect.left,
                    y = e.clientY - rect.top || e.changedTouches[0].clientY - rect.top;

                if (this == canvBottom) {
                    canvas.height = y;
                } else if (this == canvRight) {
                    canvas.width = x;
                } else if (this == canvCorner) {
                    canvas.width = x;
                    canvas.height = y;
                }

                general.hideElem(canvFrame);

                // Канвас
                canvContainer.style.width = canvas.width + 'px';
                canvContainer.style.height = canvas.height + 'px';

                ctx.putImageData(imageData, 0, 0);

                // desktop
                document.removeEventListener('mousemove', canvasResizeMove);
                document.removeEventListener('mouseup', canvasResizeEnd);

                // mobile
                document.removeEventListener('touchmove', canvasResizeMove);
                document.removeEventListener('touchend', canvasResizeEnd);
                // Другое из зависимостей
                archive.clearPastImageData();
                archive.save();

                statusbar.showCanvasSize();
            }

        };

        // desktop
        document.addEventListener('mousemove', canvasResizeMove);
        document.addEventListener("mouseup", canvasResizeEnd);

        // mobile
        document.addEventListener('touchmove', canvasResizeMove);
        document.addEventListener("touchend", canvasResizeEnd);
    }

    // - Обработчики на все ползунки
    [canvBottom, canvRight, canvCorner].forEach((e) => {
        e.ondragstart = function () {
            return false;
        };
        e.addEventListener("mousedown", canvasResizeStart);
        e.addEventListener("touchstart", canvasResizeStart);
    });

    // Конец Изменение размера
    return {}
})(general, archive, statusbar);

// Экспорт модуля
module.exports = resizing;

/***/ }),

/***/ "./src/scripts/statusbar.js":
/*!**********************************!*\
  !*** ./src/scripts/statusbar.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Подключение необходимых модулей
let general = __webpack_require__(/*! ./general.js */ "./src/scripts/general.js");

// Модуль
let statusbar = (function ({
    canvas,
    ctx
}) {
    let canvMousePos = document.getElementById("mousepos"),
        canvFrameSize = document.getElementById("framesize"),
        canvCanvasSize = document.getElementById("canvassize"),
        canvZoom = document.getElementById("zoom");

    // Отображение положения курсора
    function showMousePos(x, y) {
        let container = canvMousePos.querySelector(".infocell__value");

        container.textContent = arguments.length != 2 ? "" : `${x} x ${y}пкс`;
    }

    // Если наведён на холст
    canvas.addEventListener("mousemove", function (e) {
        showMousePos(e.layerX, e.layerY);
    });
    canvas.addEventListener("mouseleave", e => {
        showMousePos();
    })


    // Отоброжение размера канваса
    function showCanvasSize() {
        let container = canvCanvasSize.querySelector(".infocell__value");

        container.textContent = `${canvas.width} x ${canvas.height}пкс`;
    }
    showCanvasSize();

    return {
        showCanvasSize: showCanvasSize
    }
})(general);

// Экспорт модуля
module.exports = statusbar;

/***/ }),

/***/ "./src/scripts/toolApplication.js":
/*!****************************************!*\
  !*** ./src/scripts/toolApplication.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Подключение необходимых модулей
let general = __webpack_require__(/*! ./general.js */ "./src/scripts/general.js");
let toolsList = __webpack_require__(/*! ./toolsList.js */ "./src/scripts/toolsList.js");

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

/***/ }),

/***/ "./src/scripts/toolsList.js":
/*!**********************************!*\
  !*** ./src/scripts/toolsList.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Подключение необходимых модулей
let general = __webpack_require__(/*! ./general.js */ "./src/scripts/general.js");
let archive = __webpack_require__(/*! ./archive.js */ "./src/scripts/archive.js");
let optionsList = __webpack_require__(/*! ./optionsList.js */ "./src/scripts/optionsList.js");

// Модуль
let toolsList = (function ({canvas, workspace, ctx, status}, archive, {options}) {
    // Чтобы задать обработчик события и занести его в буфер, чтобы потом удалить при смене инструмента
    Object.prototype.addBufferEventListener = function(type, func) {
        this.addEventListener(type, func);

        buffer.eventListeners.push([this, [type, func]]);
    }

    let buffer = {
        eventListeners: [],
    };

    let tools = {
        pencil: {
            id: "pencil",
            action: function (actionArchive) {
                function drawStart(e) {
                    status.isDraw = true;
                    // Рисование началось
                    // TODO: С мобильных устройств плохо рисуется в некоторых браузерах
                    let mousePos = {
                        x: e.layerX || e.changedTouches[0].pageX - 5 + workspace.scrollLeft,
                        y: e.layerY || e.changedTouches[0].pageY - 5 - 92 + workspace.scrollTop
                    };
                    // Стили рисования

                    ctx.lineWidth = status.options["thickness"];

                    ctx.strokeStyle = "#000000";
                    ctx.fillStyle = "#000000";
                    ctx.lineCap = "round";
            
                    // Начало рисования точки
                    ctx.beginPath();
                    ctx.moveTo(mousePos.x, mousePos.y);
                    ctx.lineTo(mousePos.x, mousePos.y);
                    ctx.stroke();
                }
                function drawMove(e) {
                    if (status.isDraw) {
                        mousePos = {
                            x: e.layerX || e.changedTouches[0].pageX - 5 + workspace.scrollLeft,
                            y: e.layerY || e.changedTouches[0].pageY - 5 - 92 + workspace.scrollTop
                        };
                        // Проведение линии
                        ctx.lineTo(mousePos.x, mousePos.y);
                        ctx.stroke();
                        ctx.moveTo(mousePos.x, mousePos.y);
                        
                        ctx.closePath();
                        
                    }
                }
            
                function drawEnd(e) {
                    // Рисование закончилось
                    status.isDraw = false;
            
            
                    // Удалить обработчики, чтобы не стакались
                    // Заносим измекнения в архив
                    if(e.target == canvas) {  
                        archive.clearPastImageData();
                        archive.save(); 
                    }
                    
            
                }
                function drawLeave(e) {
                    function mousemove(e) {
                        if (status.isDraw) {
                            mousePos = {
                                x: e.pageX - 5 + workspace.scrollLeft,
                                y: e.pageY - 5 - 92 + workspace.scrollTop
                            };
                            console.log();
                            // Проведение линии
                            ctx.lineTo(mousePos.x, mousePos.y);
                            ctx.stroke();
                            ctx.moveTo(mousePos.x, mousePos.y);
                        }
            
                    }
                    document.addBufferEventListener("mousemove", mousemove);
                    canvas.addBufferEventListener("mouseover", () => {
                        document.removeEventListener("mousemove", mousemove);
                    });
            
                }
                // desktop
                canvas.addBufferEventListener("mouseleave", drawLeave);
                canvas.addBufferEventListener("mousemove", drawMove);
                document.addBufferEventListener("mouseup", drawEnd);
            
                canvas.addBufferEventListener("mousedown", drawStart);
            
                // mobile
                canvas.addBufferEventListener("touchmove", drawMove);
                document.addBufferEventListener("touchend", drawEnd);
            
                canvas.addBufferEventListener("touchstart", drawStart);      
            },
        },
        fill: {
            id: "fill",
        },
        text: {
            id: "text",
        },
        eraser: {
            id: "eraser",
            action: function() {
                let size = status.options["thickness"] * 2;

                function eraseStart(e) {
                    status.isDraw = true;
                    // Рисование началось
                    // TODO: С мобильных устройств плохо рисуется в некоторых браузерах
                    let mousePos = {
                        x: e.layerX || e.changedTouches[0].pageX - 5 + workspace.scrollLeft,
                        y: e.layerY || e.changedTouches[0].pageY - 5 - 92 + workspace.scrollTop
                    };
            
            
                    // Стили рисования
                    size = status.options["thickness"] * 2

                    ctx.lineWidth = size;
                    ctx.fillStyle = "#ffffff";
                    ctx.strokeStyle = "#ffffff";
            
                    // Начало рисования точки
                    ctx.fillRect(mousePos.x - size / 2, mousePos.y - size / 2, size, size);
                    ctx.beginPath();
                    ctx.moveTo(mousePos.x, mousePos.y);
                    ctx.lineTo(mousePos.x, mousePos.y);
                    ctx.stroke();
                }
                function eraseMove(e) {
                    if (status.isDraw) {
                        mousePos = {
                            x: e.layerX || e.changedTouches[0].pageX - 5 + workspace.scrollLeft,
                            y: e.layerY || e.changedTouches[0].pageY - 5 - 92 + workspace.scrollTop
                        };
                        // Проведение линии
                        ctx.fillRect(mousePos.x - size / 2, mousePos.y - size / 2, size, size);
                        ctx.lineTo(mousePos.x, mousePos.y);
                        ctx.stroke();
                        ctx.moveTo(mousePos.x, mousePos.y);
                        
                        ctx.closePath();
                        
                    }
                }
            
                function eraseEnd(e) {
                    // Рисование закончилось
                    status.isDraw = false;
            
            
                    // Удалить обработчики, чтобы не стакались
                    // Заносим измекнения в архив
                    if(e.target == canvas) {  
                        archive.clearPastImageData();
                        archive.save(); 
                    }
            
                }
                function eraseLeave(e) {
                    function erasemove(e) {
                        if (status.isDraw) {
                            mousePos = {
                                x: e.pageX - 5 + workspace.scrollLeft,
                                y: e.pageY - 5 - 92 + workspace.scrollTop
                            };
                            console.log();
                            // Проведение линии
                            ctx.fillRect(mousePos.x - size / 2, mousePos.y - size / 2, size, size);
                            ctx.lineTo(mousePos.x, mousePos.y);
                            ctx.stroke();
                            ctx.moveTo(mousePos.x, mousePos.y);
                            
                            ctx.closePath();
                            }
            
                    }
                    document.addBufferEventListener("mousemove", erasemove);
                    canvas.addBufferEventListener("mouseover", () => {
                        document.removeEventListener("mousemove", erasemove);
                    });
            
                }
                // desktop
                canvas.addBufferEventListener("mouseleave", eraseLeave);
                canvas.addBufferEventListener("mousemove", eraseMove);
                document.addBufferEventListener("mouseup", eraseEnd);
            
                canvas.addBufferEventListener("mousedown", eraseStart);
            
                // mobile
                canvas.addBufferEventListener("touchmove", eraseMove);
                document.addBufferEventListener("touchend", eraseEnd);
            
                canvas.addBufferEventListener("touchstart", eraseStart);
            }
        },
        pallete: {
            id: "pallete",
        },
        scale: {
            id: "scale",
        }
    };

    
    return {
        tools: tools,
        buffer: buffer
    };
})(general, archive, optionsList);

// Экспорт модуля
module.exports = toolsList;

/***/ }),

/***/ "./src/styles/scss/style.scss":
/*!************************************!*\
  !*** ./src/styles/scss/style.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map