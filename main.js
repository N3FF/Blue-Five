async function loadString(filePath) {
    let levelString;
    await fetch(filePath)
            .then(response => response.text())
			.then(text => levelString = text);
	console.log("Loaded " + filePath);
    return levelString;
}

var ASSET_MANAGER = new AssetManager();

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

ASSET_MANAGER.queueDownload("./img/hud/HP_bars.png");
ASSET_MANAGER.queueDownload("./img/hud/HP_bars_background.png");
ASSET_MANAGER.queueDownload("./img/hud/Instructions.png");
ASSET_MANAGER.queueDownload("./img/hud/Win.png");

ASSET_MANAGER.queueDownload("./img/projectiles/bullet.png");
ASSET_MANAGER.queueDownload("./img/projectiles/fire.png");

ASSET_MANAGER.queueDownload("./img/enemies/Cannon2_L.png");
ASSET_MANAGER.queueDownload("./img/enemies/Cannon2_R.png");


ASSET_MANAGER.downloadAll(async function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var healthManaBars = new HealthManaBars(gameEngine, 10, 10);
	var bg = new Background(gameEngine);
	// var levelText = 
	// "xx\n" +
	// "xx\n" +
	// "xx\n" +
	// "xx\n" +
	// "xx\n" +
	// "xx\n" +
	// "xx                                                                                        x\n" +
	// "xx                     v                                                                                 x\n" +
	// "xx                     v     \n" +
	// "xxvvvvv              vvvv          vvvvvvvvvvvv          vvvvvvvvvvvvv       vvvvvvvvv\n" +
	// "xx           c\n" +
	// "xx                                                                                                      xx              xx            x\n" +                                                 
	// "xx h                                                                                                                                  x\n" +
	// "xx                                                            c                                                                       x\n" +
	// "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx             xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx         vvv             vvv             vvv   xxxxxxxxxxxx\n" +                        
	// "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx             xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx                                               xxxxxxxxxxxx                                                                                            vv\n" +
	// "                                                                                                                                      xxxxxxxxxxxx                                                                                          xxxxxx\n" +    
	// "                                                                                                                                      xxxxxxxxxxxx                                                   xxxxxx         vvvvv           v     vvvvvvvvvv\n" +
	// "                                                                                                                                      xxxxxxxxxxxx                                  v   xxxx   xxxxxxxxxxxxxxxx               v           xvxvxvxvxv\n" +
	// "                                                                                                                                      xxxxxxxxxxxx                                  v\n" +
	// "                                                                                                                                      xxxxxxxxxxxx      c         c       c         v\n" +
	// "                                                                                                                                      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n";
	var levelText = await loadString("./levels/level2.txt");
	
    gameEngine.addEntity(bg);

	var level = new Level(gameEngine, levelText);	
	var camera = new Camera(gameEngine.entities[1], 0, 0, ctx.canvas.width, ctx.canvas.height, level.width, level.height);

	gameEngine.addEntity(healthManaBars);
	gameEngine.init(ctx, camera);
	gameEngine.start();

	
});
