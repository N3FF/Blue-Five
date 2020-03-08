function WinTile (game, x, y) {
    this.width = 52;
    this.height = 52;
    this.type = TYPES.WIN;

    Entity.call(this, game, x, y);
}

WinTile.prototype = new Entity();
WinTile.prototype.constructor = WinTile;

