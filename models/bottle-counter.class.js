class Bottlecounter extends DrawableObject {

    bottleCounter = 10;

    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = 10;
        this.y = 70;
        this.width = 50;
        this.height = 50;
    }

    /**
     * 
     * @returns - If there is still a bottle available to throw for the character
     */
    bottleAvailable() {
        return this.bottleCounter > 0
    }
}