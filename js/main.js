/**
 * Mise en place du jeu, gestion des interfaces et des différentes parties
 * (Game Over, Envoi des scores vers les fichiers PHP...)
 */

// ------------------------- //
// Déclaration des variables //
// ------------------------- //

var game;
var fox;
var ennemy;
var item;
var platform;
var tabEnnemy = new Array();
var tabItems = new Array();
var nbrGame;

// ---------------//
// DONNEES DU JEU //
// ------------- //

//terrain
var idField = "field"; //impact dans le css
var widthField = 20;
var heightField = 20;
var heightGround = 8;

//heros
var idHero = "hero"; //impact dans le css
var heroLife = 100;

//ennemis
var nbrEnnemy = 10;
// var ennemyLife = 100;

//items à collecter
var nbrItem = 10;
// var itemLife = 100;


// ---------------------------------------------------------------- //
// INITIALISATION DU JEU //
// ---------------------------------------------------------------- //
function init(nbrGame) {
    // ---------------//
    // ---GAME OVER--- //
    // ------------- //
    if(nbrGame != 0) {
        //INTERFACE
        $('#gameOver').show();
        $('#gameOver .texte .data').html(fox.score);

        //BASE DE DONNEES
        $.ajax({
            url: "./php/score.php",
            data:{
                action:"sendScore",
                pseudo: document.getElementById("pseudoInput").value,
                score:fox.score
            },
            dataType: "json"
        });

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

    // ---------------//
    // ---NEW GAME--- //
    // ------------- //

    game = new Field(idField + nbrGame, heightField, widthField, heightGround);
    game.display();

    fox = new Hero (idHero + nbrGame, heroLife, game);
    fox.display();
    fox.findGround();

    for(var i = 0 ; i < nbrEnnemy+1; i++) {
        ennemy = new Ennemy ("ennemy"+i, game);
        ennemy.findGround();
        if(ennemy.checkLife()) {
            ennemy.display();
            tabEnnemy.push(ennemy);
        }
    }

    for(var i = 0 ; i < nbrItem+1 ; i++) {
        var item = new Item ("item"+i, game);
        item.findGround();
        if(item.checkLife()) {
            item.display();
            tabItems.push(item);
        }
    }

    for(var b=0 ; b<tabItems.length ; b++) {
        tabItems[b].move();
    }

    intervalAnim = setInterval(anim, 1000);
}

// ---------------//
// ---ANIMATION-- //
// ------------- //
function anim () {
    //à chaque instant...

    fox.findGround();
    fox.findEnnemy();
    fox.display();

    if(fox.checkLife() == false) {
        fox.score = fox.score + fox.x*10; //score final

        nbrGame ++;
        clearInterval(intervalAnim);
        init(nbrGame);
    }

    for(var b = 0 ; b < tabEnnemy.length ; b++) {
        tabEnnemy[b].move();
    }
}

//crée un intervalle sur le héros s'il subit des dégâts (hero.move/findGround)
function blink () {
    var HTMLhero = document.getElementById(idHero + nbrGame);
    lostLife = setInterval(changeColor(HTMLhero), 100);
    HTMLhero.style.backgroundColor = "#36383a";
}

//l'intervalle appelle une fonction qui fait clignoter le héros
function changeColor(HTMLhero) {
    var nbrClignotements = 3;

    for(i=0; i<nbrClignotements; i++) {
        setTimeout( function () {
            HTMLhero.style.backgroundColor = "red";
        }, 50);
        setTimeout( function () {
            HTMLhero.style.backgroundColor = "#36383a";
        }, 50);

        nbrClignotements--;
        if(nbrClignotements == 0) {
            clearInterval(lostLife);
        }
    }
}

// ---------------------------------------------------------------- //
//--------------------- AU CHARGEMENT DE LA PAGE------------------- //
// ---------------------------------------------------------------- //

$(document).ready(function(){
    formPseudo = document.getElementById("pseudoForm");
    resultBox = document.getElementById("resultBox");

    // ---------------//
    // ---POPS UP--- //
    // ------------- //
    var openButtons = $('.icon');
    openButtons.click(function() {
        var cible = $(this).attr('id');
        cible = "#" + cible + "Box";
        $(cible).before('<div id="grayBack"></div>'); //création de la div d'arrière plan
        $(cible).show();
        $("#grayBack").css('opacity', 0.4).fadeTo('fast', 0.7, function () { $("cible").fadeIn(300); });
    });

    var closeButtons = $('.closeBox');
    closeButtons.click(function() {
        $(this).parent().hide();
        $("#grayBack").fadeOut('fast', function () { $(this).remove() });
    });

    //REQUETE AJAX POUR AFFICHER LES SCORES
    document.getElementById("result").addEventListener("click", function() {
        $.ajax({
            url: "./php/score.php",
            data: {
                action: "view"
            },
            dataType: "json",
            success: function(view) {
                for(i = 0 ; i < view.result.length ; i++) {
                    var score = document.createElement("div");
                    score.innerHTML = "<span class='pseudoItem'>" + view.result[i].pseudo + " : </span><span class='scoreItem'> " +  view.result[i].score + "</span>" ;
                    resultBox.appendChild(score);
                }
            }
        });
    });

    document.getElementById("butonPlay").addEventListener("click", function() {
        $(formPseudo).before('<div id="grayBack"></div>');
        $(formPseudo).show();
        $("#grayBack").css('opacity', 0.4).fadeTo('fast', 0.7, function () { $(formPseudo).fadeIn(300); });
    });

    // ----------------------------//
    // ---INITIALISATION DU JEU--- //
    // -------------------------- //
    document.getElementById("butonPseudo").addEventListener("click", function() {
        if (document.getElementById("pseudoInput").value == "") {
            document.getElementById("formError").innerHTML = "vous n'avez pas entré de pseudo...";
            document.getElementById("pseudoInput").style.outline = "3px solid darkred";
            return false;
        }
        else {
            $(this).parent().hide();
            $("#grayBack").fadeOut('fast', function () { $(this).remove() });

            //JEU
            nbrGame = 0;
            init(nbrGame);

            $("#startGame").hide();
            $("#hero" + nbrGame).show();
            $("#field" + nbrGame).show();
            return true;
        }
    });

    formPseudo.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    document.getElementById("gameOver").addEventListener("click", function() {
        $("#gameOver").hide();
        $("#hero" + nbrGame).show();
        $("#field" + nbrGame).show();
    });
    document.getElementById("butonQuit").addEventListener("click", function() {
        $("#startGame").show();
        $("#success").hide();
    });
});

