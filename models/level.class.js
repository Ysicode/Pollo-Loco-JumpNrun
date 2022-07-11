class Level {
    enemies;
    clouds;
    backgrounds;
    bottles;
    coins;
    levelEndX = 719 * 10;
    levelSound;
    endboss;

    constructor(levelSound, enemies, endboss, clouds, backgrounds, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.bottles = bottles;
        this.coins = coins;
        this.levelSound = levelSound;
        this.endboss = endboss;
        //this.playLevelSound();
    }

    playLevelSound() {
        this.levelSound();
       setInterval(() => {
       this.levelSound();
       }, 25000);
    }

    levelSound() {
        this.levelSound.play();
        this.levelSound.volume = 0.02;
    }

    
}