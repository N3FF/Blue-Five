function Hero(game) {
    this.idleR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 0, 55, 60, .20, 1, true, true);
    this.idleL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 220, 60, 55, 60, .20, 1, true, true);
    this.RunningR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 55, 0, 55, 60, .20, 4, true, false);
    this.RunningL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 60, 55, 60, .20, 4, true, false);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 0, 55, 60, .20, 5, true, false);
    this.jumpAnimationL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 60, 55, 60, .20, 5, true, false);
    this.SwordR = new Animation(ASSET_MANAGER.getAsset("./img/hero/HeroSword.png"), 0, 0, 60, 60, .15, 9, true, true);
    this.SwordL = new Animation(ASSET_MANAGER.getAsset("./img/hero/HeroSwordR.png"), 0, 0, 60, 60, .15, 9, true, true);
    this.jumping = false;
    this.attack = false;
    this.moveR = false;
    this.moveL = false;
    this.ground = 500;
    this.accel = 0;
    this.yAccel = 0;
    this.direction = true;
    this.gravity = 1;
    this.canJump = true;
    this.ticksSinceShot = 0;
    
    
    /* Collison code work
    NOTE: Standard sprites are 55x60 this will need to be updated on different
    sprites
 */  
    this.width = 55;
    this.height = 60;
    this.radius = 50;
    
    
    Entity.call(this, game, 0, 500);
}

Hero.prototype = new Entity();
Hero.prototype.constructor = Hero;

Hero.prototype.collide = function (other) {
	
	if (this.x + this.width < other.myX + other.width 
	&& this.x + this.width > other.myX
	&& this.y + this.height < other.myY + other.height
	&& this.y + this.height + this.height > other.myY) {
		// Collision detected
		return true;
	}
	
    return false;
}

// The update function
Hero.prototype.update = function () {
	
	for (var i = 0; i < this.game.entities.length; i++) {
		var ent = this.game.entities[i];
		if (ent !== this && this.collide(ent)) {
			this.jumping = false;
			this.y = ent.myY - this.height - ent.height;
			this.canJump = true;
			if (this.yAccel > 0) {
				this.yAccel = 0;
			}
		}
	}

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

    //this.x = this.x + this.accel;
    this.y = this.y + this.yAccel;
    this.yAccel = this.yAccel + this.gravity;
    
//    if (this.lastY === this.y) {
//		this.jumping = false;
//		this.canJump = true;
//	}


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

        //this.yAccel = this.yAccel + this.gravity;
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
    // var bullet = new Bullet(this.game, this.x + 50, this.y + 50);
    var bullet = new Fire(this.game, this.x + 50, this.y + 50);

    
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