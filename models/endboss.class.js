class Endboss extends MovableObject {
    y = 160;
    offset = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    }
    height = 300;
    width = 250;
    energy = 100;
    intervalAttack;
    intervalWalk;
    intervalDead;
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

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    world;
    speed = 0.2;
    walking = false;

    constructor(x) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.animate();
    }

    animate() {
        this.walk();
        this.moveEndbossLeft();
        this.checkIsHurt();
        this.checkIsDead();
    }

    checkIsHurt() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 50);
    }

    moveEndbossLeft() {
        let moveleft = setInterval(() => {
            this.moveLeft();
            if (this.x < 6500) {
                clearInterval(moveleft);
                this.moveEndbossRight();
            };
        }, 1000 / 60);
    }

    moveEndbossRight() {
        let moveright = setInterval(() => {
            this.moveRight();
            if (this.x > 7000) {
                clearInterval(moveright);
                this.moveEndbossLeft();
            };
        }, 1000 / 60);
    }

    walk() {
        this.y = 160;
        this.speed = 5;
        this.intervalWalk = setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6 => 0 Rest 6
            this.endbossAnimation(this.IMAGES_WALKING, i);
            if (this.animationEnd(this.IMAGES_WALKING, i)) {
                this.intervalEnd(this.intervalWalk)
                this.attack();
            }
        }, 200);
    }

    attack() {
        this.speed = 0;
        this.y = 0;
        this.intervalAttack = setInterval(() => {
            let i = this.currentImage % this.IMAGES_ATTACK.length;
            this.endbossAnimation(this.IMAGES_ATTACK, i);
            if (this.animationEnd(this.IMAGES_ATTACK, i)) {
                clearInterval(this.intervalAttack);
                this.currentImage = 0;
                this.walk();
            }
        }, 200);
    }

    animationEnd(images, i) {
        return i == images.length - 1
    }

    intervalEnd(interval) {
        clearInterval(interval);
        this.currentImage = 0;
    }

    endbossAnimation(images, i) {
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    checkIsDead() {
        this.intervalDead = setInterval(() => {
            if (this.isDead() && !this.world.character.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.y += 15;
                clearInterval(this.intervalAttack);
                clearInterval(this.world.levelSoundInterval);
                this.levelEndAnimation();
                this.restartGame();
            }
        }, 50);
    }

    levelEndAnimation() {
        this.world.character.winnerAnimation();
        this.world.levelEndMusic.volume = 0.3;
        this.world.levelEndMusic.play();
        this.world.level.enemies.forEach((enemy) => {
            enemy.deadAnimation();
        });
    }

    restartGame() {
        setTimeout(() => {
            clearInterval(this.intervalDead);
            window.location.reload();
        }, 7000);
    }

}