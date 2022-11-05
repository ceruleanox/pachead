import TileMap from "./TileMap.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const velocity = 1;

const tileMap = new TileMap(tileSize);
// const pachead = tileMap.getPachead(velocity);

function gameLoop() {
    tileMap.draw(ctx);
    pachead.draw(ctx);
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);