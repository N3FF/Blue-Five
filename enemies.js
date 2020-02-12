function Cannon(game, setX, setY) {
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
    this.width = 130;
    this.height = 85;
    this.myX = this.x;
    this.myY = this.y;
    this.cannon = true;
    
    
    // Needs location parameters set
    Entity.call(this, game, setX, setY);
}

Cannon.prototype = new Entity();
Cannon.prototype.constructor = Cannon;

Cannon.prototype.collide = function (other) {
	
	if (this.x + this.width < other.myX + other.width 
	&& this.x + this.width > other.myX
	&& this.y + this.height < other.myY + other.height
	&& this.y + this.height + this.height > other.myY) {
		// Collision detected
		this.direction = !this.direction;
		return true;
	}
	
    return false;
}

Cannon.prototype.handler = function (other) {
	
	// Above the collison
	if (this.y + this.height <= other.myY) {
		this.jumping = false;
		this.y = other.myY - this.height - other.height-32;
		this.canJump = true;
		if (this.yAccel > 0) {
			this.yAccel = 0;
		}
	} else if (this.y >= other.myY - other.height) {
		this.yAccel = 1;
		this.y = other.myY;
		
	} 
}

// The update function
Cannon.prototype.update = function () {
	

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
    
    this.myX = this.x;
    //this.myY = this.y;
    this.y = this.y + this.yAccel;
    this.yAccel = this.yAccel + this.gravity;
    Entity.prototype.update.call(this);
}

Cannon.prototype.draw = function (ctx, xView, yView) {

    var drawX = this.x - xView;
    var drawY = this.y - yView;

    if (this.accel != 0) {
        if (this.direction) {
            this.C1.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        } else {
            this.CR.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        }

    } else {

        if (this.direction) {
            this.C1.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        } else {
            this.CR.drawFrame(this.game.clockTick, ctx, drawX, drawY, 2);
        }

    }
    Entity.prototype.draw.call(this);
}