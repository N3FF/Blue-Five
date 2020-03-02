function collisionDetected(entity1, entity2) {

    return entity1.x + entity1.width >= entity2.x
        && entity1.x <= entity2.x + entity2.width
        && entity1.y + entity1.height >= entity2.y
        && entity1.y < entity2.y + entity2.height;

}

function CollisionManager(x, y, width, height) {
    this.botBounds = new Rectangle(x + 0.25 * width, y + 0.5 * height, 0.5 * width, 0.5 * height);
    this.topBounds = new Rectangle(x + 0.25 * width, y, 0.5 * width, 0.5 * height);
    this.rightBounds = new Rectangle(x + 0.75 * width, y + 0.1 * height, 0.15 * width, 0.8 * height);
    this.leftBounds = new Rectangle(x, y + 0.1 * height, 0.15 * width, 0.8 * height);
}

CollisionManager.prototype.updateDimensions = function (x, y, width = this.width, height = this.height) {
    this.botBounds.set(x + 0.25 * width, y + height / 2, 0.5 * width, 0.5 * height);
    this.topBounds.set(x + 0.25 * width, y, 0.5 * width, 0.5 * height);
    this.rightBounds.set(x + 0.75 * width, y + 0.1 * height, 0.25 * width, 0.8 * height);
    this.leftBounds.set(x, y + 0.1 * height, 0.25 * width, 0.8 * height);
}

CollisionManager.prototype.topCollisionDetected = function (entity) {
    return collisionDetected(this.topBounds, entity);
}

CollisionManager.prototype.botCollisionDetected = function (entity) {
    return collisionDetected(this.botBounds, entity);
}

CollisionManager.prototype.leftCollisionDetected = function (entity) {
    return collisionDetected(this.leftBounds, entity);
}

CollisionManager.prototype.rightCollisionDetected = function (entity) {
    return collisionDetected(this.rightBounds, entity);
}
