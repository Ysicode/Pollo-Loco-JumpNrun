class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.8;
    lastHit = 0;
    lastJumpOnChicken = 0


    /**
     * This function is used to check if an object is above ground and moving up
     * The position on the y axis will be reduced by an interval with an acceleration 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    /**
     * This function is used to check if an object is above ground and returns a value
     * 
     * @returns - a value depending for the instance of an object
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } if (this instanceof Chicken) {
            return this.y < 385;
        } else {
            return this.y < 190;
        }
    }

    /**
     * This function is used to let objects jump by adding speed y
     * 
     * @param {number} speed - This parameter is the speed y of an object
     */
    jump(speed) {
        this.speedY += speed;
    }

    /**
     * This function is used to return if the energy is 0
     * 
     * @returns - if the energy of an object is 0
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * This function is used to check if a object is colliding with another
     * 
     * @param {object} mo - This paramter is an object
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * This function is sued to check if an object jumps on top another object
     * 
     * @param {object} object - This paramter is an object
     * @returns 
     */
    jumpsOnTop(object) {
        return this.y + this.height - this.offset.bottom > object.y - 20 &&
            this.y + this.height < object.y + 20 &&
            this.x + this.width > object.x - 40 &&
            this.x + this.width < (object.x + object.width + 70);
    };

    /**
     * This function is used to check if the passed time is samller than a given value
     * Its used do an animation only for a special time
     * 
     * @returns - if the passed time is smaller than 0.7
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in millisecons
        timepassed = timepassed / 1000; //difference in seconds
        return timepassed < 0.7;
    }

    /**
     * This function is used to reduce the energy of an object 
     * 
     * @param {object} object - This paramter is an object
     * @param {number} damage - This paramter is a number
     */
    reduceEnergy(object, damage) {
        if (!object.energy == 0) {
            object.energy -= damage;
            this.lastHit = new Date().getTime();
        } 
    }

    /**
     * This function is used to move images of an array to another
     * 
     * @param {array} images - This paramter is an array of images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * This function is sued to move object right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * This function is sued to move object right
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * This function is used to check if the character hits the endboss area
     * 
     * @returns - if x axis is bigger than a given value
     */
    startFightingEndboss() {
        return this.x > 6000
    }

}