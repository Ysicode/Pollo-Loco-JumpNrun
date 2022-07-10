class Statusbar extends DrawableObject {
    HEALTH_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.HEALTH_IMAGES);
        this.x = 20;
        this.width = 200;
        this.height = 60;
        this.y = 0;
        this.setPercentage(100);
    }
    //setPercentage(50)
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.HEALTH_IMAGES[this.getImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    getImageIndex() {
        if (this.percentage == 100) {
            return 0;
        } else if (this.percentage > 80) {
            return 1;
        } else if (this.percentage > 60) {
            return 2;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 4;
        } else {
            return 5;
        };
    }

}