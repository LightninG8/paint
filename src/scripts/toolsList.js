// Подключение необходимых модулей
let general = require("./general.js");
let archive = require("./archive.js");
let optionsList = require("./optionsList.js");

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