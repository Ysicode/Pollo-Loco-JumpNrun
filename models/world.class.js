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

    playSound(sound, volume) {
        sound.play();
        sound.volume = volume;
    }

    playLevelSound() {
        this.playSound(this.levelMusic, 0.2);
        this.levelSoundInterval = setInterval(() => {
            this.playSound(this.levelMusic, 0.2);
        }, 20000);
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

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

    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.bottleCounter.bottleAvailable()) {
                this.checkThrowDirection();
                this.bottleCounter.bottleCounter--;
            }
        }
    }

    checkThrowDirection() {
        if (this.character.otherDirection) {
            this.throwDirection('throwLeft');
        } else {
            this.throwDirection('throwRight');
        }
    }

    throwDirection(direction) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, direction);
        this.throwableObjects.push(bottle);
    }

    checkCollisionsWithEnemies() {
        this.characterWithEnemy();
        this.characterWithEndboss();
        this.throwableObjectWithEndboss();
    }

    characterWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.alive && !this.character.jumpsOnTop(enemy)) {
                this.character.reduceEnergy(this.character, 10);
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    characterWithEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.reduceEnergy(this.character);
            this.statusbar.setPercentage(this.character.energy);
        }
    }

    throwableObjectWithEndboss() {
        this.throwableObjects.forEach((object) => {
            if (this.endboss.isColliding(object)) {
                this.endboss.reduceEnergy(this.endboss, 5);
                this.playSound(this.endbossSound, 0.5);
            }
        });
    }

    checkCollectOrJumpOnObjects() {
        this.characterWithCoin();
        this.characterJumpsOnTopChicken();
        this.characterWithBottles();
    }

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

    draw() {
        this.clearCanvas();
        this.drawLevel();
        this.drawFixedObjects();
        this.drawCharacter();
        this.drawAnimation();
    }

    drawAnimation() {
        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //löscht alle Elemente
    }

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

    drawFixedObjects() {
        this.addToMap(this.statusbar);
        this.drawNumber();
        this.showEndbossEnergy();
        this.addToMap(this.bottleCounter);
        this.addToMap(this.coinCounter);
    }

    drawCharacter() {
        this.ctx.translate(this.camera_x, 0); //Forwards
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    drawNumber() {
        this.ctx.font = '30px sans-serif';
        this.ctx.fillStyle = "black";
        this.ctx.fillText(this.bottleCounter.bottleCounter, 55, 110);
        this.ctx.fillText(this.coinCounter.coinCounter, 660, 50);
    }

    showEndbossEnergy() {
        if (this.character.startFightingEndboss()) {
            this.ctx.font = '600 55px sans-serif';
            this.ctx.fillStyle = "#e1c51c";
            this.ctx.fillText(this.endboss.energy + '%', 450, 60);
        }
    }

}