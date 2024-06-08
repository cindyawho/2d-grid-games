
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var trackGrid =[4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 3, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
                1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function returnTileTypeAtColRow(col, row) {
    if(col >=0 && col < TRACK_COLS && 
        row >= 0 && row < TRACK_ROWS) {
        
        var trackIndexUnderCord = rowColtoArrayIndex(col, row);
        return trackGrid[trackIndexUnderCord];
    } else {
        return TRACK_WALL;
    }
}

function carTrackHandling(whichCar) {
    var carTrackCol = Math.floor(whichCar.x/ TRACK_W);
    var carTrackRow = Math.floor(whichCar.y/TRACK_H);
    if(carTrackCol>=0 && carTrackCol < TRACK_COLS && 
        carTrackRow >= 0 && carTrackRow < TRACK_ROWS){

        var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow);
            
        if(tileHere == TRACK_GOAL){
            console.log(whichCar.name + " WINS!!");
        } else if(tileHere != TRACK_ROAD) {
            //next two lines fix a bug when car burrows into wall
            whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
            whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
            whichCar.speed *= -0.5;
        } // end of if else if goal vs road
    } // end of track row and col
} // end of carTrackHandling func

function rowColtoArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}

function drawTracks() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++){
            var tileKindHere = trackGrid[arrayIndex];
            var useImg = trackPics[tileKindHere]; //take the value in the track map and find the image from the trackPics array we load
            canvasContext.drawImage(useImg, drawTileX, drawTileY);
            drawTileX += TRACK_W
            arrayIndex++;
        } //end of for each track   
        drawTileY += TRACK_H;     
        drawTileX = 0;
    } //end of for each row
} // end of drawTracks