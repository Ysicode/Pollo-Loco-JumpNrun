class Level {
    enemies;
    clouds;
    backgrounds;
    levelEndX = 719 * 3;
    levelSound = new Audio('audio/music.mp3');

    constructor(enemies, clouds, backgrounds,) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
    }
}