class Bottles extends MovableObject {

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 70;
    }

}