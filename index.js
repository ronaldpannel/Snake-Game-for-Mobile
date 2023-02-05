/**@type{HTMLCanvasElement} */
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 400;
  const hScoreBoard = document.getElementById("highScoreValue");
  const gulpSound = document.getElementById("gulp");
  const scoreBoard = document.getElementById("scoreValue");
  const gameOverText = document.getElementById("gameOver");
  const startBtn = document.getElementById("startBtn");
  const hsResetBtn = document.getElementById("hsResetBtn");
  const upBtn = document.getElementById("upBtn");
  const downBtn = document.getElementById("downBtn");
  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");

  let pointerPos;
  let speed = 3;
  let score = 0;
  let highScore = localStorage.getItem("snakeHighScore") || 0;
  let tileCount = 20;
  let headX = 10;
  let headY = 10;
  let appleX = 5;
  let appleY = 5;
  let tileSize = 20;
  canvas.width = tileSize * 20;
  canvas.height = tileSize * 20;
  const snakeParts = [];
  let tailLength = 2;

  let velX = 0;
  let velY = 0;

  class SnakePart {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
      return;
    }
    clearScreen();
    checkAppleCollision();
    drawSnake();
    drawApple();
    checkHighScore();
    if (score > 2) {
      speed = 5;
    }
    if (score > 4) {
      speed = 7;
    }
    if (score > 6) {
      speed = 11;
    }
    if (score > 8) {
      speed = 13;
    }

    setTimeout(drawGame, 1000 / speed);
  }

  function isGameOver() {
    let gameOver = false;
    if (velX === 0 && velY === 0) {
      return false;
    }

    //walls collision
    if (headX < 0 || headX > tileCount || headY < 0 || headY > tileCount) {
      gameOver = true;
    }

    //snake head snake body collision
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      if (part.x === headX && part.y === headY) {
        gameOver = true;
        break;
      }
    }

    if (gameOver) {
      gameOverText.classList.add("active");
      startBtn.classList.add("active");
      hsResetBtn.classList.add("active");
    }
    return gameOver;
  }

  function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawSnake() {
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    ctx.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > tailLength) {
      snakeParts.shift();
    }
  }

  function changeSnakePosition() {
    headX = headX + velX;
    headY = headY + velY;
  }

  function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
  }

  function checkAppleCollision() {
    if (headX === appleX && headY === appleY) {
      gulpSound.play();
      score++;
      scoreBoard.innerHTML = score;
      appleX = Math.floor(Math.random() * tileCount);
      appleY = Math.floor(Math.random() * tileCount);
      tailLength++;
    }
  }
  function checkHighScore() {
    if (score > localStorage.getItem("snakeHighScore")) {
      localStorage.setItem("snakeHighScore", score);
      let hsScore = localStorage.getItem("snakeHighScore");
      highScore = hsScore;
    }
    hScoreBoard.innerHTML = highScore;
  }

  window.addEventListener("keydown", keydown);

  function keydown(e) {
    //up
    if (e.key === "ArrowUp") {
      if (velY == 1) return;
      velX = 0;
      velY = -1;
    } else if (e.key === "ArrowDown") {
      if (velY == -1) return;
      velX = 0;
      velY = 1;
    } else if (e.key === "ArrowLeft") {
      if (velX == 1) return;
      velX = -1;
      velY = 0;
    } else if (e.key === "ArrowRight") {
      if (velX == -1) return;
      velX = 1;
      velY = 0;
    }
  }

  upBtn.addEventListener("click", (e) => {
    e.preventDefault;
    velX = 0;
    velY = -1;
  });
  downBtn.addEventListener("click", (e) => {
    e.preventDefault;
    velX = 0;
    velY = 1;
  });
  leftBtn.addEventListener("click", (e) => {
    e.preventDefault;
    velX = -1;
    velY = 0;
  });
  rightBtn.addEventListener("click", (e) => {
    e.preventDefault;
    velX = 1;
    velY = 0;
  });

  startBtn.addEventListener("pointerdown", (e) => {
    window.location.reload();
  });
  hsResetBtn.addEventListener("pointerdown", (e) => {
    localStorage.setItem("snakeHighScore", 0);
    window.location.reload();
  });

  drawGame();

  //load function end
});
