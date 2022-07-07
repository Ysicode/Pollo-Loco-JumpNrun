class MovableObject {
    x = 100;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
            setInterval(() => {
                if(this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                }
            }, 1000 / 24);
    }

    isAboveGround() {
        return this.y < 190;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveright() {
        console.log('moving right')
    }

    moveleft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}