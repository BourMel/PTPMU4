/* PRINCIPE COLLISION PLATEFORME */

/* Récupérer position héros

Quand mouvement vers le haut,

Pour chaque ligne sur axe Y

teste si case = air
=> Alors ajoute à position héros hauteur d'une case OU
=> Alors appelle la fonction saut

teste si case = plateforme
=> Alors retire à position héros hauteur d'une case OU
=> Alors appelle la fonction chute OU
=> rien (héros garde sa position) */

function Platform(xfield, yfield, positionX) {
    this.xfield = xfield; // lignes = largeur du terrain
    this.yfield = yfield; // colonnes = hauteur du terrain
    this.positionX = positionX; // Pour déplacer les plateformes qd héros se déplace
    
    /* La plateforme prend l'ensemble de la largeur et de la hauteur du terrain */
    this.block = new Array(this.xfield * this.yfield);
    
    /* Parcourir entre la 2ème ligne de field
    & 2 lignes au dessus de bosse */
    for(j = 0; j < this.xfield*this.yfield; j++) {
        if(Math.random() < 0.8) {
            this.block[j] = 1;
            console.log("Valeur de 1");
        }
    }
}

Platform.prototype.display = function() {
    var wrapPlatform = document.createElement("div");
    wrapPlatform.setAttribute("id", "wrapPlatform");
    document.body.appendChild(wrapPlatform);
    
    var HTMLwrapPlatform = document.getElementById("wrapPlatform");
    HTMLwrapPlatform.style.left = (this.positionX * 70) + "px";
    
    for(a = 0; a < this.xfield; a++) {
        for(b = 0; b < this.yfield; b++) {
//            var platform = document.createElement("div");
            
            if(this.block[a * this.xfield + b] == 1) {
                var platform = document.createElement("div");
                platform.setAttribute("class", "plateforme");
            }
            
            platform.style.left = (b * 70) + "px";
            platform.style.top = (a * 50) + "px";
            HTMLwrapPlatform.appendChild(platform);
        }
    }
    
}

// Déplace les plateformes (appelé par controls.js)
Platform.prototype.move = function(direction) {
    switch(direction) {
        case 1: //gauche
            this.positionX += 1;
            break;
        case 3: //droite
            this.positionX -= 1;
            break;
    }
    
    this.display();
}


var platform = new Platform(80, 3, 0);
platform.display();
platform.move(direction);