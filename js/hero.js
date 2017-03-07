function Hero (life, field) {
    this.x      = 0;
    this.y      = 0;
    this.startX = this.x;
    this.startY = this.y;
    this.speedY = 3;
    this.life   = life;
    this.score  = 0;
    this.field  = field;

    //heros
    var hero = document.createElement("div");
    hero.setAttribute("id", "hero");
    document.body.appendChild(hero);

    //barre de vie
    var lifeBar = document.createElement("progress");
    lifeBar.setAttribute("id", "lifeBar");
    lifeBar.setAttribute("max", this.life);
    lifeBar.setAttribute("value", this.life);
    document.body.appendChild(lifeBar);

    //score
    var score = document.createElement("div");
    score.setAttribute("id", "score");
    score.innerHTML = this.score;
    document.body.appendChild(score);
}

//les valeurs chiffrées doivent être adaptées au CSS
Hero.prototype.display = function() {
    var HTMLhero = document.getElementById("hero");
    HTMLhero.style.top = (this.y*50) + "px"; //devra être adapté automatiquement à la hauteur du sol
    HTMLhero.style.left = (this.x*70 + this.fieldPositionX*70) + "px";

    //barre de vie
    document.getElementById("lifeBar").setAttribute("value", this.life);
    //score (prenant en compte l'avancement dans le jeu)
    document.getElementById("score").innerHTML = this.score + this.x*10;
}

//placer le héros automatiquement sur le sol (chute !)
Hero.prototype.findGround = function () { //retourne vrai ou faux, function anim() utilise findGround sur objet global (et gère interval)
    var nextY = this.y + 1;

    //cas où on dépasse les limites du terrain (chute dans un trou)
    if (this.y+1+this.startY > this.field.height) {
        this.life = 0;
        return false;
    //cas "air" (et undefined en théorie, qui est géré au préalable par "if")
    } else if(this.field.checkBloc(nextY, this.x) == 0) {
        this.y += 1;
        nextY += 1;
        //indique à function anim (dans controls.js) que la chute continue
        return true;
    //si on marche sur un sol piégé
    } else if ((this.field.checkBloc(nextY, this.x) == 2)) {
        this.life-=10;
        this.score-=10;
        return false;
    } else {
        return false;
    }
}

/* Animation du Hero, changement de style selon direction. Fonction appelée par controls.js */
Hero.prototype.move = function(direction) {
    //la case quittée est vide
    //this.field.writeBlock(this.y, this.x, 0);

    switch(direction) {
        case 1: // Si direction gauche, alors change couleur de fond
            //document.getElementById("hero").style.backgroundColor = "yellow";

            this.x-=1;
            break;
        case 2: // Si direction haut, alors change couleur de fond
            //document.getElementById("hero").style.backgroundColor = "purple";
            var nextY = this.y + 1;
            var actualX = this.x-1;
            //si n'essaie pas de sauter à partir de l'air
            if(this.field.checkBloc(nextY, actualX) != 0) {
                this.y -= 1;
            }
            break;
        case 3: // Si direction droite, alors change couleur de fond
            //document.getElementById("hero").style.backgroundColor = "green";
            this.x+=1;
            break;
        case 4: // Si direction bas, alors change couleur de fond
            //document.getElementById("hero").style.backgroundColor = "blue";
            break;
    }

    //la case d'arrivée est occupée par le héros
    //this.field.writeBlock(this.y, this.x, 5);
    //console.log("case d'arrivée : x = " + this.x-1 + "et y = " + this.y + " et terrain = " + this.field.checkBloc(this.y, this.x-1));
/*
    //annonce la case active comme étant occupée
    //écrit sur les cases en prenant en compte le fait que le héros part de 1 par rapport
    //à ses coordonnées et de 0 par rapport au tableau
    this.field.writeBlock(this.y-this.startY, this.x-this.startX, 5);*/
    this.display();
}

Hero.prototype.checkLife = function() {
    if(this.life == 0) {
        return false; //annonce mort du perso
    } else {
        return true;
    }
}

//renvoie la position du héros (utilisé dans field.move)
Hero.prototype.where = function() {
    //this.x-1 correspond à x situé par rapport au tableau
    return {heroPositionX: this.x-1, heroPositionY: this.y};
}