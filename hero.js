/**
 * @param {number} game       The game 
 * @description The hero class
 */
function Hero(game) {
    this.idleR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 0, 55, 60, .20, 1, true, true);
    this.idleL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 220, 60, 55, 60, .20, 1, true, true);
    this.RunningR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 55, 0, 55, 60, .20, 4, true, false);
    this.RunningL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 60, 55, 60, .20, 4, true, false);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 0, 55, 60, .20, 5, true, false);
    this.jumpAnimationL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 60, 55, 60, .20, 5, true, false);
    this.SwordR = new Animation(ASSET_MANAGER.getAsset("./img/hero/HeroSword.png"), 0, 0, 60, 60, .15, 9, true, false);
    this.SwordL = new Animation(ASSET_MANAGER.getAsset("./img/hero/HeroSwordR.png"), 0, 0, 60, 60, .15, 9, true, true);
    this.jumping = false; // if the hero is jumping
    this.attack = false; // if the hero is attacking
    this.moveR = false; 
    this.moveL = false;
    this.ground = 500;
    this.accel = 0;
    this.yAccel = 0;
    this.direction = true;
    this.gravity = 1;
    this.canJump = true;
    this.ticksSinceShot = 0;
    
    
    this.maxHP = 100; // hitpoints
    this.currentHP = 100;
    this.maxMP = 100; // magic
    this.currentMP = 100;
    
    /* Collison code work
    NOTE: Standard sprites are 55x60 this will need to be updated on different
    sprites
 */  
    this.width = 55;
    this.height = 60;
    this.radius = 50;  
    this.collideCounter = 0;
    
    Entity.call(this, game, 0, 500);
}

Hero.prototype = new Entity();
Hero.prototype.constructor = Hero;

Hero.prototype.collideCounter = function (collideCounter) {
	
	if (this.collideCounter <= 0) {
		this.direction = !this.direction;
		collideCounter = 10;
	} else {
		this.collideCounter--;
	}
}

Hero.prototype.collide = function (other) {
	
	if (!(other.cannon === true)) {
		if (this.x + this.width < other.x + other.width 
				&& this.x + this.width > other.x
				&& this.y + this.height < other.y + other.height
				&& this.y + this.height > other.y - other.height) {
					// Collision detected
					//this.direction = !this.direction;
					return true;
				}
	} else {
		if (this.x < other.x + other.width 
				&& this.x + this.width > other.x
				&& this.y < other.y + other.height
				&& this.y + this.height > other.y) {
					// Collision detected
					//this.direction = !this.direction;
					return true;
				}
	}
	
	
    return false;
}

Hero.prototype.handler = function (other) {
	
	// Above the collison
	if (!(other.cannon === true)) {
		if (this.y + this.height <= other.y) {
			this.jumping = false;
			this.y = other.y - this.height - other.height;
			this.canJump = true;
			if (this.yAccel > 0) {
				this.yAccel = 0;
			}
		} else if (this.y >= other.y - other.height) {
			this.yAccel = 1;
			this.y = other.y;
			
		} 
	}
	
	
	if (other.cannon === true) {
		if ((this.x + this.width < other.x + other.width)) {
			//else if (this.x + this.width >= other.x) {
				this.x = other.x - this.width -1;
				//this.collideCounter;
				if (this.collideCounter <= 0) {
					this.direction = !this.direction;
					this.collideCounter = 10;
				} else {
					this.collideCounter--;
				}
				//this.direction = !this.direction;
				
			} else { //((this.x + this.width > other.x)) {
				this.x = other.x + other.width +1;
				this.collideCounter;
				if (this.collideCounter <= 0) {
					this.direction = !this.direction;
					this.collideCounter = 10;
				} else {
					this.collideCounter--;
				}
				//this.direction = !this.direction;
			}	
	}
	
	
	
	return;
}

// The update function
Hero.prototype.update = function () {
	
	for (var i = 0; i < this.game.entities.length; i++) {
		var ent = this.game.entities[i];
		if (ent !== this && this.collide(ent)) {
			this.handler(ent);
		}
	}

//    if (this.y > this.ground) {
//        this.jumping = false;
//        this.y = this.ground;
//        this.canJump = true;
//        this.yAccel = 0;
//    }

    // Handles acceleration for a jump
    if (this.jumping === false) {
        if (this.accel < -1) {
            this.accel += .4;
        } else if (this.accel > 1) {
            this.accel -= .4;
        } else {
            this.accel = 0;
        }
    }

    if (this.yAccel != 0) {
    	this.canJump = false;
    }
    this.y = this.y + this.yAccel;
    this.yAccel = this.yAccel + this.gravity;


    if (!this.jumping && this.game.keysActive[' '.charCodeAt(0)]) {
        this.jumping = true;
    }

    this.moveR = this.game.keysActive['D'.charCodeAt(0)] ||
        this.game.keysActive[39]; //39 = Left arrow key code
    this.moveL = this.game.keysActive['A'.charCodeAt(0)] ||
        this.game.keysActive[37]; //39 = Right arrow key code

    if (this.jumping) {
        if (this.canJump) {
            this.yAccel = -25;
        }
        this.canJump = false;
    }

    if (this.moveR) {
        this.direction = true;
        this.x = this.x + 7;
        if (this.accel > 0) {
            this.accel = 10;

        } else {
            this.accel = 5;
        }
    }

    if (this.moveL) {
        this.direction = false;
        this.x = this.x - 7;
        if (this.accel < 0) {
            this.accel = -10;
        } else {
            this.accel = -5;
        }
    }

    if (this.game.rightMouseDown) {
        this.shoot();
    }
    this.ticksSinceShot++;

    Entity.prototype.update.call(this);
}

Hero.prototype.shoot = function () {
    var bullet = new Bullet(this.game, this.x + 50, this.y + 50);
    // var bullet = new Fire(this.game, this.x + 50, this.y + 50);
  
    if(this.ticksSinceShot >= bullet.fireRate) {
        this.game.addEntity(bullet);
        this.ticksSinceShot = 0;
    } 
}

Hero.prototype.draw = function (ctx, xView, yView) {

    var drawX = this.x - xView;
    var drawY = this.y - yView;

    // was this.game.attack
    if (this.game.keysActive['F'.charCodeAt(0)] || this.game.attack) {

        if (this.direction) {
            this.SwordR.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        } else {
            this.SwordL.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        }
    }

    else if (this.jumping) {
        if (this.direction) {
            this.jumpAnimation.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        } else {
            this.jumpAnimationL.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        }
    }

    else if (this.accel != 0) {
        if (this.direction) {
            this.RunningR.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        } else {
            this.RunningL.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        }

    } else {
        if (this.direction) {
            this.idleR.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        } else {
            this.idleL.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        }
    }
    Entity.prototype.draw.call(this);
}