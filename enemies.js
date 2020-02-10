function Cannon(game) {
    this.C1 = new Animation(ASSET_MANAGER.getAsset("./img/Cannon.png"), 0, 0, 130, 85, .20, 3, true, true);
    this.CR = new Animation(ASSET_MANAGER.getAsset("./img/CannonR.png"), 0, 0, 130, 85, .20, 3, true, true);
    this.jumping = false;
    this.attack = false;
    this.moveR = true;
    this.moveL = false;
    this.radius = 50;
    this.ground = 500;
    this.accel = 0;
    this.yAccel = 0;
    this.direction = true;
    this.gravity = 1;
    this.canJump = true;
    Entity.call(this, game, 200, 500);
}

Cannon.prototype = new Entity();
Cannon.prototype.constructor = Cannon;

// The update function
Cannon.prototype.update = function () {

    if (this.y > this.ground) {
        this.jumping = false;
        this.y = this.ground;
        this.canJump = true;
        this.yAccel = 0;
    }


    if (this.jumping === false) {
        if (this.accel < -1) {
            this.accel += .2;
        } else if (this.accel > 1) {
            this.accel -= .2;
        } else {
            this.accel = 0;
        }
    }

    this.x = this.x + this.accel;

    if (this.x < 150) {
        this.moveR = true;
        this.moveL = false;
    }
    if (this.x > 700) {
        this.moveL = true;
        this.moveR = false
    }


    if (this.moveR) {
        this.direction = true;
       
        if (this.accel > 0) {
            this.accel = 5;

        } else {
            this.accel = 3;
        }
    }

    if (this.moveL) {
        this.direction = false;
        if (this.accel < 0) {
            this.accel = -5;
        } else {
            this.accel = -3;
        }

    }

    Entity.prototype.update.call(this);
}

Cannon.prototype.draw = function (ctx, xView, yView) {

    var xDraw = this.x - xView;
    var yDraw = this.y - yView;

    if (this.accel != 0) {
        if (this.direction) {
            this.C1.drawFrame(this.game.clockTick, ctx, xDraw, yDraw, 2);
        } else {
            this.CR.drawFrame(this.game.clockTick, ctx, xDraw, yDraw, 2);
        }

    } else {

        if (this.direction) {
            this.C1.drawFrame(this.game.clockTick, ctx, xDraw, yDraw, 2);
        } else {
            this.CR.drawFrame(this.game.clockTick, ctx, xDraw, yDraw, 2);
        }

    }
    Entity.prototype.draw.call(this);
}