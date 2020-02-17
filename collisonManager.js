/**
 * General collison function
 */


collisonDetection = function (other) {
	
	if (this.x + this.width < other.x + other.width 
	&& this.x + this.width > other.x
	&& this.y + this.height < other.y + other.height
	&& this.y + this.height + this.height > other.y) {
		// Collision detected
		//this.direction = !this.direction;
		return true;
	}
	
    return false;
}