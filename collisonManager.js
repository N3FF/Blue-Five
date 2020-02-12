/**
 * General collison function
 */


collisonDetection = function (other) {
	
	if (this.x + this.width < other.myX + other.width 
	&& this.x + this.width > other.myX
	&& this.y + this.height < other.myY + other.height
	&& this.y + this.height + this.height > other.myY) {
		// Collision detected
		//this.direction = !this.direction;
		return true;
	}
	
    return false;
}