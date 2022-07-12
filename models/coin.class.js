class Coin extends MovableObject {

    offset = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    }
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.width = 110;
        this.height =110;
        this.animate();
    }


    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_COIN.length;
            let path = this.IMAGES_COIN[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        },300);
    }

}