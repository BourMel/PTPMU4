/**
 * Création du héros
 * @param id
 * @param life : Permet de modifier le nombre de points de vie en fonction de la difficulté voulue
 * @param field : permet d'utiliser les fonctions du terrain quel qu'il soit
 * @constructor
 */

function Hero (id, life, field) {
    this.id     = id;
    this.x      = 0;
    this.y      = 0;
    this.life   = life;
    this.score  = 0;
    this.field  = field;

    //heros
    var hero = document.createElement("div");
    hero.setAttribute("id", this.id);
    document.body.appendChild(hero);

    //barre de vie
    var lifeBar = document.createElement("progress");
    lifeBar.setAttribute("id", "lifeBar" + nbrGame);
    lifeBar.setAttribute("max", this.life);
    lifeBar.setAttribute("value", this.life);
    document.body.appendChild(lifeBar);

    //score
    var score = document.createElement("div");
    score.setAttribute("id", "score" + nbrGame);
    score.innerHTML = this.score;
    document.body.appendChild(score);
}

/* ****************************** METHODES ****************************** */
/* *********************************************************************** */

/*Affichage du héros*/
Hero.prototype.display = function() {
    var HTMLhero = document.getElementById(this.id);
    HTMLhero.style.top = (this.y*50) + "px";
    HTMLhero.style.left = (this.x*70 + this.fieldPositionX*70) + "px";

    //barre de vie
    document.getElementById("lifeBar" + nbrGame).setAttribute("value", this.life);
    //score
    document.getElementById("score" + nbrGame).innerHTML = this.score + this.x*10;
};

/*Détection du sol*/
Hero.prototype.findGround = function () {
    var nextY = this.y + 1;
    
    //chute dans un trou
    if (this.y+1 > this.field.height-1) {
        this.life = 0;
        return false;
    }
    
    // Cas "air"
    else if(this.field.checkBloc(nextY, this.x) == 0) {
        this.y += 1;

        this.field.writeBlock(this.y-1, this.x, 0);
        this.field.writeBlock(this.y, this.x, 5);

        //indique à function anim (dans controls.js) que la chute continue
        return true;
        
    //cas "item"
    } else if (this.field.checkBloc(nextY, this.x) == 7) {
        this.y += 1;

        this.field.writeBlock(this.y-1, this.x, 0);
        this.field.writeBlock(this.y, this.x, 5);

        for(var c = 0 ; c < tabItems.length ; c++) {
            tabItems[c].checkLife();
        }

        this.score+=50;
        this.display();
        
        //indique à function anim (dans controls.js) que la chute continue
        return true;
    }
    
    //cas "piège"
    else if ((this.field.checkBloc(nextY, this.x) == 2)) {
        this.life-=10;
        this.score-=10;
        blink();
        return false;
    }

    else {
        return false;
    }
};

/*Perte de vie en cas de contact latéral avec un ennemi*/
Hero.prototype.findEnnemy = function () {
    var leftToHero = this.x-1;
    var rightToHero = this.x+1;
    
    if((this.field.checkBloc(this.y, leftToHero) == 4) || (this.field.checkBloc(this.y, rightToHero) == 4)) {
        this.life-=10;
        this.score-=10;
        blink();
    }
};

/*Animation du héros et changement de ses coordonnées.
*Appelé par controls.js si pas de collision*/
Hero.prototype.move = function(direction) {
    this.field.writeBlock(this.y, this.x, 0);

    switch(direction) {
        case 1: // Gauche
            //document.getElementById("hero").style.backgroundColor = "yellow";
            this.x -= 1;
            break;
        case 2: // Haut
            //document.getElementById("hero").style.backgroundColor = "purple";
            var nextY = this.y + 2;
            var lastY = this.y - 1;
            
            //si n'essaie pas de sauter à partir de l'air ou juste en dessous d'une plateforme
            if ((this.field.checkBloc(lastY, this.x) != 6) && (this.field.checkBloc(nextY, this.x) != 0)) {
                this.y -= 1;
            }
            break;
        case 3: // Droite
            //document.getElementById("hero").style.backgroundColor = "green";
            this.x += 1;
            break;
        case 4: // Bas
            //document.getElementById("hero").style.backgroundColor = "blue";
            break;
    }

    this.field.writeBlock(this.y, this.x, 5);
    this.display();
};

/*Annonce vie/mort du personnage*/
Hero.prototype.checkLife = function() {
    if(this.life == 0) {
        return false;
    } else {
        return true;
    }
};

/*Renvoie la position du héros. Utilisé dans field.move*/
Hero.prototype.where = function() {
    return {heroPositionX: this.x, heroPositionY: this.y};
};