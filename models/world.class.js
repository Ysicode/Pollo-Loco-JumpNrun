class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar();
    bottleCounter = new Bottlecounter();
    throwableObjects = [];
    bottles = new Bottles();
    coin = new Coin();
    select_sound = new Audio('audio/select.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
        this.level.levelSound.play();
        this.level.levelSound.volume = 0.00; //Muss 0.02 sein
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
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.reduceEnergy();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let i = this.level.coins.indexOf(coin);
                this.level.coins.splice(i, 1);
                this.select_sound.play();
            }
        });
        this.level.bottles.forEach((bottles) => {
            if (this.character.isColliding(bottles)) {
                let i = this.level.bottles.indexOf(bottles);
                this.level.bottles.splice(i, 1);
                this.select_sound.play();
            }
        });
        this.throwableObjects.forEach((object) => {
            if (this.enemies.isColliding(object)) {
                console.log('hitted');
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