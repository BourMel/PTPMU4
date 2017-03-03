var game;
var fox;
var ennemy;
var item// ?

function init() {
    widthField = 80;
    
    game = new Field(10, widthField, 4, 0);
    game.display();

    fox = new Hero (1, 1, 100, game);
    fox.display();

    //id à attribuer à l'aide d'une boucle
    ennemy = new Ennemy ("ennemy1", widthField, 1, 100, game);
    ennemy.display();
    ennemy.findGround();
    
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

    //si plus de vie, arrête de vérifier le sol,
    //et recommence le jeu
    if(fox.checkLife() == false) {
        //affichage des scores à la place ?
        init();
    }
    /*if(fall == false) {
        clearInterval(intervalFalling);
    }*/
    
   // progressivFallEnnemy = ennemy.findGround();
    
 }

$(document).ready(function(){
    /* popups page d'accueil */
    var openButtons = $('.icon');
    openButtons.click(function() {
        var cible = $(this).attr('id');
        cible = "#" + cible + "Box";
        $(cible).show();
    });
    //JEU
    init();
    //chute au début du jeu
    var intervalAnim = setInterval(anim, 1000);

    //INTERFACE
    
    var closeButtons = $('.closeBox');
    closeButtons.click(function() {
        $(this).parent().hide();
    });
    
    
    /* */
    document.getElementById("butonPlay").addEventListener("click", function() {
        $("#startGame").hide();
        $("#hero").show();
        $("#field").show();
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

