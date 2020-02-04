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
    this.angle = this.getAngle();
    //console.log(this.x, this.cursorX, this.y, this.cursorY, this.angle);
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
    if (this.gravity != 0) {
        this.y = this.startY + Math.sin(this.angle) * this.velocity * this.time + .5 * this.gravity * (this.time * this.time);
    } else {
        this.y = this.startY + Math.sin(this.angle) * this.velocity * this.time;
    }
    if (this.acceleration != 0) {
        this.x = this.startX + Math.cos(this.angle) * this.velocity * this.time + .5 * this.acceleration * (this.time * this.time);
    } else {
        this.x = this.startX + Math.cos(this.angle) * this.velocity * this.time;
    }
    this.y = Math.ceil(this.y);
    this.x = Math.ceil(this.x);
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
    var deltaX = this.cursorX - this.startX;
    var deltaY = this.cursorY - this.startY;
    var angle = Math.atan2(deltaY, deltaX)
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