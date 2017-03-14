function Ennemy (id, y, life, field) {
    this.id     = "game" + nbrGame + id;
    this.life   = life;
    this.field  = field;
    this.x      = Math.floor(Math.random() * this.field.width);
    this.y      = y;

    var fieldHTML = document.getElementById(this.field.id);
    var ennemy = document.createElement("div");
    ennemy.setAttribute("class", "ennemy");
    ennemy.setAttribute("id", this.id);
    fieldHTML.appendChild(ennemy);
}

//affiche l'ennemi, appelé dans init() (main.js) et par controls.js
Ennemy.prototype.display = function () {
    var HTMLennemy = document.getElementById(this.id);
    HTMLennemy.style.top = (this.y*50) + "px";
    HTMLennemy.style.left = ((this.x)*70) + "px";
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
        if((this.field.checkBloc(this.y, this.x-1) == 0) && (this.field.checkBloc(this.y+1, this.x-1) ==1)) {
            //la case quittée est libre
            this.field.writeBlock(this.y, this.x, 0);
            this.x -=1;
        }
    } else if ((Math.random()>0.5)) {
        //si la voie est libre
        if((this.field.checkBloc(this.y, this.x+1) == 0) && (this.field.checkBloc(this.y+1, this.x+1) ==1)) {
            //la case quittée est libre
            this.field.writeBlock(this.y, this.x, 0);
            this.x +=1;
        }
    }

    //annonce la case active comme étant occupée
    this.field.writeBlock(this.y, this.x, 4);
    this.display();
}