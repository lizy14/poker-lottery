/**
 * a poker lottery application
 * for the 2015 Student Festival of School of Life Sciences, Tsinghua University
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Authored By Zhaoyang Li, SSSAT, 2015.11.
 * lizy14@mails.tsinghua.edu.cn
 */

/* 0 = least significant digit */
var $el = [];
var baraja = [];
var n = [10, 10, 13];

//array operations
function pickRandomly(arr){
    return arr[Math.floor(Math.random() * arr.length + 1)-1];
}
function getRandomInt(min, max) { // noth inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function range(n){
    var i;
    var arr=[];
    for(i=0; i<n; i++){
        arr.push(i);
    }
    return arr;
}



function shuffleCards(){

	n.forEach(function(e, i){
		// e: number of cards for this digit
		// i: digit id
		var container = $('#baraja-el'+i);
		container.html('');

        var shuf = range(e);

	    container.append('<li><img src="images/card0.jpg"/></li>')

        $el[i] = $('#baraja-el'+i);
        baraja[i] = $el[i].baraja();
        baraja[i].setRandRange(e, i);
	})
}

var timers = [];
function set(i){
    timers[i] = setInterval(function(){
        console.log('next ' + i);
        baraja[i].next()
    }, 250);
}

function clear(i){
    timers[i] = clearInterval(timers[i]);
    $('#digit'+i + ' span').css('opacity', '1.0');
    if(i==2){
        $('#digit3 span').css('opacity', '1.0');
    }
}

var fanTimers = [];
function load(i){
    $('#digit'+i).css('border-color', 'red');
    if(i==2){
        $('#digit'+3).css('border-color', 'red');
    }
    else{
        $('#digit'+(i+1)).css('border-color', '');
    }
    if(i==1){
        $('#digit'+3).css('border-color', '');
    }

    $('#baraja-el'+(i==2?2:i+1)).fadeOut(function(){
        $('#baraja-el'+i).fadeIn(function(){
            var shuf = range(n[i]);
            shuf.forEach(function(j){
                if(j == 0)return;
                setTimeout(function(){
                    baraja[i].add($('<li><img src="images/card'+(j)+'.jpg"/></li>'));
                }, (j - 1) * 400);
            });
            setTimeout(function(){
                baraja[i].fan();
            }, n[i] * 400);
        });
    });

}
function defan(i){
    baraja[i].close();
}

var currentStage = -1;
function toggleMode(){


    var handlers = [
        function(){
            $('.digit span').html('?');
            $('#digit span').css('opacity', '0');
            $('.baraja-container').hide();
        },
        function(){load(2);},
        function(){defan(2);},
        function(){set(2);},
        function(){clear(2);},
        function(){load(1);},
        function(){defan(1);},
        function(){set(1);},
        function(){clear(1);},
        function(){load(0);},
        function(){defan(0);},
        function(){set(0);},
        function(){clear(0);},
        function(){load(-1);},
    ];
    var maxHandlerId = handlers.length - 1;

    currentStage += 1;

    (handlers[currentStage])();
}


//user input event handlers
document.onkeypress = function (ev) {
    toggleMode();
    return true;
};

document.onclick = function (ev) {
    toggleMode();
    return true;
};
