class Level {
    enemies;
    clouds;
    backgrounds;
    bottles;
    coins;
    levelEndX = 719 * 10;
    levelSound = new Audio('audio/music.mp3');

    constructor(enemies, clouds, backgrounds, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.bottles = bottles;
        this.coins = coins;
    }
}