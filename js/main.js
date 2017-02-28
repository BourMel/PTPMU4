var game;
var fox;

function init() {
    game = new Field(10, 80, 4, 0);
    game.display();

    fox = new Hero (1, 1, 100, game);
    fox.display();
}

//la fonction, quand elle est appelée, active la chute du personnage
function progressivFall () {
    var fall = fox.findGround();
    fox.display();
    /*if(fall == false) {
        clearInterval(intervalFalling);
    }*/
 }


$(document).ready(function(){
    //JEU
    init();
    //chute au début du jeu
    var intervalFalling = setInterval(progressivFall, 1000);

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

