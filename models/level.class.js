class Level {
    enemies;
    clouds;
    backgrounds;
    bottles;
    coins;
    levelSound;
    levelEndX = 719 * 10;
    endboss;

    constructor(levelSound, enemies, endboss, clouds, backgrounds, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.bottles = bottles;
        this.levelSound = levelSound;
        this.coins = coins;
        this.endboss = endboss;
    }

    playLevelSound() {
        this.levelSound.play();
       setInterval(() => {
       this.levelSound.play();
       }, 25000);
    }

    Sound() {
        this.level.levelSound.play();
        this.level.levelSound.volume = 0.02;
    }

    
}