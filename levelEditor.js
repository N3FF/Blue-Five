/**
 * Level Editor
 */

// takes in a text file named level
function Hero(gameEngine, level) {
	
	
	fh = fopen(getScriptPath(level), 0); // Open the file for reading
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
	        case x:
	          // add tile entity at x * tilesize and y for y coordinates
	        	 var platform = new Platform(gameEngine, x * tilesize, y);
	        	 gameEngine.addEntity(platform);
	          break;
	        case v:
	          // add tile entity
	          break;
	        case h:
	           // add hero entity
	          break;
	        case e:
	          // add enemy entity
	          break;
	        case n:
	           // add new line
	        	y += 52;
	          break;
	      }
	        
	        
	    }
	}
	
}


