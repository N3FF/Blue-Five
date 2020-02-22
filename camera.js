// Reference: http://jsfiddle.net/gfcarv/QKgHs/ 

/**
 * @description Rectangle class used mostly to represent camera viewport and map dimensions
 * @param {number} x     starting X coordinate
 * @param {number} y      starting Y coordinate
 * @param {number} width    width
 * @param {number} height   height
 */
function Rectangle(x, y, width, height) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = width || 0;
  this.height = height || 0;
  this.right = this.left + this.width;
  this.bottom = this.top + this.height;
}

/**
 * @description Sets rectangle to specified coordinates and dimensions
 * @param {number} left     starting X coordinate
 * @param {number} top      starting Y coordinate
 * @param {number} width    width
 * @param {number} height   height
 */
Rectangle.prototype.set = function (left, top, width, height) {
  this.x = left;
  this.y = top;
  this.width = width || this.width;
  this.height = height || this.height
  this.right = (this.x + this.width);
  this.bottom = (this.y + this.height);
}

/**
 * @param {Rectangle} rectangle  Rectangle that's being checked if this rectangle is inside of
 * 
 * @returns true if this rectangle is fully within rectangle, false otherwise
 */
Rectangle.prototype.within = function (rectangle) {
  return (rectangle.x <= this.x &&
    rectangle.right >= this.right &&
    rectangle.y <= this.y &&
    rectangle.bottom >= this.bottom);
}

/**
 * @description Camera class
 * @param {number} xView            x coordinate of top left of camera's view
 * @param {number} yView            y coordinate of top left of camera's view
 * @param {number} viewportWidth    width of camera's view
 * @param {number} viewportHeight   height of camera's view
 * @param {number} worldWidth       width of entire map 
 * @param {number} worldHeight      height of entire map
 */
function Camera(xView, yView, viewportWidth, viewportHeight, worldWidth, worldHeight) {
  this.xView = xView || 0;
  this.yView = yView || 0;

  this.xDeadZone = 0;
  this.yDeadZone = 0;

  this.wView = viewportWidth;
  this.hView = viewportHeight;

  this.followed = null;

  // rectangle that represents the viewport
  this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

  // rectangle that represents the world's boundary (room's boundary)
  this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);

}

// gameObject needs to have "x" and "y" properties (as world(or room) position)
/**
 * @param {Entity} entity       entity camera is to follow   
 * @param {number} xDeadZone    minimum distance from entity to viewport's edge on x axis
 * @param {number} yDeadZone    minimum distance from entity to viewport's edge on y axis
 */
Camera.prototype.follow = function (entity, xDeadZone, yDeadZone) {
  this.followed = entity;
  this.xDeadZone = xDeadZone;
  this.yDeadZone = yDeadZone;
}

Camera.prototype.update = function () {
  // keep following the player (or other desired object)
  if (this.followed != null) {
    // moves camera on horizontal axis based on followed object position
    if (this.followed.x - this.xView + this.xDeadZone > this.wView)
      this.xView = this.followed.x - (this.wView - this.xDeadZone);
    else if (this.followed.x - this.xDeadZone < this.xView)
      this.xView = this.followed.x - this.xDeadZone;

    // moves camera on vertical axis based on followed object position
    if (this.followed.y - this.yView + this.yDeadZone > this.hView)
      this.yView = this.followed.y - (this.hView - this.yDeadZone);
    else if (this.followed.y - this.yDeadZone < this.yView)
      this.yView = this.followed.y - this.yDeadZone;

  }

  // update viewportRect
  this.viewportRect.set(this.xView, this.yView);

  // don't let camera leaves the world's boundary
  if (!this.viewportRect.within(this.worldRect)) {
    if (this.viewportRect.x < this.worldRect.x)
      this.xView = this.worldRect.x;
    if (this.viewportRect.y < this.worldRect.y)
      this.yView = this.worldRect.y;
    if (this.viewportRect.right > this.worldRect.right)
      {this.xView = this.worldRect.right - this.wView;}
    if (this.viewportRect.bottom > this.worldRect.bottom) {
      this.yView = this.worldRect.bottom - this.hView;
    }
      

  }

}