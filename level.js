/**
 * @description Level class that builds level based off of string and stores level information
 * @param {GameEngine} game 
 * @param {String} levelText 
 */
function Level(game, levelText) {
    this.game = game;
    this.width = 0;
    this.height = 0;

    this.build(levelText);
}

Level.prototype = new Entity();
Level.prototype.constructor = Level;

/**
 * @description Builds level based off string and sets level's dimensions
 * @param {String} levelText string representing level
 */
Level.prototype.build = function (levelText) {
    var tileSize = 52;
    var y = 0; 
    var x = 0;

    for (var i = 0; i < levelText.length; i++) { 
        var char = levelText.charAt(i);
        
        switch (char) {
            case 'v':
                // add tile entity at x * tilesize and y for y coordinates
                var platform = new Platform(this.game, x * tileSize , y , 0);
                this.game.addEntity(platform);
                break;
            case 'x':
                var platform = new Platform(this.game, x * tileSize, y, 1);
                this.game.addEntity(platform);
                break;
            case 'h':
                var hero = new Hero(this.game, x * tileSize, y);
                this.game.entities.splice(1, 0, hero);              //entities[1] = hero
                break;
            case 'c':
                var e1 = new Cannon(this.game, x * tileSize, y);
                this.game.addEntity(e1);
                break;
            case '\n':
                y += tileSize;
                if (x > this.width / tileSize) this.width = tileSize * (x + 1);
                x = -1;
                break;
            default:
                break;
        }
        x++;
        this.height = y + tileSize;
    }
}