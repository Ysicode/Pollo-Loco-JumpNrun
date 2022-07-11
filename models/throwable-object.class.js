class ThrowableObject extends MovableObject {
IMAGES_THROW = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
];

throw_sound = new Audio('audio/throw.mp3');

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.throw_sound.play();
        setInterval(() => {
            this.x += 10;
        }, 20);
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
        }, 50);
    }

}