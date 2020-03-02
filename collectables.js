
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