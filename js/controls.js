document.onkeydown = function(event) {
    switch(event.keyCode) {
        case 37:
            direction = 1;
            console.log("Left");
            break;
        case 38:
            direction = 2;
            console.log("Up");
            break;
        case 39:
            direction = 3;
            console.log("Right");
            break;
        case 40:
            direction = 4;
            console.log("Down");
            break;
    }
    
    return direction;
}