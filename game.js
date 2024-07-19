// window.alert("Java Script linked");

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;

var level = 0;

$(document).on("keydown",function(){
    if(gameStarted === false){
        $("#level-title").text("Level " + level);
        gameStarted = true;
        nextSequence();
    }
});

$(".btn").click(function(){

    // var userChosenColor = $(this).attr("id");
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    console.log("userClickedPattern: "+ userClickedPattern);
    
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    level++;
    $("#level-title").text("Level "+ level);

    userClickedPattern=[];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    console.log("gamePattern: "+gamePattern);

    $("#"+randomChosenColor).animate({opacity: 0.5}).animate({opacity: 1});
    playSound(randomChosenColor);
}


function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        console.log("Success");
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){nextSequence();}, 1000);
        }
    }
    else{
        playSound("wrong")
        console.log("Wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart ");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}
