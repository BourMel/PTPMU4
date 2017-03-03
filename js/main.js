var game;
var fox;
var ennemy; // ?

function init() {
    game = new Field(10, 80, 4, 0);
    game.display();

    fox = new Hero (1, 1, 100, game);
    fox.display();

    //id à attribuer à l'aide d'une boucle
    ennemy = new Ennemy ("ennemy1", 80, 1, 100, game);
    ennemy.display();
    ennemy.findGround();
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
    //JEU
    init();
    //chute au début du jeu
    var intervalAnim = setInterval(anim, 1000);

    //INTERFACE
    document.getElementById("help").addEventListener("click", function() {
        $("#helpBox").show();
    })
    document.getElementById("result").addEventListener("click", function() {
        $("#successBox").show();
    })
    document.getElementById("credit").addEventListener("click", function() {
        $("#creditBox").show();
    })
    document.getElementById("closeBox").addEventListener("click", function() {
        $("#helpBox").hide();
        $("#successBox").hide();
        $("#creditBox").hide();
    })
    
    
    document.getElementById("butonPlay").addEventListener("click", function() {
        $("#startGame").hide();
        $("#hero").show();
        $("#field").show();
    })
        document.getElementById("butonPlayAgain").addEventListener("click", function() {
        $("#startGame").hide();
        $("#hero").show();
        $("#field").show();
    })
    document.getElementById("butonQuit").addEventListener("click", function() {
        $("#startGame").show();
        $("#success").hide();
    })
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

