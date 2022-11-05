//import MovingDirection from "./MovingDirection.js";

export default class Pachead {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.loadPacheadImages();
    }

    draw(ctx) {
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

}
