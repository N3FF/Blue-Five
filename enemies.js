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
    this.width = 130;
    this.height = 85;
    this.cannon = true;
    
    
    this.getBounds = new Rectangle(this.x+(this.width/2) - (this.width/4),this.y+(this.height/2),this.width/2,this.height/2);
    this.getBoundsTop = new Rectangle(this.x+(this.width/2) - (this.width/4),this.y,this.width/2,this.height/2);
    this.getBoundsRight = new Rectangle(this.x+this.width -5,this.y+5,5,this.height-10);
    this.getBoundsLeft = new Rectangle(this.x,this.y+5,5,this.height-10);
    this.testBounds = new Rectangle(this.x,this.y,this.width,this.height);
    
    // Needs location parameters set
    Entity.call(this, game, x, y);
}

Cannon.prototype = new Entity();
Cannon.prototype.constructor = Cannon;

Cannon.prototype.collide = function (rect1, rect2) {

	if (rect1.x < rect2.x + rect2.width &&
			   rect1.x + rect1.width > rect2.x &&
			   rect1.y < rect2.y + rect2.height &&
			   rect1.y  + rect1.height  > rect2.y) {
			    // collision detected!
			return true;
			}
		return false;
	}

//Cannon.prototype.handler = function (other) {
//	
//	// Above the collison
//	if (this.y + this.height <= other.y) {
//		this.jumping = false;
//		this.y = other.y - this.height - other.height-32;
//		this.canJump = true;
//		if (this.yAccel > 0) {
//			this.yAccel = 0;
//		}
//	} else if (this.y >= other.y - other.height) {
//		this.yAccel = 1;
//		this.y = other.y;
//	} 
//}

// The update function
Cannon.prototype.update = function () {

	for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        
        if (ent !== this && this.collide(ent, this.getBoundsTop)) {
            this.y = ent.y + this.height;
            this.yAccel = 0;
        }
    
        if (ent !== this && this.collide(ent, this.getBounds)) {
            //this.handler(ent);
        	this.jumping = false;
            this.y = ent.y - this.height;
            //this.jumpStart = true;
            if (this.yAccel > 0) {
                this.yAccel = 0;
            }
        	
        }
        
        if (ent !== this && this.collide(ent, this.getBoundsRight)) {
            this.x = ent.x - this.width;
        }
        
        if (ent !== this && this.collide(ent, this.getBoundsLeft)) {
        	this.x = ent.x + this.width;
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
    // Collison boundaries
    this.getBounds.y = this.y + this.height/2;
    this.getBounds.x = this.x + this.width/4;
    
    this.getBoundsTop.y = this.y;
    this.getBoundsTop.x = this.x + this.width/2;
    
    this.getBoundsRight.y = this.y;
    this.getBoundsRight.x = this.x + this.width -5;
    
    this.getBoundsLeft.y = this.y;
    this.getBoundsLeft.x = this.x;
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