document.onkeydown = function(event) {
    switch(event.keyCode) {
        case "NULL":
            var direction = 0;
            break;
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

    if((game.move(direction, positionFox.heroPositionX, positionFox.heroPositionY) == true) || (direction == 2) || (direction == 4)) {
        fox.move(direction);

        for(var i = 0 ; i < tabEnnemy.length ; i++) {
            //réaffiche à chaque mouvement en prenant en compte la postion du terrain
            tabEnnemy[i].display();
        }
        //chute après chaque déplacement ?
        //var intervalFalling = setInterval(fox.findGround(), 1000);
    }
}
