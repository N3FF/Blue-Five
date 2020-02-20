/**
 * @param {number} game       The game 
 * @description The Hero class - the main character controlled by the player
 */
function Hero(game, x, y) {
	
	// Animations
    this.idleR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Idle_R.png"), 0, 0, 191, 351, 0.06, 10, true, false);
    this.idleL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Idle_L.png"), 0, 0, 191, 351, 0.06, 10, true, false);
    this.RunningR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Walk_R.png"), 0, 0, 295, 343, 0.05, 10, true, false);
    this.RunningL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Walk_L.png"), 0, 0, 295, 343, 0.05, 10, true, false);
    this.jumpAnimationR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Jump_R.png"), 0, 0, 402, 365, 0.06, 10, true, false);
    this.jumpAnimationL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Jump_L.png"), 0, 0, 402, 365, 0.06, 10, true, false);
    this.shootAnimationR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Shoot2_R.png"), 0, 0, 223, 344, 0.03, 5, true, false);
    this.shootAnimationL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Shoot2_L.png"), 0, 0, 223, 344, 0.03, 5, true, false);
    this.SwordR = new Animation(ASSET_MANAGER.getAsset("./img/hero/HeroSword.png"), 0, 0, 60, 60, .15, 9, true, false);
    this.SwordL = new Animation(ASSET_MANAGER.getAsset("./img/hero/HeroSwordR.png"), 0, 0, 60, 60, .15, 9, true, true);


    // Hero variables
    this.jumping = false; // if the hero is jumping
    this.attack = false; // if the hero is attacking
    this.moveR = false; // if the hero is moving right
    this.moveL = false; // if the hero is moving left
    
    this.accel = 0; // acceleration to make the hero look like they are running
    // it does not really do anything else
    
    this.yAccel = 0; // the heros vertical acceleration for gravity
    this.movingRight = true;
    this.gravity = 1; // The effect of gravity
    this.jumpStart = true; // whether the hero gets y accel at the beginning of a jump
    this.ticksSinceShot = 0;
    this.heroScale = .25;

    this.maxHP = 100; // hitpoints
    this.currentHP = 100;
    this.maxMP = 100; // magic
    this.currentMP = 100;
    this.type = TYPES.HERO;

     //  Collison code work
     //   NOTE: Standard sprites are 55x60 this will need to be updated on different
     //   sprites
    
    
    this.width = 191 * this.heroScale;
    this.height = 351 * this.heroScale;
    this.radius = 50;
    this.collideCounter = 0;

    Entity.call(this, game, x, y);
}

Hero.prototype = new Entity();
Hero.prototype.constructor = Hero;

Hero.prototype.handleCollision = function (entity) {
    switch (entity.type) {
        case TYPES.PROJECTILE:
            if (!entity.friendly) {
                this.takeDamage(entity.damage);
            }
            break;
        default:
            if (this.y + this.height >= entity.y
                && this.y + this.height < entity.y + entity.height / 2) {
                this.y = entity.y - this.height;
                this.jumping = false;
                this.jumpStart = true;
                if (this.yAccel > 0) this.yAccel = 0;
            } else if (entity.y + entity.height >= this.y
                        && entity.y + entity.height < this.y + this.height / 2) {
                this.y = entity.y + entity.height;
                this.yAccel = 1;
            } else {
                if (this.x + this.width >= entity.x
                    && this.x + this.width < entity.x + entity.width / 2) {
                    this.x = entity.x - this.width;
                } else if (entity.x + entity.width >= this.x
                            && entity.x + entity.width < this.x + this.width / 2) {
                    this.x = entity.x + entity.width;
                }
            } 
    }
}

Hero.prototype.updateDimensions = function () {
    if (this.jumping) {
        this.width = 402 * this.heroScale;
        this.height = 365 * this.heroScale;
    } else if (this.accel != 0) {
        this.width = 295 * this.heroScale;
        this.height = 343 * this.heroScale;
    } else {
        this.width = 191 * this.heroScale;
        this.height = 351 * this.heroScale;
    }
}

// The update function
Hero.prototype.update = function () {

    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && collisionDetected(this, ent)) {
            this.handleCollision(ent);
        }
    }

    /*  Need this in the jumping if statement.
        When physics is applied to the entity we
        can check if the 
        if (this.jumpAnimationL.isDone()) {
        this.jumpAnimationL.elapsedTime = 0;
        this.jumping = false;
        }
    */

    // Handles running animations on the ground
    // all this code does is make the hero look like he is running
    if (this.jumping === false) {
        if (this.accel < -1) {
            this.accel += .4;
        } else if (this.accel > 1) {
            this.accel -= .4;
        } else {
            this.accel = 0;
        }
    }

    // If the yaccel is not 0 it means the hero is jumping or falling
    if (this.yAccel != 0) {
        this.jumpStart = false;
    }
    
    // Updating the heros y location
    this.y = this.y + this.yAccel;
    // Applying the effects of gravity
    this.yAccel = this.yAccel + this.gravity;

    // Setting the hero to jump if the key is pressed and the hero is not jumping
    if (!this.jumping && this.game.keysActive[' '.charCodeAt(0)]) {
        this.jumping = true;
    }

    this.moveR = this.game.keysActive['D'.charCodeAt(0)] ||
        this.game.keysActive[39]; //39 = Left arrow key code
    this.moveL = this.game.keysActive['A'.charCodeAt(0)] ||
        this.game.keysActive[37]; //39 = Right arrow key code

    // The jumping function of the hero
    if (this.jumping) {
        if (this.jumpStart) {
            this.yAccel = -25;
        }
        this.jumpStart = false;
    }

    // Move right function of the hero
    if (this.moveR) {
        this.movingRight = true;
        this.x = this.x + 7;
        if (this.accel > 0) {
            this.accel = 10;

        } else {
            this.accel = 5;
        }
    }

    // Move left function of the hero
    if (this.moveL) {
        this.movingRight = false;
        this.x = this.x - 7;
        if (this.accel < 0) {
            this.accel = -10;
        } else {
            this.accel = -5;
        }
    }

    // Shooting function for the hero
    if (this.game.rightMouseDown) {
        this.shoot();
    }
    this.ticksSinceShot++;

    this.updateDimensions();
    Entity.prototype.update.call(this);
}

Hero.prototype.takeDamage = function (damage) {
    this.currentHP -= damage;
    if (this.currentHP < 0) {
        this.currentHP = 0;
    }
}

Hero.prototype.shoot = function () {
    var bullet = new Bullet(this.game, this.x + 50, this.y + 50, true);
    // var bullet = new Fire(this.game, this.x + 50, this.y + 50, true);

    if (this.ticksSinceShot >= bullet.fireRate) {
        this.game.addEntity(bullet);
        this.ticksSinceShot = 0;
    }
}

Hero.prototype.draw = function (ctx, xView, yView) {

    var drawX = this.x - xView;
    var drawY = this.y - yView;

    // was this.game.attack
    if (this.game.keysActive['F'.charCodeAt(0)] || this.game.attack) {
        //If this.moving right use SwordR else use SwordL
        (this.movingRight ? this.SwordR : this.SwordL)
            //Draw image returned in statement above.
            .drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
    }

    else if (this.jumping) {
        (this.movingRight ? this.jumpAnimationR : this.jumpAnimationL)
            .drawFrame(this.game.clockTick, ctx, drawX, drawY, this.heroScale);
    }

    else if (this.accel != 0) {
        (this.movingRight ? this.RunningR : this.RunningL)
            .drawFrame(this.game.clockTick, ctx, drawX, drawY, this.heroScale);

    } else {
        (this.movingRight ? this.idleR : this.idleL)
            .drawFrame(this.game.clockTick, ctx, drawX, drawY, this.heroScale);
    }
    Entity.prototype.draw.call(this);
}