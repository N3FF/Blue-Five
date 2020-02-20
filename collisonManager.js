/**
 * General collison function
 */


function collisionDetected (entity1, entity2) {
	
	return entity1.x + entity1.width >= entity2.x  
            && entity1.x <= entity2.x + entity2.width
            && entity1.y + entity1.height >= entity2.y
            && entity1.y < entity2.y + entity2.height;
	
}