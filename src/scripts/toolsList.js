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
            action: function () {
                function drawStart(e) {
                    status.isDraw = true;
                    // Рисование началось
                    // TODO: С мобильных устройств плохо рисуется в некоторых браузерах
                    let mousePos = {
                        x: e.layerX || e.changedTouches[0].pageX - 5 + workspace.scrollLeft,
                        y: e.layerY || e.changedTouches[0].pageY - 5 - 92 + workspace.scrollTop
                    };
                    // Стили рисования

                    ctx.lineWidth = status.options.thickness;

                    if(e.button == 0) {
                        ctx.strokeStyle = status.options.color.curColor;
                        ctx.fillStyle = status.options.color.curColor;   
                    } else if (e.button == 2) {
                        ctx.strokeStyle = status.options.color.prevColor;
                        ctx.fillStyle = status.options.color.prevColor;   
                    } else {
                        ctx.strokeStyle = status.options.color.curColor;
                        ctx.fillStyle = status.options.color.curColor;  
                    }

                    

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
            blockTools: ["thickness"],
        },
        text: {
            id: "text",
            blockTools: ["thickness"],
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
                    ctx.fillStyle = status.options.color.background;
                    ctx.strokeStyle = status.options.color.background;
            
                    // Начало рисования точки
                    
                    ctx.beginPath();
                    ctx.fillRect(mousePos.x - size / 2, mousePos.y - size / 2, size, size);
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
                        
                        ctx.lineTo(mousePos.x, mousePos.y);
                        ctx.fillRect(mousePos.x - size / 2, mousePos.y - size / 2, size, size);
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
            },
        },
        pallete: {
            id: "pallete",
            action: function() {
                canvas.addBufferEventListener("click", function(e) {
                    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    let color = `rgb(${imageData.data[((e.layerY *(imageData.width * 4)) + (e.layerX * 4))]}, ${imageData.data[((e.layerY *(imageData.width * 4)) + (e.layerX * 4)) + 1]}, ${imageData.data[((e.layerY *(imageData.width * 4)) + (e.layerX * 4)) + 2]})`;
                    
                    let curColorButton = document.querySelector(".colors__color.tool_actived");

                    curColorButton.querySelector(".color__content").style.background = color;

                    // Меняем цвет
                    status.options.color[curColorButton.dataset.colorType] = color;
                    status.options.color.curColor = color;

                    curColorButton.dataset.optionValue = color;
                });
            },
            blockTools: ["thickness"],
        },
        scale: {
            id: "scale",
            blockTools: ["thickness"],
        }
    };

    
    return {
        tools: tools,
        buffer: buffer
    };
})(general, archive, optionsList);

// Экспорт модуля
module.exports = toolsList;