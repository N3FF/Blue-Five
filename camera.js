// Reference: http://jsfiddle.net/gfcarv/QKgHs/ 

/**
 * @description Rectangle class used mostly to represent camera viewport and map dimensions
 * @param {number} left     starting X coordinate
 * @param {number} top      starting Y coordinate
 * @param {number} width    width
 * @param {number} height   height
 */
function Rectangle(left, top, width, height) {
    this.left = left || 0;
    this.top = top || 0;
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
Rectangle.prototype.set = function(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width || this.width;
    this.height = height || this.height
    this.right = (this.left + this.width);
    this.bottom = (this.top + this.height);
}

/**
 * @param {Rectangle} rectangle  Rectangle that's being checked if this rectangle is inside of
 * 
 * @returns true if this rectangle is fully within rectangle, false otherwise
 */
Rectangle.prototype.within = function(rectangle) {
    return (rectangle.left <= this.left &&
      rectangle.right >= this.right &&
      rectangle.top <= this.top &&
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
  Camera.prototype.follow = function(entity, xDeadZone, yDeadZone) {
    this.followed = entity;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
  }

  Camera.prototype.update = function() {
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
      if (this.viewportRect.left < this.worldRect.left)
        this.xView = this.worldRect.left;
      if (this.viewportRect.top < this.worldRect.top)
        this.yView = this.worldRect.top;
      if (this.viewportRect.right > this.worldRect.right)
        this.xView = this.worldRect.right - this.wView;
      if (this.viewportRect.bottom > this.worldRect.bottom)
        this.yView = this.worldRect.bottom - this.hView;

    }

  }