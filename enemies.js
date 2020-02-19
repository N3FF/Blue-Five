function Cannon(game, x, y) {
    this.C1 = new Animation(ASSET_MANAGER.getAsset("./img/enemies/Cannon.png"), 0, 0, 130, 85, .20, 3, true, true);
    this.CR = new Animation(ASSET_MANAGER.getAsset("./img/enemies/CannonR.png"), 0, 0, 130, 85, .20, 3, true, true);
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
    this.scale = 2;
    this.width = 130 * this.scale;
    this.height = 85 * this.scale;
    
    
    // Needs location parameters set
    Entity.call(this, game, x, y);
}

Cannon.prototype = new Entity();
Cannon.prototype.constructor = Cannon;

Cannon.prototype.collisionDetected = function (entity) {
	
    return this.x + this.width >= entity.x  
            && this.x <= entity.x + entity.width
            && this.y + this.height >= entity.y
            && this.y < entity.y + entity.height;
}

Cannon.prototype.handleCollision = function (entity) {
	   
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

// The update function
Cannon.prototype.update = function () {

	for (var i = 0; i < this.game.entities.length; i++) {
		var ent = this.game.entities[i];
		if (ent !== this && this.collisionDetected(ent)) {
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

    this.x = this.x + this.accel;

    if (this.x < 300) {
        this.moveR = true;
        this.moveL = false;
    }
    if (this.x > 1400) {
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
    
    this.y = this.y + this.yAccel;
    this.yAccel = this.yAccel + this.gravity;
    Entity.prototype.update.call(this);
}

Cannon.prototype.draw = function (ctx, xView, yView) {

    var drawX = this.x - xView;
    var drawY = this.y - yView;

    if (this.accel != 0) {
        if (this.direction) {
            this.C1.drawFrame(this.game.clockTick, ctx, drawX, drawY, this.scale);
        } else {
            this.CR.drawFrame(this.game.clockTick, ctx, drawX, drawY, this.scale);
        }

    } else {

        if (this.direction) {
            this.C1.drawFrame(this.game.clockTick, ctx, drawX, drawY, this.scale);
        } else {
            this.CR.drawFrame(this.game.clockTick, ctx, drawX, drawY, this.scale);
        }

    }
    Entity.prototype.draw.call(this);
}