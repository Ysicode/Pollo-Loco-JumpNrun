class Endboss extends MovableObject {
    y = 160;
    height = 300;
    width = 250;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];


    speed = 0.2;
    walking = false;

    constructor(x) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.x = x;
        this.animate();
    }

    animate() {
        this.walk();
        this.moveEndbossLeft();
    }

    moveEndbossLeft() {
        let left = setInterval(() => {
            this.moveLeft();
            if (this.x < 6500) {
                clearInterval(left);
                this.moveEndbossRight();
            };
        }, 1000 / 60);
    }

    moveEndbossRight() {
        let right = setInterval(() => {
            this.moveRight();
            if (this.x > 7000) {
                clearInterval(right);
                this.moveEndbossLeft();
            };
        }, 1000 / 60);
    }

    walk() {
        this.y = 160;
        this.speed = 5;
        let walking = setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6 => 0 Rest 6
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;

            if (i == this.IMAGES_WALKING.length - 1) {
                clearInterval(walking);
                this.currentImage = 0;
                this.attack();
            }
        }, 200);
    }

    attack() {
        this.speed = 0;
        this.y = 0;
        let attacking = setInterval(() => {
            let i = this.currentImage % this.IMAGES_ATTACK.length;
            let path = this.IMAGES_ATTACK[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (i == this.IMAGES_ATTACK.length - 1) {
                clearInterval(attacking);
                this.currentImage = 0;
                this.walk();
            }
        }, 200);
    }
}