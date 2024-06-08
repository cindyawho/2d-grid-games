const WORLD_W = 40;
const WORLD_H = 40;
const WORLD_GAP = 2;
const WORLD_COLS = 20;
const WORLD_ROWS = 15;
var theArena =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 1, 1,
    1, 1, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
    1, 5, 0, 2, 5, 1, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 5, 1,
    1, 5, 3, 3, 5, 1, 0, 0, 5, 1, 1, 0, 0, 5, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 5, 0, 5, 0, 0, 5, 0, 5, 1,
    1, 0, 0, 0, 0, 1, 1, 0, 5, 0, 1, 0, 0, 5, 0, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 5, 5, 5, 0, 1, 0, 5, 0, 0, 5, 0, 5, 5, 0, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 0, 0, 5, 0, 5, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var slamZone =  [1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 5, 1, 1, 1, 1, 1, 5, 0, 0, 5, 1, 1, 1, 1, 1, 5, 0, 1,
    1, 0, 1, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 1, 0, 1,
    1, 0, 1, 4, 4, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 4, 4, 1, 0, 1,
    1, 0, 1, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 1, 0, 1,
    1, 0, 1, 4, 4, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 4, 4, 1, 0, 1,
    1, 2, 1, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 1, 0, 1,
    1, 1, 5, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 5, 1, 1,
    1, 0, 0, 0, 1, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 1, 0, 0, 0, 1,
    5, 0, 5, 0, 5, 0, 1, 4, 5, 3, 3, 5, 4, 1, 0, 5, 0, 5, 0, 5,
    1, 0, 1, 0, 0, 0, 1, 4, 1, 0, 0, 1, 4, 1, 0, 0, 0, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 5, 0, 0, 5, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1];

var originalWorld =  [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
    4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4];

var hillyVenture =[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                    4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4,
                    4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                    4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 4,
                    4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 4,
                    4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 4,
                    4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4,
                    4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 0, 0, 4,
                    4, 3, 3, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 4, 0, 0, 4,
                    4, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 4,
                    4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4,
                    4, 0, 0, 0, 4, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4,
                    4, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 4, 4, 2, 0, 4,
                    4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4,
                    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

var levelList = [hillyVenture, originalWorld, theArena, slamZone];
var levelNow = 0;
var worldGrid = [];

const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_GOAL = 3;
const WORLD_TREE = 4;
const WORLD_FLAG = 5;

function returnTileTypeAtColRow(col, row) {
    if(col >=0 && col < WORLD_COLS && 
        row >= 0 && row < WORLD_ROWS) {
        
        var worldIndexUnderCoord = rowColtoArrayIndex(col, row);
        return worldGrid[worldIndexUnderCoord];
    } else {
        return WORLD_WALL;
    }
}

function warriorWorldHandling(whichWarrior) {
    var warriorWorldCol = Math.floor(whichWarrior.x/ WORLD_W);
    var warriorWorldRow = Math.floor(whichWarrior.y/WORLD_H);
    if(warriorWorldCol>=0 && warriorWorldCol < WORLD_COLS && 
        warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS){

        var tileHere = returnTileTypeAtColRow(warriorWorldCol, warriorWorldRow);
            
        if(tileHere == WORLD_GOAL){
            console.log(whichWarrior.name + " WINS!!");
            nextLevel();
            // alert(whichWarrior.name + " WINS!!"); // warrior keeps going after alert as if up key was still pressed
        } else if(tileHere != WORLD_ROAD) {
            //next two lines fix a bug when warrior burrows into wall
            whichWarrior.x -= Math.cos(whichWarrior.ang) * whichWarrior.speed;
            whichWarrior.y -= Math.sin(whichWarrior.ang) * whichWarrior.speed;
            whichWarrior.speed *= -0.5;
        } // end of if else if goal vs road
    } // end of world row and col
} // end of warriorWorldHandling func

function rowColtoArrayIndex(col, row) {
    return col + WORLD_COLS * row;
}

function drawWorlds() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(var eachRow = 0; eachRow < WORLD_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < WORLD_COLS; eachCol++){
            var tileKindHere = worldGrid[arrayIndex];
            var useImg = worldPics[tileKindHere]; //take the value in the world map and find the image from the worldPics array we load
            canvasContext.drawImage(useImg, drawTileX, drawTileY);
            drawTileX += WORLD_W
            arrayIndex++;
        } //end of for each world   
        drawTileY += WORLD_H;     
        drawTileX = 0;
    } //end of for each row
} // end of drawWorlds