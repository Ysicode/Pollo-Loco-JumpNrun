class Level {
    enemies;
    clouds;
    backgrounds;
    bottles;
    coins;
    levelEndX = 719 * 10;
    levelSound;

    constructor(levelSound, enemies, clouds, backgrounds, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.bottles = bottles;
        this.coins = coins;
        this.levelSound = levelSound;
        //this.playLevelSound();
    }

    playLevelSound() {
        this.levelSound.play();
        this.levelSound.volume = 0.02;
       setInterval(() => {
        this.levelSound.play();
        this.levelSound.volume = 0.02;
       }, 25000);
    }

    
}