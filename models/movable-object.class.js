class MovableObject {
    x = 100;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;

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

    moveright() {
        console.log('moving right')
    }

    moveleft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}