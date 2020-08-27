const canvas = document.getElementById("snakeGameBoard");
const ctx = canvas.getContext("2d");
const snake = {
    width: 25,
    height: 25,
    body: [
        {x:150,y:400},
        {x:125, y:400},
        {x:100,y:400}
    ],
    speed:{x:15,y:15},
    length: 3,
    direction: "right"

}
const apple = {
    x: 400,// canvas.width/2,
    y: 400,//canvas.height/2,
    hit: false,
    radius: 25,
}

main();

function main(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    setInterval(()=>{
    renderGameElements();
    snakeMovement();
    snakeEatsApple();
    if (apple.hit){addTail()}
    console.log(snakeEatsSnake());
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
function snakeHeadPosition(){
    let headX,headY;
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
    return [headX,headY];
}
function snakeEatsSnake(){
    let headX, headY;
    let x1,x2,y1,y2;
    let array = [];
    [headX,headY] = snakeHeadPosition();
    for (let i=0; i < snake.body.length; i++){
        x2 =snake.body[i].x + snake.width;
        y2=snake.body[i].y +snake.height;
        array.push([x2,y2]);
    }
    for (let i=1; i < snake.body.length; i++) {
        x1 = snake.body[i].x;
        x2 = array[i][0];
        y1 = snake.body[i].y;
        y2 = array[i][1];
        if (((x1 <= headX)&& (headX <= x2)) && ((y1 <= headY) && (headY<= y2))){
            return true;
        }

    }
    return false;
}

function appleOnSnake(){
    let x2,y2;
    let array = [];
    for (let i=0; i < snake.body.length; i++){
        x2 =snake.body[i].x + snake.width;
        y2=snake.body[i].y +snake.height;
        array.push([x2,y2]);
    }
    for (let i=0; i < snake.body.length; i++){
        for (let j=0; j<2; j++){
            if ((snake.body[i][j] <= apple.x <=snake.body[i][j]) || (snake.body[i][j] <= apple.y <=snake.body[i][j])){
                return true;
            }

        }
    }
    return false;

}
function generateAppleLocation(){
    // coordinates are in the center of the circle
        do {
            apple.x = Math.floor(Math.random() * (775 - apple.radius + 1) + apple.radius);
            apple.y = Math.floor(Math.random() * (775 - apple.radius) + apple.radius);
        } while (appleOnSnake());
        apple.hit = false;
}

function snakeEatsApple() {
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
    if ((headX-apple.x)**2+ (headY-apple.y)**2 <= apple.radius**2){
        apple.hit = true;
    }
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
            return;
        }
        if (snake.direction === "down") {
            y = snake.body[0].y +snake.speed.y;
            snake.body.unshift({x:snake.body[0].x, y:y});
            snake.body.splice(snake.length,1);
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

function addTail(){
    let tailX = snake.body[snake.length-1].x;
    let tailY = snake.body[snake.length-1].y;
    let array = [[tailX,tailY-25],[tailY.x+snake.width,tailY],[tailX,tailY+snake.height],[tailX-snake.width,tailY]]
    for (let i = 0; i<4; i++){
        if ((array[i][0]||array[i][1]<0) || (array[i][0]||array[i][1]>800)){
            continue;
        }else{
            snake.body.push({x:array[i][0],y:array[i][0]});
            break;
        }
    }
    snake.length++;
}
    //fix
    // let x, y;
    // [x, y] = snakeLinkLocations[numberSnakeLinks-1];
//      switch (snake.direction) {
//         case "right":
//             x -= snake.width;
//             break;
//         case "up":
//             y = y + 2 * snake.height;
//             break;
//         case "left":
//             x = x - 2 * snake.width;
//             break;
//         case "down":
//             y -= snake.height;
//             break;
//     }
//      snakeLinkLocations.push([x, y]);
//      numberSnakeLinks+=1;
// }

function renderGameElements(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    for (let i=0; i<snake.body.length;i++) {
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
    ctx.closePath();
}

document.addEventListener("keydown",(event)=>{
     let direction = event.which;
     changeDirection(direction);
})

