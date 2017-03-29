/**
 * Détecte, selon les touches du clavier, la direction choisie par le joueur
 * Ajuste les coordonnées des différents objets par rapport aux mouvements éventuels du terrain
 * @param event
 */

document.onkeydown = function(event) {
    switch(event.keyCode) {
        case "NULL":
            var direction = 0;
            break;
        case 37:
            /*Gauche*/
            direction = 1;
            break;
        case 38:
            /*Haut*/
            direction = 2;
            break;
        case 39:
            /*Droite*/
            direction = 3;
            break;
        case 40:
            /*Bas*/
            direction = 4;
            break;
    }

    /*On récupère la position du héros*/
    var positionFox = fox.where();

    /*Si on a un mouvement du terrain (pas de collision) ou du renard (haut/bas) alors...*/
    if((game.move(direction, positionFox.heroPositionX, positionFox.heroPositionY) == true) || (direction == 2) || (direction == 4)) {
        fox.move(direction);

        for(var i = 0 ; i < tabEnnemy.length ; i++) {
            tabEnnemy[i].display();
        }

        for(var d = 0 ; d < tabItems.length ; d++) {
            tabItems[d].checkLife();
        }
    }
};
