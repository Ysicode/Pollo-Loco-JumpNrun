class ThrowableObject extends MovableObject {
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    throwDirection;

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    throw_sound = new Audio('audio/throw.mp3');

    constructor(x, y, throwDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.throwDirection = throwDirection;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.throw_sound.play();
        setInterval(() => {
            this.checkThrowRight();
            this.checkThrowLeft();
        }, 20);
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
        }, 50);
    }

    checkThrowRight() {
        if (this.throwDirection == 'throwRight') {
            this.x += 10;
        }
    }

    checkThrowLeft() {
        if (this.throwDirection == 'throwLeft') {
            this.x -= 10;
        }
    }

}