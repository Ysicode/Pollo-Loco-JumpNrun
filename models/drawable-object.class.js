class DrawableObject {
    x = 200;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;

    /**
     * This function is used to create a new Image object 
     * 
     * @param {string} path - This paramter is the path of an image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function is used to draw images to the canvas 
     * 
     * @param {object} ctx - This paramter is the canvas in 2d context 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        } catch(e) {
            console.warn('Error loading image', e);
            console.log('Could not load image',  this.img.src);
        }
    }

    /**
     * This function is used to load all images of an array in another array
     * 
     * @param {array} arr - This paramter is an array of images
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}