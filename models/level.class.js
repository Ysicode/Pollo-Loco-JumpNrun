class Level {
    enemies;
    clouds;
    backgrounds;
    bottles;
    coins;
    levelSounds;
    levelEndX = 720 * 10;
    levelStartX = 100
    endboss;

    constructor(levelSounds, enemies, endboss, clouds, backgrounds, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.bottles = bottles;
        this.levelSounds = levelSounds;
        this.coins = coins;
        this.endboss = endboss;
    }
    
}