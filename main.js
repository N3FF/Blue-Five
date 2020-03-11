async function loadString(filePath) {
    let levelString;
    await fetch(filePath)
            .then(response => response.text())
			.then(text => levelString = text);
	console.log("Loaded " + filePath);
    return levelString;
}

var files = [
	// "./img/hero/Cyborg_Walk_L.png",
	// "./img/hero/Cyborg_Walk_R.png",
	"./img/hero/Cyborg_Walk2_L.png",
	"./img/hero/Cyborg_Walk2_R.png",
	"./img/hero/Cyborg_Idle_L.png",
	"./img/hero/Cyborg_Idle_R.png",
	// "./img/hero/Cyborg_Jump_L.png",
	// "./img/hero/Cyborg_Jump_R.png",
	"./img/hero/Cyborg_Jump2_L.png",
	"./img/hero/Cyborg_Jump2_R.png",
	"./img/hero/Cyborg_Shoot2_L.png",
	"./img/hero/Cyborg_Shoot2_R.png",
	"./img/environment/Background.png",
	"./img/environment/background_100x100.png",
	"./img/environment/background_100x100_light.png",
	"./img/environment/bricks.png",
	"./img/environment/floor.png",
	"./img/environment/floor_gap_left.png",
	"./img/environment/floor_gap_right.png",
	"./img/environment/invisible.png",
	"./img/environment/steel_block.png",
	"./img/environment/checkpoint.png",
	"./img/environment/spikes/steel_block_spikes.png",
	"./img/environment/spikes/floating_spikes.png",
	"./img/environment/spikes/floor_spikes.png",
	"./img/hud/HP_bars.png",
	"./img/hud/HP_bars_background.png",
	"./img/hud/Instructions.png",
	"./img/hud/Win.png",
	"./img/projectiles/rocket.png",
	"./img/projectiles/explosion.png",
	"./img/projectiles/fire.png",
	"./img/enemies/Cannon2_L.png",
	"./img/enemies/Cannon2_R.png",
	"./img/collectables/healthPack.png",
	"./img/collectables/manaPack.png"
];

var ASSET_MANAGER = new AssetManager();

files.forEach(function (file) {
	ASSET_MANAGER.queueDownload(file);
});

ASSET_MANAGER.downloadAll(async function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
	var bg = new Background(gameEngine);
	var healthManaBars = new HealthManaBars(gameEngine, 10, 10);
	var instructions = new Instructions(gameEngine, ctx.canvas.width - 370 * .75, 0);

	var levelText = await loadString("./levels/level1.txt");
	
	gameEngine.addEntity(bg);
	gameEngine.hudEntities.push(healthManaBars);
	gameEngine.hudEntities.push(instructions);

	var level = new Level(gameEngine, levelText);	
	var camera = new Camera(gameEngine.entities[1], 0, 0, ctx.canvas.width, ctx.canvas.height, level.width, level.height);

	gameEngine.init(ctx, camera);
	gameEngine.start();
	
});
