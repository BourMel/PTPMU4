function Hero (x, y) {
    this.x = x;
    this.y = y;

    var hero = document.createElement("div");
    hero.setAttribute("class", "hero");
    document.body.appendChild(hero);

}

//les valeurs chiffrées doivent être adaptées au CSS
Hero.prototype.display = function() {
    this.style.top = (this.y*50) + "px"; //devra être adapté automatiquement à la hauteur du sol
    this.style.left = (this.x*70) + "px";
}

//placer le héros automatiquement sur le sol (chute !)
Hero.prototype.findGround = function () { //sera probablement à rassembler avec fonction move
    //si case dessous = air, déplacement auto vers le bas (gérer vitesse)
    var nextY = this.y + 1;
    if(jeu.checkBloc(nextY, this.x) == 0) {
        this.x += 1;
    }
    renard.display();
}


var renard = new Hero ();
renard.display();
renard.findGround();