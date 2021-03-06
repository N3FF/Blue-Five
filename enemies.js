function Cannon(game, x, y) {
    //Changes size and relative location of entities
    this.scale = 1.5;

    var frameWidth = 113;
    var frameHeight = 82
    this.width = frameWidth * this.scale;
    this.height = (frameHeight - 3) * this.scale;
    var animationSpeed = 0.05 * this.scale;

    this.walkingRight = new Animation(ASSET_MANAGER.getAsset("./img/enemies/Cannon2_R.png"), 0, 0, frameWidth, frameHeight, animationSpeed, 10, true, false);
    this.WalkingLeft = new Animation(ASSET_MANAGER.getAsset("./img/enemies/Cannon2_L.png"), 0, 0, frameWidth, frameHeight, animationSpeed, 10, true, true);
    this.jumping = false;
    this.walking = true;
    this.direction = DIRECTIONS.RIGHT;
    this.velocity = 5;
    this.yAccel = 0;
    this.gravity = 1;
    this.type = TYPES.CANNON;

    this.startX = x;
    this.startY = y;

    this.maxHP = 25;
    this.currentHP = 25;

    this.collisionManager = new CollisionManager(this.x, this.y, this.width, this.height);

    // Needs location parameters set
    Entity.call(this, game, x, y);
}

Cannon.prototype = new Entity();
Cannon.prototype.constructor = Cannon;

Cannon.prototype.handleCollision = function (entity) {
    switch (entity.type) {
        case TYPES.PROJECTILE:
            if (entity.friendly && !entity.exploding) {
                this.takeDamage(entity.damage);
            }
            break;
        default:
            if (this.collisionManager.topCollisionDetected(entity)) {
                this.y = entity.y + this.height;
                this.yAccel = 0;
            } else if (this.collisionManager.botCollisionDetected(entity)) {
                this.jumping = false;
                this.y = entity.y - this.height;
                this.jumpStart = true;
                if (this.yAccel > 0) {
                    this.yAccel = 0;
                }
            } else if (this.collisionManager.rightCollisionDetected(entity)) {
                this.x = entity.x - this.width;
            } else if (this.collisionManager.leftCollisionDetected(entity)) {
                this.x = entity.x + entity.width;
            }
    }

}

// The update function
Cannon.prototype.update = function () {

    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && collisionDetected(this, ent)) {
            this.handleCollision(ent);
        }
    }
    //    if (this.y > this.ground) {
    //        this.jumping = false;
    //        this.y = this.ground;
    //        this.canJump = true;
    //        this.yAccel = 0;
    //    }


    if (this.jumping === false) {
        if (this.accel < -1) {
            this.accel += .2;
        } else if (this.accel > 1) {
            this.accel -= .2;
        } else {
            this.accel = 0;
        }
    }

    if (this.walking) this.x = this.x + (this.direction == DIRECTIONS.RIGHT ? 1 : -1) * this.velocity;

    if (this.x < this.startX - 200) {
        this.direction = DIRECTIONS.RIGHT;
    }
    if (this.x > this.startX + 200) {
        this.direction = DIRECTIONS.LEFT;
    }

    this.y = this.y + this.yAccel;
    this.yAccel = this.yAccel + this.gravity;

    this.collisionManager.updateDimensions(this.x, this.y, this.width, this.height);
    this.shoot();
    Entity.prototype.update.call(this);
}

Cannon.prototype.draw = function (ctx, xView, yView) {

    var drawX = this.x - xView;
    var drawY = this.y - yView;

    if (this.walking) {

        (this.direction == DIRECTIONS.RIGHT ? this.walkingRight : this.WalkingLeft)
        .drawFrame(this.game.clockTick, ctx, drawX, drawY, this.scale);

    } 
    Entity.prototype.draw.call(this);
}

Cannon.prototype.shoot = function () {
    /*2x
    if (this.facingRight) {   //right
        var projectile = new Fire(this.game, this.x + this.width - 55, this.y + 60, this.x + this.width + 50, this.y + 70, false);
        this.game.addEntity(projectile);
    } else {
        var projectile = new Fire(this.game, this.x + 20, this.y + 60, this.x - 50, this.y + 70, false);
        this.game.addEntity(projectile);
    }
    */
    var xProjectileStart = 12 * this.scale;
    var yProjectileStart = 28 * this.scale;
    var yProjectileEnd = 35 * this.scale
    
    if (this.direction == DIRECTIONS.RIGHT) {   //right
        var projectile = new Fire(this.game, this.x + this.width - xProjectileStart, this.y + yProjectileStart, this.x + this.width + 50, this.y + yProjectileEnd, false);
        this.game.addEntity(projectile);
    } else {
        var projectile = new Fire(this.game, this.x + xProjectileStart, this.y + yProjectileStart, this.x - 50, this.y + yProjectileEnd, false);
        this.game.addEntity(projectile);
    }
}

Cannon.prototype.takeDamage = function (damage) {
    this.currentHP -= damage;
    if (this.currentHP <= 0) this.removeFromWorld = true;
}