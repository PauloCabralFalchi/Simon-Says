var simonSays = [];
var colors = ["green", "red", "yellow", "blue"];
var playerInputs = [];
var gameStatus = 0

$("body").keydown(function(event) {
    gameStatus = 1
    $("body").css("background-color", "#011F3F")
    simonSays.push(newSimonValue());
    updateLevel();
    lightUpButtons();
})

$("body").on("touchstart", startGame)

$(".grid-item").on("click touchstart", handleClick)

function startGame() {
    if (gameStatus === 0) {
        gameStatus = 1
        $("body").css("background-color", "#011F3F")
        simonSays.push(newSimonValue());
        updateLevel();
        lightUpButtons();
    }

}

function handleClick() {
    
    if (gameStatus === 1) {
        if (simonSays.length !== 0) {
            var playerCurrentInput = colors[$(this).text() - 1];
            playerInputs.push(playerCurrentInput);
            console.log("player_inputs:" + playerInputs);
            lightUpPlayerButton(playerCurrentInput)
            if (playerCurrentInput !== simonSays[playerInputs.length - 1]) {
                console.log("You Lose.");
                restart();
                return;
            }
            if (playerInputs.length === simonSays.length){
                simonSays.push(newSimonValue());
                console.log(simonSays);
                setTimeout(lightUpButtons, 800);
                updateLevel();
                playerInputs = [];
            }
        }
    }
}

function newSimonValue () {
    var newValue = Math.ceil( Math.random() * 4 );
    var newColor = colors[newValue - 1];
    return (newColor);
}

function lightUpButtons() {
    for (var i = 0; i < simonSays.length; i++) {
        (function(i) { // Crea una función autoejecutable para capturar el valor de i
            setTimeout(function () {
                $("." + simonSays[i]).animate({opacity: 0}, 200);
                makeSound(simonSays[i])
                $("." + simonSays[i]).animate({opacity: 1}, 200);
            }, i * 400); // Multiplica por el índice para crear un retraso creciente
        })(i);
    }
}

function lightUpPlayerButton(currentInput){
    $("." + currentInput).animate({opacity: 0}, 200);
    makeSound(currentInput);
    $("." + currentInput).animate({opacity: 1}, 200);
}

function updateLevel() {
    var currentLevel = simonSays.length;
    $("h1").text("Level " + currentLevel);
}

function makeSound(key) {
    switch (key) {
        case "green":
            var green = new Audio("./sounds/green.mp3");
            green.play();
            break;
        
        case "red":
            var red = new Audio("./sounds/red.mp3");
            red.play();
            break;
        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;
        
        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;

        case "explosion":
            var explosion = new Audio("./sounds/explosion.mp3");
            explosion.play();
            break;
        
        default:
            break;
    }
}

function restart() {
    var lastLevel = simonSays.length
    makeSound("explosion")
    $("body").css("background-color", "#360a0a");
    $("h1").text("Game Over (Level " + lastLevel + "), press any key to restart");
    playerInputs = [];
    simonSays = [];
    gameStatus = 0;
}
