// Not in use right now and is broken


// takes in a text file named level
function createLevel(gameEngine, level) {
	
	
	//fh = fopen(getScriptPath(level), 0); // Open the file for reading
	fh = fopen(level, 0); 
	if(fh!=-1) // If the file has been successfully opened
	{
	    length = flength(fh);         // Get the length of the file
	    str = fread(fh, length);     // Read in the entire file
	    fclose(fh);                    // Close the file

	    
	    var y = 0; // the height
	// Display the contents of the file
	    for (var x = 0; x < str.length; x++)
	    {
	        var c = str.charAt(x);
	        
	        switch (c) {
	        case x: // X represents tile type A
	          // add tile entity at x * tilesize and y for y coordinates
	        	 var platform = new Platform(gameEngine, x * tilesize, y, 0);
	        	 gameEngine.addEntity(platform);
	          break;
	        case v: // V represents tile type B
	          // add tile entity
	        	var platform = new Platform(gameEngine, x * tilesize, y, 1);
	        	 gameEngine.addEntity(platform);
	          break;
	        case h:
	           // add hero entity
	        	var hero = new Hero(gameEngine);
	        	gameEngine.addEntity(hero);
	          break;
	        case e:
	          // add enemy entity
	        	 var e1 = new Cannon(gameEngine, 300, 490);
	        	 gameEngine.addEntity(e1);
	          break;
	        case n: // Moves down and resets the X value
	        	y += 52;
	        	x = 0;
	          break;
	        default:
	        	x += 52;
	      }
	        
	        
	    }
	}
	
}


