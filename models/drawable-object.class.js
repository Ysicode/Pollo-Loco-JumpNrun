class DrawableObject {
    x = 100;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        } catch(e) {
            console.warn('Error loading image', e);
            console.log('Could not load image',  this.img.src);
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}