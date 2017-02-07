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

//la valeur fieldPositionX correspond à la valeur choisie dans Field.positionX (voir si utile)
var fox = new Hero (1, 1, 0);
fox.display();
fox.findGround();