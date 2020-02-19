/**
 * @param {number} game       The game 
 * @description The Hero class - the main character controlled by the player
 */
function Hero(game, x , y) {
	
	
	
	// Animations
    this.idleR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 0, 55, 60, .20, 1, true, true);
    this.idleL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 220, 60, 55, 60, .20, 1, true, true);
    this.RunningR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 55, 0, 55, 60, .20, 4, true, false);
    this.RunningL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 60, 55, 60, .20, 4, true, false);
    this.jumpAnimationR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 0, 55, 60, .20, 5, true, false);
    this.jumpAnimationL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Hero.png"), 0, 60, 55, 60, .20, 5, true, false);
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
    this.heroScale = 2;

    this.maxHP = 100; // hitpoints
    this.currentHP = 100;
    this.maxMP = 100; // magic
    this.currentMP = 100;

     //  Collison code work
     //   NOTE: Standard sprites are 55x60 this will need to be updated on different
     //   sprites
    
    
    this.width = 55;
    this.height = 60;
    this.radius = 50;
    this.collideCounter = 0;
    
    this.getBounds = new Rectangle(this.x+(this.width/2) - (this.width/4),this.y+(this.height/2),this.width/2,this.height/2);
    this.getBoundsTop = new Rectangle(this.x+(this.width/2) - (this.width/4),this.y,this.width/4,this.height/2);
    this.getBoundsRight = new Rectangle(this.x+this.width -.15*this.width,this.y+5,.15*this.width,this.height-9);
    this.getBoundsLeft = new Rectangle(this.x-1,this.y+5,10,this.height-9);
    this.testBounds = new Rectangle(this.x,this.y,this.width,this.height);
    


    //Delete everything above

      /*
      
     //New Character Sprite sheets 
    this.idleR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Idle_R.png"), 0, 0, 191, 351, 0.06, 10, true, false);
    this.idleL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Idle_L.png"), 0, 0, 191, 351, 0.06, 10, true, false);
    this.RunningR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Walk_R.png"), 0, 0, 295, 343, 0.05, 10, true, false);
    this.RunningL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Walk_L.png"), 0, 0, 295, 343, 0.05, 10, true, false);
    this.jumpAnimationR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Jump_R.png"), 0, 0, 402, 365, 0.06, 10, false, false);
    this.jumpAnimationL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Jump_L.png"), 0, 0, 402, 365, 0.06, 10, false, false);
    this.shootAnimationR = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Shoot2_R.png"), 0, 0, 223, 344, 0.03, 5, true, false);
    this.shootAnimationL = new Animation(ASSET_MANAGER.getAsset("./img/hero/Cyborg_Shoot2_L.png"), 0, 0, 223, 344, 0.03, 5, true, false);

    // Only 
    this.jumping = false;
    this.moveR = false;
    this.moveL = false;
    this.attacking = false;
    this.movingRight = true;
    this.gravity = 1;
    this.ticksSinceShot = 0;
    this.heroScale = 0.25;
    
    
    this.maxHP = 100; // hitpoints
    this.currentHP = 100;
    this.maxMP = 100; // magic
    this.currentMP = 100;

    // Collison code work
    // NOTE: Standard sprites are 55x60 this will need to be updated on different
    // sprites

    this.width = 55;
    this.height = 60;
    this.radius = 50;
    this.collideCounter = 0;
    
     */

    Entity.call(this, game, x, y);
}

Hero.prototype = new Entity();
Hero.prototype.constructor = Hero;

// This is to prevent collisons from happening too fast with the enemy
Hero.prototype.collideCounter = function (collideCounter) {

    if (this.collideCounter <= 0) {
        this.movingRight = !this.movingRight;
        collideCounter = 10;
    } else {
        this.collideCounter--;
    }
}

//An entirely revamped general collison detection

Hero.prototype.collide = function (rect1, rect2) {

if (rect1.x < rect2.x + rect2.width &&
		   rect1.x + rect1.width > rect2.x &&
		   rect1.y < rect2.y + rect2.height &&
		   rect1.y  + rect1.height  > rect2.y) {
		    // collision detected!
		return true;
		}
	return false;
}


//Hero.prototype.collide = function (other) { // other entity comparing collison with
//
//	// Checking the the entity is not a cannon
//    if (!(other.cannon === true)) {
//        if (this.x + this.width < other.x + other.width
//            && this.x + this.width > other.x
//            && this.y + this.height < other.y + other.height
//            && this.y + this.height > other.y - other.height) {
//            // Collision detected
//            return true;
//        }
//    } else {
//        if (this.x < other.x + other.width
//            && this.x + this.width > other.x
//            && this.y < other.y + other.height
//            && this.y + this.height > other.y) {
//            // Collision detected
//            return true;
//        }
//    }
//    return false;
//}

//Hero.prototype.handler = function (other) {
//
//    // Above the collison, also checking that the entity is not a cannon
//    if (!(other.cannon === true)) {
//        if (this.y + this.height <= other.y) {
//            this.jumping = false;
//            this.y = other.y - this.height - other.height;
//            this.jumpStart = true;
//            if (this.yAccel > 0) {
//                this.yAccel = 0;
//            }
//          // Collison from below, ie mario hitting a block from below  
//        } else if (this.y >= other.y - other.height) {
//            this.yAccel = 1;
//            this.y = other.y;
//
//        }  
//        
////        if (!(other.cannon === true)){
////       	 if ((this.x + this.width < other.x + other.width)) {   
////             this.x = other.x - this.width - 1;
////         } else {
////             this.x = other.x + other.width + 1;
////             this.collideCounter;      
////         }
////        }
//    }
//
//    // If the other entity is a cannon we add the push collison
//    if (other.cannon === true) {
//        if ((this.x + this.width < other.x + other.width)) {
//            
//            this.x = other.x - this.width - 1;
//            if (this.collideCounter <= 0) {
//                this.movingRight = !this.movingRight;
//                this.collideCounter = 10;
//            } else {
//                this.collideCounter--;
//            }
//
//        } else {
//            this.x = other.x + other.width + 1;
//            this.collideCounter;
//            if (this.collideCounter <= 0) {
//                this.movingRight = !this.movingRight;
//                this.collideCounter = 10;
//            } else {
//                this.collideCounter--;
//            }
//        }
//    }
//    
//    return;
//}

// The update function
Hero.prototype.update = function () {

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
            this.jumpStart = true;
            if (this.yAccel > 0) {
                this.yAccel = 0;
            }
        	
        }
        
        // Right
        if (ent !== this && this.collide(ent, this.getBoundsRight)) {
            this.x = ent.x - ent.width;
        }
        
        // Left
        if (ent !== this && this.collide(ent, this.getBoundsLeft)) {
        	this.x = ent.x + ent.width;
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
    
    
    // Collison boundaries
    this.getBounds.y = this.y + this.height/2;
    this.getBounds.x = this.x + this.width/4;
    
    this.getBoundsTop.y = this.y;
    this.getBoundsTop.x = this.x + this.width/2;
    
    this.getBoundsRight.y = this.y + 5;
    this.getBoundsRight.x = this.x + this.width - 5;
    
    this.getBoundsLeft.y = this.y + 5;
    this.getBoundsLeft.x = this.x;

    Entity.prototype.update.call(this);
}

Hero.prototype.shoot = function () {
    var bullet = new Bullet(this.game, this.x + 50, this.y + 50);
    // var bullet = new Fire(this.game, this.x + 50, this.y + 50);

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