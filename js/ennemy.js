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
    var actualX = this.x-1;

    if(this.field.checkBloc(nextY, actualX) == 0) {
        this.y += 1;
        nextY += 1;
        return true;
    } else {
        return false;
    }
}