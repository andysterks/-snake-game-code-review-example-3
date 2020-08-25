const canvas = document.getElementById("snakeGameBoard");
const ctx = canvas.getContext("2d");
ctx.fillStyle = 'black';
ctx.fillRect(0,0, canvas.width, canvas.height);
let xCoordinate=50;
let yCoordinate=400;
let initialStart = true;
let currentDirection= "right";
let deltaX= 5;
let deltaY= 5;
let snakeWidth = 25;
let snakeHeight = 25;
let snakeCurrentPosition = {x1:xCoordinate,
                            x2:xCoordinate+snakeHeight,
                            y1:yCoordinate,
                            y2:yCoordinate+snakeHeight
}
createApple();
setInterval(()=>{
    drawSnake();
    snakeMovement();
    },100);

function createApple(){
    // coordinates are in the center of the circle
    let xCoordinateApple= Math.floor(Math.random() * (750-50+1)+50);
    let yCoordinateApple=Math.floor(Math.random() * (750-50+1)+50);
    // while((snakeCurrentPosition["x1"]<xCoordinateApple<snakeCurrentPosition["x2"])&& (snakeCurrentPosition["y1"]<xCoordinateApple<snakeCurrentPosition["y2"])){
    //     let xCoordinateApple= Math.floor(Math.random() * (750-50+1)+50);
    //     let yCoordinateApple=Math.floor(Math.random() * (750-50+1)+50);
    //
    // }
    //ctx.beginPath();
    ctx.arc(xCoordinateApple,yCoordinateApple,100,0,Math.PI*2);
    ctx.fillStyle ="red";
    ctx.fill();
    //ctx.closePath();
}

function snakeMovement(){
    if (currentDirection === "right"){
        xCoordinate += deltaX;
        return;
    }
    if (currentDirection === "up"){
        yCoordinate -= deltaY;
        return;
    }
    if (currentDirection === "left"){
        xCoordinate -= deltaX;
        return;
    }
    if (currentDirection === "down"){
        yCoordinate += deltaY;
        return;
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
        return;
    }
}

function drawSnake() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(xCoordinate, yCoordinate, snakeWidth, snakeHeight);
    ctx.closePath();
}

document.addEventListener("keydown",(event)=>{
     let direction = event.which;
     changeDirection(direction);
})

