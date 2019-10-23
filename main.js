const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let htmlScore = document.querySelector('#score');

snake = [
  { x: 10, y: 20 },
  { x: 20, y: 20 },
  { x: 30, y: 20 },
  { x: 40, y: 20 }
];

let dy = 0;
let dx = 10;

let foodX;
let foodY;

let score = 0;
htmlScore.textContent = score;


const drawSnakePart = (x, y) => {
  ctx.fillStyle = "green";
  ctx.strokeStyle = "darkgreen";
  ctx.fillRect(x, y, 10, 10);
  ctx.strokeRect(x, y, 10, 10);
};

const drawWholeSnake = () => {
  snake.forEach(cord => {
    drawSnakePart(cord.x, cord.y);
  });
};

let getRandomCoordinates = max => {
  return Math.round((Math.random() * max) / 10) * 10;
};

let makeFood = () => {
  foodX = getRandomCoordinates(canvas.width - 10);
  foodY = getRandomCoordinates(canvas.height - 10);
};

let drawFood = () => {
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
};

let advanceSnake = () => {
  let head = {
    x: snake[snake.length - 1].x + dx,
    y: snake[snake.length - 1].y + dy
  };

  snake.push(head); 
    //check if snake picks up food
    let didEatFood = head.x === foodX && head.y === foodY;
    if(didEatFood) {
        score += 10;
        htmlScore.textContent = score;
        makeFood();
    } else {
        snake.shift();
    }
};

let changeDirection = (event) => {
    let KEY_UP = 38; 
    let KEY_DOWN = 40; 
    let KEY_LEFT = 37; 
    let KEY_RIGHT = 39;
    let keyPressed = event.keyCode;

    let goingDown = dy === 10;
    let goingUp = dy === -10;
    let goingLeft = dx === -10;
    let goingRight = dx === 10;

    if(keyPressed === KEY_UP && !goingDown) {
        dy = -10;
        dx = 0;
    }
    if(keyPressed === KEY_DOWN && !goingUp) {
        dy = 10;
        dx = 0;
    }
    if(keyPressed === KEY_LEFT && !goingRight) {
        dy = 0;
        dx = -10;
    }
    if(keyPressed === KEY_RIGHT && !goingLeft) {
        dy = 0;
        dx = 10;
    }
    
}
document.addEventListener('keydown', changeDirection)

let didGameEnd = () => {
    for(let i =2; i < snake.length ; i++) {
        if(snake[snake.length - 1].x === snake[(snake.length - 1) - i].x && snake[snake.length - 1].y === snake[(snake.length - 1) - i].y ) {
            return true;
        }
    }
    let hitLeftWall = snake[snake.length - 1].x < 0;
    let hitRightWall = snake[snake.length - 1].x > canvas.width - 10;
    let hitTopWall = snake[snake.length - 1].y < 0;
    let hitBottomWall = snake[snake.length - 1].y > canvas.height - 10;


    return hitLeftWall || hitRightWall || hitBottomWall || hitTopWall;
}

let clearBoard = () => {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.fillRect(0, 0, 300, 300);
  ctx.strokeRect(0, 0, 300, 300);
};



// setTimeout(() => {
    //   clearBoard();
    //   drawFood();
//   advanceSnake();
//   drawWholeSnake();
// }, 3000);

let main = () => {
    if(didGameEnd()) {
        htmlScore.textContent = `You Scored ${score}`;
        return;
    }
    setTimeout(() => {
        clearBoard();
        drawFood();
        advanceSnake();
        drawWholeSnake();
        main();
    }, 100)
}

makeFood();
main();