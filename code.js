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
    movement();
    },100);
function movement(){
    if (currentDirection === "right"){
        xCoordinate += deltaX;
        return;
    }
    if (currentDirection === "up"){
        yCoordinate -= deltaY;
        return;
}

}
function moveSnake(arrow){

    let direction = arrow;
    const directionTranslation = { up:38,
                                 down:40,
                                 left:37,
                                 right:39
    }
    // if (initialStart === true){
    //     xCoordinate+=deltaX;
    //     return;
    // }
    if (direction === directionTranslation["up"]){
        yCoordinate -= deltaY;
        currentDirection = "up";
        initialStart=false;
        return;
    }
    if (direction === directionTranslation["down"]){
        yCoordinate += deltaY;
        initialStart=false;
        return;
    }
    if (direction === directionTranslation["left"]){
        xCoordinate -= deltaX;
        initialStart=false;
        return;
    }
    if (direction === directionTranslation["right"]){
        xCoordinate += deltaX;
        currentDirection ="right"
        initialStart=false;
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
    moveSnake(direction);
})

