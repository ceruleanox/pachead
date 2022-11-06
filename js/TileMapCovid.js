import Pachead from './Pachead.js';
import MovingDirection from "./MovingDirection.js";
import Enemy from './Enemy.js';

export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;

        this.yellowDot = new Image();
        this.yellowDot.src = "../img/yellowDot.png";

        this.pinkDot = new Image();
        this.pinkDot.src = "../img/Booster.png";

        this.wall = new Image();
        this.wall.src = "../img/wall.png";

        this.powerDot = this.pinkDot;
        this.powerDotAnimationTimerDefault = 30;
        this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
    }

    // 0 = dot
    // 1 = wall
    // 2 = pac-head
    // 3 = empty space
    // 4 = enemy
    // 5 = power dot

    map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,5,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1],
        [1,0,2,0,1,0,1,0,0,0,1,0,0,0,1,0,1,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,0,1],
        [1,0,1,0,0,0,1,0,0,0,1,0,1,1,1,0,0,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,0,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
        [1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,1,0,5,0,1,0,0,1,1,0,0,0,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,1,1,1,0,4,0,1,0,1,0,1,5,0,0,0,1],
        [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    draw(ctx) {
        // console.log("draw");
        for (let row = 0; row < this.map.length; row++) {
            for (let col = 0; col < this.map[row].length; col++) {
                let tile = this.map[row][col];
                if (tile === 1) {
                    this.drawWall(ctx, col, row, this.tileSize);
                } else if (tile === 0) {
                    this.drawDot(ctx, col, row, this.tileSize);
                } else if (tile === 5) {
                    this.drawPowerDot(ctx, col, row, this.tileSize);
                } else {
                    this.drawBlank(ctx, col, row, this.tileSize);
                }

                /*
                // add gridlines for visual
                ctx.strokeStyle = "yellow";
                ctx.strokeRect(col*this.tileSize, row*this.tileSize, this.tileSize, this.tileSize);
                */
            }
        }
    }

    drawWall(ctx, col, row, size) {
        ctx.drawImage(this.wall, col*this.tileSize, row*this.tileSize, size, size);
    }

    drawDot(ctx, col, row, size) {
        ctx.drawImage(this.yellowDot, col*this.tileSize, row*this.tileSize, size, size);
    }

    drawPowerDot(ctx, col, row, size) {
        this.powerDotAnimationTimer--;
        if (this.powerDotAnimationTimer === 0) {
            this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
            if (this.powerDot == this.pinkDot) {
              this.powerDot = this.yellowDot;
            } else {
              this.powerDot = this.pinkDot;
            }
          }
          ctx.drawImage(this.powerDot, col * size, row * size, size, size);
    }

    drawBlank(ctx, col, row, size) {
        ctx.fillStyle="black";
        ctx.fillRect(col * this.tileSize, row * this.tileSize, size, size);
    }

    getPachead(velocity) {
        for(let row = 0; row < this.map.length; row++) {
            for(let col = 0; col < this.map[row].length; col++) {
                let tile = this.map[row][col];
                if(tile === 2) {
                    this.map[row][col] = 0;
                    return new Pachead(col*this.tileSize, row*this.tileSize, this.tileSize, velocity, this);
                }
            }
        }
    }
    
    getEnemies(velocity) {
        const enemies = [];

        for(let row=0; row < this.map.length; row++) {
            for(let col=0; col < this.map[row].length; col++) {
                const tile = this.map[row][col];
                if(tile === 4) {
                    this.map[row][col] = 0;
                    enemies.push(new Enemy(col * this.tileSize, row * this.tileSize, this.tileSize, velocity, this));
                }
            }
        }
        return enemies;
    }

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    didCollideWithEnvironment(x,y,direction) {

        if(direction == null) {
            return;
        }

        if(Number.isInteger(x/this.tileSize) && Number.isInteger(y/this.tileSize)) {
            let col = 0;
            let row = 0;
            let nextCol = 0;
            let nextRow = 0;

            switch(direction) {
                case MovingDirection.right:
                    nextCol = x + this.tileSize;
                    col = nextCol / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.left:
                    nextCol = x - this.tileSize;
                    col = nextCol / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    col = x / this.tileSize;
                    break;
                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    col = x / this.tileSize;
                    break;
            }
            const tile = this.map[row][col];
            if (tile === 1) { // wall
                return true;
            }
        }
        return false;
    }

    eatDot(x, y) {
        const row = y / this.tileSize;
        const col = x / this.tileSize;
        if(Number.isInteger(row) && Number.isInteger(col)) {
            if(this.map[row][col] === 0) {
                this.map[row][col] = 3;
                return true;
            }
        }
        return false;
    }

    eatPowerDot(x, y) {
        const row = y / this.tileSize;
        const col = x / this.tileSize;
        if (Number.isInteger(row) && Number.isInteger(col)) {
          const tile = this.map[row][col];
          if (tile === 5) {
            this.map[row][col] = 3;
            return true;
          }
        }
        return false;
    }

    didWin() {
        return this.dotsLeft() === 0;
    }
    
    dotsLeft() {
        return this.map.flat().filter((tile) => tile === 0).length;
    }
}