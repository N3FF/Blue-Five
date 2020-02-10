// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/Instructions.png");

ASSET_MANAGER.queueDownload("./img/Hero.png");
ASSET_MANAGER.queueDownload("./img/HeroSword.png");
ASSET_MANAGER.queueDownload("./img/HeroSwordR.png");
ASSET_MANAGER.queueDownload("./img/Background.png");
ASSET_MANAGER.queueDownload("./img/52Tile.png");
ASSET_MANAGER.queueDownload("./img/52Tilea.png");
ASSET_MANAGER.queueDownload("./img/HudPrototype1.png");
ASSET_MANAGER.queueDownload("./img/bullet.png");
ASSET_MANAGER.queueDownload("./img/fire.png");
ASSET_MANAGER.queueDownload("./img/Cannon.png");
ASSET_MANAGER.queueDownload("./img/CannonR.png");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var hero = new Hero(gameEngine);
    var e1 = new Cannon(gameEngine);
    
    var t1 = new Platform(gameEngine, 450, 400);
    var t2 = new Platform(gameEngine, 500, 400);
    var t3 = new Platform(gameEngine, 550, 400);
    var t4 = new Platform(gameEngine, 600, 400);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(hero);
    gameEngine.addEntity(e1);
    gameEngine.addEntity(t1);
    gameEngine.addEntity(t2);
    gameEngine.addEntity(t3);
    gameEngine.addEntity(t4);

    // gameEngine.addEntity(new Projectile(gameEngine));

    gameEngine.init(ctx);
    gameEngine.start();
});
