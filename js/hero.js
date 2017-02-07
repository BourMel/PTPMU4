function Hero (x, y, fieldPositionX) {
    this.x = x;
    this.y = y;
    this.fieldPositionX = fieldPositionX;

    var hero = document.createElement("div");
    hero.setAttribute("id", "hero");
    document.body.appendChild(hero);
}

//les valeurs chiffrées doivent être adaptées au CSS
Hero.prototype.display = function() {
    var HTMLhero = document.getElementById("hero");
    HTMLhero.style.top = (this.y*50) + "px"; //devra être adapté automatiquement à la hauteur du sol
    HTMLhero.style.left = (this.x*70 + this.fieldPositionX*70) + "px";
}

//placer le héros automatiquement sur le sol (chute !)
Hero.prototype.findGround = function () {
    var nextY = this.y + 1;
    while(game.checkBloc(nextY, this.x) == 0) {
        this.y += 1;
        nextY += 1;
        this.display();
    }
}

/* Animation du Hero, changement de style selon direction. Fonction appelée par controls.js */
Hero.prototype.move = function(direction) {
    switch(direction) {
        case 1: // Si direction gauche, alors change couleur de fond
            document.getElementById("hero").style.backgroundColor = "yellow";
            console.log("Couleur");
            break;
        case 2: // Si direction haut, alors change couleur de fond
            document.getElementById("hero").style.backgroundColor = "purple";
            break;
        case 3: // Si direction droite, alors change couleur de fond
            document.getElementById("hero").style.backgroundColor = "green";
            break;
        case 4: // Si direction bas, alors change couleur de fond
            document.getElementById("hero").style.backgroundColor = "blue";
            break;
    }
    this.display();
}

//le heros est créé dans main.js
var fox = new Hero (1, 1, 0);
fox.display();
fox.findGround();