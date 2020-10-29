// Подключение необходимых модулей
let general = require("./general.js");
let archive = require("./archive.js");

// Модуль
let toolsList = (function ({canvas, workspace, ctx, status}) {
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
                    ctx.lineWidth = 6;
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


                // Добавляем в буффер все события
                buffer.eventListeners.push([canvas, ["mouseleave", drawLeave]]);
                buffer.eventListeners.push([canvas, ["mousemove", drawMove]]);
                buffer.eventListeners.push([document, ["mouseup", drawEnd]]);
                buffer.eventListeners.push([canvas, ["mousedown", drawStart]]);
                buffer.eventListeners.push([canvas, ["touchmove", drawMove]]);
                buffer.eventListeners.push([document, ["touchend", drawEnd]]);
                buffer.eventListeners.push([canvas, ["touchstart", drawStart]]);
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
                let fillSize = 4;

                function eraseStart(e) {
                    status.isDraw = true;
                    // Рисование началось
                    // TODO: С мобильных устройств плохо рисуется в некоторых браузерах
                    let mousePos = {
                        x: e.layerX || e.changedTouches[0].pageX - 5 + workspace.scrollLeft,
                        y: e.layerY || e.changedTouches[0].pageY - 5 - 92 + workspace.scrollTop
                    };
            
            
                    // Стили рисования
                    ctx.lineWidth = fillSize;
                    ctx.fillStyle = "#ffffff";
                    ctx.strokeStyle = "#ffffff";
            
                    // Начало рисования точки
                    ctx.fillRect(mousePos.x - fillSize / 2, mousePos.y - fillSize / 2, fillSize, fillSize);
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
                        ctx.fillRect(mousePos.x - fillSize / 2, mousePos.y - fillSize / 2, fillSize, fillSize);
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
                    archive.clearPastImageData();
                    archive.save();
            
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
                            ctx.fillRect(mousePos.x - fillSize / 2, mousePos.y - fillSize / 2, fillSize, fillSize);
                            ctx.lineTo(mousePos.x, mousePos.y);
                            ctx.stroke();
                            ctx.moveTo(mousePos.x, mousePos.y);
                            
                            ctx.closePath();
                            }
            
                    }
                    document.addEventListener("mousemove", erasemove);
                    canvas.addEventListener("mouseover", () => {
                        document.removeEventListener("mousemove", erasemove);
                    });
            
                }
                // desktop
                canvas.addEventListener("mouseleave", eraseLeave);
                canvas.addEventListener("mousemove", eraseMove);
                document.addEventListener("mouseup", eraseEnd);
            
                canvas.addEventListener("mousedown", eraseStart);
            
                // mobile
                canvas.addEventListener("touchmove", eraseMove);
                document.addEventListener("touchend", eraseEnd);
            
                canvas.addEventListener("touchstart", eraseStart);

                // Добавляем в буффер все события
                buffer.eventListeners.push([canvas, ["mouseleave", eraseLeave]]);
                buffer.eventListeners.push([canvas, ["mousemove", eraseMove]]);
                buffer.eventListeners.push([document, ["mouseup", eraseEnd]]);
                buffer.eventListeners.push([canvas, ["mousedown", eraseStart]]);
                buffer.eventListeners.push([canvas, ["touchmove", eraseMove]]);
                buffer.eventListeners.push([document, ["touchend", eraseEnd]]);
                buffer.eventListeners.push([canvas, ["touchstart", eraseStart]]);
            }
        },
        pallete: {
            id: "pallete",
        },
        scale: {
            id: "scale",
        }
    };

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
    })
    
    return {

    }
})(general);

// Экспорт модуля
module.exports = toolsList;