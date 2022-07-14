class Chicken extends MovableObject {
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    y = 385;
    height = 60;
    width = 40;
    img;
    world;
    intervalWalking;
    alive = true;
    intervalMovingLeft;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x; // Zahl zwischenn 200 und 700
        this.speed = 0.15 + Math.random() * 0.3;
        this.animate();
    }

    removeChicken() {
        this.y = 270;
        setInterval(() => {
           this.deadAnimation();
        }, 50);
        clearInterval(this.walking);
        clearInterval(this.movingLeft);
    }

    animate() {
        this.intervalMovingLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.intervalWalking = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);      
        }, 400);
    }

    deadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.y += 25;
    }

   
}