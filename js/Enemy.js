import MovingDirection from "./MovingDirection.js";

export default class Enemy {

    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.loadEnemyImages();

        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

        this.directionTimerDefault = this.random(10,25);
        this.directionTimer = this.directionTimerDefault;

        this.scaredAboutToExpireTimerDefault = 5;
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
    }

    draw(ctx, pause, pachead) {
        if(!pause) {
            this.move();
            this.changeDirection();
        }
        this.setImage(ctx, pachead);
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
    }

    collideWith(pachead) {
        const size = this.tileSize / 2;
        if (
          this.x < pachead.x + size &&
          this.x + size > pachead.x &&
          this.y < pachead.y + size &&
          this.y + size > pachead.y
        ) {
          return true;
        } else {
          return false;
        }
      }

    setImage(ctx, pachead) {        
        if (pachead.powerDotActive) {
            this.#setImageWhenPowerDotIsActive(pachead);
        } else {
            this.image = this.normalGhost;
        }
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
    }
  
    #setImageWhenPowerDotIsActive(pachead) {
      if (pachead.powerDotAboutToExpire) {
        this.scaredAboutToExpireTimer--;
        if (this.scaredAboutToExpireTimer === 0) {
          this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
          if (this.image === this.scaredGhost) {
            this.image = this.scaredGhost2;
          } else {
            this.image = this.scaredGhost;
          }
        }
      } else {
        this.image = this.scaredGhost;
      }
    }

    move() {
        if(!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.movingDirection)) {
            switch (this.movingDirection) {
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

    changeDirection() {
        this.directionTimer--;
        let newMoveDirection = null;
        if (this.directionTimer == 0) {
            this.directionTimer = this.directionTimerDefault;
            newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        }

        if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
            if(Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
                if(!this.tileMap.didCollideWithEnvironment(this.x, this.y, newMoveDirection)) {
                    this.movingDirection = newMoveDirection;
                }
            }
        }
    }

    random(min, max) {
        return Math.floor(Math.random() * (max-min + 1)) + min;
    }

    loadEnemyImages() {

        this.normalGhost = new Image();
        this.normalGhost.src = "../img/COVID.png";

        this.scaredGhost = new Image();
        this.scaredGhost.src = "../img/scaredGhost.png";

        this.scaredGhost2 = new Image();
        this.scaredGhost2.src = "../img/scaredGhost2.png";

        this.image = this.normalGhost;
    }
}