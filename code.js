const canvas = document.getElementById("snakeGameBoard");
const ctx = canvas.getContext("2d");
const div = document.querySelector("div");
const snake = {
    width: 8,
    height: 8,
    body: [
        {x:150,y:400},
        {x:125, y:400},
        {x:100,y:400}
    ],
    speed:{x:10,y:10},
    length: 3,
    direction: "right",
    applesEaten:0

}
const apple = {
    x: canvas.width/2,
    y: canvas.height/2,
    hit: false,
    radius: 15,
}

main();

function main(){
    let gameLoop = setInterval(() => {
                renderGameElements();
                displayScore();
                snakeMovement();
                if (wallBoundaryDetection()||snakeEatsSnake()){clearInterval(gameLoop)} //find better way to end game
                snakeEatsApple();
                if (apple.hit) {
                addTail();
                snake.applesEaten++;
                }
                }, 100);
}

function wallBoundaryDetection(){
    //snake head edge changes based on the direction its heading
    if (snake.direction==="right" && (snake.body[0].x + snake.width > canvas.width)){return true}
    if (snake.direction==="left" && (snake.body[0].x < 0)){return true}
    if (snake.direction==="up" && (snake.body[0].y < 0)){return true}
    if (snake.direction==="down" && (snake.body[0].y + snake.height > canvas.height)){return true}
    return false;
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
        if (((x1 <= headX) && (headX <= x2)) && ((y1 <= headY) && (headY<= y2))){
            return true;
        }

    }
    return false;
}

function appleOnSnake(){
    let x1,x2,y1,y2;
    let X1,X2,Y1,Y2;
    let arrayX1Y1 = [];
    let arrayX2Y2= [];
    for (let i=0; i < snake.body.length; i++){
        x1 = snake.body[i].x - snake.width;
        y1 = snake.body[i].y - snake.height;
        arrayX1Y1.push([x1,y1]);
    }
    for (let i=0; i < snake.body.length; i++){
        x2 = snake.body[i].x + snake.width*2;
        y2= snake.body[i].y +snake.height*2;
        arrayX2Y2.push([x2,y2]);
    }
    for (let i=0; i < snake.body.length; i++) {
        X1 = arrayX1Y1[i][0];
        X2 = arrayX2Y2[i][0];
        Y1 = arrayX1Y1[i][1];
        Y2 = arrayX2Y2[i][1];
        if (((X1 <= apple.x) && (apple.x <= X2)) && ((Y1 <= apple.y) && (apple.y<= Y2))){
            return true;
        }

    }
    return false;
}
function generateAppleLocation(){
        do {
            apple.x = Math.floor(Math.random() * (775 - apple.radius + 1) + apple.radius);
            apple.y = Math.floor(Math.random() * (775 - apple.radius) + apple.radius);
        } while (appleOnSnake());
        apple.hit = false;
}

function snakeEatsApple() {
    // make the detection more fine grained by adding additional contact points on the head or think of another solution
    // for example making the snake really really skinny
    let headX, headY;
    [headX,headY] = snakeHeadPosition();
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
    // is this necessary at high frame rates?
    let array = [[tailX,tailY-snake.width],[tailX+snake.width,tailY],[tailX,tailY+snake.height],[tailX-snake.width,tailY]]
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
function displayScore(){
    div.innerText= `Score: ${snake.applesEaten}`
    //ctx.font = "30px Veranda"
    //ctx.fillText(`Score:${snake.applesEaten}`,canvas.width,canvas.height)
}
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

