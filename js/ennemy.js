function Ennemy (id, y, life, field) {
    this.id     = id;
    this.life   = life;
    this.field  = field;
    this.xPix   = Math.floor(Math.random() * this.field.width);
    this.x      = this.xPix / widthBlock;
    this.yPix   = y * widthField;
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
    //HTMLennemy.style.top = (this.y*50) + "px";
    //HTMLennemy.style.left = ((this.x)*70) + "px";
    HTMLennemy.style.top = this.yPix + "px";
    HTMLennemy.style.left = this.xPix + "px";
}

//lui fait trouver le sol
Ennemy.prototype.findGround = function () {
    this.y = Math.floor(this.yPix / heightBlock);
    var nextY = this.y + 1;

    console.log(this.yPix);
    //on situe x par rapport au tableau
    //ennemi directement placé sur le sol
    while(this.field.checkBloc(nextY, this.x) == 0) {
        this.yPix +=1;
        nextY += 1;

        this.y = this.yPix / heightBlock;
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
            this.xPix -=1;
        }
    } else if ((Math.random()>0.5)) {
        //si la voie est libre
        if((this.field.checkBloc(this.y, this.x+1) == 0) && (this.field.checkBloc(this.y+1, this.x+1) ==1)) {
            //la case quittée est libre
            this.field.writeBlock(this.y, this.x, 0);
            this.xPix+=1;
        }
    }

    this.x = this.xPix / widthBlock;

    //annonce la case active comme étant occupée
    this.field.writeBlock(this.y, this.x, 4);
    this.display();
}