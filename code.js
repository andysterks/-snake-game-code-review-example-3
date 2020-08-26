const canvas = document.getElementById("snakeGameBoard");
const ctx = canvas.getContext("2d");
ctx.fillStyle = 'black';
ctx.fillRect(0,0, canvas.width, canvas.height);
const snake = {
    width: 25,
    height: 25,
    body: [
        {x:150,y:400},
        {x:125, y:400},
        {x:100,y:400}
    ],
    speed:{x:5,y:5},
    length: 3,
    direction: "right"
}
const apple = {
    x: undefined,
    y: undefined,
    hit: false,
    radius: 20
}

// let xCoordinate=150;
// let yCoordinate=400;
// let hitWall = false;
// let deltaX= 10;
// let deltaY= 10;
// let snakeWidth = 25;
// let snakeHeight = 25;
// let numberSnakeLinks=3;
// let appleHit = false;
// const appleRadius = 20;
// let snakeLinkLocations = [[xCoordinate,yCoordinate],[xCoordinate-25,yCoordinate],[xCoordinate-50,yCoordinate]];
// let appleX, appleY;
// [appleX, appleY] = generateAppleLocation();
// let snakeCurrentPosition = {x1:xCoordinate,
//                             x2:xCoordinate+snakeHeight,
//                             y1:yCoordinate,
//                             y2:yCoordinate+snakeHeight
//}
setInterval(()=>{
    renderGameElements();
    snakeMovement();
    wallBoundaryDetection();
    //message();

    },100);

function wallBoundaryDetection(){
    // let snakeHead = snakeLinkLocations[0];
    // let x,y;
    // [x,y] = snakeHead;
    if (snake.direction==="right" && (snake.body[0].x + snake.width >= canvas.width)){hitWall=true}
    if (snake.direction==="left" && (snake.body[0].x <=0)){hitWall=true}
    if (snake.direction==="up" && (snake.body[0].y <= 0)){hitWall=true}
    if (snake.direction==="down" && (snake.body[0].y + snake.height >= canvas.height)){hitWall=true}
}

function message(){
    if (hitWall===true){console.log("hit the wall!");}
    console.log(snake.body[0].x)
}

function generateAppleLocation(){
    // coordinates are in the center of the circle
    apple.x = Math.floor(Math.random() * (750-50+1)+50);
    apple.y = Math.floor(Math.random() * (750-50+1)+50);
    // while((snakeCurrentPosition["x1"]<xCoordinateApple<snakeCurrentPosition["x2"])&& (snakeCurrentPosition["y1"]<xCoordinateApple<snakeCurrentPosition["y2"])){
    //     let xCoordinateApple= Math.floor(Math.random() * (750-50+1)+50);
    //     let yCoordinateApple=Math.floor(Math.random() * (750-50+1)+50);
    //
    // }
    //ctx.beginPath();
    return;

    //ctx.closePath();
}

function snakeMovement(){
        let x,y;
        if (snake.direction === "right") {
            x = snake.body[0].x + snake.speed.x;
            snake.body.unshift({x:x,y:snake.body[0].y});
            snake.body.splice(snake.length,1);
            return;
        }
        if (snake.direction === "up") {
            y = snake.body[0].y-snake.speed.y;
            snake.body.unshift({x:snake.body[0].x,y:y});
            snake.body.splice(snake.length,1);
            return;
        }
        if (snake.direction === "left") {
            x =snake.body[0].x - snake.speed.x;
            snake.body.unshift({x:x,y:snake.body[0].y});
            snake.body.splice(snake.length,1);
            //snakeLinkLocations[0][0]=x;
            return;
        }
        if (snake.direction === "down") {
            y = snake.body[0].y +snake.speed.y;
            snake.body.unshift({x:snake.body[0].x, y:y});
            snake.body.splice(snake.length,1);
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
        snake.direction = "up";
        return;}
    if (keyPress === directionTranslation["down"]){
        snake.direction="down";
        return;
    }
    if (keyPress === directionTranslation["left"]){
        snake.direction="left"
        return;
    }
    if (keyPress === directionTranslation["right"]){
        snake.direction ="right"
    }
}
function addTail() {
    let x, y;
    [x, y] = snakeLinkLocations[numberSnakeLinks-1];//look at this !!!!!!
    switch (snake.direction) {
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
    for (let i=0; i<snake.body.length;i++) {
        // let x, y;
        // [x,y] = snakeLinkLocations[i];
        ctx.fillStyle = 'green';
        ctx.fillRect(snake.body[i].x, snake.body[i].y, snake.width, snake.height);
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

