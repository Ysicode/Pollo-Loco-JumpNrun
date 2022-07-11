class World {
    character = new Character();
    level = level1;
    endboss = level1.endboss;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar();
    bottleCounter = new Bottlecounter();
    throwableObjects = [];
    
  
    select_sound = new Audio('audio/select.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
        console.log(this.endboss.x);
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200)
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.characterWithEnemy();
        this.characterWithEndboss();
        this.characterWithCoin();
        this.characterWithBottles();
        this.characterJumpsOnEnemy();
        this.throwableObjects.forEach((object) => {
            if (this.endboss.isColliding(object)) {
                this.endboss.reduceEnergy(this.endboss);
            }
        }); 
    }

    characterWithEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.reduceEnergy(this.character);
            this.statusbar.setPercentage(this.character.energy);
        }
    }

    characterWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.jumpsOnTop(enemy)) {
                this.character.reduceEnergy(this.character);
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    characterJumpsOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.jumpsOnTop(enemy) && this.character.speedY < 0) {
                console.log( this.character.speedY);
                let i = this.level.enemies.indexOf(enemy);
                this.level.enemies[i].removeChicken();
            }
        });
    }

    characterWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let i = this.level.coins.indexOf(coin);
                this.level.coins.splice(i, 1);
                this.select_sound.play();
            }
        });
    }

    characterWithBottles() {
        this.level.bottles.forEach((bottles) => {
            if (this.character.isColliding(bottles)) {
                let i = this.level.bottles.indexOf(bottles);
                this.level.bottles.splice(i, 1);
                this.select_sound.play();
            }
        });
    }

   

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //löscht alle Elemente


        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.endboss);

        this.ctx.translate(-this.camera_x, 0); //Backwards
        //Space for fixed objects
        
        this.addToMap(this.statusbar);
        this.addToMap(this.bottleCounter);
        this.ctx.translate(this.camera_x, 0); //Forwards

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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
        mo.drawFrame(this.ctx);



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
}