function Field (height, width, maxHeightGround, positionX) {
    this.height = height;
    this.width = width;
    this.maxHeightGround = maxHeightGround;
    this.positionX = positionX;
    
    //pour manipuler la difficulté du niveau, les probabilités doivent être un paramètre de la fonction
    
    /*this.content définit la nature de chaque case du tableau, ainsi :
    air = 0
    sol = 1
    piège = 2
    bosse = 3
    ennemi = 4
    hero = 5
    */
    this.content = new Array(this.height * this.width);
    
    //tout le tableau prend d'abord la valeur "air"
    for(i=0 ; i<this.height*this.width;i++) {
        this.content[i] = 0;
    }
    
    /*//pour chaque colonne
    for(j=0 ; j<this.width ; j++) {
        //la dernière ligne devient sol
        this.content[this.width*(this.height-1) + j] = 1;
    }*/
    
    //création du sol (à hauteur réglable)
    for(k=(this.height-this.maxHeightGround) ; k < this.height ; k++) {
        //parcours colonnes
        for(l=0 ; l<this.width ; l++) {
            //if(Math.random() < 0.8) {
                //ajoute hauteur au sol
                this.content[k*this.width+l] = 1; 
                //k*this.width afficherait la première colonne
            //}
        }
    }
    
    //création de bosses du terrain (parcours de la ligne au dessus de l'horizon)
    for(n=0 ; n < this.width ; n++) {
        //si l'un des 2 précédents = sol, transformer en air automatiqu.
        if((this.content[(this.height-1-this.maxHeightGround) * this.width + n-1]) == 1 || (this.content[(this.height-1-this.maxHeightGround) * this.width + n-2]) == 1) {
            this.content[(this.height-1-this.maxHeightGround) * this.width + n] = 0;
        //probabilité que pas de bosse
        } else if(Math.random() < 0.8) {
           this.content[(this.height-1-this.maxHeightGround) * this.width + n] = 0;
        } else {
            if(Math.random() < 0.05) {
                this.content[(this.height-1-this.maxHeightGround) * this.width + n] = 2; //valeur piège
            } else {
                this.content[(this.height-1-this.maxHeightGround) * this.width + n] = 3;//valeur bosse
            }
        }
    }
    
    //faire en sorte que la deuxième colonne (position héros) ne soit pas un creux
    //création des creux du terrain (parcours de la ligne de l'horizon)
    for(m=0 ; m < this.width ; m++) {
        //si l'un des 2 précédents = air, ou si celui du dessus=bosse ou piege, transformer en sol automatiqu
        if((this.content[(this.height-this.maxHeightGround) * this.width + m-1]) == 0 || (this.content[(this.height-this.maxHeightGround) * this.width + m-2]) == 0 || (this.content[(this.height-1-this.maxHeightGround) * this.width + m]) == 3 || (this.content[(this.height-1-this.maxHeightGround) * this.width + m]) == 2) {
            this.content[(this.height-this.maxHeightGround) * this.width + m] = 1;
        //probabilité que pas de creux
        } else if(Math.random() < 0.8) {
            if(Math.random() < 0.05) {
                this.content[(this.height-this.maxHeightGround) * this.width + m] = 2; //piège
            } else {
                this.content[(this.height-this.maxHeightGround) * this.width + m] = 1; //sol
            }
        } else {
            //création d'un creux sur toute la hauteur
            for(o=0; o < this.height ; o++) {
                this.content[(this.height-this.maxHeightGround+o) * this.width + m] = 0;
            }
        }
    }
}

Field.prototype.display = function () {
    var field = document.createElement("div");
    field.setAttribute("id", "field");
    document.body.appendChild(field);

    var HTMLfield = document.getElementById("field");
    HTMLfield.style.left = (this.positionX*70) + "px";

    for(i=0 ; i<this.width ; i++) {
        for(j=0 ; j<this.height ; j++) {
            var bloc = document.createElement("div");
            
            //si valeur air
            if(this.content[j * this.width + i] == 0) {
                bloc.setAttribute("class", "air");
            } else if (this.content[j * this.width + i] == 1) {
                bloc.setAttribute("class", "sol");
            } else if (this.content[j * this.width + i] == 2) {
                bloc.setAttribute("class", "piege");
            } else if (this.content[j * this.width + i] == 3) {
                bloc.setAttribute("class", "bosse");
            }

            //à adapter à la taille des blocs
            bloc.style.left = (i*70) + "px";
            bloc.style.top = (j*50) + "px";
            HTMLfield.appendChild(bloc);
        }
    }
}

//lit quel type de case (utilisé dans Hero.findGround)
Field.prototype.checkBloc = function (ligne, colonne) {
    return this.content[ligne*this.width + colonne];
}

//écrit sur la case
Field.prototype.writeBlock = function (ligne, colonne, value) {
    this.content[ligne*this.width + colonne] = value;
}

//déplace le décor (appelé par controls.js)
Field.prototype.move = function(direction, heroX, heroY) {
    //si se dirige vers autre chose que de l'air, ne déplace pas le décor
    var leftToHero = heroX-1;
    var rightToHero = heroX+1;
    var didMove;

    if(direction==1 && this.checkBloc(heroY, leftToHero)==0 || direction==3 && this.checkBloc(heroY, rightToHero)==0) { //gauche
        switch(direction) {
            case 1: //gauche
                this.positionX += 1;
                break;
            case 3: //droite
                this.positionX -= 1;
                break;
        }
        didMove=true;
    } else {
        didMove=false;
    }

    this.display();
    //indique si un mouvement ou une collision a eu lieu (utilisé dans controls.js)
    return didMove;
}