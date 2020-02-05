// --- Start of Projectile

function Projectile(game, x, y, scale, fireRate, physics, img) {
    this.scale = scale;
    this.fireRate = fireRate;
    this.physics = physics;
    this.img = img;
    Entity.call(this, game, x, y);
}

Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function () {
    if (!this.physics.isDone()) {
        this.physics.tick();
        var pos = this.physics.getPosition();
        this.x = pos.x;
        this.y = pos.y;
    } else {
        this.removeFromWorld = true;
    }
    Entity.prototype.update.call(this);
}

// Reference: https://www.w3schools.com/graphics/game_rotation.asp 
Projectile.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.physics.currentAngle);
    this.img.drawFrame(this.game.clockTick, ctx, -1 * this.img.spriteSheet.width * this.scale / 2, -1 * this.img.spriteSheet.height * this.scale / 2, this.scale);
    ctx.restore();
    Entity.prototype.draw.call(this);
}

// --- End of Projectile

// --- Start of Bullet

function Bullet (game, x, y) {
    var scale = 0.25;
    var fireRate = 20;
    var velocity = 10;
    var gravity = 0.1;
    var accel = 0;
    var timeAlive = 600;
    var physics = new Physics(x, y, timeAlive, game.mouseX, game.mouseY, gravity, velocity, accel);
    var img = new Animation(ASSET_MANAGER.getAsset("./img/bullet.png"), 0, 0, 51, 60, .20, 1, true, true);
    Projectile.call(this, game, x, y, scale, fireRate, physics, img);
}

Bullet.prototype = new Projectile();
Bullet.prototype.constructor = Bullet;

// --- End of Bullet

// --- Start of Fire

function Fire (game, x, y) {
    var scale = 1;
    var fireRate = 1;
    var velocity = 3;
    var gravity = Math.random() * 0.075 - 0.03;;
    var accel = 0;
    var timeAlive = 60;
    var physics = new Physics(x, y, timeAlive, game.mouseX, game.mouseY, gravity, velocity, accel);
    var img = new Animation(ASSET_MANAGER.getAsset("./img/fire.png"), 0, 0, 25, 12, Math.random()*.03+0.1, 10, false, false);
    Projectile.call(this, game, x, y, scale, fireRate, physics, img);
}

Fire.prototype = new Projectile();
Fire.prototype.constructor = Fire;

Fire.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.physics.currentAngle);
    this.img.drawFrame(this.game.clockTick, ctx, -1 * this.img.spriteSheet.width / 2 + 25, -1 * this.img.spriteSheet.height / 2 + 50, this.scale);
    ctx.restore();
    Entity.prototype.draw.call(this);
}

// --- End of Fire