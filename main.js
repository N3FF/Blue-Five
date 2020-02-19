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
ASSET_MANAGER.queueDownload("./img/hud/HP_bars.png");
ASSET_MANAGER.queueDownload("./img/hud/HP_bars_background.png");
ASSET_MANAGER.queueDownload("./img/hud/Instructions.png");
ASSET_MANAGER.queueDownload("./img/projectiles/bullet.png");
ASSET_MANAGER.queueDownload("./img/projectiles/fire.png");
ASSET_MANAGER.queueDownload("./img/enemies/Cannon.png");
ASSET_MANAGER.queueDownload("./img/enemies/CannonR.png");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var hero = new Hero(gameEngine, 300, 400);
    var healthManaBars = new HealthManaBars(gameEngine, 0, 0);
    var bg = new Background(gameEngine);
    var camera = new Camera(0, 0, ctx.canvas.width, ctx.canvas.height, 1680, 1050);
    camera.follow(hero, ctx.canvas.width / 2, ctx.canvas.height / 4);           // hero will remain in the center of the screen horizontally      
                                                                                // and the bottom 1/4th vertically unless at map's edge
    var e1 = new Cannon(gameEngine, 300, 490);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(hero);
    
    
    //createLevel(gameEngine, "./Level1.txt");
    
 // The string here can be used until we figure out file loading
    var str = "xxn" +
    		  "xxn"+
    		  "xxn"+
    		  "xxn"+
    		  "xxn"+
    		  "xxn"+
    		  "xxvvvvv                v     n"+
    		  "xx                     v     n"+
    		  "xx                   vvvv          vvvvvvvvvvvv          vvvvvvvvvvvvv       vvvvvvvvvn" +
    		  "xx                                                                                      n"+
    		  "xx                          x                                                           n" +
    		  "xx                          x                                                           n" +
    		  "xx                 c        x                                                           n" +
    		  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx              xxxxxxxxxxxxxxx        xxxxxxxxxxn" +
    		  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx              xxxxxxxxxxxxxxx        xxxxxxxxxx";

    
    
    
// === Code for the level editor ====
    	var tilesize = 52;
        y = 0; // 
        x = 0;

    	    for (var i = 0; i < str.length; i++)
    	   { 
    	        var c = str.charAt(i);
    	        
    	        if (c === 'v'){
    	        	// add tile entity at x * tilesize and y for y coordinates
    	        	 var platform = new Platform(gameEngine, x * tilesize , y , 0);
    	        	 gameEngine.addEntity(platform);
    	        } else if (c === 'x'){
    	        	var platform = new Platform(gameEngine, x * tilesize, y, 1);
    	        	 gameEngine.addEntity(platform);
    	        } else if (c === 'h'){
    	        	var hero = new Hero(gameEngine, x * tilesize, y);
    	        	gameEngine.addEntity(hero);
    	        } else if (c === 'c'){
    	        	 var e1 = new Cannon(gameEngine, 300, 490);
    	        	 gameEngine.addEntity(e1);
    	        } else if (c === 'n'){
    	        	y += 52;
    	        	x = -1;
    	        } 
    	        x++;
    	       
    	        
    	        
    	    }
    	    
// === End of the level editor ===
    	    
    	    gameEngine.addEntity(healthManaBars);
    
   
// Previous level  	    

//    gameEngine.addEntity(e1);
//    for (var i = 450; i <= 1400; i += 50) {
//        var tile = new Platform(gameEngine, i, 400, 0);
//        gameEngine.addEntity(tile);
//    }
//    
//    //var tileSize = 52;
//    for (i = 0; i < 1820; i+= 52) {
//        for (j = 0; j < 156; j+=52) {
//            //this.tile1.drawFrame(this.game.clockTick, ctx, i * tileSize - xView, (600 + j * tileSize) - yView, 1);
//        	
//        	if (i < 200 || i > 400)
//            var tile = new Platform(gameEngine, i, j+652, 1);
//            gameEngine.addEntity(tile);
//        }
//
//    }

    gameEngine.init(ctx, camera);
    gameEngine.start();
});
