var game;
var fox;
var ennemy;
var item;
var platform;
var tabEnnemy = new Array();
var tabItems = new Array();
var nbrGame;

// ---------------------------------------------------------------- //
// DONNEES DU JEU - à modifier selon niveau de difficulté recherché //
// ---------------------------------------------------------------- //

//terrain
var idField = "field"; //impact dans le css
var widthField = 80;
var heightField = 20;
var heightGround = 8;

//heros
var idHero = "hero"; //impact dans le css
var heroLife = 100;

//ennemis
var nbrEnnemy = 10; //peut être réduit s'ils tombent dans des trous
var ennemyLife = 100;

//items
var nbrItem = 10;
var itemLife = 100;


// ---------------------------------------------------------------- //
// INITIALISATION DU JEU //
// ---------------------------------------------------------------- //
function init(nbrGame) {
    //si ce n'est pas la première partie
    if(nbrGame != 0) {
        oldField = document.getElementById(idField + nbrGame-1);
        oldHero = document.getElementById(idHero + nbrGame-1);
        oldScore = document.getElementById("score");
        oldLife = document.getElementById("lifeBar");
        oldEnnemies = oldField.getElementsByClassName("ennemy");
        while (oldField.firstChild) {
            oldField.removeChild(oldField.firstChild);
        }

        document.body.removeChild(oldField);
        document.body.removeChild(oldHero);
        document.body.removeChild(oldScore);
        document.body.removeChild(oldLife);
    }

    //créé un nouveau terrain
    game = new Field(idField + nbrGame, heightField, widthField, heightGround);
    game.display();

    //créé de nouvelles plateformes aériennes
    platform = new Platform(game);
    platform.display();

    //créer le héros
    fox = new Hero (idHero + nbrGame, heroLife, game);
    fox.display();
    fox.findGround();

    //crée un tableau d'ennemis
    for(var i = 0 ; i < nbrEnnemy ; i++) {
        ennemy = new Ennemy ("ennemy"+i, 0, ennemyLife, game);
        ennemy.findGround();
        if(ennemy.checkLife()) {
            ennemy.display();
            tabEnnemy.push(ennemy);
        }
    }

    //créé de nouveaux items à collectionner
    for(var i = 0 ; i < nbrItem+1 ; i++) {
        var item = new Item ("item"+i, widthField, 0, itemLife, game);
        item.findGround();
        if(item.checkLife()) {
            item.display();
            tabItems.push(item);
        }
    }

    //chute au début du jeu
    intervalAnim = setInterval(anim, 1000);
}

//la fonction, quand elle est appelée, active la chute du personnage
//c'est la seule fonction à être active sans action du joueur
function anim () {
    //nommé comme variable pour pouvoir être utilisé dans controls.js
    //var progressivFall =
    fox.findGround();
    fox.findEnnemy();
    fox.display();

    //GAME OVER
    if(fox.checkLife() == false) {
        //possibilité de remplacer par interface
        nbrGame ++;
        clearInterval(intervalAnim);
        init(nbrGame);
    }

    for(var b = 0 ; b < tabEnnemy.length ; b++) {
        tabEnnemy[b].move();
    }
}


function blink () {
    var HTMLhero = document.getElementById(idHero);
    lostLife = setInterval(changeColor(HTMLhero), 100);
    HTMLhero.style.backgroundColor = "#36383a";
}

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
// DOCUMENT READY //
// ---------------------------------------------------------------- //

$(document).ready(function(){
    //JEU
    nbrGame = 0;
    init(nbrGame);

    //INTERFACE

    /* popups page d'accueil */
    var openButtons = $('.icon');
    openButtons.click(function() {
        var cible = $(this).attr('id');
        cible = "#" + cible + "Box";
        $(cible).show();
    });

    var closeButtons = $('.closeBox');
    closeButtons.click(function() {
        $(this).parent().hide();
    });

    document.getElementById("butonPlay").addEventListener("click", function() {
        $("#startGame").hide();
        $("#hero").show();
        $("#field").show();
        $('#wrap-platform').show();
        $('.plateform').show();
        $('.air-platform').show();
    });
    document.getElementById("butonPlayAgain").addEventListener("click", function() {
        $("#startGame").hide();
        $("#hero").show();
        $("#field").show();
    });
    document.getElementById("butonQuit").addEventListener("click", function() {
        $("#startGame").show();
        $("#success").hide();
    });
});


/*function initGame(event) {
 var game = new Field(10, 80, 4, 0);
 game.display();
 }

 var bouton = document.getElementById("butonPlay");
 bouton.addEventListener("click", initGame);*/


//$("#butonPlay").click(function(){
//    console.log("The paragraph was clicked.");
//});

