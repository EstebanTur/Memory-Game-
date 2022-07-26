var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];
var started = false;

var level = 0;



$(document).keypress(function() {
    if (!started) {

        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
    
});


$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    $("#" + userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    
    if ( userClickedPattern[currentLevel] === gamePattern[currentLevel] ) {

        if (gamePattern.length === userClickedPattern.length){

           setTimeout(() => {
            nextSequence();
           }, 1000);
        }
             

    }else {
        console.log("wrong");

        playSound("wrong");

        $(document.body).addClass("game-over");
        setTimeout(() => {
            $(document.body).removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press any key to restart.");
        startOver();
        
        
        
    }
};

function nextSequence() {

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
     gamePattern.push(randomChosenColour);
     
     $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+ level);
    
   
};


function playSound(name) {
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour) {

    $("#"+ currentColour).addClass("pressed");

    setTimeout(function () {
        $("#"+ currentColour).removeClass("pressed");
    },100)
    
};

function startOver() {
     gamePattern = [];
     level = 0;
     started = false;
 };
 
