//maxX prend pour valeur la longueur du terrain
function Item (id, maxX, y, field) {
    this.id     = id;
    this.x      = Math.floor(Math.random()*maxX);
    this.y      = y;
    this.field  = field;

    var item = document.createElement("div");
    item.setAttribute("class", "item");
    item.setAttribute("id", this.id);
    document.body.appendChild(item);
}

//affiche l'item
Item.prototype.display = function () {
    var HTMLitem = document.getElementById(this.id);
    HTMLitem.style.top = (this.y*50) + "px"; //devra être adapté automatiquement à la hauteur du sol
    HTMLitem.style.left = (this.x*70) + "px";
}

//lui fait trouver le sol
Item.prototype.findGround = function () {
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