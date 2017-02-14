$(document).ready(function(){
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

