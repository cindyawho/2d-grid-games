console.log("Welcome to the racing game!");

// ~~~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~
var canvas, canvasContext;
var framesPerSecond = 30;
var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft = 0;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

var mouseX, mouseY;

// ~~~~~~~~~~~~~~~~ Mouse Movement ~~~~~~~~~~~~~~~~
function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    
    paddleX = mouseX - PADDLE_WIDTH/2;

    //cheat / hack to test ball in any position
    // ballX = mouseX;
    // ballY = mouseY;
    // ballSpeedX = 4;
    // ballSpeedY = -4;
}

// ~~~~~~~~~~~~~~~~ Handle Brick Population ~~~~~~~~~~~~~~~~
function brickReset() {
    bricksLeft = 0;
    var i;
    for(i = 0; i<3*BRICK_COLS;i++){
        brickGrid[i] = false;
    }
    for(; i< BRICK_COLS * BRICK_ROWS; i++) {
        brickGrid[i] = true;
        bricksLeft++;
    } // end of for loop
} // end of brickReset func

// ~~~~~~~~~~~~~~~~ Main Game Code ~~~~~~~~~~~~~~~~
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");

    setInterval(updateAll, 1000/framesPerSecond);

    //move paddle with mouse movement
    canvas.addEventListener("mousemove", updateMousePos);

    brickReset();
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
        brickReset();
    } 
}

function isBrickAtColRow(col, row) {
    if(col >=0 && col < BRICK_COLS && 
        row >= 0 && row < BRICK_ROWS) {
        
        var brickIndexUnderCord = rowColtoArrayIndex(col, row);
        return brickGrid[brickIndexUnderCord];
    } else {
        return false;
    }
}

function ballBrickHandling() {
    var ballBrickCol = Math.floor(ballX/ BRICK_W);
    var ballBrickRow = Math.floor(ballY/BRICK_H);
    var brickIndexUnderBall = rowColtoArrayIndex(ballBrickCol, ballBrickRow);
    if(ballBrickCol>=0 && ballBrickCol < BRICK_COLS && 
        ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS){
    
        if(isBrickAtColRow(ballBrickCol, ballBrickRow)){
            brickGrid[brickIndexUnderBall] = false;
            bricksLeft--;
            // console.log(bricksLeft);
            if(bricksLeft == 0){

            }

            var prevBallX = ballX - ballSpeedX;
            var prevBallY = ballY - ballSpeedY;
            var prevBrickCol = Math.floor(prevBallX / BRICK_W);
            var prevBrickRow = Math.floor(prevBallY / BRICK_H);

            var bothTestsFailed = true;
            if(prevBrickCol != ballBrickCol) {
                if(isBrickAtColRow(prevBrickCol, ballBrickRow)==false){
                    ballSpeedX *= -1;
                    bothTestsFailed = false;
                }
            }
            if(prevBrickRow != ballBrickRow) {
                if(isBrickAtColRow(prevBrickCol, ballBrickRow)==false){
                    ballSpeedY *= -1;
                    bothTestsFailed = false;
                }
            }

            if(bothTestsFailed) { //armpit case, prevents ball from going through corners
                ballSpeedX *= -1;
                ballSpeedY *= -1;
            }
        } // end of brick gounf
    } // end of brick row and col
} // end of ballBrickHandling func

function ballPaddleHandling(){
    var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
    
    // paddle collision logic
    if(ballY >= paddleTopEdgeY && //below top
        ballY <= paddleBottomEdgeY && //above bottom
        ballX >= paddleLeftEdgeX && //right of left edge
        ballX <= paddleRightEdgeX) { //left of right edge
            
            ballSpeedY *= -1;
            
            var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
            var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
            ballSpeedX = ballDistFromPaddleCenterX * 0.35;

            if(bricksLeft == 0) {
                brickReset();
            } //out of bricks
    }//ball center inside paddle
}// end of ballPaddleHandling

function moveAll() {
    ballMove();
    
    ballBrickHandling();

    ballPaddleHandling();
}

function rowColtoArrayIndex(col, row) {
    return col + BRICK_COLS * row;
}

function drawBricks() {
    for(var eachRow = 0; eachRow < BRICK_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < BRICK_COLS; eachCol++){
            
            var arrayIndex = rowColtoArrayIndex(eachCol, eachRow);
            
            if(brickGrid[arrayIndex]) {
                colorRect(BRICK_W*eachCol, BRICK_H*eachRow, BRICK_W-BRICK_GAP,BRICK_H - BRICK_GAP, "blue");
            } // end of is this brick here
        } //end of for each brick        
    }
} // end of drawBricks

function drawAll() {
    colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen
    
    colorCircle(ballX, ballY, 10, "white"); //draw ball

    colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, "white");

    drawBricks();

    
    // colorText(mouseBrickCol+","+mouseBrickRow+":"+brickIndexUnderMouse, mouseX,mouseY, "yellow");

    //showing mouse pointer to disappear bricks
    // if(brickIndexUnderMouse>=0 && brickIndexUnderMouse < BRICK_COLS*BRICK_ROWS){
    //     brickGrid[brickIndexUnderMouse] = false;
    // }

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