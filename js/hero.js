function Hero (x, y, life, field) {
    this.x = x;
    this.y = y;
    this.life= life;
    //on précise dans quel terrain se trouve le héros pour rendre les méthodes générales
    this.field = field;

    var hero = document.createElement("div");
    hero.setAttribute("id", "hero");
    document.body.appendChild(hero);

    var lifeBar = document.createElement("progress");
    lifeBar.setAttribute("id", "lifeBar");
    lifeBar.setAttribute("max", this.life);
    lifeBar.setAttribute("value", this.life);
    document.body.appendChild(lifeBar);
}

//les valeurs chiffrées doivent être adaptées au CSS
Hero.prototype.display = function() {
    var HTMLhero = document.getElementById("hero");
    HTMLhero.style.top = (this.y*50) + "px"; //devra être adapté automatiquement à la hauteur du sol
    HTMLhero.style.left = (this.x*70 + this.fieldPositionX*70) + "px";

    document.getElementById("lifeBar").setAttribute("value", this.life);
}

//placer le héros automatiquement sur le sol (chute !)
Hero.prototype.findGround = function () {
    var nextY = this.y + 1;
    //on situe x par rapport au tableau
    var actualX = this.x-1;
    while(this.field.checkBloc(nextY, actualX) == 0) {
        this.y += 1;
        nextY += 1;
        this.display();
    }

    if(this.field.checkBloc(nextY, actualX) == 2) {
        console.log("le prochain est un piège !");
        this.life-=10;
        this.display();
    }
}

/* Animation du Hero, changement de style selon direction. Fonction appelée par controls.js */
Hero.prototype.move = function(direction) {
    switch(direction) {
        case 1: // Si direction gauche, alors change couleur de fond
            document.getElementById("hero").style.backgroundColor = "yellow";
            this.x-=1;
            //console.log("Couleur");
            break;
        case 2: // Si direction haut, alors change couleur de fond
            document.getElementById("hero").style.backgroundColor = "purple";
            break;
        case 3: // Si direction droite, alors change couleur de fond
            document.getElementById("hero").style.backgroundColor = "green";
            this.x+=1;
            break;
        case 4: // Si direction bas, alors change couleur de fond
            document.getElementById("hero").style.backgroundColor = "blue";
            break;
    }

    this.display();
}

//renvoie la position du héros (utilisé dans field.move)
Hero.prototype.where = function() {
    //this.x-1 correspond à x situé par rapport au tableau
    return {heroPositionX: this.x-1, heroPositionY: this.y};
}

var fox = new Hero (1, 1, 100, game);
fox.display();
fox.findGround();