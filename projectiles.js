/**
 * @description Super class for projectiles
 * @param {GameEngine} game     the game engine
 * @param {number} x            starting X value 
 * @param {number} y            starting Y value 
 * @param {number} scale        scale projectile should be drawn in
 * @param {number} fireRate     fire rate measured in number of update calls per shot
 * @param {number} damage       amount of damage each shot does
 * @param {boolean} friendly    true if hero fired it, false if enemy fired it
 * @param {Physics} physics     Physics object with projectile's physics properties
 * @param {Animation} img       Animation object for when projectile is in flight
 */
function Projectile(game, x, y, scale, fireRate, damage, friendly, physics, img) {
    this.scale = scale;
    this.fireRate = fireRate;
    this.damage = damage;
    this.friendly = friendly;
    this.physics = physics;
    this.img = img;
    this.type = TYPES.PROJECTILE;
    Entity.call(this, game, x, y);
}

Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;

Projectile.prototype.handleCollision = function (entity) {
    switch (entity.type) {
        case TYPES.HERO:
            if (!this.friendly) this.removeFromWorld = true;
            break;
        case TYPES.CANNON:
            if (this.friendly) this.removeFromWorld = true;
            break;
        case TYPES.PROJECTILE:
            break;
        default:
            this.removeFromWorld = true;
    }
}

Projectile.prototype.update = function () {

    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && collisionDetected(this, ent)) {
            this.handleCollision(ent);
        }
    }

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
    ctx.translate(this.x + this.width / 2 - xView, this.y + this.height / 2 - yView);
    ctx.rotate(this.physics.currentAngle);
    this.img.drawFrame(this.game.clockTick, ctx, 0, -this.img.spriteSheet.height * this.scale / 2, this.scale);
    ctx.restore();
    Entity.prototype.draw.call(this);
}

/**
 * @description Bullet class - extends Projectile
 * @param {GameEngine} game     the game engine
 * @param {number} x            starting X coordinate 
 * @param {number} y            starting Y coordinate 
 */
function Bullet (game, x, y, destX, destY, initialVelocity, friendly) {
    var scale = 0.5;
    var fireRate = 20;
    var damage = 5;
    var velocity = 15;
    var gravity = 0;
    var accel = 0;
    var timeAlive = 600;
    var physics = new Physics(x, y, timeAlive, destX, destY, gravity, initialVelocity, velocity, accel);
    var img = new Animation(ASSET_MANAGER.getAsset("./img/projectiles/bullet.png"), 0, 0, 51, 60, .20, 1, true, true);
    this.width = 25 * scale;
    this.height = 25 * scale;
    this.manaCost = 5;
    Projectile.call(this, game, x, y, scale, fireRate, damage, friendly, physics, img);
}

Bullet.prototype = new Projectile();
Bullet.prototype.constructor = Bullet;

/**
 * @description Fire class - extends Projectile
 * @param {GameEngine} game     the game engine
 * @param {number} x            starting X coordinate
 * @param {number} y            starting Y coordinate
 */
function Fire (game, x, y, destX, destY, initialVelocity, friendly) {
    var scale = 2;
    var fireRate = 1;
    var damage = 0.25;
    var velocity = 10;
    var gravity = Math.random() * 0.075 - 0.03;
    var accel = 0;
    var timeAlive = 40;
    var physics = new Physics(x, y, timeAlive, destX, destY, gravity, initialVelocity, velocity, accel);
    var img = new Animation(ASSET_MANAGER.getAsset("./img/projectiles/fire.png"), 0, 0, 25, 12, Math.random()*.03+0.1, 10, false, false);
    this.width = 9 * scale;
    this.height = 9 * scale;
    this.manaCost = 0;
    Projectile.call(this, game, x, y, scale, fireRate, damage, friendly, physics, img);
}

Fire.prototype = new Projectile();
Fire.prototype.constructor = Fire;

Fire.prototype.draw = function (ctx, xView, yView) {
    ctx.save();
    ctx.translate(this.x + this.width / 2 - xView, this.y + this.height / 2 - yView);
    ctx.rotate(this.physics.currentAngle);
    this.img.drawFrame(this.game.clockTick, ctx, 0, -1 * this.img.spriteSheet.height * this.scale / 20, this.scale);
    ctx.restore();
    Entity.prototype.draw.call(this);
}
