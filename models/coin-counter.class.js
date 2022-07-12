class Coincounter extends DrawableObject {

    coinCounter = 0;

    constructor() {
        super().loadImage('img/8_coin/coin_2.png');
        this.x = 595;
        this.y = 0;
        this.width = 80;
        this.height = 80;
    }
}