//maxX prend pour valeur la longueur du terrain
function Ennemy (id, maxX, y, life, field) {
    this.id     = id;
    this.x      = Math.floor(Math.random()*maxX);
    this.y      = y;
    this.life   = life;
    this.field  = field;

    var ennemy = document.createElement("div");
    ennemy.setAttribute("class", "ennemy");
    ennemy.setAttribute("id", this.id);
    document.body.appendChild(ennemy);
}

//affiche l'ennemi
Ennemy.prototype.display = function () {
    var HTMLennemy = document.getElementById(this.id);
    HTMLennemy.style.top = (this.y*50) + "px"; //devra être adapté automatiquement à la hauteur du sol
    HTMLennemy.style.left = (this.x*70) + "px";
}

//lui fait trouver le sol
Ennemy.prototype.findGround = function () {
    var nextY = this.y + 1;
    //on situe x par rapport au tableau
    var actualX = this.x;

    //ennemi directement placé sur le sol
    while(this.field.checkBloc(nextY, actualX) == 0) {
        this.y += 1;
        nextY += 1;
        
        //si dépasse limites du terrain
        if (this.y > this.field.height) {
            this.life = 0;
            return false;
        }
    }
}

//si plus de vie, return false
Ennemy.prototype.checkLife = function () {
    if(this.life == 0) {
        var HTMLennemy = document.getElementById(this.id);
        HTMLennemy.parentNode.removeChild(HTMLennemy);
        return false;
    } else {
        return true;
    }
}

//déplacement en même temps que le terrain
Ennemy.prototype.move = function () {
    console.log(this.field.move());
    //trop long, associer les ennemis aux coordonnées du terrain ?
}