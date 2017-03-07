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

function Platform(width, height) {
    this.width = width;
    this.height = height;
    
    /* La plateforme prend l'ensemble de sa largeur et de sa hauteur */
    this.block = new Array(this.width * this.height);
    
    /* Parcourt des colonnes puis des lignes */
    for(i = 0; i < this.width; i++) {
        for(j = 0; j < this.height; j++) {
            /* Pour un nombre aléatoire sur la ligne de la plateforme, prend la valeur de 3. Donc plateforme = 3 */
            if(Math.random() < 0.3) {
                this.block[i] = 3;
            } else {
                this.block[i] = 0;
            }
        }   
    }
}

Platform.prototype.display = function() {
    // Parcourt l'ensemble de la ligne platforme
    var field = document.getElementById("field");
    var platform = document.createElement("div");
    platform.setAttribute("id", "wrap-platform");
    field.appendChild(platform);

    var HTMLplatform = document.getElementById("wrap-platform");
    HTMLplatform.style.left = 0 + 'px';
    
    for(i = 0; i < this.width; i++) {
        for(j = 0; j < this.height; j++) {
            var blocPlat = document.createElement("div");
            
            if(this.block[j * this.width + i] == 3) {
                blocPlat.setAttribute("class", "plateform");
            }
            else if(this.block[j * this.width + i] == 0) {
                blocPlat.setAttribute("class", "air-platform");
            }
            
            // Positionne les block de plateforme selon la position * 70 (taille du block)
            blocPlat.style.left = (i * 70) + 'px';
            blocPlat.style.top = ((j * 50) + 100) + 'px';
            HTMLplatform.appendChild(blocPlat);
        }
    }
}
