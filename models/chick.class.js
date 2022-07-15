class Chick extends MovableObject {
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    y = 400;
    width = 50;
    height = 50;
    world;
    img;
    alive = true;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 3 + Math.random() * 2;
        this.animate();
    }

    animate() {
        this.walking(); 
     }
 
     walking() {
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
 
     removeChicken() {
         this.y = 270;
         setInterval(() => {
            this.deadAnimation();
         }, 50);
         clearInterval(this.walking);
         clearInterval(this.movingLeft);
     }
}