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


var defaultConfig = {

	numberOfCards : 54,

	shuffleFadeOutDuration : 500,
	shuffleFadeOInDuration : 500,

	busySpeed : 30,

	timeBeforeGoFree : 30 * 1000,

	freeSpeed : 888,
	freeInterval : 4000,
	freeDelayBeforeClose : 1888,
	proportionOfFanWhenFree : 0.3,
    
	fans : [{
			speed : 500,
			easing : 'ease-out',
			range : 90,
			direction : 'right',
			origin : {
				x : 25,
				y : 100
			},
			center : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 90,
			direction : 'left',
			origin : {
				x : 75,
				y : 100
			},
			center : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 90,
			direction : 'right',
			origin : {
				minX : 20,
				maxX : 80,
				y : 100
			},
			center : true,
			translation : 60
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 90,
			direction : 'left',
			origin : {
				minX : 20,
				maxX : 80,
				y : 100
			},
			center : true,
			translation : 60
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 100,
			direction : 'right',
			origin : {
				x : 50,
				y : 200
			},
			center : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 80,
			direction : 'left',
			origin : {
				x : 200,
				y : 50
			},
			center : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 20,
			direction : 'right',
			origin : {
				x : 50,
				y : 200
			},
			center : false,
			translation : 300
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 20,
			direction : 'left',
			origin : {
				x : 50,
				y : 200
			},
			center : false,
			translation : 300
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 20,
			direction : 'right',
			origin : {
				x : 50,
				y : 200
			},
			center : false,
			translation : 300,
			scatter : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 20,
			direction : 'left',
			origin : {
				x : 50,
				y : 200
			},
			center : false,
			translation : 300,
			scatter : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 130,
			direction : 'left',
			origin : {
				x : 25,
				y : 100
			},
			center : false
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 360,
			direction : 'left',
			origin : {
				x : 50,
				y : 90
			},
			center : false
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 330,
			direction : 'left',
			origin : {
				x : 50,
				y : 100
			},
			center : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 90,
			direction : 'right',
			origin : {
				minX : 20,
				maxX : 80,
				y : 100
			},
			center : true,
			translation : 60,
			scatter : true
		},
	],
};

var config = $.extend(true, {}, defaultConfig, userConfig);

var $el;
var baraja;

var freeTimer;
var busyTimer;
var freeCloseTimer;
var goFreeTimer;
var changingStatus = false;


//array operations
function pickRandomly(arr){
    return arr[Math.floor(Math.random() * arr.length + 1)-1];
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
    var container = $('#baraja-el');
    container.html('');
    var index = [];
    
    range(1).forEach(function(){
        index = index.concat(range(config.numberOfCards));
    });
    
    index.sort(function(a,b){
        return Math.random() - 0.5;
    })

    index.forEach(function(j){
        container.append('<li><img src="images/card'+(j+1)+'.jpg"/></li>')
    })
    
    $el = $( '#baraja-el' );
    baraja = $el.baraja();
}


//mode transitions
function stopAll(){
    busyTimer = clearInterval(busyTimer);   
    freeTimer = clearInterval(freeTimer);
    freeCloseTimer = clearTimeout(freeCloseTimer);
    goFreeTimer = clearTimeout(goFreeTimer);
}
function stopBusy(){
    stopAll();
    if(config.timeBeforeGoFree){
        goFreeTimer = setTimeout(function(){
            goFree();
        }, config.timeBeforeGoFree);
    }
}
function goFree(){
    function goNext(){
        baraja.next();
    }
    function goFan(){
        clearTimeout(freeCloseTimer);
        freeCloseTimer = setTimeout(function(){
            baraja.close();
        }, config.freeDelayBeforeClose);
        baraja.fan(pickRandomly(config.fans));
        
    }
    
    baraja.options.speed = config.freeSpeed;
    baraja.close();
    
    stopAll();
    freeTimer = setInterval(function(){
        

        if(Math.random() < config.proportionOfFanWhenFree)
            goFan();
        else
            goNext();
        
    }, config.freeInterval);
}
function goBusy(){
    
    changingStatus = true;
    $el.fadeOut(config.shuffleFadeOutDuration, function(){
        shuffleCards();
        stopAll();
        busyTimer = setInterval(function(){
                baraja.options.speed = config.busySpeed;
                baraja.next();
            }, config.busySpeed);
        $el.fadeIn(config.shuffleFadeInDuration, function(){
            changingStatus = false;
        });
    });
    
}
function toggleMode(){
    if(changingStatus)
        return;
    if(busyTimer){
        stopBusy();
    }else{
        goBusy();
    }
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
