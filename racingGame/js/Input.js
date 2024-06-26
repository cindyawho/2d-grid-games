const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_A = 65;

var mouseX = 0;
var mouseY = 0;

function setUpInput() {
    //move paddle with mouse movement
    canvas.addEventListener("mousemove", updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    blueCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
    greenCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
}

// ~~~~~~~~~~~~~~~~ Mouse Movement ~~~~~~~~~~~~~~~~
function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    
    //cheat / hack to test car in any position
    // carX = mouseX;
    // carY = mouseY;
    // carSpeedX = 4;
    // carSpeedY = -4;
}

// ~~~~~~~~~~~~~~~~ Keyboard functions ~~~~~~~~~~~~~~~~ 

function keySet(keyEvent, whichCar, setTo) {
    if(keyEvent.keyCode == whichCar.controlKeyLeft) {
        whichCar.keyHeld_TurnLeft = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyRight) {
        whichCar.keyHeld_TurnRight = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyUp) {
        whichCar.keyHeld_Gas = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyDown) {
        whichCar.keyHeld_Reverse = setTo;
    }
}

function keyPressed(evt) {
    // console.log("Key Pressed:" + evt.keyCode); 
    //w is 87, s is 83, a is 65, d is 68
    keySet(evt, blueCar, true);
    keySet(evt, greenCar, true);
}

function keyReleased(evt) {
    // console.log("Key Released:" + evt.keyCode);
    keySet(evt, blueCar, false);
    keySet(evt, greenCar, false);
}
