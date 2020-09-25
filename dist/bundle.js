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
__webpack_require__(/*! ./draw.js */ "./src/scripts/draw.js");
__webpack_require__(/*! ./resizing.js */ "./src/scripts/resizing.js");
__webpack_require__(/*! ./archive.js */ "./src/scripts/archive.js");
__webpack_require__(/*! ./infopanel.js */ "./src/scripts/infopanel.js");

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
            width: canvas.width,
            height: canvas.height
        });

        archiveCounter = archive.length - 1;
    }
    saveCache();

    function clearPastImageData() {
        // - Шаги назад
        if (backsteps != 0) {
            for (; backsteps > 0; backsteps--) {
                archive.pop();
                console.log("delete", backsteps);
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

    function stepBack() {
        if (archiveCounter > 0) {
            --archiveCounter;
            // Восстанавливаем размер
            canvas.width = archive[archiveCounter].width;
            canvas.height = archive[archiveCounter].height;
            general.canvContainer.style.width = canvas.width + "px";
            general.canvContainer.style.height = canvas.height + "px";

            // Вставляем изображение
            ctx.putImageData(archive[archiveCounter].imageData, 0, 0);

            backsteps++;
        }
    }

    function stepNext() {
        if (archiveCounter < archive.length - 1) {
            ++archiveCounter;
            // Восстанавливаем размер
            canvas.width = archive[archiveCounter].width;
            canvas.height = archive[archiveCounter].height;
            general.canvContainer.style.width = canvas.width + "px";
            general.canvContainer.style.height = canvas.height + "px";

            // Вставляем изображение
            ctx.putImageData(archive[archiveCounter].imageData, 0, 0);

            backsteps--;
        }
    }

    runOnKeys(stepBack, "ControlLeft", "KeyZ");
    runOnKeys(stepNext, "ControlLeft", "KeyY");

    return {
        save: saveCache,
        clearPastImageData: clearPastImageData
    }
})(general);

// Экспорт модуля
module.exports = actionArchive;

/***/ }),

/***/ "./src/scripts/draw.js":
/*!*****************************!*\
  !*** ./src/scripts/draw.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Подключение необходимых модулей
let general = __webpack_require__(/*! ./general.js */ "./src/scripts/general.js");
let archive = __webpack_require__(/*! ./archive.js */ "./src/scripts/archive.js");

// Модуль
let draw = (function ({
    canvas,
    workspace,
    ctx,
    status
}, actionArchive) {
    function drawStart(e) {
        status.isDraw = true;
        // Рисование началось
        let mousePos = {
            x: e.layerX || e.changedTouches[0].pageX - 5 + workspace.scrollLeft,
            y: e.layerY || e.changedTouches[0].pageY - 5 - 92 + workspace.scrollTop
        };


        // Стили рисования
        ctx.lineWidth = 2;
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
        archive.clearPastImageData();
        archive.save();

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
        document.addEventListener("mousemove", mousemove);
        canvas.addEventListener("mouseover", () => {
            document.removeEventListener("mousemove", mousemove);
        });

    }
    // desktop
    canvas.addEventListener("mouseleave", drawLeave);
    canvas.addEventListener("mousemove", drawMove);
    document.addEventListener("mouseup", drawEnd);

    canvas.addEventListener("mousedown", drawStart);

    // mobile
    canvas.addEventListener("touchmove", drawMove);
    document.addEventListener("touchend", drawEnd);

    canvas.addEventListener("touchstart", drawStart);
    return {}
})(general, archive);

// Экспорт модуля
module.exports = draw;

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

    let status = {
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

/***/ "./src/scripts/infopanel.js":
/*!**********************************!*\
  !*** ./src/scripts/infopanel.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Подключение необходимых модулей
let general = __webpack_require__(/*! ./general.js */ "./src/scripts/general.js");

// Модуль
let infopanel = (function ({
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
        showMousePos(e.layerX - 5, e.layerY - 5);
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
module.exports = infopanel;

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
let infopanel = __webpack_require__(/*! ./infopanel.js */ "./src/scripts/infopanel.js");

// Модуль
let resizing = (function ({
    canvas,
    ctx,
    status,
}, archive, infopanel) {

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

                infopanel.showCanvasSize();
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
})(general, archive, infopanel);

// Экспорт модуля
module.exports = resizing;

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