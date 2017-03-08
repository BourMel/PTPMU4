var game;
var fox;
var ennemy;
var item;
var platform;
var tabEnnemy = new Array();

//DONNEES DU JEU : à modifier selon niveau de difficulté recherché
var idField = "field"; //impact dans le css
var widthField = 80;
var heightField = 10;
var heightGround = 4;
var heroLife = 100;
var nbrEnnemy = 10; //peut être réduit s'ils tombent dans des trous
var ennemyLife = 100;

function init() {
    game = new Field(idField, heightField, widthField, heightGround);
    game.display();

    platform = new Platform(game);
    platform.display();

    fox = new Hero (heroLife, game);
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

   // item = new Item ("item1", widthField, 1, 100, game);
    //item.display();
    //item.findGround();
}

//la fonction, quand elle est appelée, active la chute du personnage
//c'est la seule fonction à être active sans action du joueur
function anim () {
    //nommé comme variable pour pouvoir être utilisé dans controls.js
    var progressivFall = fox.findGround();
    fox.display();
    
    //GAME OVER
    if(fox.checkLife() == false) {
        //possibilité de remplacer par interface
        init();
    }
    /*if(fall == false) {
        clearInterval(intervalFalling);
    }*/

    for(var b = 0 ; b < tabEnnemy.length ; b++) {
        tabEnnemy[b].move();
    }

    //débug
    game.display();

 }

$(document).ready(function(){
    //JEU
    init();
    //chute au début du jeu
    var intervalAnim = setInterval(anim, 1000);

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

