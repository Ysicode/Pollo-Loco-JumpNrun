class Chicken extends MovableObject {
    y = 385;
    height = 60;
    width = 40;
    img;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',

    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 500; // Zahl zwischenn 200 und 700
        this.speed = 0.15 + Math.random() * 0.3;

        this.animate();
    }

    animate() {
        this.moveleft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 400);
    }
}