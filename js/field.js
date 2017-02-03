function Field (height, width, maxHeightGround) {
    this.height = height;
    this.width = width;
    this.maxHeightGround = maxHeightGround;
    
    //pour manipuler la difficulté du niveau, les probabilités doivent être un paramètre de la fonction
    
    /*this.content définit la nature de chaque case du tableau, ainsi :
    air = 0
    sol = 1*/
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
    
    //création des creux du terrain (parcours de la ligne de l'horizon)
    for(m=0 ; m < this.width ; m++) {
        //si l'un des 2 précédents = air, transformer en sol automatiqu.
        if((this.content[(this.height-this.maxHeightGround) * this.width + m-1]) == 0 || (this.content[(this.height-this.maxHeightGround) * this.width + m-2]) == 0) {
            this.content[(this.height-this.maxHeightGround) * this.width + m] = 1;
        //probabilité que pas de creux
        } else if(Math.random() < 0.9) {
           this.content[(this.height-this.maxHeightGround) * this.width + m] = 1;
        } else {
            this.content[(this.height-this.maxHeightGround) * this.width + m] = 4; //valeur creux
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
            this.content[(this.height-1-this.maxHeightGround) * this.width + n] = 3;//valeur bosse
        }
    }
    
}

Field.prototype.display = function () {
    for(i=0 ; i<this.width ; i++) {
        for(j=0 ; j<this.height ; j++) {
            var bloc = document.createElement("div");
            
            //si valeur air
            if(this.content[j * this.width + i] == 0) {
                bloc.setAttribute("class", "air");
            } else if (this.content[j * this.width + i] == 1) {
                bloc.setAttribute("class", "sol");
            } else if (this.content[j * this.width + i] == 2) {
                bloc.setAttribute("class", "test");
            } else if (this.content[j * this.width + i] == 3) {
                bloc.setAttribute("class", "bosse");
            } else if (this.content[j * this.width + i] == 4) {
                bloc.setAttribute("class", "creux");
            }
            
            //à adapter à la taille des blocs
            bloc.style.left = (i*70) + "px";
            bloc.style.top = (j*50) + "px";
            document.body.appendChild(bloc);
        }
    }
}

var jeu = new Field(10, 40, 5);
jeu.display();