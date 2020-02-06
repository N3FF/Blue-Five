function Physics(startX, startY, duration, cursorX, cursorY, gravity, velocity, acceleration) {
    console.log(startX, startY);
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

Physics.prototype.tick = function () {
    this.time += 1;
    this.projectile();
    if (this.time === this.endTime) {
        this.dead = true;
    }
}

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

Physics.prototype.collision = function (bounces, sticks) {

}
Physics.prototype.setGravity = function (gravity) {
    this.gravity = gravity;
}

Physics.prototype.getAngle = function (type = "rad") {
    var deltaX = this.cursorX - this.startX;
    var deltaY = this.cursorY - this.startY;
    var angle = Math.atan2(deltaY, deltaX)
    return type === "deg" ? angle * Math.PI / 180.0 : angle;
}

Physics.prototype.getPosition = function () {
    return { "x": this.x, "y": this.y };
}

Physics.prototype.isDone = function () {
    return this.dead || (this.time === this.endTime);
}