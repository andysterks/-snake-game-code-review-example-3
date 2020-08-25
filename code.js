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
setInterval(()=>{
    drawSnake();
    snakeMovement();
    },100);

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(xCoordinate, yCoordinate, 25, 25);
    ctx.closePath();
}

document.addEventListener("keydown",(event)=>{
     let direction = event.which;
     changeDirection(direction);
})

