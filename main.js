

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
    var camera = new Camera(0, 0, ctx.canvas.width, ctx.canvas.height, 13824, 1037);
    camera.follow(hero, ctx.canvas.width / 2, ctx.canvas.height / 4);           // hero will remain in the center of the screen horizontally      
                                                                                // and the bottom 1/4th vertically unless at map's edge
    gameEngine.addEntity(bg);
    gameEngine.addEntity(hero);
    
//  // The string here can be used until we figure out file loading
  var str = "xxn"+
"xxn"+
"xxn"+
"xxn"+
"xxn"+
"xxn"+
"xx                                                                                         n"+
"xx                     v                                                                  v              vn"+
"xx                     v                                                                  n"+
"xxvvvvv              vvvv          vvvvvvvvvvvv          vvvvvvvvvvvvv       vvvvvvvvvn"+
"xx           c                c                                                       n"+
"xx                                                                   c                                  vv              vv            x  n"+                                                   
"xx                                                                                                                                    xn"+
"xx                                                                                                                                    xn"+
"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx             xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx         vvv             vvv             vvv   xxxxxxxxxxxx n"+                              
"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx             xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx                                               xxxxxxxxxxxx                                                                                            www     n"+
"                                                                                                                                      xxxxxxxxxxxxx                                                                                         xxxxxxx   n"+          
"                                                                                                                                      xxxxxxxxxxxx                                                   xxxxxx         vvvvv           v     vvvvvvvvvvv n"+
"                                                                                                                                      xxxxxxxxxxxx      c         c       c         v   xxxx   xxxxxxxxxxxxxxxx               v           xvxvxvxvxvx n"+
"                                                                                                                                      xxxxxxxxxxxx                                  vn"+
"                                                                                                                                      xxxxxxxxxxxx                                  vn"+
"                                                                                                                                      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxn";
  
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
	        	 var e1 = new Cannon(gameEngine, x * tilesize, y);
	        	 gameEngine.addEntity(e1);
	        } else if (c === 'n'){
	        	y += 52;
	        	x = -1;
	        }  else if (c === 'w'){
	        	var platform = new Platform(gameEngine, x * tilesize, y, 1, true);
	        	 gameEngine.addEntity(platform);
	        }
	        x++;
	       
	        
	        
	    }
    
    
    
   // loadLevel(gameEngine, "./levels/level1.txt", function () {
        gameEngine.addEntity(healthManaBars);
        gameEngine.init(ctx, camera);
        gameEngine.start();
  //  });
    	    
});
