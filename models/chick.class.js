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

    /**
     * This function is used to animate the chicks walking
     */
    animate() {
        this.walking(); 
     }
 
     /**
      * This function is used to animate the chicks walking with 2 intervals
      */
     walking() {
         this.intervalMovingLeft = setInterval(() => {
             this.moveLeft();
         }, 1000 / 60);
         this.intervalWalking = setInterval(() => {
             this.playAnimation(this.IMAGES_WALKING);      
         }, 400);
     }
 
     /**
      * This function is used to anmimate if a chick is dead
      */
     deadAnimation() {
         this.playAnimation(this.IMAGES_DEAD);
         this.y += 25;
     }
 
     /**
      * This function is used to remove the chicks after the character jumps on it
      */
     removeChicken() {
         this.y = 270;
         setInterval(() => {
            this.deadAnimation();
         }, 50);
         clearInterval(this.walking);
         clearInterval(this.movingLeft);
     }
}