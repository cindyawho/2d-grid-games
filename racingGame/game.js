console.log("Welcome to the racing game!");

// ~~~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~
var canvas, canvasContext;
var framesPerSecond = 30;
var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

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
                 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
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
    
    //cheat / hack to test ball in any position
    // ballX = mouseX;
    // ballY = mouseY;
    // ballSpeedX = 4;
    // ballSpeedY = -4;
}

// ~~~~~~~~~~~~~~~~ Main Game Code ~~~~~~~~~~~~~~~~
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");

    setInterval(updateAll, 1000/framesPerSecond);

    //move paddle with mouse movement
    canvas.addEventListener("mousemove", updateMousePos);

    ballReset();
}

function updateAll() {
    moveAll();
    drawAll();
}

function ballReset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function ballMove(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if(ballX < 0 && ballSpeedX < 0.0) { // left, fixes wall edge case
        ballSpeedX *= -1;
    }
    if(ballX > canvas.width && ballSpeedX > 0.0) { // right, fixes wall edge case
        ballSpeedX *= -1;
    }
    if(ballY < 0  && ballSpeedY < 0.0) { // top
        ballSpeedY *= -1;
    }
    if(ballY > canvas.height) { // bottom
        ballReset();
    } 
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

function ballTrackHandling() {
    var ballTrackCol = Math.floor(ballX/ TRACK_W);
    var ballTrackRow = Math.floor(ballY/TRACK_H);
    var trackIndexUnderBall = rowColtoArrayIndex(ballTrackCol, ballTrackRow);
    if(ballTrackCol>=0 && ballTrackCol < TRACK_COLS && 
        ballTrackRow >= 0 && ballTrackRow < TRACK_ROWS){
    
        if(isTrackAtColRow(ballTrackCol, ballTrackRow)){
            var prevBallX = ballX - ballSpeedX;
            var prevBallY = ballY - ballSpeedY;
            var prevTrackCol = Math.floor(prevBallX / TRACK_W);
            var prevTrackRow = Math.floor(prevBallY / TRACK_H);

            var bothTestsFailed = true;
            if(prevTrackCol != ballTrackCol) {
                if(isTrackAtColRow(prevTrackCol, ballTrackRow)==false){
                    ballSpeedX *= -1;
                    bothTestsFailed = false;
                }
            }
            if(prevTrackRow != ballTrackRow) {
                if(isTrackAtColRow(prevTrackCol, ballTrackRow)==false){
                    ballSpeedY *= -1;
                    bothTestsFailed = false;
                }
            }

            if(bothTestsFailed) { //armpit case, prevents ball from going through corners
                ballSpeedX *= -1;
                ballSpeedY *= -1;
            }
        } // end of track gounf
    } // end of track row and col
} // end of ballTrackHandling func

function moveAll() {
    ballMove();
    
    ballTrackHandling();
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
    
    colorCircle(ballX, ballY, 10, "white"); //draw ball

    drawTracks();
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