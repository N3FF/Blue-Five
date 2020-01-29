/**
 * http://usejsdoc.org/
 */

function Unicorn(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 0, 0, 206, 110, 0.02, 30, true, true);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 618, 334, 174, 138, 0.02, 40, false, true);
    this.jumping = false;
    this.moveR = false;
    this.moveL = false;
    this.radius = 100;
    this.ground = 400;
    this.accel = 0;
    Entity.call(this, game, 0, 400);
}

Unicorn.prototype = new Entity();
Unicorn.prototype.constructor = Unicorn;

// Having the unicorn jump here
Unicorn.prototype.update = function () {
    if (this.game.space) {
    	this.jumping = true;
    }
    
    if (this.game.right) {
    	this.moveR = true;
    } else {
    	this.moveR = false;
    }
    
    if (this.game.left) {
    	this.moveL = true;
    } else {
    	this.moveL = false;
    }
    
    
    if (this.jumping) {
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
    
    if (this.moveR) {
     this.x = this.x + 10;
     //this.moveR = false;
    }
    
    if (this.moveL) {
        this.x = this.x - 10;
        //this.moveL = false;
       }
    
    
    
    
    Entity.prototype.update.call(this);
}

Unicorn.prototype.draw = function (ctx) {
    if (this.jumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}