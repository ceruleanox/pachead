import Pachead from './Pachead.js';

export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;

        this.yellowDot = new Image();
        this.yellowDot.src = "../img/yellowDot.png";

        this.wall = new Image();
        this.wall.src = "../img/wall.png";

    }

    // 0 = dot
    // 1 = wall
    // 2 = pac-head

    map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,2,0,1,0,1,0,0,0,1,0,0,0,1,0,1,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,0,1],
        [1,0,1,0,0,0,1,0,0,0,1,0,1,1,1,0,0,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,0,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
        [1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,1,0,0,0,1,0,0,1,1,0,0,0,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,1,1,1,0,0,0,1,0,1,0,1,0,0,0,0,1],
        [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
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

    getPachead(velocity) {
        for(let row = 0; row < this.map.length; row++) {
            for(let col = 0; col < this.map[row].length; col++) {
                let tile = this.map[row][col];
                if(tile === 2) {
                    this.map[row][col] = 0;
                    return new this.getPachead(col*this.tileSize, row*this.tileSize, this.tileSize, velocity, this);
                }
            }
        }
    }
    
    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }
}