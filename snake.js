const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

const tileSize = 20;
const gridSize = 20;
let snake = [{ x: 5, y: 5 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let isGameOver = false;

function startGame() {
  snake = [{ x: 5, y: 5 }];
  food = { x: 15, y: 15 };
  dx = 0;
  dy = 0;
  score = 0;
  isGameOver = false;
  gameLoop();
  startButton.style.display = "none"; // Hide the button at the start of the game
}

startButton.addEventListener("click", startGame);

function update() {
  if (isGameOver) return;

  // Update snake position
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check for collisions
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    generateFood();
  } else {
    snake.pop();
  }

  if (checkCollision()) {
    isGameOver = true;
  }
}

function checkCollision() {
  const head = snake[0];
  // Check for collision with walls
  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    return true;
  }
  // Check for collision with itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

function generateFood() {
  food.x = Math.floor(Math.random() * gridSize);
  food.y = Math.floor(Math.random() * gridSize);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // Draw snake
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * tileSize,
      segment.y * tileSize,
      tileSize,
      tileSize
    );
  });

  // Draw score
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  // Draw game over message
  if (isGameOver) {
    ctx.fillStyle = "red";
    ctx.font = "48px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
  }
}

function gameLoop() {
  update();
  draw();
  if (!isGameOver) {
    setTimeout(() => {
      requestAnimationFrame(gameLoop);
    }, 150); // Adjust the delay here (e.g., 150 for a slower speed)
  } else {
    startButton.style.display = "block";
  }
}

// Capture keyboard input to control the snake
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (dy !== 1) {
        dx = 0;
        dy = -1;
      }
      break;
    case "ArrowDown":
      if (dy !== -1) {
        dx = 0;
        dy = 1;
      }
      break;
    case "ArrowLeft":
      if (dx !== 1) {
        dx = -1;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx !== -1) {
        dx = 1;
        dy = 0;
      }
      break;
  }
});

generateFood();
gameLoop();
startButton.style.display = "block";
