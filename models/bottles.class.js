class Bottles extends MovableObject {
    offset = {
        top: 5,
        bottom: 5,
        left: 20,
        right: 20
    }

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 70;
    }

}