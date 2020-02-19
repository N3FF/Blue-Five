function Background(game) {
    this.back1 = new Animation(ASSET_MANAGER.getAsset("./img/environment/Background.png"), 0, 0, 1680, 1050, 1, 1, true, true);
    this.tile1 = new Animation(ASSET_MANAGER.getAsset("./img/environment/52Tilea.png"), 0, 0, 52, 52, 1, 1, true, true);

    this.instructions = new Animation(ASSET_MANAGER.getAsset("./img/hud/Instructions.png"), 0, 0, 370, 202, 1, 1, true, true);

    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx, xView, yView) {
    this.back1.drawFrame(this.game.clockTick, ctx, -xView, -yView, 1);
    this.instructions.drawFrame(this.game.clockTick, ctx, ctx.canvas.width - 370 * .75, 0, .75);
    Entity.prototype.draw.call(this);
}

function Platform(game, x, y, type) {
	
	if( type === 1) {
    this.Tile1 = new Animation(ASSET_MANAGER.getAsset("./img/environment/52Tilea.png"), 0, 0, 52, 52, .20, 1, true, true);
	} else {
		this.Tile1 = new Animation(ASSET_MANAGER.getAsset("./img/environment/52Tile.png"), 0, 0, 52, 52, .20, 1, true, true);
	}
	
    this.radius = 52;
    this.width = 52;
    this.height = 52;  
    
    // For future
    this.walkableTerrain = false;
    
    Entity.call(this, game, x, y);
}

Platform.prototype = new Entity();
Platform.prototype.constructor = Platform;

// The update function
Platform.prototype.update = function () {
 
    Entity.prototype.update.call(this);
}

Platform.prototype.draw = function (ctx, xView, yView) {
	
	this.Tile1.drawFrame(this.game.clockTick, ctx, this.x+26 - xView, this.y+52 - yView, 1);

    Entity.prototype.draw.call(this);
}