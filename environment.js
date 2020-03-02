function Background(game) {
    this.back1 = new Animation(ASSET_MANAGER.getAsset("./img/environment/Background.png"), 0, 0, 13824, 1037, 1, 1, true, true);
    this.tile1 = new Animation(ASSET_MANAGER.getAsset("./img/environment/52Tilea.png"), 0, 0, 52, 52, 1, 1, true, true);

    this.healthPack = new Animation(ASSET_MANAGER.getAsset("./img/environment/healthPack.png"), 0, 0, 52, 52, 1, 1, true, true);
    this.skillPack = new Animation(ASSET_MANAGER.getAsset("./img/environment/skillPack.png"), 0, 0, 52, 52, 1, 1, true, true);

    this.instructions = new Animation(ASSET_MANAGER.getAsset("./img/hud/Instructions.png"), 0, 0, 370, 202, 1, 1, true, true);
    this.win = new Animation(ASSET_MANAGER.getAsset("./img/hud/Win.png"), 0, 0, 370, 202, 1, 1, true, true);

    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx, xView, yView) {
	var hero = this.game.entities[1];
	
    this.back1.drawFrame(this.game.clockTick, ctx, -xView, -yView, 1);
    
    if (hero.win) {
    	this.win.drawFrame(this.game.clockTick, ctx, ctx.canvas.width - 370 * .75, 0, .75);
    } else {
    	this.instructions.drawFrame(this.game.clockTick, ctx, ctx.canvas.width - 370 * .75, 0, .75);
    }
    
    Entity.prototype.draw.call(this);
}

function Platform(game, x, y, type, win) {
	
	if( type === 1) {
    this.Tile1 = new Animation(ASSET_MANAGER.getAsset("./img/environment/52Tilea.png"), 0, 0, 52, 52, .20, 1, true, true);
	} else {
		this.Tile1 = new Animation(ASSET_MANAGER.getAsset("./img/environment/52Tile.png"), 0, 0, 52, 52, .20, 1, true, true);
	}
	
    this.radius = 52;
    this.width = 52;
    this.height = 52;  
    this.type = TYPES.PLATFORM;
    this.win = true;
    
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
	
	this.Tile1.drawFrame(this.game.clockTick, ctx, this.x - xView + 13, this.y - yView, 1);

    Entity.prototype.draw.call(this);
}


function Collectable(game, x, y, name, win) {
	
	if( name === "healthPack") {
    this.Collectable = new Animation(ASSET_MANAGER.getAsset("./img/environment/healthPack.png"), 0, 0, 52, 52, .20, 1, true, true);
	} else if(name === 'skillPack') {
		this.Collectable = new Animation(ASSET_MANAGER.getAsset("./img/environment/skillPack.png"), 0, 0, 52, 52, .20, 1, true, true);
	}
	
    this.radius = 52;
    this.width = 52;
    this.height = 52;  
    this.type = TYPES.COLLECTABLE;
    this.name = name;
    this.win = true;
    
    Entity.call(this, game, x, y);
}

Collectable.prototype = new Entity();
Collectable.prototype.constructor = Collectable;

// The update function
Collectable.prototype.update = function () {
 
    Entity.prototype.update.call(this);
}

Collectable.prototype.draw = function (ctx, xView, yView) {
	
	this.Collectable.drawFrame(this.game.clockTick, ctx, this.x - xView + 13, this.y - yView, 1);

    Entity.prototype.draw.call(this);
}