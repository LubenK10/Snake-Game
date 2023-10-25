const gameBoard = document.getElementById("gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const snakeColor = "green";
const gameBackground = "#AFE1AF";
const snakeBorder = "black";
const foodColor = "red";
let unitSize = 25;
let running = false; 
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
]

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

startGame();

function startGame(){
    running = true;
    score.textContent = `Score: ${score}`;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100)
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    context.fillStyle = gameBackground;
    context.fillRect( 0, 0, gameWidth,gameHeight);
};
function resetGame(){
    score = 0;
    scoreText.textContent = `Score: ${score}`;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];

    startGame();

};
function drawSnake(){
    
    const randomColor = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
    }

    context.fillStyle = snakeColor;
    //context.fillStyle = randomColor();
    context.strokeStyle = snakeBorder;
    snake.forEach(snakeP => {
        context.fillRect(snakeP.x, snakeP.y, unitSize,unitSize);
        context.strokeRect(snakeP.x, snakeP.y, unitSize,unitSize);
    });
};
function moveSnake(){
    const head = {x:snake[0].x + xVelocity,
                  y:snake[0].y + yVelocity};

   // const img = new Image();
   // img.src = "cute-little-snake-kawaii-animal-line-and-fill-style-free-vector.jpg";

   // context.drawImage(img, snake[0].x + xVelocity, snake[0].y + yVelocity, unitSize*1.2, unitSize*1.2);
  snake.unshift(head);   
    
    if(snake[0].x == foodX && snake[0].y == foodY){
        score++;
        scoreText.textContent = `Score: ${score}`;
        createFood();
    }

    else{
        snake.pop();
    }
}; 
function createFood(){
    function randomFood(min, max){
        const randomNumber = Math.floor((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randomNumber;
    }

     foodX = randomFood(0, gameWidth - unitSize);
     foodY = randomFood(0, gameWidth - unitSize);

};
function drawFood(){

    const img = new Image();
    img.src = "android-chrome-192x192.png";
   // img.src = "favicon-16x16.png";
    context.drawImage(img, foodX, foodY, unitSize*1.2, unitSize*1.2);

  //  context.fillStyle = foodColor;
    //context.fillRect(foodX, foodY, unitSize, unitSize);
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;

        case(keyPressed == RIGHT && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;

        case(keyPressed == UP && !goingDown):
        xVelocity = 0;
        yVelocity = -unitSize;
        break;

        case(keyPressed == DOWN && !goingUp):
        xVelocity = 0;
        yVelocity = unitSize;
        break;

    }

};
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
        running = false;
        break;

        case(snake[0].x >= gameWidth):
        running = false;
        break;

        case(snake[0].y < 0):
        running = false;
        break;

        case(snake[0].y >= gameHeight):
        running = false;
        break;
    }

    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    context.font = "60px MV Boli";
    context.fillStyle = "black";
    context.textAlighn = "center";
    context.fillText("GAME OVER", gameWidth / 7.5, gameHeight / 2);
    running = false;
};










