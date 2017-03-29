/**
 * Classe terrain : génère un terrain
 * @param id : chaque terrain a un ID unique, y compris en cas de Game Over, pour éviter des problèmes de CSS
 * @param height : nombre de cases en hauteur
 * @param width : nombre de cases en largeur
 * @param maxHeightGround : hauteur du sol (en nombre de cases)
 * @constructor
 */

function Field (id, height, width, maxHeightGround) {
    this.id = id;
    this.height = height;
    this.width = width;
    this.maxHeightGround = maxHeightGround;
    this.positionX = 0;
    
    /* Cases :
    Air = 0
    Sol = 1
    Piège = 2
    Bosse (terrain) = 3
    Ennemi = 4
    Héros = 5
    Plateforme = 6
    Item à collecter = 7
    */

    this.content = new Array(this.height * this.width);

    //tout le tableau prend d'abord la valeur "air"
    for(i=0 ; i<this.height*this.width;i++) {
        this.content[i] = 0;
    }
    
    //création du sol (à hauteur réglable)
    for(k=(this.height-this.maxHeightGround) ; k < this.height ; k++) {
        for(l=0 ; l<this.width ; l++) {
            this.content[k*this.width+l] = 1;
        }
    }
    
    //création de bosses (parcours de la ligne au dessus de l'horizon)
    for(n=0 ; n < this.width ; n++) {
        //si l'un des 2 précédents == sol, alors on donne la valeur "air"
        if((this.content[(this.height-1-this.maxHeightGround) * this.width + n-1]) == 1 || (this.content[(this.height-1-this.maxHeightGround) * this.width + n-2]) == 1) {
            this.content[(this.height-1-this.maxHeightGround) * this.width + n] = 0;
        //sinon, aléatoire
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

    //création des creux du terrain (parcours de la ligne de l'horizon)
    for(m=0 ; m < this.width ; m++) {
        //si l'un des 2 précédents == air, si on a une bosse ou un piège, on donne la valeur "sol"
        if((this.content[(this.height-this.maxHeightGround) * this.width + m-1]) == 0 || (this.content[(this.height-this.maxHeightGround) * this.width + m-2]) == 0 || (this.content[(this.height-1-this.maxHeightGround) * this.width + m]) == 3 || (this.content[(this.height-1-this.maxHeightGround) * this.width + m]) == 2) {
            this.content[(this.height-this.maxHeightGround) * this.width + m] = 1;
        //sinon aléatoire
        } else if(Math.random() < 0.8) {
            if(Math.random() < 0.05) {
                this.content[(this.height-this.maxHeightGround) * this.width + m] = 2; //piège
            } else {
                this.content[(this.height-this.maxHeightGround) * this.width + m] = 1; //sol
            }
        } else {
            //si on crée un creux, on le fait sur toute la hauteur
            for(o=0; o < this.height ; o++) {
                this.content[(this.height-this.maxHeightGround+o) * this.width + m] = 0;
            }
        }
    }
    
    //création de plateformes
    for(var i = 0; i < this.width; i++) {
        if(Math.random() < 0.2) {
            this.content[(this.height - this.maxHeightGround - 3) * this.width + i] = 6;
        } else if ((Math.random() > 0.2) && (Math.random() < 0.4)) {
            this.content[(this.height - this.maxHeightGround - 5) * this.width + i] = 6;
        }
    }

    // contruction HTML
    var field = document.createElement("div");
    field.setAttribute("id", this.id);
    document.body.appendChild(field);
}


/* ****************************** METHODES ****************************** */
/* *********************************************************************** */


/*Affichage du terrain*/
Field.prototype.display = function () {
    var HTMLfield = document.getElementById(this.id);
    HTMLfield.style.left = (this.positionX*70) + "px";
    
    var platform = document.createElement("div");
    platform.setAttribute("id", "wrap-platform");
    HTMLfield.appendChild(platform);

    for(i=0 ; i<this.width ; i++) {
        for(j=0 ; j<this.height ; j++) {
            var bloc = document.createElement("div");

            if(this.content[j * this.width + i] == 0) {
                bloc.setAttribute("class", "air");
            } else if (this.content[j * this.width + i] == 1) {
                bloc.setAttribute("class", "sol");
            } else if (this.content[j * this.width + i] == 2) {
                bloc.setAttribute("class", "piege");
            } else if (this.content[j * this.width + i] == 3) {
                bloc.setAttribute("class", "bosse");
            } else if (this.content[j * this.width + i] == 6) {
                bloc.setAttribute("class", "platform");
            }

            bloc.style.left = (i*70) + "px";
            bloc.style.top = (j*50) + "px";
            HTMLfield.appendChild(bloc);
        }
    }
};

/*retourne le type de case correspondant aux paramètres*/
Field.prototype.checkBloc = function (ligne, colonne) {
    return this.content[ligne*this.width + colonne];
};

/*écrit sur une case donnée*/
Field.prototype.writeBlock = function (ligne, colonne, value) {
    this.content[ligne*this.width + colonne] = value;
};

/*déplace le décor latéralement (Appelé par controls.js)*/
Field.prototype.move = function(direction, heroX, heroY) {
    var leftToHero = heroX-1;
    var rightToHero = heroX+1;
    var didMove;

    //si on va vers un item
    if(direction==1 && this.checkBloc(heroY, leftToHero)==7 || direction==3 && this.checkBloc(heroY, rightToHero)==7) {
        fox.score += 50;
        fox.display();
        
        switch(direction) {
            case 1: //gauche
                this.positionX += 1;
                break;
            case 3: //droite
                this.positionX -= 1;
                break;
        }
        
        didMove = true;
    } else if(direction==1 && this.checkBloc(heroY, leftToHero)==0 || direction==3 && this.checkBloc(heroY, rightToHero)==0) {
        switch(direction) {
            case 1: //gauche
                if (heroX > 0) {
                    this.positionX += 1;
                }
                break;
            case 3: //droite
                if (heroX < (this.width - 1)) {
                    this.positionX -= 1;
                } else if (heroX == (this.width - 1)) {
                    document.getElementById('success').style.display = "block" ;
                   //SUPPRESSION DES ANCIENS OBJETS
                    oldGame = nbrGame - 1;

                    oldField = document.getElementById(idField + oldGame);
                    oldHero = document.getElementById(idHero + oldGame);
                    oldScore = document.getElementById("score" + oldGame);
                    oldLife = document.getElementById("lifeBar" + oldGame);

                    while (oldField.firstChild) {
                        oldField.removeChild(oldField.firstChild);
                    }

                    tabEnnemy = new Array();
                    tabItems = new Array();

                    document.body.removeChild(oldField);
                    document.body.removeChild(oldHero);
                    document.body.removeChild(oldScore);
                    document.body.removeChild(oldLife);
                }
                break;
        }

        didMove=true;
    } else {
        didMove=false;
    }

    this.display();
    //indique si un mouvement ou une collision a eu lieu (utilisé dans controls.js)
    return didMove;
};