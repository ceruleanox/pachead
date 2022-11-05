import MovingDirection from "./MovingDirection.js";

export default class Pachead {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentMovingDirection = null;
        this.requestedMovingDiretion = null;

        document.addEventListener("keydown", this.keydown);

        this.loadPacheadImages();
    }

    draw(ctx) {
        this.move();
        ctx.drawImage(this.pacheadImages[this.pacheadImageIndex], this.x, this.y, this.tileSize, this.tileSize);
    }

    loadPacheadImages() {
        const pacheadImg1 = new Image();
        pacheadImg1.src = "../img/pac0.png";

        const pacheadImg2 = new Image();
        pacheadImg2.src = "../img/pac1.png";

        const pacheadImg3 = new Image();
        pacheadImg3.src = "../img/pac2.png";

        this.pacheadImages = [
            pacheadImg1,
            pacheadImg2,
            pacheadImg3,
            pacheadImg2
        ];

        this.pacheadImageIndex = 0;
    }

    keydown=(event) => {
        // up
        if(event.keyCode == 38) {
            if(this.currentMovingDirection == MovingDirection.down) {
                this.currentMovingDirection = MovingDirection.up;
            }
            this.requestedMovingDirection = MovingDirection.up;
        }
        //left
        if(event.keyCode == 37) {
            if(this.currentMovingDirection == MovingDirection.right) {
                this.currentMovingDirection = MovingDirection.left;
            }
            this.requestedMovingDirection = MovingDirection.left;
            
        }
        // down
        if(event.keyCode == 40) {
            if(this.currentMovingDirection == MovingDirection.up) {
                this.currentMovingDirection = MovingDirection.down;
            }
            this.requestedMovingDirection = MovingDirection.down;
            
        }
        // right
        if(event.keyCode == 39) {
            if(this.currentMovingDirection == MovingDirection.left) {
                this.currentMovingDirection = MovingDirection.right;
            }
            this.requestedMovingDirection = MovingDirection.right;
        }        
    }

    move() {
        if(this.currentMovingDirection !== this.requestedMovingDirection) {
            if(Number.isInteger(this.x/this.tileSize) && Number.isInteger(this.y/this.tileSize)) {
                this.currentMovingDirection = this.requestedMovingDirection;
            }
        }
        switch(this.currentMovingDirection) {
            case MovingDirection.up:
                this.y -= this.velocity;
                break; 
            case MovingDirection.left:
                this.x -= this.velocity;
                break; 
            case MovingDirection.down:
                this.y += this.velocity;
                break; 
            case MovingDirection.right:
                this.x += this.velocity;
                break; 
            }
    }

}
