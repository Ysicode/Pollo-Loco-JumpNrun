class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.8;
    lastHit = 0;


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
        this.jumping_sound.volume = 0.2;
        this.jumping_sound.play();
    }

    isDead() {
        return this.energy < 0;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    jumpsOnTop(object) {
        return this.y + this.height > object.y &&
            this.y + this.height < object.y + object.height &&
            this.x + this.width > object.x &&
            this.x + this.width < (object.x + object.width + 70);
    };

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in millisecons
        timepassed = timepassed / 1000; //difference in seconds
        return timepassed < 0.7;
    }

    reduceEnergy(object) {
        object.energy -= 5;
        this.lastHit = new Date().getTime();
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