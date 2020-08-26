const canvas = document.getElementById("snakeGameBoard");
const ctx = canvas.getContext("2d");
ctx.fillStyle = 'black';
ctx.fillRect(0,0, canvas.width, canvas.height);
let xCoordinate=50;
let yCoordinate=400;
let currentDirection= "right";
let hitWall = false;
let deltaX= 5;
let deltaY= 5;
let snakeWidth = 25;
let snakeHeight = 25;
let numberSnakeLinks=3;
let appleHit = false;
const appleRadius = 20;
let snakeLinkLocations = [[xCoordinate,yCoordinate],[xCoordinate-25,yCoordinate],[xCoordinate-50,yCoordinate]];
let appleX, appleY;
[appleX, appleY] = generateAppleLocation();
let snakeCurrentPosition = {x1:xCoordinate,
                            x2:xCoordinate+snakeHeight,
                            y1:yCoordinate,
                            y2:yCoordinate+snakeHeight
}
setInterval(()=>{
    renderGameElements();
    snakeMovement();
    },100);

function wallBoundaryDection(){
    let snakeHead = snakeLinkLocations[0];
    let x,y;
    [x,y] = snakeHead;
    switch(currentDirection){
        case "right":
            x =+ snakeWidth;
            if (x >= canvas.width){hitWall = true;}
            break;
        case "left":
            if (x<=0){hitwall = true;}
            break;
        case "up":
            if (y <= 0){hitwall = true;}
            break;
        case "down":
            y += snakeHeight;
            if (y >=canvas.height){hitwall = true;}
            break;
    }
}

function generateAppleLocation(){
    // coordinates are in the center of the circle
    let xCoordinateApple= Math.floor(Math.random() * (750-50+1)+50);
    let yCoordinateApple=Math.floor(Math.random() * (750-50+1)+50);
    // while((snakeCurrentPosition["x1"]<xCoordinateApple<snakeCurrentPosition["x2"])&& (snakeCurrentPosition["y1"]<xCoordinateApple<snakeCurrentPosition["y2"])){
    //     let xCoordinateApple= Math.floor(Math.random() * (750-50+1)+50);
    //     let yCoordinateApple=Math.floor(Math.random() * (750-50+1)+50);
    //
    // }
    //ctx.beginPath();
    return [xCoordinateApple,yCoordinateApple];

    //ctx.closePath();
}

function snakeMovement(){
        let x,y;
        [x,y] = snakeLinkLocations[0];
        if (currentDirection === "right") {
            x += deltaX;
            snakeLinkLocations.unshift([x,y]);
            snakeLinkLocations.slice(-1,1);
            //snakeLinkLocations[0][0]=x;
            return;
        }
        if (currentDirection === "up") {
            y -= deltaY;
             snakeLinkLocations.unshift([x,y]);
            snakeLinkLocations.slice(-1,1);
            //snakeLinkLocations[0][1]=y;
            return;
        }
        if (currentDirection === "left") {
            x -= deltaX;
             snakeLinkLocations.unshift([x,y]);
            snakeLinkLocations.slice(-1,1);
            //snakeLinkLocations[0][0]=x;
            return;
        }
        if (currentDirection === "down") {
            y += deltaY;
             snakeLinkLocations.unshift([x,y]);
            snakeLinkLocations.slice(-1,1);
            //snakeLinkLocations[0][1]=y;
        }

}
function changeDirection(keyPress){
    const directionTranslation = { up:38,
                                 down:40,
                                 left:37,
                                 right:39
    }
    if (keyPress === directionTranslation["up"]){
        currentDirection = "up";
        return;}
    if (keyPress === directionTranslation["down"]){
        currentDirection="down";
        return;
    }
    if (keyPress === directionTranslation["left"]){
        currentDirection="left"
        return;
    }
    if (keyPress === directionTranslation["right"]){
        currentDirection ="right"
    }
}
function addTail() {
    let x, y;
    [x, y] = snakeLinkLocations[numberSnakeLinks-1];//look at this !!!!!!
    switch (currentDirection) {
        case "right":
            x -= snakeWidth;
            break;
        case "up":
            y = y + 2 * snakeHeight;
            break;
        case "left":
            x = x - 2 * snakeWidth;
            break;
        case "down":
            y -= snakeHeight;
            break;
    }
     snakeLinkLocations.push([x, y]);
     numberSnakeLinks+=1;
}

function renderGameElements() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    for (let i=0; i<numberSnakeLinks;i++) {
        let x, y;
        [x,y] = snakeLinkLocations[i];
        ctx.fillStyle = 'green';
        ctx.fillRect(x, y, snakeWidth, snakeHeight);
    }
    // if (appleHit){
    //      [appleX,appleY] = generateAppleLocation();
    //      ctx.arc(appleX,appleY ,appleRadius,Math.PI*2);
    //      ctx.fillStyle ="red";
    //      ctx.fill();
    // }else{
    //     ctx.arc(appleX, appleY,appleRadius,0,Math.PI*2);
    //     ctx.fillStyle ="red";
    //     ctx.fill();
    // }
    ctx.closePath();
}

document.addEventListener("keydown",(event)=>{
     let direction = event.which;
     changeDirection(direction);
})

