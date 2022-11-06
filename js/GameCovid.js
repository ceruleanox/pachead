import TileMap from "./TileMapCovid.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const velocity = 2;

const tileMap = new TileMap(tileSize);
const pachead = tileMap.getPachead(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio("../audio/gameOver.wav");
const gameWinSound = new Audio("../audio/gameWin.wav");

function gameLoop() {
    tileMap.draw(ctx);
    drawGameEnd();
    pachead.draw(ctx, pause(), enemies);
    enemies.forEach((enemy) => enemy.draw(ctx, pause(), pachead));
    checkGameOver();
    checkGameWin();
}

function pause() {
    return !pachead.madeFirstMove || gameOver || gameWin;
}


function checkGameWin() {
    if (!gameWin) {
      gameWin = tileMap.didWin();
      if (gameWin) {
        gameWinSound.play();
      }
    }
  }
  
  function checkGameOver() {
    if (!gameOver) {
      gameOver = isGameOver();
      if (gameOver) {
        gameOverSound.play();
      }
    }
  }
  
  function isGameOver() {
    return enemies.some(
      (enemy) => !pachead.powerDotActive && enemy.collideWith(pachead)
    );
  }

  function drawGameEnd() {
    if (gameOver || gameWin) {
      let text = "   You Win!";
      if (gameOver) {
        text = " Game Over";
      }
  
      ctx.fillStyle = "black";
      ctx.fillRect(0, canvas.height / 3.2, canvas.width, 160);
  
      ctx.font='small-caps 100px Arial';
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", "magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
  
      ctx.textAlign = "start";
      ctx.fillStyle = gradient;
      ctx.fillText(text, 10, canvas.height / 2);
    }
  }

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);