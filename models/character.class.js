class Character extends MovableObject {
    y = 80;
    height = 250;
    width = 120;
    energy = 100;
    offset = {
        top: 100,
        bottom: 15,
        left: 20,
        right: 20
    }
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-55.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_WINNER = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png'
    ];


    world;
    speed = 10;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    dead_sound = new Audio('audio/dead.mp3');
    jumpingOnChicken_sound = new Audio('audio/wohoo.mp3')

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WINNER);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.characterMove();
        }, 1000 / 60);
        let characterAnimations = setInterval(() => {
            this.characterDead(characterAnimations);
            this.characterHurt();
            this.characterWalking();
            this.characterJump();
        }, 50);
    }

    characterMove() {
        this.walking_sound.pause();
        this.walkRight();
        this.walkLeft();
        this.jumping();
        this.world.camera_x = -this.x + 100;
    }

    walkRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
            this.moveRight();
            this.otherDirection = false;
            this.world.playSound(this.walking_sound, 1)
        }
    }

    walkLeft() {
        if (this.world.keyboard.LEFT && this.x > this.world.level.levelStartX) {
            this.moveLeft();
            this.otherDirection = true;
            this.world.playSound(this.walking_sound, 1)
        }
    }

    jumping() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump(35);
            this.world.playSound(this.jumping_sound, 1)
        }
    }

    jumpingOnChicken() {
        this.y = 80;
        this.speedY = 10;
        this.world.playSound(this.jumpingOnChicken_sound, 0.5)
        this.isPlaying = false;
    }

    characterDead(interval) {
        if (this.isDead()) {
            this.y = 0;
            this.world.levelMusic.pause();
            clearInterval(interval);
            this.deadAnimation();
            showElement('end_screen');
        }
    }

    deadAnimation() {
        setInterval(() => {
            this.y += 10;
            this.world.playSound(this.dead_sound, 1)
           setTimeout(() => {
            window.location.reload();
           }, 3000);    
            this.playAnimation(this.IMAGES_DEAD);
        }, 50)
    }

    winnerAnimation() {
        this.playAnimation(this.IMAGES_WINNER);
        if (this.y > -70) {
            this.y -= 1.5;
        }
        if (this.y < 0) {
            this.y += 1.5;
        }
    }

    characterHurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.world.playSound(this.hurt_sound, 0.2)
        }
    }

    characterWalking() {
        if (this.walking()) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    characterJump() {
        if (this.world.keyboard.SPACE) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    walking() {
        return this.world.keyboard.RIGHT && this.y > 185 ||
            this.world.keyboard.LEFT && this.y > 185
    }

}
