//DEFINE CONSTANTS
const BACK_COLOR = "#808080";
const SNAKE_COLOR = "#000000";
const FOOD_COLOR = SNAKE_COLOR;
const TEXT_COLOR = "#000000";

//CREATE CANVAS VARIABLE
var canvas = document.getElementById("snakeCanvas");

//ADD EVENT LISTENER FOR KEYBOARD INPUT
window.addEventListener("keydown", keyboardInput, false)

//VARIABLES FOR ANIMATION LOOP
var ctx = canvas.getContext("2d");

//SET SNAKE GAME VARIABLES
NUM_BLOCKS = 35;
MOVING_UP = 0;
MOVING_RIGHT = 1;
MOVING_DOWN = 2;
MOVING_LEFT = 3;
var isGameover = false;
var playing = false;
var prev_dir;
var snake;
var snake_dir;
var food;
var score = 0;

//MAIN ANIMATION LOOP
function gameloop() {
  //UPDATE GAME ONCE
  update();

  //CHECK IF GAME IS OVER
  if (!isGameover) {
    //CLEAR LAST ANIMATION LOOP'S CONTENT
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //DRAW SNAKE
    drawSnake();

    //DRAW FOOD
    drawFood();

    //DRAW SCORE
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = "15px Courier";
    ctx.fillText("Score: "+score, 20, 380);

    //LOOP AGAIN
    window.setTimeout(gameloop, 60);
  } else {
    gameover();
  }
}

function drawSnake() {
  var i;
  for (i = 0; i < snake.length; i++) {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(snake[i].x*canvas.height/(NUM_BLOCKS+1), snake[i].y*canvas.width/(NUM_BLOCKS+1), canvas.height/(NUM_BLOCKS+1), canvas.width/(NUM_BLOCKS+1));
    ctx.strokeStyle = BACK_COLOR;
    ctx.strokeRect(snake[i].x*canvas.height/(NUM_BLOCKS+1), snake[i].y*canvas.width/(NUM_BLOCKS+1), canvas.height/(NUM_BLOCKS+1), canvas.width/(NUM_BLOCKS+1));
  }
}

function drawFood() {
  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(food.x*canvas.height/(NUM_BLOCKS+1), food.y*canvas.width/(NUM_BLOCKS+1), canvas.height/(NUM_BLOCKS+1), canvas.width/(NUM_BLOCKS+1));
  ctx.strokeRect(food.x*canvas.height/(NUM_BLOCKS+1), food.y*canvas.width/(NUM_BLOCKS+1), canvas.height/(NUM_BLOCKS+1), canvas.width/(NUM_BLOCKS+1));
}

function update() {
  //UPDATE THE POSITION OF THE SNAKE
  var i;
  for (i = snake.length - 1; i > 0; i--) {
    snake[i] = snake[i-1];
  }
  snake[0] = {x:snake[1].x,y:snake[1].y};
  switch (snake_dir) {
    case MOVING_UP:
      snake[0].y--;
      break;
    case MOVING_RIGHT:
      snake[0].x++;
      break;
    case MOVING_DOWN:
      snake[0].y++;
      break;
    case MOVING_LEFT:
      snake[0].x--;
      break;
  }
  //CHECK FOR SNAKE HITTING ITSELF
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      isGameover = true;
    }
  }
  //CHECK FOR SNAKE LEAVING SCREEN
  if (snake[0].x < 0 || snake[0].x > NUM_BLOCKS || snake[0].y < 0 || snake[0].y > NUM_BLOCKS) {
    isGameover = true;
  }
  //CHECK IF SNAKE ATE FOOD
  if (snake[0].x == food.x && snake[0].y == food.y) {
    snake[snake.length] = {x:snake[snake.length-1].x,y:snake[snake.length-1].y};
    food = generateFood();
    score += 10;
  }
  //UPDATE PREVIOUS DIRECTION
  prev_dir = snake_dir;
}

function keyboardInput(event) {
  var char = event.keyCode;
  switch (char) {
    case 37:
      if (prev_dir != MOVING_RIGHT)
        snake_dir = MOVING_LEFT;
      break;
    case 38:
      if (prev_dir != MOVING_DOWN)
        snake_dir = MOVING_UP;
      break;
    case 39:
      if (prev_dir != MOVING_LEFT)
        snake_dir = MOVING_RIGHT;
      break;
    case 40:
      if (prev_dir != MOVING_UP)
        snake_dir = MOVING_DOWN;
      break;
    case 32:
      if (playing != true) {
        reset();
        gameloop();
        playing = true;
      }
      break;
  }
}

function gameover() {
  console.log("gameover");
  playing = false;
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = "40px Courier";
  ctx.fillText("whoops!", 50, 50);
  ctx.font = "20px Courier";
  ctx.fillText("press space to play", 50, 300);
}

function generateFood() {
  var valid = false;
  var ret;
  while (!valid) {
    ret = {x:Math.round(Math.random()*NUM_BLOCKS),y:Math.round(Math.random()*NUM_BLOCKS)};
    var i;
    valid = true;
    for (i = 0; i < snake.length; i++) {
      if (snake[i].x == ret.x && snake[i].y == ret.y) {
        valid = false;
      }
    }
  }
  return ret;
}

function initiate() {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = "20px Courier";
  ctx.fillText("press space to play", 50, 300);
}

function reset() {
  //CREATE THE SNAKE
  start = Math.round(NUM_BLOCKS/3);
  snake = [{x:start,y:start}, 
    {x:start-1,y:start}, 
    {x:start-2,y:start}, 
    {x:start-3,y:start}
  ];
  snake_dir = MOVING_RIGHT;

  //CREATE THE FOOD
  food = generateFood();

  //RESET GAMEOVER
  isGameover = false;

  //RESET SCORE
  score = 0;
}

//BEGIN THE GAME INITIALLY WHEN THE PAGE LOADS
initiate();
