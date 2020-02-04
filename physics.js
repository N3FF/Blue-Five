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

Physics.prototype.tick = function () {
    this.time += 1;
    this.projectile();
    if (this.time === this.endTime) {
        this.dead = true;
    }
}

Physics.prototype.projectile = function () {
    var lastX = this.x;
    var lastY = this.y;
    this.y = this.startY + Math.sin(this.initialAngle) * this.velocity * this.time + .5 * this.gravity * (this.time * this.time);
    this.x = this.startX + Math.cos(this.initialAngle) * this.velocity * this.time + .5 * this.acceleration * (this.time * this.time);
    if (this.gravity || this.acceleration) this.currentAngle = this.calculateAngle(lastX, lastY, this.x, this.y);
    this.y = Math.ceil(this.y);
    this.x = Math.ceil(this.x);
}

Physics.prototype.calculateAngle = function(startX, startY, endX, endY) {
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    return Math.atan2(deltaY, deltaX);
}

Physics.prototype.collision = function (bounces, sticks) {

}

Physics.prototype.setGravity = function (gravity) {
    this.gravity = gravity;
}

Physics.prototype.getAngle = function (type = "rad") {
    var angle = this.calculateAngle(this.startX, this.startY, this.cursorX, this.cursorY);
    return type === "deg" ? angle * Math.PI / 180.0 : angle;
}

Physics.prototype.getPosition = function () {
    return { "x": this.x, "y": this.y };
}

Physics.prototype.isDone = function () {
    return this.dead || (this.time === this.endTime);
}