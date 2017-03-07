//maxX prend pour valeur la longueur du terrain
function Item (id, maxX, y, life, field) {
    this.id     = id;
    this.x      = Math.floor(Math.random()*maxX);
    this.y      = y;
    this.life   = life;
    this.field  = field;

    var field = document.getElementById("field"); 
    var item = document.createElement("div"); //créé une div qui s'appelle item
    item.setAttribute("class", "item");
    item.setAttribute("id", this.id);
    field.appendChild(item); //ajoute la div au terrain
}

//affiche l'item, appelé dans init() (main.js) et par controls.js
Item.prototype.display = function () {
    var HTMLitem = document.getElementById(this.id);
    HTMLitem.style.top = (this.y*50) + "px";
    //prend en compte le déplacement du terrain
    HTMLitem.style.left = ((this.x + this.field.positionX)*70) + "px";
}

//lui fait trouver le sol
Item.prototype.findGround = function () {
    var nextY = this.y + 1;
    //on situe x par rapport au tableau
    var actualX = this.x;

    //item directement placé sur le sol
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
Item.prototype.checkLife = function () {
    if(this.life == 0) {
        var HTMLitem = document.getElementById(this.id);
        HTMLitem.parentNode.removeChild(HTMLitem);
        return false;
    } else {
        return true;
    }
}


