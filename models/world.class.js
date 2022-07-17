class World {
    character = new Character();
    level = level1;
    endboss = level1.endboss;
    enemies = level1.enemies;
    levelMusic = level1.levelSounds[0];
    endbossMusic = level1.levelSounds[1];
    levelEndMusic = level1.levelSounds[2];
    endbossSound = level1.levelSounds[3];
    selectSound = level1.levelSounds[4];
    canvas;
    levelSoundInterval;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar();
    bottleCounter = new Bottlecounter();
    throwableObjects = [];
    coinCounter = new Coincounter();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
        this.playLevelSound();
    }

    /**
     * This function is used to play sounds on different volumes
     * 
     * @param {object} sound - This parameter is the sound to play
     * @param {number} volume - This paramter is the volume of the sound
     */
    playSound(sound, volume) {
        sound.play();
        sound.volume = volume;
    }

    /**
     * This function is used replay the levelsound
     */
    playLevelSound() {
        this.playSound(this.levelMusic, 0.2);
        this.levelSoundInterval = setInterval(() => {
            this.playSound(this.levelMusic, 0.2);
        }, 20000);
    }

    /**
     * This function is used to set the variable world to endboss and character
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * This function is used to check different functions with 2 intervals
     */
    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisionsWithEnemies();
        }, 200);
        setInterval(() => {
            this.checkCollectOrJumpOnObjects();
            this.checkEndbossFightStarts();
        }, 1000 / 60);
    }

    /**
     * This function is used to check if the endboss area is hidden by the character
     */
    checkEndbossFightStarts() {
        if (this.character.startFightingEndboss()) {
            this.level.levelStartX = 6200;
            this.showEndbossEnergy();
            this.levelMusic.pause();
            clearInterval(this.levelSoundInterval);
            this.playSound(this.endbossMusic, 0.1);
            if (this.endboss.isDead()) {
                this.endbossMusic.pause();
            }
        }
    }

    /**
     * This function is used to check if a bottle to throw is available
     */
    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.bottleCounter.bottleAvailable()) {
                this.checkThrowDirection();
                this.bottleCounter.bottleCounter--;
            }
        }
    }

    /**
     * This function is used to check the throw direction of the bottle
     * The Throw direction is same as the moving direction of the character
     */
    checkThrowDirection() {
        if (this.character.otherDirection) {
            this.throwDirection('throwLeft');
        } else {
            this.throwDirection('throwRight');
        }
    }

    /**
     * This function is used to create a new object and pushes it to an array
     * 
     * @param {string} direction - This paramter is the throw direction of the element
     */
    throwDirection(direction) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, direction);
        this.throwableObjects.push(bottle);
    }

    /**
     * This function is used to check collisions of objects with enemies or enboss
     */
    checkCollisionsWithEnemies() {
        this.characterWithEnemy();
        this.characterWithEndboss();
        this.throwableObjectWithEndboss();
    }

    /**
     * This function is used to check collisons of character with enemy
     */
    characterWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.alive && !this.character.jumpsOnTop(enemy)) {
                this.character.reduceEnergy(this.character, 10);
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * This function is used to check collisons of character with endboss
     */
    characterWithEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.reduceEnergy(this.character);
            this.statusbar.setPercentage(this.character.energy);
        }
    }

    /**
     * This function is used to check collisons of throwable objects with endboss
     */
    throwableObjectWithEndboss() {
        this.throwableObjects.forEach((object) => {
            if (this.endboss.isColliding(object)) {
                this.endboss.reduceEnergy(this.endboss, 5);
                this.playSound(this.endbossSound, 0.5);
            }
        });
    }

    /**
     * This function is used to check if an object jumps on top of another
     */
    checkCollectOrJumpOnObjects() {
        this.characterWithCoin();
        this.characterJumpsOnTopChicken();
        this.characterWithBottles();
    }

    /**
     * This function is used to check if the character jumps on top of a chicken
     */
    characterJumpsOnTopChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.jumpsOnTop(enemy) && this.character.speedY < 0) {
                enemy.alive = false;
                let i = this.level.enemies.indexOf(enemy);
                this.level.enemies[i].removeChicken();
                this.character.jumpingOnChicken();
            }
        })
    }

    /**
     * This function is used to check if the character is colliding with a coin
     */
    characterWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let i = this.level.coins.indexOf(coin);
                this.level.coins.splice(i, 1);
                this.selectSound.play();
                this.coinCounter.coinCounter++;
            }
        });
    }

    /**
     * This function is used to check if the character is colliding with a bottle
     */
    characterWithBottles() {
        this.level.bottles.forEach((bottles) => {
            if (this.character.isColliding(bottles)) {
                let i = this.level.bottles.indexOf(bottles);
                this.level.bottles.splice(i, 1);
                this.playSound(this.selectSound, 1);
                this.bottleCounter.bottleCounter++;
            }
        });
    }

    /**
     * This function is used to draw the level with all objects
     */
    draw() {
        this.clearCanvas();
        this.drawLevel();
        this.drawFixedObjects();
        this.drawCharacter();
        this.drawAnimation();
    }

    /**
     * This function is used to call the draw function always
     */
    drawAnimation() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function is used to delete all objects from the canvas
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * This function is used to draw all objects of the level
     */
    drawLevel() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.endboss);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * This function is used to draw all fixed objects of the game
     */
    drawFixedObjects() {
        this.addToMap(this.statusbar);
        this.drawNumber();
        this.showEndbossEnergy();
        this.addToMap(this.bottleCounter);
        this.addToMap(this.coinCounter);
    }

    /**
     * This function is used to draw the character and adding the camera window
     */
    drawCharacter() {
        this.ctx.translate(this.camera_x, 0); //Forwards
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * This function calls the addToMap function for all objects of the array
     * 
     * @param {object} objects - This paramter is a object
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * This function is used to draw the object to the game 
     * 
     * @param {object} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * This function is used to flip the image when its walking in another direction
     * 
     * @param {object} mo - This paramter is an object
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function is used to flip the image back when it was flipped before
     * 
     * @param {object} mo - This paramter is an object
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * This function is used to draw numbers to the game 
     * Number for bottles and coins
     */
    drawNumber() {
        this.ctx.font = '30px sans-serif';
        this.ctx.fillStyle = "black";
        this.ctx.fillText(this.bottleCounter.bottleCounter, 55, 110);
        this.ctx.fillText(this.coinCounter.coinCounter, 660, 50);
    }

    /**
     * This function is used to show the energy of the endboss with a number 
     * when area endboss is hidden
     */
    showEndbossEnergy() {
        if (this.character.startFightingEndboss()) {
            this.ctx.font = '600 55px sans-serif';
            this.ctx.fillStyle = "#e1c51c";
            this.ctx.fillText(this.endboss.energy + '%', 450, 60);
        }
    }

}