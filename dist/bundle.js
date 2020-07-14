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
let canvas = __webpack_require__(/*! ./init.js */ "./src/scripts/init.js");
let draw = __webpack_require__(/*! ./draw.js */ "./src/scripts/draw.js");
let resizing = __webpack_require__(/*! ./resizing.js */ "./src/scripts/resizing.js");

/***/ }),

/***/ "./src/scripts/draw.js":
/*!*****************************!*\
  !*** ./src/scripts/draw.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Инициализируем "каркас"
let init = __webpack_require__(/*! ./init.js */ "./src/scripts/init.js");

let draw = (function () {
    // Для упрощения
    let canvas = init.canvas,
        subcanvas = init.subcanvas,
        ctx = init.ctx;

    function drawStart(e) {
        let isDraw = true;

        let mousePos = {
            x: e.layerX - 5,
            y: e.layerY - 5
        };

        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(mousePos.x, mousePos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();


        function drawMove(e) {
            if (isDraw) {
                mousePos = {
                    x: e.layerX - 5,
                    y: e.layerY - 5
                };

                ctx.lineTo(mousePos.x, mousePos.y);
                ctx.stroke();
                ctx.moveTo(mousePos.x, mousePos.y);
            }
        }

        function drawEnd(e) {
            isDraw = false;
            ctx.closePath();


            subcanvas.removeEventListener("mousemove", drawMove);
            document.removeEventListener("mouseup", drawEnd);
        }

        subcanvas.addEventListener("mousemove", drawMove);
        document.addEventListener("mouseup", drawEnd);

    }
    subcanvas.addEventListener("mousedown", drawStart);

    return {

    }
})();

module.exports = draw;

/***/ }),

/***/ "./src/scripts/init.js":
/*!*****************************!*\
  !*** ./src/scripts/init.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

let init = (function () {
    // Настройки канваса
    let subcanvas = document.getElementById("subcanvas"),
        canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = 940;
    canvas.height = 540;

    subcanvas.width = canvas.width + 100;
    subcanvas.height = canvas.height + 100;
    // Конец Настройки канваса

    return {
        canvas: canvas,
        subcanvas: subcanvas,
        ctx: ctx,
        getCanvasSize: function () {
            return {
                width: canvas.width,
                height: canvas.height
            }
        },
        setCanvasSize: function (width, height) {
            canvas.width = width;
            canvas.height = height;
        },
    }
})();

module.exports = init;

/***/ }),

/***/ "./src/scripts/resizing.js":
/*!*********************************!*\
  !*** ./src/scripts/resizing.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Инициализируем "каркас"
let init = __webpack_require__(/*! ./init.js */ "./src/scripts/init.js");

let resizing = (function () {
    // Для упрощения
    let canvas = init.canvas,
        subcanvas = init.subcanvas,
        ctx = init.ctx;

    // Изменение размера
    let canvContainer = document.querySelector(".canvas"),
        canvFrame = document.querySelector(".canvas__frame"),
        canvBottom = document.getElementById("canvBottom"),
        canvRight = document.getElementById("canvRight"),
        canvCorner = document.getElementById("canvCorner");

    // Функции-инструменты
    function showElem(elem) {
        elem.style.display = 'block';
    }

    function hideElem(elem) {
        elem.style.display = 'none';
    }

    function resizeElem(elem, size) {
        elem.style.width = size.width + 'px';
        elem.style.height = size.height + 'px';
    }
    // При нажатии на ползунок
    function canvasResizeStart(e) {
        let isDraggable = true;

        resizeElem(canvFrame, init.getCanvasSize());
        showElem(canvFrame);

        // Создаём данные изображения
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // меняет рамку при событии движении мыши
        let canvasResizeMove = e => {
            if (isDraggable) {
                // дополнительно учитывая изначальный сдвиг относительно указателя мыши
                if (this == canvBottom) {
                    canvFrame.style.height = e.pageY - 5 - 92 + 'px';
                } else if (this == canvRight) {
                    canvFrame.style.width = e.pageX - 5 + 'px';
                } else if (this == canvCorner) {
                    canvFrame.style.width = e.pageX - 5 + 'px';
                    canvFrame.style.height = e.pageY - 5 - 92 + 'px';
                }

            }
        };
        // зафиксировать рамку, удалить ненужные обработчики
        let canvasResizeEnd = e => {
            if (isDraggable) {
                isDraggable = false;

                if (this == canvBottom) {
                    canvas.height = e.pageY - 5 - 92;
                } else if (this == canvRight) {
                    canvas.width = e.pageX - 5;
                } else if (this == canvCorner) {
                    canvas.width = e.pageX - 5;
                    canvas.height = e.pageY - 5 - 92;
                }

                subcanvas.width = canvas.width + 100;
                subcanvas.height = canvas.height + 100;

                hideElem(canvFrame);

                // Канвас
                resizeElem(canvContainer, init.getCanvasSize());
                ctx.putImageData(imageData, 0, 0);

                document.removeEventListener('mousemove', canvasResizeMove);
                document.removeEventListener('mouseup', canvasResizeEnd);

            }

        };

        document.addEventListener('mousemove', canvasResizeMove);
        document.addEventListener("mouseup", canvasResizeEnd);
    }

    // - Обработчики на все ползунки
    [canvBottom, canvRight, canvCorner].forEach((e) => {
        e.ondragstart = function () {
            return false;
        };
        e.addEventListener("mousedown", canvasResizeStart);
    });
    // Конец Изменение размера
    return {

    }
})();

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