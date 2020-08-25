const canvas = document.getElementById("snakeGameBoard");
const ctx = canvas.getContext("2d");
ctx.fillStyle = 'black';
ctx.fillRect(0,0, canvas.width, canvas.height);
let deltaX;
let deltaY;
let xCoordinate=50;
let yCoordinate=400;
setInterval(()=>{
    drawSnake();
    moveSnake();


},100);


function moveSnake(){
    let deltaX= 5;
    let deltaY= 5;
    xCoordinate+=deltaX;

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

