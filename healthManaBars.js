function HealthManaBars(game) {
    this.backgroundBars = new Animation(ASSET_MANAGER.getAsset("./img/hud/HP_bars_background.png"), 0, 0, 658, 164, 1, 1, true, false);
    this.overlay = new Animation(ASSET_MANAGER.getAsset("./img/hud/HP_bars.png"), 0, 0, 658, 164, 1, 1, true, false);
    this.healthPercent = 100;
    this.manaPercent = 100;
    this.scale = 0.4;
    Entity.call(this, game, 0, 0);
}

HealthManaBars.prototype = new Entity();
HealthManaBars.prototype.constructor = HealthManaBars;

HealthManaBars.prototype.update = function () {
    var hero = this.game.entities[1];

    this.healthPercent = hero.currentHP / hero.maxHP;
    this.manaPercent = hero.currentMP / hero.maxMP;
    Entity.prototype.update.call(this);
}

HealthManaBars.prototype.draw = function (ctx, xView, yView) {
    var hpWidth = 440 * this.healthPercent;     // width of hp bar in pixels
    var mpWidth = 323 * this.manaPercent;       // width of mp bar in pixels

    // draw background bars
    this.backgroundBars.drawFrame(this.game.clockTick, ctx, 0, 0, this.scale);

    // draw health bar
    ctx.save();
    if (this.healthPercent <= 0.25) {
        ctx.fillStyle = "red";
    } else if (this.healthPercent <= 0.75) {
        ctx.fillStyle = "yellow";
    } else {
        ctx.fillStyle = "green";
    }
    ctx.beginPath();
    ctx.moveTo(210 * this.scale, 40 * this.scale);
    ctx.lineTo((210 + hpWidth) * this.scale, 40 * this.scale);
    ctx.lineTo((183 + hpWidth) * this.scale, 90 * this.scale);
    ctx.lineTo(183 * this.scale, 90 * this.scale);
    ctx.closePath();
    ctx.fill();

    // draw mana bar
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(187 * this.scale, 90 * this.scale);
    ctx.lineTo((187 + mpWidth) * this.scale, 90 * this.scale);
    ctx.lineTo((166 + mpWidth) * this.scale, 130 * this.scale);
    ctx.lineTo(166 * this.scale, 130 * this.scale);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // draw overlay
    this.overlay.drawFrame(this.game.clockTick, ctx, 0, 0, this.scale);
    Entity.prototype.draw.call(this);
}