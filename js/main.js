$(document).ready(function(){
    //$("#hero").hide();
    //$("#field").hide();
    
    document.getElementById("butonPlay").addEventListener("click", function() {
        $("#startGame").hide();
        $("#hero").show();
        $("#field").show();
        $('#wrapPlatform').show();
        $('.plateform').show();
        $('.air-platform').show();
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

