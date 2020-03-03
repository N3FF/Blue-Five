function HealthPack (game, x, y) {
    this.img = new Animation(ASSET_MANAGER.getAsset("./img/collectables/healthPack.png"), 0, 0, 256, 256, 1, 1, true, false);
    this.type = TYPES.COLLECTABLES.HEALTHPACK;
    this.healthValue = 25;
    this.scale = 52 / 256;
    this.width = 52;
    this.height = 52;
    Entity.call(this, game, x, y);
}

HealthPack.prototype = new Entity();
HealthPack.prototype.constructor = HealthPack;

HealthPack.prototype.update = function () {
    // if (collisionDetected(this, this.game.entities[1])) this.removeFromWorld = true;
    Entity.prototype.update.call(this);
}

HealthPack.prototype.draw = function (ctx, xView, yView) {
    this.img.drawFrame(this.game.clockTick, ctx, this.x - xView, this.y - yView, this.scale);
    Entity.prototype.draw.call(this);
}

function ManaPack (game, x, y) {
    this.img = new Animation(ASSET_MANAGER.getAsset("./img/collectables/manaPack.png"), 0, 0, 256, 256, 1, 1, true, false);
    this.type = TYPES.COLLECTABLES.MANAPACK;
    this.manaValue = 25;
    this.scale = 52 / 256;
    this.width = 52;
    this.height = 52;
    Entity.call(this, game, x, y);
}

ManaPack.prototype = new Entity();
ManaPack.prototype.constructor = ManaPack;

ManaPack.prototype.update = function () {
    // if (collisionDetected(this, this.game.entities[1])) this.removeFromWorld = true;
    Entity.prototype.update.call(this);
}

ManaPack.prototype.draw = function (ctx, xView, yView) {
    this.img.drawFrame(this.game.clockTick, ctx, this.x - xView, this.y - yView, this.scale);
    Entity.prototype.draw.call(this);
}