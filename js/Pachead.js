import MovingDirection from "./MovingDirection.js";

export default class Pachead {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        this.pacheadAnimationTimerDefault = 10;
        this.pacheadAnimationTimer = null;

        this.pacheadRotation = this.Rotation.right;

        this.wakaSound = new Audio("../audio/waka.wav");
        this.powerDotSound = new Audio("../audio/power_dot.wav");
        this.eatGhostSound = new Audio("../audio/eat_ghost.wav");

        this.powerDotActive = false;
        this.powerDotAboutToExpire = false;
        this.timers = [];

        this.madeFirstMove = false;

        document.addEventListener("keydown", this.keydown);

        this.loadPacheadImages();
    }

    Rotation = {
        up: 3,
        left: 2,
        down: 1,
        right: 0
    }

    draw(ctx, pause, enemies) {
        if(!pause) {
            this.move();
            this.animate();    
        }
        this.eatDot();
        this.eatPowerDot();
        this.eatGhost(enemies);

        const size = this.tileSize/2;

        ctx.save();
        ctx.translate(this.x + size, this.y + size);
        ctx.rotate((this.pacheadRotation * 90 * Math.PI)/180);
        ctx.drawImage(this.pacheadImages[this.pacheadImageIndex],-size,-size, this.tileSize, this.tileSize);
        ctx.restore();

        // ctx.drawImage(this.pacheadImages[this.pacheadImageIndex], this.x, this.y, this.tileSize, this.tileSize);
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
            this.madeFirstMove = true;
        }
        //left
        if(event.keyCode == 37) {
            if(this.currentMovingDirection == MovingDirection.right) {
                this.currentMovingDirection = MovingDirection.left;
            }
            this.requestedMovingDirection = MovingDirection.left;
            this.madeFirstMove = true;
        }
        // down
        if(event.keyCode == 40) {
            if(this.currentMovingDirection == MovingDirection.up) {
                this.currentMovingDirection = MovingDirection.down;
            }
            this.requestedMovingDirection = MovingDirection.down;
            this.madeFirstMove = true;
        }
        // right
        if(event.keyCode == 39) {
            if(this.currentMovingDirection == MovingDirection.left) {
                this.currentMovingDirection = MovingDirection.right;
            }
            this.requestedMovingDirection = MovingDirection.right;
            this.madeFirstMove = true;
        }        
    }

    move() {
        if(this.currentMovingDirection !== this.requestedMovingDirection) {
            if(Number.isInteger(this.x/this.tileSize) && Number.isInteger(this.y/this.tileSize)) {
                if(!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.requestedMovingDirection))
                this.currentMovingDirection = this.requestedMovingDirection;
            }
        }

        if(this.tileMap.didCollideWithEnvironment(this.x, this.y, this.currentMovingDirection)) {
            this.pacheadAnimationTimer = null;
            this.pacheadImageIndex = 1;
            return;
        } else if (this.currentMovingDirection != null && this.pacheadAnimationTimer == null) {
            this.pacheadAnimationTimer = this.pacheadAnimationTimerDefault;
        }

        switch(this.currentMovingDirection) {
            case MovingDirection.up:
                this.y -= this.velocity;
                this.pacheadRotation = this.Rotation.up;
                break; 
            case MovingDirection.left:
                this.x -= this.velocity;
                this.pacheadRotation = this.Rotation.left;
                break; 
            case MovingDirection.down:
                this.y += this.velocity;
                this.pacheadRotation = this.Rotation.down;
                break; 
            case MovingDirection.right:
                this.x += this.velocity;
                this.pacheadRotation = this.Rotation.right;
                break; 
        }
    }

    animate() {
        if(this.pacheadAnimationTimer == null) {
            return;
        }
        this.pacheadAnimationTimer--;
        if (this.pacheadAnimationTimer == 0) {
            this.pacheadAnimationTimer = this.pacheadAnimationTimerDefault;
            this.pacheadImageIndex++;
            if (this.pacheadImageIndex == this.pacheadImages.length) {
                this.pacheadImageIndex = 0;
            }
        } 
    }

    eatDot() {
        if(this.tileMap.eatDot(this.x, this.y) && this.madeFirstMove) {
            this.wakaSound.play();
        }
    }

    eatPowerDot() {
        if(this.tileMap.eatPowerDot(this.x, this.y)) {
            this.powerDotSound.play();
            this.powerDotActive = true;
            this.powerDotAboutToExpire = false;
            this.timers.forEach((timer) => clearTimeout(timer));
            this.timers = [];
      
            let powerDotTimer = setTimeout(() => {
              this.powerDotActive = false;
              this.powerDotAboutToExpire = false;
            }, 1000 * 6);
      
            this.timers.push(powerDotTimer);
      
            let powerDotAboutToExpireTimer = setTimeout(() => {
              this.powerDotAboutToExpire = true;
            }, 1000 * 3);
      
            this.timers.push(powerDotAboutToExpireTimer);
        }
    }

    eatGhost(enemies) {
        if (this.powerDotActive) {
          const collideEnemies = enemies.filter((enemy) => enemy.collideWith(this));
          collideEnemies.forEach((enemy) => {
            enemies.splice(enemies.indexOf(enemy), 1);
            this.eatGhostSound.play();
          });
        }
      }
}
