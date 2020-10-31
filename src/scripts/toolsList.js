// Подключение необходимых модулей
let general = require("./general.js");
let archive = require("./archive.js");

// Модуль
let toolsList = (function ({canvas, workspace, ctx, status}, archive) {
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
                        ctx.strokeStyle = status.options.color.main;
                        ctx.fillStyle = status.options.color.main;   
                    } else if (e.button == 2) {
                        ctx.strokeStyle = status.options.color.background;
                        ctx.fillStyle = status.options.color.background;   
                    } else {
                        ctx.strokeStyle = status.options.color.main;
                        ctx.fillStyle = status.options.color.main;  
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
            action: function() {
                function fill(e) {
                    function rgb2hex(r, g, b) {
                        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                    }
                    function hex2rgb(c) {
                        var bigint = parseInt(c.split('#')[1], 16);
                        var r = (bigint >> 16) & 255;
                        var g = (bigint >> 8) & 255;
                        var b = bigint & 255;
                    
                        return [r, g, b, 255];
                    }
                    let ex = e.layerX,
                        ey = e.layerY;

                    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                    let colorsList = [imageData.data[((ey *(imageData.width * 4)) + (ex * 4))],
                        imageData.data[((ey *(imageData.width * 4)) + (ex * 4)) + 1],
                        imageData.data[((ey *(imageData.width * 4)) + (ex * 4)) + 2],
                        imageData.data[((ey *(imageData.width * 4)) + (ex * 4)) + 3]];
                    
                    
                    let color = rgb2hex([colorsList]);

                    
                    function isEqualColors(take, comp) {
                        for (let i = 0; i < 3; i++) {
                            if (take[i] == comp[i]) {
                                continue;
                            } else {
                                return false;
                            }
                        }
                        return true;
                    }
                    function getPixel(x, y) {
                        let pixel = []
                        for (let i = 0; i < 3; i++) {
                            pixel.push(imageData.data[((y *(imageData.width * 4)) + (x * 4)) + i]);                     
                        }
                        return pixel;
                    }
                    
                    function drawPixels(x, y) {
                        if (isEqualColors(colorsList, getPixel(x + 1, y))) {
                            if ((x < canvas.width - 1)) {
                                for (let i = 0; i < 3; i++) {
                                    imageData.data[((y *(imageData.width * 4)) + (x * 4)) + i] = hex2rgb(status.options.color.main)[i];
                                    imageData.data[((y *(imageData.width * 4)) + ((x + 1) * 4)) + i] = hex2rgb(status.options.color.main)[i];
                                }
                                drawPixels(x + 1, y);
                            }
                        }
                        if (isEqualColors(colorsList, getPixel(x - 1, y))) {
                            if (x > 1) {
                                for (let i = 0; i < 3; i++) {
                                    imageData.data[((y *(imageData.width * 4)) + ((x - 1) * 4)) + i] = hex2rgb(status.options.color.main)[i];
                                }
                                drawPixels(x - 1, y);
                            }
                        }
                        if (isEqualColors(colorsList, getPixel(x, y + 1))) {
                            if ((y < canvas.height )) {
                                for (let i = 0; i < 3; i++) {
                                    imageData.data[((y *(imageData.width * 4)) + (x * 4)) + i] = hex2rgb(status.options.color.main)[i];
                                    imageData.data[(((y + 1) *(imageData.width * 4)) + (x * 4)) + i] = hex2rgb(status.options.color.main)[i];
                                }
                                drawPixels(x, y + 1);
                            }
                        }
                        if (isEqualColors(colorsList, getPixel(x, y - 1))) {
                            if ((y > 0 )) {
                                for (let i = 0; i < 3; i++) {
                                    imageData.data[(((y - 1) *(imageData.width * 4)) + (x * 4)) + i] = hex2rgb(status.options.color.main)[i];
                                }
                                drawPixels(x, y - 1);
                            }
                        }
                        
                    }

                    drawPixels(ex, ey);
    
                    ctx.putImageData(imageData, 0, 0);

                    // Заносим измекнения в архив
                    if(e.target == canvas) {  
                        archive.clearPastImageData();
                        archive.save(); 
                    }
                }

                canvas.addBufferEventListener("mousedown", fill);
                canvas.addBufferEventListener("touchstart", fill);
            },
            blockTools: ["thickness"],
        },
        text: {
            id: "text",
            action: function() {
                alert("Не работает");
            },
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
            action: function() {
                alert("Не работает");
            },
            blockTools: ["thickness"],
        }
    };

    return {
        tools: tools,
        buffer: buffer
    };
})(general, archive);

// Экспорт модуля
module.exports = toolsList;