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
        this.speed = 0.15 + Math.random() * 0.5;
        this.speedY = 10;
        this.applyGravity();
        this.animate();
    }

    /**
     * This function is used to start 3 intervals which animate the chickens 
     */
    animate() {
       this.walking();
       this.jumping();
    }

    /**
     * This function is used to let the chickens move left and animate with different images
     * 2 different intervals are used
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
     * This function is used to let the chickens jump with time interval
     */
    jumping() {
        setInterval(() => {
            this.jump(20);
        }, 2000 + Math.random() * 2000);
    }

    /**
     * This function is used to remove a chicken if the character jumped on it
     * The intervals to animate the chickens walking get cleared
     */
    removeChicken() {
        this.y = 270;
        setInterval(() => {
           this.deadAnimation();
        }, 50);
        clearInterval(this.intervalMovingLeft);
        clearInterval(this.intervalWalking);
    }

     /**
     * This function is used to animate a dead chicken
     * By adding y +25 with an interval the chicken will be moved downward out of the game
     */
      deadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.y += 25;
    }
}