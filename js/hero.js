function Hero () {
    var hero = document.createElement("div");
    hero.setAttribute("class", "hero");
    document.body.appendChild(hero);

}
    
Hero.prototype.display = function() {
    this.style.top = this.ground + "px"; //devra être adapté automatiquement à la hauteur du sol
}

//placer le héros automatiquement sur le sol (chute !)
Hero.prototype.findGround = function () {
    //si case dessous = air, déplacement auto vers le bas (gérer vitesse)
}


var renard = new Hero ();
renard.display();