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


    this.jumping = false;       // if the hero is jumping
    this.attacking = false;     // if the hero is attacking
    this.shooting = false;      // if the hero is shooting
    this.moveR = false;         // if the hero is moving right
    this.moveL = false;         // if the hero is moving left
    this.type = TYPES.HERO;
    
    this.controllable = true;

    this.accel = 0;             // acceleration to make the hero look like they are running
                                // it does not really do anything else
    this.yAccel = 0;            // the heros vertical acceleration for gravity
    this.movingRight = true;
    this.gravity = 1;           // The effect of gravity
    this.jumpStart = true;      // whether the hero gets y accel at the beginning of a jump
    this.ticksSinceShot = 0;
    this.heroScale = .25;

    this.maxHP = 100;           // hitpoints
    this.currentHP = 100;
    this.maxMP = 100;           // magic
    this.currentMP = 100;

    this.healthRegen = .05;     // amount hp increases every update
    this.manaRegen = .05;       // amount mana increases every update
    

    this.width = 191 * this.heroScale;
    this.height = 351 * this.heroScale;
    this.collisionDelay = 60;
    this.ticksSinceCollison = 0;  // amount of ticks between instances of damage when colliding w/enemy
    this.collisionManager = new CollisionManager(this.x, this.y, this.width, this.height);
    
    this.startX = x;
    this.startY = y;

    Entity.call(this, game, x, y);
}

Hero.prototype = new Entity();
Hero.prototype.constructor = Hero;

// The update function
Hero.prototype.update = function () {
	
	if (this.controllable) {


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
    
    if (this.y > 2000 || this.currentHP <= 1) {
    	this.yAccel = 0;
    	this.y = this.startX;
    	this.x = this.startY;
    	this.currentHP = 100;
    	this.currentMP = 100;
    	
    	//this.game.init(ctx, camera);
       // this.game.start();
    }

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
    this.y += this.yAccel;
    // Applying the effects of gravity
    this.yAccel += this.gravity;

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
    this.shooting = this.game.rightMouseDown;
    this.attacking = this.game.leftMouseDown;
    if (this.attacking) this.shootBullet();
    else if (this.shooting) {
    	this.shootFire();
    }
    this.ticksSinceShot++;
    
	} else {
		this.attacking =  true;
		this.shootFire();
	}
    
    
    // Collison boundaries
    // this.updateDimensions();
    this.collisionManager.updateDimensions(this.x, this.y, this.width, this.height);
    this.ticksSinceCollison++;

    this.changeHP(this.healthRegen);
    this.changeMP(this.manaRegen);
    
	

    Entity.prototype.update.call(this);
}

Hero.prototype.draw = function (ctx, xView, yView) {

    var drawX = this.x - xView;
    var drawY = this.y - yView;

    // was this.game.attack
    // if (this.game.keysActive['F'.charCodeAt(0)] || this.game.attacking) {
    //     //If this.moving right use SwordR else use SwordL
    //     (this.movingRight ? this.SwordR : this.SwordL)
    //         //Draw image returned in statement above.
    //         .drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
    // }

    // else
     if (this.shooting || this.game.keysActive['F'.charCodeAt(0)] || this.attacking) {
        (this.game.mouseX > this.x + this.width / 2 ? this.shootAnimationR : this.shootAnimationL)
            .drawFrame(this.game.clockTick, ctx, drawX, drawY, this.heroScale);
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

Hero.prototype.handleCollision = function (entity) {
    switch (entity.type) {
        case TYPES.PROJECTILE:
            if (!entity.friendly) this.changeHP(-entity.damage);
            break;
        case TYPES.CANNON:
            if (this.ticksSinceCollison >= this.collisionDelay) {
                this.changeHP(-20);
                this.ticksSinceCollison = 0;
            }
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

// Let's revisit this idea after the deadline, but right now it causes some issues
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

    this.collisionManager.updateDimensions(this.x, this.y, this.width, this.height);
}

Hero.prototype.changeHP = function (amount) {
    this.currentHP += amount;
    if (this.currentHP < 0) 
        this.currentHP = 0;
    else if (this.currentHP > this.maxHP)
        this.currentHP = this.maxHP;
}

Hero.prototype.changeMP = function (amount) {
    this.currentMP += amount;
    if (this.currentMP < 0) 
        this.currentMP = 0;
    else if (this.currentMP > this.maxMP)
        this.currentMP = this.maxMP;
}

Hero.prototype.shootBullet = function () {
    if (this.game.mouseX > this.x + this.width / 2) {
        var bullet = new Bullet(this.game, this.x + 50, this.y + 45, this.game.mouseX, this.game.mouseY, true);
    } else {
        var bullet = new Bullet(this.game, this.x + 5, this.y + 45, this.game.mouseX, this.game.mouseY, true);
    }

    if (this.ticksSinceShot >= bullet.fireRate && this.currentMP >= bullet.manaCost) {
        this.game.addEntity(bullet);
        this.ticksSinceShot = 0;
        this.changeMP(-bullet.manaCost);
    }
}

Hero.prototype.shootFire = function () {
    if (this.game.mouseX > this.x + this.width / 2) {
        var fire = new Fire(this.game, this.x + 50, this.y + 45, this.game.mouseX, this.game.mouseY, true);
    } else {
        var fire = new Fire(this.game, this.x + 5, this.y + 45, this.game.mouseX, this.game.mouseY, true);
    }

    if (this.ticksSinceShot >= fire.fireRate && this.currentMP >= fire.manaCost) {
        this.game.addEntity(fire);
        this.ticksSinceShot = 0;
        this.changeMP(-fire.manaCost);
    }
}