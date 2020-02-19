/**
 * General collison function
 */

// Used for boundary boxing
Rectangle = function(x,y,width,height) {
	 var x = x;
	 var y = y;
	 var width = width;
	 var height = height;
 
	}


// The general function for collison detection
collisonDetection = function (rect1, rect2) {

	if (rect1.x < rect2.x + rect2.width &&
			   rect1.x + rect1.width > rect2.x &&
			   rect1.y < rect2.y + rect2.height &&
			   rect1.y  + rect1.height  > rect2.y) {
			    // collision detected!
			return true;
			}
		return false;
	}

/*
 * 
 *  for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        
        if (ent !== this && this.collide(ent, this.getBoundsTop)) {
            this.y = ent.y + this.height;
            this.yAccel = 1;
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
        
        if (ent !== this && this.collide(ent, this.getBoundsRight)) {
            this.x = ent.x - this.width;
        }
        
        if (ent !== this && this.collide(ent, this.getBoundsLeft)) {
        	this.x = ent.x + this.width;
        }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
	