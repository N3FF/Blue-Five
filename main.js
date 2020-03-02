

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/hero/HeroSword.png");
ASSET_MANAGER.queueDownload("./img/hero/HeroSwordR.png");

ASSET_MANAGER.queueDownload("./img/hero/Cyborg_Walk_L.png");
ASSET_MANAGER.queueDownload("./img/hero/Cyborg_Walk_R.png");
ASSET_MANAGER.queueDownload("./img/hero/Cyborg_Idle_L.png");
ASSET_MANAGER.queueDownload("./img/hero/Cyborg_Idle_R.png");
ASSET_MANAGER.queueDownload("./img/hero/Cyborg_Jump_L.png");
ASSET_MANAGER.queueDownload("./img/hero/Cyborg_Jump_R.png");
ASSET_MANAGER.queueDownload("./img/hero/Cyborg_Shoot2_L.png");
ASSET_MANAGER.queueDownload("./img/hero/Cyborg_Shoot2_R.png");


ASSET_MANAGER.queueDownload("./img/environment/Background.png");
ASSET_MANAGER.queueDownload("./img/environment/52Tile.png");
ASSET_MANAGER.queueDownload("./img/environment/52Tilea.png");
ASSET_MANAGER.queueDownload("./img/environment/healthPack.png");
ASSET_MANAGER.queueDownload("./img/environment/skillPack.png");
ASSET_MANAGER.queueDownload("./img/hud/HP_bars.png");
ASSET_MANAGER.queueDownload("./img/hud/HP_bars_background.png");
ASSET_MANAGER.queueDownload("./img/hud/Instructions.png");
ASSET_MANAGER.queueDownload("./img/hud/Win.png");
ASSET_MANAGER.queueDownload("./img/projectiles/bullet.png");
ASSET_MANAGER.queueDownload("./img/projectiles/fire.png");
ASSET_MANAGER.queueDownload("./img/enemies/Cannon2_L.png");
ASSET_MANAGER.queueDownload("./img/enemies/Cannon2_R.png");



ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var hero = new Hero(gameEngine, 300, 400);
    var healthManaBars = new HealthManaBars(gameEngine, 10, 10);
	var bg = new Background(gameEngine);
	
	const levelDimensionsMap = {
		level1: { height: 1037, width: 13000},
		level2: { height: 1037, width: 3080}
	}

	const currentLevel = levelDimensionsMap.level2;
	console.log(currentLevel);
    var camera = new Camera(0, 0, ctx.canvas.width, ctx.canvas.height, 3080, currentLevel.height);
    camera.follow(hero, ctx.canvas.width / 2, ctx.canvas.height / 4);           // hero will remain in the center of the screen horizontally      
                                                                                // and the bottom 1/4th vertically unless at map's edge
    gameEngine.addEntity(bg);
    gameEngine.addEntity(hero);
    



	
    // load next level not implemented yet 
   const loadNextLevel = () =>{

   }
    
   loadLevel(gameEngine, "./levels/level1.txt", function () {
        gameEngine.addEntity(healthManaBars);
        gameEngine.init(ctx, camera);
        gameEngine.start();
   });
    	    
});
