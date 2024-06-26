// ~~~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~
var canvas, canvasContext;
var framesPerSecond = 30;

var blueWarrior = new warriorClass(); //create a blue warrior using class definition

// ~~~~~~~~~~~~~~~~ Main Game Code ~~~~~~~~~~~~~~~~
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");
    
    colorRect(0, 0, canvas.width, canvas.height, "black", 1);
    colorText("LOADING IMAGES...", canvas.width/2, canvas.height/2, "white")

    loadImages();
}

function imageLoadingDoneSoStartGame(){
    setInterval(updateAll, 1000/framesPerSecond);
    setUpInput();

    loadLevel(levelList[levelNow]);
}

function nextLevel() {
    levelNow++
    if(levelNow >= levelList.length) {
        levelNow = 0;
    }
    loadLevel(levelList[levelNow]);
    document.getElementById("debugText").innerHTML = "Level: " + levelNow;
}

function loadLevel(whichLevel) {
    worldGrid = whichLevel.slice(); // copy level array to worldGrid
    blueWarrior.reset(warriorPic, "Blue Storm");
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    blueWarrior.move();   
}

function clearScreen() {
    colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen
}

function drawAll() {
    drawWorlds();
    blueWarrior.draw();
    drawUserStats(blueWarrior);
}