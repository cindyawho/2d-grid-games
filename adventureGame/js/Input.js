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

    blueWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

// ~~~~~~~~~~~~~~~~ Mouse Movement ~~~~~~~~~~~~~~~~
function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    
    //cheat / hack to test warrior in any position
    // warriorX = mouseX;
    // warriorY = mouseY;
    // warriorSpeedX = 4;
    // warriorSpeedY = -4;
}

// ~~~~~~~~~~~~~~~~ Keyboard functions ~~~~~~~~~~~~~~~~ 

function keySet(keyEvent, whichWarrior, setTo) {
    if(keyEvent.keyCode == whichWarrior.controlKeyLeft) {
        whichWarrior.keyHeld_West = setTo;
    }
    if(keyEvent.keyCode == whichWarrior.controlKeyRight) {
        whichWarrior.keyHeld_East = setTo;
    }
    if(keyEvent.keyCode == whichWarrior.controlKeyUp) {
        whichWarrior.keyHeld_North = setTo;
    }
    if(keyEvent.keyCode == whichWarrior.controlKeyDown) {
        whichWarrior.keyHeld_South = setTo;
    }
}

function keyPressed(evt) {
    // console.log("Key Pressed:" + evt.keyCode); 
    //w is 87, s is 83, a is 65, d is 68
    keySet(evt, blueWarrior, true);
}

function keyReleased(evt) {
    // console.log("Key Released:" + evt.keyCode);
    keySet(evt, blueWarrior, false);
}
