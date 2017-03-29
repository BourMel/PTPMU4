/**
 * Classe Ennemy : permet de générer des ennemis
 * @param id : permet de choisir les id des ennemis en fonction du nombre de parties jouées
 * @param field : permet d'utiliser les fonctions du terrain quel qu'il soit
 * @constructor
 */

function Ennemy (id, field) {
    this.id     = "game" + nbrGame + id;
    this.life   = 1;
    this.field  = field;
    this.x      = Math.floor(Math.random() * this.field.width);
    this.y      = 0;

    var fieldHTML = document.getElementById(this.field.id);
    var ennemy = document.createElement("div");
    ennemy.setAttribute("class", "ennemy");
    ennemy.setAttribute("id", this.id);
    fieldHTML.appendChild(ennemy);
}

/* ****************************** METHODES ****************************** */
/* *********************************************************************** */

/*Affichage de l'ennemi
* Appelé dans main.js (fonction init() et dans controls.js*/
Ennemy.prototype.display = function () {
    var HTMLennemy = document.getElementById(this.id);
    HTMLennemy.style.top = (this.y*50) + "px";
    HTMLennemy.style.left = ((this.x)*70) + "px";
};

/*Fait tomber l'ennemi jusqu'au sol, retourne False en cas de chute hors terrain*/
Ennemy.prototype.findGround = function () {
    var nextY = this.y + 1;

    while(this.field.checkBloc(nextY, this.x) == 0) {
        this.y += 1;
        nextY += 1;

        if (this.y > this.field.height) {
            this.life = 0;
            return false;
        }
    }
};

/*Permet de détecter qu'un ennemi est mort*/
Ennemy.prototype.checkLife = function () {
    if(this.life == 0) {
        var HTMLennemy = document.getElementById(this.id);
        HTMLennemy.parentNode.removeChild(HTMLennemy);
        return false;
    } else {
        return true;
    }
};

/*Déplacement aléatoire des ennemis, lecture et écriture des cases*/
Ennemy.prototype.move = function () {
    if(Math.random()<0.5) {
        if((this.field.checkBloc(this.y, this.x-1) == 0) && (this.field.checkBloc(this.y+1, this.x-1) ==1)) {
            this.field.writeBlock(this.y, this.x, 0);
            this.x -=1;
        }
    } else if ((Math.random()>0.5)) {
        if((this.field.checkBloc(this.y, this.x+1) == 0) && (this.field.checkBloc(this.y+1, this.x+1) ==1)) {
            this.field.writeBlock(this.y, this.x, 0);
            this.x +=1;
        }
    }

    this.field.writeBlock(this.y, this.x, 4);
    this.display();
};