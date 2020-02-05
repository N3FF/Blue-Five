/**
 * 
 * @param {number} startX       Object X position
 * @param {number} startY       Object Y position
 * @param {number} duration     Number of ticks before the object disappears
 * @param {number} cursorX      Cursor X position  
 * @param {number} cursorY      Cursor Y position
 * @param {number} gravity      Gravitational force
 * @param {number} velocity     Initial velocity
 * @param {number} acceleration Acceleration over time
 * 
 * @description Attach physics properties to an object
 */
function Physics(startX, startY, duration, cursorX, cursorY, gravity, velocity, acceleration) {
    // console.log(startX, startY);
    this.velocity = Math.ceil(velocity);
    this.cursorX = cursorX;
    this.cursorY = cursorY
    this.gravity = gravity;
    this.acceleration = acceleration;
    this.bounces = false;
    this.sticks = false;
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.time = 0;
    this.endTime = Math.ceil(duration);
    this.gravity = gravity;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.dead = false;
    this.initialAngle = this.getAngle();
    this.currentAngle = this.initialAngle;
}

/**
 * @description Advance the time value by +1
 */
Physics.prototype.tick = function () {
    this.time += 1;
    this.projectile();
    if (this.time === this.endTime) {
        this.dead = true;
    }
}

/**
 * @description Updates the X and Y position
 */
Physics.prototype.projectile = function () {
    var lastX = this.x;
    var lastY = this.y;
    this.y = this.startY + Math.sin(this.initialAngle) * this.velocity * this.time + .5 * this.gravity * (this.time * this.time);
    this.x = this.startX + Math.cos(this.initialAngle) * this.velocity * this.time + .5 * this.acceleration * (this.time * this.time);
    if (this.gravity || this.acceleration) this.currentAngle = this.calculateAngle(lastX, lastY, this.x, this.y);
    this.y = Math.ceil(this.y);
    this.x = Math.ceil(this.x);
}

/**
 * @param {Number} startX - starting point on x axis
 * @param {Number} startY - starting point on y axis
 * @param {Number} endX - ending point on x axis
 * @param {Number} endY - ending point on y axis
 */
Physics.prototype.calculateAngle = function(startX, startY, endX, endY) {
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    return Math.atan2(deltaY, deltaX);
}

/**
 * @param {boolean} bounces
 * @param {boolean} sticks
 * 
 * @description Defines the action that occurs when the object collides with another.
 */
Physics.prototype.collision = function (bounces, sticks) {

}

/**
 * @param {Number} gravity - Graviational Constant in pixels per second
 */
Physics.prototype.setGravity = function (gravity) {
    this.gravity = gravity;
}
/**
 * @param {String} type - Angle type "rad" (radians) or "deg" (degrees)
 */
Physics.prototype.getAngle = function (type = "rad") {
    var angle = this.calculateAngle(this.startX, this.startY, this.cursorX, this.cursorY);
    return type === "deg" ? angle * Math.PI / 180.0 : angle;
}

/**
 * @returns {Object} Object with x , y coordinates
 */
Physics.prototype.getPosition = function () {
    return { "x": this.x, "y": this.y };
}

/**
 * @return {boolean} true if the object has achieved it's goal (timeout, collision, etc.)
 */
Physics.prototype.isDone = function () {
    return this.dead;
}