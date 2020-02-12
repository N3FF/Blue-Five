/**
 * @description Super class for projectiles
 * @param {GameEngine} game     the game engine
 * @param {number} x            starting X value 
 * @param {number} y            starting Y value 
 * @param {number} scale        scale projectile should be drawn in
 * @param {number} fireRate     fire rate measured in number of update calls per shot
 * @param {Physics} physics     Physics object with projectile's physics properties
 * @param {Animation} img       Animation object for when projectile is in flight
 */
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
Projectile.prototype.draw = function (ctx, xView, yView) {
    ctx.save();
    ctx.translate(this.x - xView, this.y - yView);
    ctx.rotate(this.physics.currentAngle);
    this.img.drawFrame(this.game.clockTick, ctx, -1 * this.img.spriteSheet.width * this.scale / 2, -1 * this.img.spriteSheet.height * this.scale / 2, this.scale);
    ctx.restore();
    Entity.prototype.draw.call(this);
}

/**
 * @description Bullet class - extends Projectile
 * @param {GameEngine} game     the game engine
 * @param {number} x            starting X coordinate 
 * @param {number} y            starting Y coordinate 
 */
function Bullet (game, x, y) {
    var scale = 0.25;
    var fireRate = 20;
    var velocity = 10;
    var gravity = 0.1;
    var accel = 0;
    var timeAlive = 600;
    var physics = new Physics(x, y, timeAlive, game.mouseX, game.mouseY, gravity, velocity, accel);
    var img = new Animation(ASSET_MANAGER.getAsset("./img/projectiles/bullet.png"), 0, 0, 51, 60, .20, 1, true, true);
    Projectile.call(this, game, x, y, scale, fireRate, physics, img);
}

Bullet.prototype = new Projectile();
Bullet.prototype.constructor = Bullet;

/**
 * @description Fire class - extends Projectile
 * @param {GameEngine} game     the game engine
 * @param {number} x            starting X coordinate
 * @param {number} y            starting Y coordinate
 */
function Fire (game, x, y) {
    var scale = 1;
    var fireRate = 1;
    var velocity = 3;
    var gravity = Math.random() * 0.075 - 0.03;;
    var accel = 0;
    var timeAlive = 60;
    var physics = new Physics(x, y, timeAlive, game.mouseX, game.mouseY, gravity, velocity, accel);
    var img = new Animation(ASSET_MANAGER.getAsset("./img/projectiles/fire.png"), 0, 0, 25, 12, Math.random()*.03+0.1, 10, false, false);
    Projectile.call(this, game, x, y, scale, fireRate, physics, img);
}

Fire.prototype = new Projectile();
Fire.prototype.constructor = Fire;

Fire.prototype.draw = function (ctx, xView, yView) {
    ctx.save();
    ctx.translate(this.x - xView, this.y - yView);
    ctx.rotate(this.physics.currentAngle);
    this.img.drawFrame(this.game.clockTick, ctx, -1 * this.img.spriteSheet.width / 2 + 25, -1 * this.img.spriteSheet.height / 2 + 50, this.scale);
    ctx.restore();
    Entity.prototype.draw.call(this);
}