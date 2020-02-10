function Background(game) {
    this.back1 = new Animation(ASSET_MANAGER.getAsset("./img/Background.png"), 0, 0, 1680, 1050, 1, 1, true, true);
    this.tile1 = new Animation(ASSET_MANAGER.getAsset("./img/52Tilea.png"), 0, 0, 52, 52, 1, 1, true, true);
    this.hud = new Animation(ASSET_MANAGER.getAsset("./img/HudPrototype1.png"), 0, 0, 250, 360, 1, 1, true, true);

    this.instructions = new Animation(ASSET_MANAGER.getAsset("./img/Instructions.png"), 0, 0, 370, 202, 1, 1, true, true);

    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "#808080";
    this.back1.drawFrame(this.game.clockTick, ctx, 0, 0, 1);

    var tileSize = 52;
    for (i = 0; i < 20; i++) {
        for (j = 0; j < 3; j++) {
            this.tile1.drawFrame(this.game.clockTick, ctx, i * tileSize, (600 + j * tileSize), 1);
        }

    }

    this.hud.drawFrame(this.game.clockTick, ctx, 875, 0, 1 / 2);
    this.instructions.drawFrame(this.game.clockTick, ctx, 0, 0, .75);
    Entity.prototype.draw.call(this);
}

function Platform(game, setX, setY) {
    this.Tile1 = new Animation(ASSET_MANAGER.getAsset("./img/52Tile.png"), 0, 0, 52, 52, .20, 1, true, true);
    this.radius = 52;
    this.width = 52;
    this.height = 52;
    
    this.myX = setX;
    this.myY = setY;
    
    
    //
    //this.x = setX - 54;
    //this.y = setY - 400;
    
    // For future
    this.walkableTerrain = false;
    
    Entity.call(this, game, setX, setY);
}

Platform.prototype = new Entity();
Platform.prototype.constructor = Platform;

// The update function
Platform.prototype.update = function () {
 
    Entity.prototype.update.call(this);
}

Platform.prototype.draw = function (ctx) {
	
	this.Tile1.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);

    Entity.prototype.draw.call(this);
}