$(document).ready (function() {
    "use strict";



//Globals
// =========== Sound Variables =============
var borg = new Audio("sounds/borg.mp3"); 
borg.volume = 1;

// ============HTML Variables=================
//DATA DIV
var shieldTitle = $("#shieldTitle");
var topLeftBox = $("#topLeftBox"); 
var leftHookMiniBox = $("#leftHookMiniBox");
var topShortBox = $("#topShortBox");
var topLongBox = $("#topLongBox");
var topFinalBox = $("#topFinalBox");

//GAME DIV
var botFinalBox = $("#botFinalBox");
var botLongBox = $("#botLongBox");
var thinBox = $("#thinBox"); 
var midHookMiniBox = $("#midHookMiniBox"); 
var midLeftBox = $("#midLeftBox"); 
var midLeftBoxSm = $("#midLeftBoxSm"); 
var botLeftBox = $("#botLeftBox"); 

//Data Outputs
var firstLine = $("#firstLine"); 
var secondLine = $("#secondLine"); 
var thirdLine = $("#thirdLine"); 
var fourthLine = $("#fourthLine"); 
var fifthLine = $("#fifthLine"); 
var sixthLine = $("#sixthLine"); 
var seventhLine = $("#seventhLine"); 

//Voyager and shields
var voyager = $("#voyager"); 
var shields = $("#voyagerShields"); 
var indicatorTop = $("#indicatorTop");
var indicatorBottom = $("#indicatorBottom");
var indicatorRight = $("#indicatorRight");
var indicatorLeft = $("#indicatorLeft");
//Shield Status Bars
var numberAbsoluteClass = $(".numberAbsolute");
var leftBar = $("#leftBar");
var rightBar = $("#rightBar");
var frontBar = $("#frontBar");
var backBar = $("#backBar");

//readyPrompt
var readyPrompt = $("#promptReady");
var purple = $(".purple");
var mustard = $(".mustard");
var pink = $(".pink");
var brown = $(".brown");
var readyText = $("#readyText");

//hooks
var topLeftHook = $("#topLeftHook"); 
var topLeftHookRed = $("#topLeftHookRed"); 
var topLeftHookWhite = $("#topLeftHookWhite"); 
var midHook = $("#midHook"); 
var midHookRed = $("#midHookRed"); 
var midHookWhite = $("#midHookWhite"); 
var midHookClass = $(".midHook");
var topLeftHookClass = $(".topLeftHook");

//Text
var incomingText = $("#incoming");
var counterText = $("#midHookText");

//Buttons
var skipBtn = $("#skipBtn");
var readyYes = $("#readyYes");

// =============== Timeout variables ===============
//declared as such to prevent automatic play
var redAlertSoundTimeout;
var redAlertTimeout;

// ================ Booleans ==============
var retry = false;
var keyboardUnlocked = false;

//=============   END Variables  ===============





// =======================GAME LOGIC========================
var quadrantArray = [];
var userInputArray = [];
var userCount = 0;
var i = 0;

//When called, sets up next round:
//Adds new number to quadrantArray, resets user variables, calls animate shields
function nextRound() {
    userCount = 0;
    userInputArray = [];
    i = 0;
    var quadrant = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    quadrantArray.push(quadrant);
    animateShieldLoop();
}
//Calls animateShieldLoop() to animate each of the shield indicators

function animateShieldLoop() {
    animateShield();
    setTimeout(function() {
        i += 1;

        if (i < quadrantArray.length) {
            animateShieldLoop();
        }else {
            i = 0;
        }
    }, 700);
}
//Animates generated shield indicators
function animateShield() {
    var alert = new Audio("sounds/alert.mp3");
    if (quadrantArray[i] == 1) {
        alert.play();
        indicatorTopDisplay();
    }else if (quadrantArray[i] == 2) {
        alert.play();
        indicatorRightDisplay();
    }else if (quadrantArray[i] == 3) {
        alert.play();
        indicatorBottomDisplay();
    }else if (quadrantArray[i] == 4) {
        alert.play();
        indicatorLeftDisplay();
    }
}
//Log the userinput and verify against generated sequence:
//Takes user input and adds it to userInputArray, calls checkInput to verify
$(document).keyup(function(event){
    var keycode = event.keyCode;
    if (keyboardUnlocked == true) {
        if (keycode == 38) {                //Up key
            userInputArray.push(1);
            leftBarAnimation();
            checkInput();
        }else if (keycode == 40) {          //Down Key
            userInputArray.push(3);
            rightBarAnimation();
            checkInput();
        }else if (keycode == 37) {          //Left Key
            userInputArray.push(4);
            backBarAnimation();
            checkInput();
        }else if (keycode == 39) {          //Right Key
            userInputArray.push(2);
            frontBarAnimation();
        checkInput();
        }
    }  
});
//checks user input against generated sequence, calls next round if all is good or calls fail function otherwise
function checkInput() {
    if (userInputArray[userCount] == quadrantArray[userCount]) {
        userCount += 1;
        if (userCount == quadrantArray.length) {
            counterText.html("Hits Absorbed: " + userCount);
            nextRound();
        }
    }else {
        fail();
    }
}
//Shut LCARS down and kill red alert. Ask user for retry:
//Calls shutdown function and clears redalert timeouts
function fail() {
    retry = true;
    clearTimeout(redAlertSoundTimeout);
    clearTimeout(redAlertTimeout);
    shutdown();
}





//=================== General Animations (Startup, shutdown, etc) ===================


// ====================Start Up=================
function startup() {
    //Play Computer Startup Sounds
    startupSounds();
    //--Animation Sequence--
    //first
    topLeftBox.animate({
        opacity: '1' 
    },1000);
    botLeftBox.animate({
        opacity: '1'
    },1000);

    //second
    topLeftHook.delay(300).animate({
        opacity: '1'
    },1000);
    midLeftBoxSm.delay(300).animate({
        opacity: '1'
    },1000);

    //third
    midLeftBox.delay(800).animate({
        opacity: '1'
    },1000);
    midHook.delay(800).animate({
        opacity: '1'
    },1000);

    //fourth
    leftHookMiniBox.delay(900).animate({
        opacity: '1'
    },1000);
    midHookMiniBox.delay(900).animate({
        opacity: '1'
    },1000);

    //fifth
    topShortBox.delay(1000).animate({
        opacity: '1'
    },1000);
    thinBox.delay(1000).animate({
        opacity: '1'
    },1000);

    //sixth
    topShortBox.delay(1200).animate({
        opacity: '1'
    },1000);
    thinBox.delay(1200).animate({
        opacity: '1'
    },1000);

    //seventh
    topLongBox.delay(1400).animate({
        opacity: '1'
    },1000);
    botLongBox.delay(1400).animate({
        opacity: '1'
    },1000);

    //eighth
    topFinalBox.delay(1600).animate({
        opacity: '1'
    },1000);
    botFinalBox.delay(1600).animate({
        opacity: '1'
    },1000);

    //ninth --title
    shieldTitle.delay(2000).animate({
        opacity: '1'
    },2000);
    //Computer working beeps
    setTimeout(function() { 
        var computerWork = new Audio("sounds/computerWork.mp3");
        computerWork.play();
    }, 2000);

    //10th --Data Output Random fade in
    setTimeout(function() { 
        var computerScroll = new Audio("sounds/computerScroll.mp3");
        computerScroll.play();
    }, 4200);
    firstLine.delay(4200).animate({
        opacity: '1'
    },200);
    secondLine.delay(4300).animate({
        opacity: '1'
    },200);
    thirdLine.delay(4400).animate({
        opacity: '1'
    },200);
    fourthLine.delay(4500).animate({
        opacity: '1'
    },200);
    fifthLine.delay(4600).animate({
        opacity: '1'
    },200);
    sixthLine.delay(4700).animate({
        opacity: '1'
    },200);
    seventhLine.delay(4800).animate({
        opacity: '1'
    },200);

    //11th --Voyager and shields
    setTimeout(function() { 
        var computerPowerup2 = new Audio("sounds/computerPowerup2.mp3");
        computerPowerup2.play();
    }, 4900);
    voyager.delay(4900).animate({
        opacity: '1'
    },3000);
    setTimeout(function() { 
        var computerPowerup = new Audio("sounds/computerPowerup.mp3");
        computerPowerup.play();
    }, 6000);
    shields.delay(6000).animate({
        opacity: '1'
    },2000);
    numberAbsoluteClass.delay(6000).animate({
        opacity: '1'
    },2000);
    //END STARTUP Animation

    //Prompt Ready, launch effects and game on ready
    if (retry == false) {
        setTimeout(function() { 
            transmission();
        }, 8000);
    }
}



//LCARS Incoming message and Borg warning:
//Called upon only on the first playthrough
function transmission() {
    var incoming = new Audio("sounds/incoming.mp3");
    incoming.volume = 0.5;
    incoming.play();

    incomingText.css({
        display: 'block'
    });
    skipBtn.css({
        display: 'block'
    });
    incomingText.animate({
        opacity: '1'
    },1000);
    incomingText.delay(500).animate({
        opacity: '0'
    },1000);
    incomingText.delay(1000).animate({
        opacity: '1'
    },1000);
    incomingText.delay(1500).animate({
        opacity: '0'
    },1000);
    incomingText.delay(2000).animate({
        opacity: '1'
    },1000);
    incomingText.delay(2500).animate({
        opacity: '0'
    },1000);
    setTimeout(function() { 
        borg.play();
    }, 2000);
    setTimeout(function() { 
        incomingText.css({
            display: 'none'
        });
        skipBtn.css({
            display: 'none'
        });
    }, 18000);
    readyPrompt.delay(18000).animate({
        opacity: '1'
    },1000);
}





// ========================== SHUTDOWN Animation ============================
//Runs reverse (quicker) sequence animations, sets new message for user ack and prompts ready function
function shutdown() {
    var powerHold = new Audio("sounds/powerHold.mp3");
    readyText.html("You have been assimilated. Try again?");
    powerHold.play();
    numberAbsoluteClass.animate({
        opacity: '0'
    },2000);
    shields.animate({
        opacity: '0'
    },2000);
    voyager.animate({
        opacity: '0'
    },3000);
    //title
    shieldTitle.animate({
        opacity: '0'
    },2000);
    //Text Line 
    firstLine.delay(1000).animate({
        opacity: '0'
    },200);
    secondLine.delay(1200).animate({
        opacity: '0'
    },200);
    thirdLine.delay(1400).animate({
        opacity: '0'
    },200);
    fourthLine.delay(1600).animate({
        opacity: '0'
    },200);
    fifthLine.delay(1800).animate({
        opacity: '0'
    },200);
    sixthLine.delay(2000).animate({
        opacity: '0'
    },200);
    seventhLine.delay(2200).animate({
        opacity: '0'
    },200);
    //First
    botFinalBox.delay(2400).animate({
        opacity: '0'
    },500);
    topFinalBox.delay(2400).animate({
        opacity: '0'
    },500);
    //Second
    topLongBox.delay(2900).animate({
        opacity: '0'
    },500);
    botLongBox.delay(2900).animate({
        opacity: '0'
    },500);
    //Third
    topShortBox.delay(3400).animate({
        opacity: '0'
    },500);
    thinBox.delay(3400).animate({
        opacity: '0'
    },500);
    //Fourth
    topShortBox.delay(3900).animate({
        opacity: '0'
    },500);
    thinBox.delay(3900).animate({
        opacity: '0'
    },500);
    //Fifth
    leftHookMiniBox.delay(4400).animate({
        opacity: '0'
    },500);
    midHookMiniBox.delay(4400).animate({
        opacity: '0'
    },500);
    //Sixth --Clear All Hooks
    midLeftBox.delay(4900).animate({
        opacity: '0'
    },500);
    midHook.delay(4900).animate({
        opacity: '0'
    },500);
    midHookRed.delay(4900).animate({
        opacity: '0'
    },500);
    midHookWhite.delay(4900).animate({
        opacity: '0'
    },500);
    //Seventh --Clear All Hooks
    topLeftHook.delay(5400).animate({
        opacity: '0'
    },500);
    topLeftHookRed.delay(5400).animate({
        opacity: '0'
    },500);
    topLeftHookWhite.delay(5400).animate({
        opacity: '0'
    },500);
    midLeftBoxSm.delay(5400).animate({
        opacity: '0'
    },500);
    //Eigth
    topLeftBox.delay(5900).animate({
        opacity: '0' 
    },500);
    botLeftBox.delay(5900).animate({
        opacity: '0' 
    },500);
    
    setTimeout(function() { 
        var powerDown = new Audio("sounds/powerDown.mp3");
        powerDown.play();
        readyPrompt.css({
        display: 'block'});
    }, 7000);
}





// ========================== REACTIVE ANIMATIONS ========================
//Gives LCARS red alert theme
function redAlert() {
    //Set All Red
    purple.css({background: 'red'});
    mustard.css({background: 'red'});
    pink.css({background: 'red'});
    brown.css({background: 'red'});
    topLeftHookClass.css({
        opacity: '1'
    });
    midHookClass.css({
        opacity: '1'
    });
    //Done like this to load all hook images at page load to prevent style clipping as color changes first sequence
    midHook.hide();
    midHookRed.show();
    topLeftHook.hide();
    topLeftHookRed.show();

    //White and Red Snake effect
    setTimeout(function() { 
        botLeftBox.css({background: 'white'});
    }, 200);
    setTimeout(function() { 
        botLeftBox.css({background: 'red'});
    }, 400);
    setTimeout(function() { 
        midLeftBoxSm.css({background: 'white'});
    }, 400);
    setTimeout(function() { 
        midLeftBoxSm.css({background: 'red'});
    }, 600);
    setTimeout(function() { 
        midLeftBox.css({background: 'white'});
    }, 600);
    setTimeout(function() { 
        midLeftBox.css({background: 'red'});
    }, 800);
    setTimeout(function() { 
        midHookRed.hide();
        midHookWhite.show();
    }, 800);
    setTimeout(function() { 
        midHookWhite.hide();
        midHookRed.show();
    }, 1000);
    setTimeout(function() { 
        midHookMiniBox.css({background: 'white'});
    }, 1000);
    setTimeout(function() { 
        midHookMiniBox.css({background: 'red'});
    }, 1200);
    setTimeout(function() { 
        thinBox.css({background: 'white'});
    }, 1200);
    setTimeout(function() { 
        thinBox.css({background: 'red'});
    }, 1400);
    setTimeout(function() { 
        botLongBox.css({background: 'white'});
    }, 1400);
    setTimeout(function() { 
        botLongBox.css({background: 'red'});
    }, 1600);
    setTimeout(function() { 
        botFinalBox.css({background: 'white'});
    }, 1600);
    setTimeout(function() { 
        botFinalBox.css({background: 'red'});
    }, 1800);

    //TOP
    setTimeout(function() { 
        topLeftBox.css({background: 'white'});
    }, 200);
    setTimeout(function() { 
        topLeftBox.css({background: 'red'});
    }, 400);
    setTimeout(function() { 
        topLeftHookRed.hide();
        topLeftHookWhite.show();
    }, 400);
     setTimeout(function() { 
        topLeftHookWhite.hide();
        topLeftHookRed.show();
    }, 600);
    setTimeout(function() { 
        leftHookMiniBox.css({background: 'white'});
    }, 600);
    setTimeout(function() { 
        leftHookMiniBox.css({background: 'red'});
    }, 800);
    setTimeout(function() { 
        topShortBox.css({background: 'white'});
    }, 800);
    setTimeout(function() { 
        topShortBox.css({background: 'red'});
    }, 1000);
    setTimeout(function() { 
        topLongBox.css({background: 'white'});
    }, 1000);
    setTimeout(function() { 
        topLongBox.css({background: 'red'});
    }, 1200);
    setTimeout(function() { 
        topFinalBox.css({background: 'white'});
    }, 1200);
    setTimeout(function() { 
        topFinalBox.css({background: 'red'}); 
    }, 1400);
    redAlertTimeout = setTimeout(redAlert, 2000);
    redAlertTimeout; //Call Global timeout to allow kill on shutdown
}




//Shield Indicator Lights 
function indicatorTopDisplay() {
    indicatorTop.animate({
        opacity: '1'
    },250);
    indicatorTop.delay(250).animate({
        opacity: '0'
    },250);
}

function indicatorRightDisplay() {
   
    indicatorRight.animate({
        opacity: '1'
    },250);
    indicatorRight.delay(250).animate({
        opacity: '0'
    },250);
}

function indicatorBottomDisplay() {
    
    indicatorBottom.animate({
        opacity: '1'
    },250);
    indicatorBottom.delay(250).animate({
        opacity: '0'
    },250);
}

function indicatorLeftDisplay() {
  
    indicatorLeft.animate({
        opacity: '1'
    },250);
    indicatorLeft.delay(250).animate({
        opacity: '0'
    },250);
}




// User Input Shield Bars (gives LCARS remodulation effect)
function leftBarAnimation() {
    leftBar.animate({
        width: '+=50px'
    },250);
    leftBar.delay(250).animate({
        width: '-=50px'
    },250);
}

function rightBarAnimation() {
    rightBar.animate({
        width: '+=50px'
    },250);
    rightBar.delay(250).animate({
        width: '-=50px'
    },250);
}

function frontBarAnimation() {
    frontBar.animate({
        width: '+=50px'
    },250);
    frontBar.delay(250).animate({
        width: '-=50px'
    },250);
}

function backBarAnimation() {
    backBar.animate({
        width: '+=50px'
    },250);
    backBar.delay(250).animate({
        width: '-=50px'
    },250);
}




//==================Sounds====================

//Has global timeout that can be called in multiple functions to cancel red alert sounds
function redAlertSoundRepeat() {
    var redAlertSound = new Audio("sounds/redAlert4.mp3");
    redAlertSound.play();
    redAlertSoundTimeout = setTimeout(redAlertSoundRepeat, 10000);
    redAlertSoundTimeout;
    
}

//Plays bridge ambaince sounds and plays a computer launching sound
function startupSounds() {
    var voyagerBridge = new Audio("sounds/voyagerBridge.mp3");
    var computerActivate = new Audio("sounds/computerActivate.mp3");
    voyagerBridge.play();
    voyagerBridge.volume = 0.3;
    computerActivate.play();
}





// ==================Listeners==================

//If user clicks "proceed" on prompt:
//Will set a LCARS panel to round counter, verify if user has played through once already:
//Ques redAlert related items, locks keyboard on first playthough to prevent failing round premature.
readyYes.click(function(event) {
    counterText.css({
        left: '7px'
    });
    counterText.html("Hits Absorbed: " + userCount);
    if (retry == true) {
        quadrantArray = [];
        startup();
        redAlert();
        redAlertSoundRepeat();
        readyPrompt.css({
                display: 'none'});
        setTimeout(function() { 
            nextRound();
        }, 7000);
    } else {
        keyboardUnlocked = true;
        readyPrompt.css({
            display: 'none'});
        redAlert();
        redAlertSoundRepeat();
        setTimeout(function() { 
            nextRound();
        }, 5000);
    }
    
});

//Allows user to skip borg/intro transmission 
skipBtn.click(function(event) {
    borg.volume = 0;
    readyPrompt.css({
        opacity: '1'
    });
    incomingText.css({
        display: 'none'
    });
    skipBtn.css({
        display: 'none'
    }); 
});





//============On page Load=============
//run startup function to load elements
startup();

});
