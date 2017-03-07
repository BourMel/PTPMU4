//maxX prend pour valeur la longueur du terrain
function Ennemy (id, maxX, y, life, field) {
    this.id     = id;
    this.x      = Math.floor(Math.random()*maxX);
    this.y      = y;
    this.life   = life;
    this.field  = field;

    var field = document.getElementById("field");
    var ennemy = document.createElement("div");
    ennemy.setAttribute("class", "ennemy");
    ennemy.setAttribute("id", this.id);
    field.appendChild(ennemy);
}

//affiche l'ennemi, appelé dans init() (main.js) et par controls.js
Ennemy.prototype.display = function () {
    var HTMLennemy = document.getElementById(this.id);
    HTMLennemy.style.top = (this.y*50) + "px";
    //prend en compte le déplacement du terrain
    HTMLennemy.style.left = ((this.x + this.field.positionX)*70) + "px";
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

Ennemy.prototype.move = function () {
    //vérifie état du sol à la prochaine case
    if(Math.random()<0.5) {
        //si la voie est libre
        if(((this.field.checkBloc(this.y, this.x-1) == 0) && (this.field.checkBloc(this.y+1, this.x-1) == 1)) || ((this.field.checkBloc(this.y, this.x-1) == 0) && (this.field.checkBloc(this.y+1, this.x-1) ==3))) {
            this.x -=1;
            //la case quittée est libre
            this.field.writeBlock(this.y, this.x+1, 0);
        }
    } else if ((Math.random()>0.5)) {
        //si la voie est libre
        if((this.field.checkBloc(this.y, this.x+1) == 0) && (this.field.checkBloc(this.y+1, this.x+1) !=0) ) {
            this.x +=1;
            //la case quittée est libre
            this.field.writeBlock(this.y, this.x-1, 0);
        }
    }

    //annonce la case active comme étant occupée
    this.field.writeBlock(this.y, this.x, 4);
    this.display();
}