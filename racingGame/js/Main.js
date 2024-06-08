console.log("Welcome to the racing game!");

// ~~~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~
var canvas, canvasContext;
var framesPerSecond = 30;

var blueCar = new carClass(); //create a blue car using class definition
var greenCar = new carClass(); // create a seond car for player 2

// ~~~~~~~~~~~~~~~~ Main Game Code ~~~~~~~~~~~~~~~~
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");
    
    colorRect(0, 0, canvas.width, canvas.height, "black");
    colorText("LOADING IMAGES...", canvas.width/2, canvas.height/2, "white")

    loadImages();
}

function imageLoadingDoneSoStartGame(){
    setInterval(updateAll, 1000/framesPerSecond);
    setUpInput();
    blueCar.reset(carPic, "Blue Storm");
    greenCar.reset(car2Pic, "Green Machine");
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    blueCar.move();   
    greenCar.move();
}

function clearScreen() {
    colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen
}

function drawAll() {
    drawTracks();
    blueCar.draw();
    greenCar.draw();
}