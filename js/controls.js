document.onkeydown = function(event) {
    switch(event.keyCode) {
        case 37:
            direction = 1;
            //console.log("Left");
            break;
        case 38:
            direction = 2;
            //console.log("Up");
            break;
        case 39:
            direction = 3;
            //console.log("Right");
            break;
        case 40:
            direction = 4;
            //console.log("Down");
            break;
    }
    

    //lit la position de fox pour qu'elle puisse être utilisée dans le game.move (gestion collision)
    var positionFox = fox.where();
    //ainsi, fox.move n'est exécuté que s'il n'y a pas eu de collision, et ses valeurs X et Y ne changent que dans ce cas-là
    if((game.move(direction, positionFox.heroPositionX, positionFox.heroPositionY) == true) || (direction == 2) || (di
                                                                                                                    rection == 4)) {
        fox.move(direction);
        //chute après chaque déplacement ?
        //var intervalFalling = setInterval(fox.findGround(), 1000);   
    }
    
}
