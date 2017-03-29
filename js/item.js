/**
 *Classe Item : permet de générer des items à collecter (gain de points)
 * @param id : permet de choisir les id des ennemis en fonction du nombre de parties jouées
 * @param field : permet d'utiliser les fonctions du terrain quel qu'il soit
 * @constructor
 */

function Item (id, field) {
    this.id     = "game" + nbrGame + id;
    this.field  = field;
    this.x      = Math.floor(Math.random()*this.field.width);
    this.y      = 0;
    this.life   = 1;

    var fieldHTML = document.getElementById("field" + nbrGame);
    var item = document.createElement("div");
    item.setAttribute("class", "item");
    item.setAttribute("id", this.id);
    fieldHTML.appendChild(item);
}

/* ****************************** METHODES ****************************** */
/* *********************************************************************** */

/*Affichage de l'item
 * Appelé dans main.js (fonction init() et dans controls.js*/
Item.prototype.display = function () {
    var HTMLitem = document.getElementById(this.id);
    HTMLitem.style.top = (this.y*50) + "px";
    HTMLitem.style.left = ((this.x + this.field.positionX)*70) + "px";
};

/*Fait tomber l'item jusqu'au sol, retourne False en cas de chute hors terrain*/
Item.prototype.findGround = function () {
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

/*Permet de détecter qu'un item est "mort"*/
Item.prototype.checkLife = function () {
    if((this.field.checkBloc(this.y, this.x) == 5) || (this.life ==0)) {
        var HTMLitem = document.getElementById(this.id);
        HTMLitem.parentNode.removeChild(HTMLitem);
        return false;
    } else {
        return true;
    }
};

/*annonce la case active comme étant occupée*/
Item.prototype.move = function () {
    this.field.writeBlock(this.y, this.x, 7);
    this.display();
};