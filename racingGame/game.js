console.log("Welcome to the racing game!");

// ~~~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~
var carPic = document.createElement("img");
var carPicLoaded = false;

var canvas, canvasContext;
var framesPerSecond = 30;
var carX = 75;
var carY = 75;
var carAng = 0;
var carSpeed = 2;

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var mouseX, mouseY;

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

// ~~~~~~~~~~~~~~~~ Main Game Code ~~~~~~~~~~~~~~~~
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");

    setInterval(updateAll, 1000/framesPerSecond);

    //move paddle with mouse movement
    canvas.addEventListener("mousemove", updateMousePos);

    carPic.onload = function() { //wait until image is loaded in
        carPicLoaded =true;
    }
    carPic.src = "player1car.png";

    carReset();
}

function updateAll() {
    moveAll();
    drawAll();
}

function carReset() {
    for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++){
            var arrayIndex = rowColtoArrayIndex(eachCol, eachRow);
            if(trackGrid[arrayIndex] == 2) {
                trackGrid[arrayIndex] = 0;
                carX = eachCol * TRACK_W + TRACK_W/2;
                carY = eachRow * TRACK_H + TRACK_H/2;    
            } // end of is this track here
        } //end of for each track        
    }
}

function carMove(){
    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;

    carAng += 0.02;
}

function isTrackAtColRow(col, row) {
    if(col >=0 && col < TRACK_COLS && 
        row >= 0 && row < TRACK_ROWS) {
        
        var trackIndexUnderCord = rowColtoArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCord] == 1);
    } else {
        return false;
    }
}

function carTrackHandling() {
    var carTrackCol = Math.floor(carX/ TRACK_W);
    var carTrackRow = Math.floor(carY/TRACK_H);
    var trackIndexUnderCar = rowColtoArrayIndex(carTrackCol, carTrackRow);
    if(carTrackCol>=0 && carTrackCol < TRACK_COLS && 
        carTrackRow >= 0 && carTrackRow < TRACK_ROWS){
    
        if(isTrackAtColRow(carTrackCol, carTrackRow)){
            carSpeed *= -1;
        } // end of change diraction
    } // end of track row and col
} // end of carTrackHandling func

function moveAll() {
    carMove();
    
    carTrackHandling();
}

function rowColtoArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}

function drawTracks() {
    for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++){
            
            var arrayIndex = rowColtoArrayIndex(eachCol, eachRow);
            
            if(trackGrid[arrayIndex] == 1) {
                colorRect(TRACK_W*eachCol, TRACK_H*eachRow, TRACK_W-TRACK_GAP,TRACK_H - TRACK_GAP, "blue");
            } // end of is this track here
        } //end of for each track        
    }
} // end of drawTracks

function drawAll() {
    colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen
    
    // colorCircle(carX, carY, 10, "white"); //draw car
    if(carPicLoaded) {
        // console.log(carPic, carX, carY, carAng);
        drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
    }

    drawTracks();
}

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
    canvasContext.restore();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
    canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
    // console.log("IN COLOR TEXT")
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX,textY);
}