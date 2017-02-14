$(document).ready(function(){
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

