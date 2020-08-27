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
    x: 400,// canvas.width/2,
    y: 400,//canvas.height/2,
    hit: false,
    radius: 25,
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
// setInterval(()=>{
//     renderGameElements();
//     snakeMovement();
//     playerHitApple();

//     wallBoundaryDetection();
//     //message();
//
//     },100);
main();
function main(){
    setInterval(()=>{
    renderGameElements();
    snakeMovement();
    playerHitApple();
    // generateAppleLocation();
    // wallBoundaryDetection();
    //message();

    },100);
}

function wallBoundaryDetection(){
    if (snake.direction==="right" && (snake.body[0].x + snake.width >= canvas.width)){hitWall=true}
    if (snake.direction==="left" && (snake.body[0].x <=0)){hitWall=true}
    if (snake.direction==="up" && (snake.body[0].y <= 0)){hitWall=true}
    if (snake.direction==="down" && (snake.body[0].y + snake.height >= canvas.height)){hitWall=true}
}

function message(){
    if (hitWall===true){console.log("hit the wall!");}
    console.log(snake.body[0].x)
}
function appleOnSnake(){
    let x1,y2;
    let array = []
    for (let i=0; i < snake.body.length; i++){
        x1 =snake.body[i].x + snake.width;
        y2=snake.body[i].y +snake.height;
        array.push([x1,y2]);
    }
    for (let i=0; i < snake.body.length; i++){
        for (let j=0; j<2; j++){
            if ((snake.body[i][j] <= apple.x <=snake.body[i][j]) || snake.body[i][j] <= apple.y <=snake.body[i][j]){
                return true;
            }

        }
    }
    return false;

}
function generateAppleLocation(){
    // coordinates are in the center of the circle
    if (apple.hit ===true) {
        let loopStopper;
        do {
            apple.x = Math.floor(Math.random() * (775 - apple.radius + 1) + apple.radius);
            apple.y = Math.floor(Math.random() * (775 - apple.radius) + apple.radius);
            loopStopper = appleOnSnake();
        } while (loopStopper);
        apple.hit = false;
    }
}

function playerHitApple() {
    let headX, headY;
    switch(snake.direction){
        case("right"):
            headX=snake.body[0].x + snake.width;
            headY=snake.body[0].y + snake.height/2
            break;
        case("left"):
            headX=snake.body[0].x;
            headY=snake.body[0].y + snake.height/2;
            break;
        case("up"):
            headX=snake.body[0].x +snake.width/2;
            headY=snake.body[0].y;
            break;
        case("down"):
            headX=snake.body[0].x + snake.width/2;
            headY=snake.body[0].y;
            break;
    }
    console.log((headX-apple.x)*(headX-apple.x)+ (headY-apple.y)*(headY-apple.y));
    console.log(apple.radius*apple.radius);
    if ((headX-apple.x)*(headX-apple.x)+ (headY-apple.y)*(headY-apple.y) <= apple.radius*apple.radius){
        apple.hit = true;
    }
}
    // for (let i=0; i < 100001;i++){
    //     apple.pointsonApple.push([Math.floor(Math.cos(Math.PI*2/100001*apple.x)),Math.floor(Math.sin(Math.PI*2/100001*apple.y))]);
    // }
    // let head = snake.body[0]
    // if (head.x >= apple.x-apple.radius && ((apple.y - apple.radius)<=head.y<=(apple.y-apple.radius))&&snake.direction==="right"){
    //     apple.hit=true
    //     return;
    // }
    // if (head.x <= apple.x+apple.radius && ((apple.y + apple.radius)<=head.y<=(apple.y-apple.radius))&&snake.direction==="left"){
    //
    //     apple.hit=true
    //     return;
    // }
    // if (head.y <= apple.y+apple.radius && ((apple.x - apple.radius)<=head.x<=(apple.x+apple.radius))&&snake.direction==="up"){
    //
    //     apple.hit=true
    //     return;
    // }
    // if (head.y >= apple.y-apple.radius && ((apple.x - apple.radius)<=head.x<=(apple.x+apple.radius))&&snake.direction==="down"){
    //
    //     apple.hit=true
    //     return;
    // }


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
    //fix
    // let x, y;
    // [x, y] = snakeLinkLocations[numberSnakeLinks-1];
     switch (snake.direction) {
        case "right":
            x -= snake.width;
            break;
        case "up":
            y = y + 2 * snake.height;
            break;
        case "left":
            x = x - 2 * snake.width;
            break;
        case "down":
            y -= snake.height;
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
    if (apple.hit ===true){
        generateAppleLocation();
        apple.hit=false;
    }
    ctx.arc(apple.x,apple.y ,apple.radius,0,Math.PI*2);
    ctx.fillStyle ="red";
    ctx.fill();

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

