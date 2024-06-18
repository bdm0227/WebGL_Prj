
let isClick = false;
let isDrag = false;

let clickX = 0;
let clickY = 0;

let upX = 0;
let upY = 0;

let moveX = 0;
let moveY = 0;

let lastX = -25;
let lastY = 25;

let moveWhl = 0.0;

function InitMouse(canvasName) {
    const canvas = document.getElementById(canvasName);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mousedown", down);
    canvas.addEventListener("mouseup", up);
    canvas.addEventListener("wheel", wheel);
}

function down(event) {
    isClick = true;

    clickX = event.offsetX;
    clickY = event.offsetY;
}

function move(event) {
    if (isClick) {
        const nowX = event.offsetX;
        const nowY = event.offsetY;

        moveX = lastX + clickY - nowY;
        moveY = lastY - clickX + nowX;

        isDrag = true;
    }
}

function up(event) {
    isClick = false;
    isDrag = false;

    lastX = moveX;
    lastY = moveY;

    upX = event.offsetX;
    upY = event.offsetY;
}

function wheel(event) {
    moveWhl = event.deltaY;
}

export { InitMouse, isClick, isDrag, moveX, moveY, upX, upY, moveWhl };

