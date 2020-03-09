function Background(game) {
    this.back1 = new Animation(ASSET_MANAGER.getAsset("./img/environment/Background.png"), 0, 0, 13824, 1037, 1, 1, true, true);
    this.tile;// = new Animation(ASSET_MANAGER.getAsset("./img/environment/52Tilea.png"), 0, 0, 52, 52, 1, 1, true, true);
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
    }

    Entity.prototype.draw.call(this);
}

function Platform(game, x, y, type, win) {


    this.radius = 52;
    this.width = 52;
    this.height = 52;
    this.type = TYPES.PLATFORM;
    this.win = true;
    this.fileName = "./img/environment/";
    this.hazardous = false;
    this.collisionManager = new CollisionManager(this.x, this.y, this.width, this.height);
    this.flag = new Animation(ASSET_MANAGER.getAsset("./img/environment/flag.png"), 0, 0, 202, 324, 0.10, 10, true, true);

    switch (type) {
        case "invisible":
            this.fileName += "invisible.png";
            break;

        case "floating_spikes":
            this.fileName += "floating_spikes.png";
            this.hazardous = true;
            break;

        case "steel_block_spikes":
            this.fileName += "steel_block_spikes.png";
            break

        case "floor_spikes":
            this.fileName += "floor_spikes.png";
            this.hazardous = true;
            break;

        case "gap_right":
            this.fileName += "floor_gap_right.png";
            break;

        case "gap_left":
            this.fileName += "floor_gap_left.png";
            break;

        case "floor":
            this.fileName += "floor.png";
            break;

        case "steel_block":
            this.fileName += "steel_block.png";
            break;
        
        case "checkpoint":
            this.fileName += "steel_block.png";
            this.type = TYPES.CHECKPOINT;
            break;
    }

    this.tile = new Animation(ASSET_MANAGER.getAsset(this.fileName), 0, 0, this.width, this.height, .20, 1, true, true);

    // For future
    this.walkableTerrain = false;

    Entity.call(this, game, x, y);
}

Platform.prototype = new Entity();
Platform.prototype.constructor = Platform;

Platform.prototype.handleCollision = function (entity) {
    switch (entity.type) {
        case TYPES.HERO:
            entity.currentHP = entity.currentHP - 20;
            break;
        case TYPES.CANNON:
            entity.currentHP = entity.currentHP - 20;
            break;    
        default:
            //
    }
}
  

// The update function
Platform.prototype.update = function () {

    // Collison is only checked if the block is hazardous
    if (this.hazardous == true) {
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent !== this && collisionDetected(this, ent) ) {
                this.handleCollision(ent);
            }
        }
    }  

    Entity.prototype.update.call(this);
}

Platform.prototype.draw = function (ctx, xView, yView) {

    if (this.type != TYPES.CHECKPOINT) {
        this.tile.drawFrame(this.game.clockTick, ctx, this.x - xView, this.y - yView, 1);
    } else {
        this.flag.drawFrame(this.game.clockTick, ctx, this.x - xView, this.y - yView, 1/2); 
    }
    

    Entity.prototype.draw.call(this);
}

function Instructions(game, x, y) {
    this.img = new Animation(ASSET_MANAGER.getAsset("./img/hud/Instructions.png"), 0, 0, 370, 202, 1, 1, true, true);
    Entity.call(this, game, x, y);
}

Instructions.prototype = new Entity();
Instructions.prototype.constructor = Instructions;

Instructions.prototype.draw = function (ctx, xView, yView) {
    if (!this.game.entities[1].win) this.img.drawFrame(this.game.clockTick, ctx, this.x, this.y, .75);
}