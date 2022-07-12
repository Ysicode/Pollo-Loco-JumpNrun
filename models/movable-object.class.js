class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.8;
    lastHit = 0;
    lastJumpOnChicken = 0

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { //wenn die Funcktion von throwable object ausgefüghrt wird => true und somit wird y die ganze zeit verringert
            return true;
        } else {
            return this.y < 190;
        }
    }

    jump() {
        this.speedY += 35;
    }

    isDead() {
        return this.energy == 0;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    jumpsOnTop(object) {
        return this.y + this.height - this.offset.bottom > object.y - 20 &&
            this.y + this.height < object.y + 20 &&
            this.x + this.width > object.x - 40 &&
            this.x + this.width < (object.x + object.width + 40);
    };

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in millisecons
        timepassed = timepassed / 1000; //difference in seconds
        return timepassed < 0.7;
    }

    reduceEnergy(object, damage) {
        if (!object.energy == 0) {
            object.energy -= damage;
            this.lastHit = new Date().getTime();
        } 
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

}