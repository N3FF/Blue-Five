function loadLevel(gameEngine, filePath, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            var tileSize = 52;
            var y = 0; 
            var x = 0;

            for (var i = 0; i < text.length; i++) { 
                var char = text.charAt(i);
                
                switch (char) {
                    case 'v':
                        // add tile entity at x * tilesize and y for y coordinates
                        var platform = new Platform(gameEngine, x * tileSize , y , 0);
                        gameEngine.addEntity(platform);
                        break;
                    case 'x':
                        var platform = new Platform(gameEngine, x * tileSize, y, 1);
                        gameEngine.addEntity(platform);
                        break;
                    case 'h':
                        var hero = new Hero(gameEngine, x * tileSize, y);
                        gameEngine.addEntity(hero);
                        break;
                    case 'c':
                        var e1 = new Cannon(gameEngine, x * tileSize, y);
                        gameEngine.addEntity(e1);
                        break;
                    case 'f':
                        var healthPack = new Collectable(gameEngine, x*tileSize, y, 'healthPack');
                        gameEngine.addEntity(healthPack);
                        break;
                    case 's':
                        var skillPack = new Collectable(gameEngine, x*tileSize, y, 'skillPack');
                        gameEngine.addEntity(skillPack);
                        break;
                    case '\n':
                        y += tileSize;
                        x = -1;
                        break;
                    default:
                        break;
                }
                x++;

            }
            console.log("map loaded");
            callback();
        });
}