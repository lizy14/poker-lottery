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



var config = $.extend(true, {}, defaultConfig, userConfig);

var $el;
var baraja;

var freeTimer;
var busyTimer;
var freeCloseTimer;
var goFreeTimer;
var changingStatus = false;

function getRandom(a, b){ //inclusive
    return Math.floor(Math.random()*(b-a+1))+a;
}
function getTrueRandom(min, max, num, callback){ //inclusive
  $.ajax({
    "type": "GET",
    "url":
      "https://www.random.org/integers/"
       +"?num="+num
       +"&min="+min
       +"&max="+max
       +"&col=1&base=10&format=plain&rnd=new",
    "success" : function(data, status, xhr){
      data = data
        .split('\n')
        .slice(0,-1)
        .map(function(x){
          return parseInt(x);
        });
      callback(data);
    },
    "error": function(xhr, status, error){
      console.log(status);
      var result = [];
      var i;
      for(i=0; i<num; i++){
        result.push(getRandom(min, max));
      }
      callback(result);
    }
  });
}

//array operations

function range(n){ //[0, n)
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
    var index = range(
      config.numberOfCards / 8
    );

    index.sort(function(a,b){
        return Math.random() - 0.5;
    })

    index.forEach(function(j){
      var _ = j * 8 + getRandom(0, 7);
  	  container.append(
        '<li><br><p style="font-size:260px">' + nodes[_].text
        + '</p><br><p style="font-size:30px">' + nodes[_].name
        + '</p><p style="font-size:50px">' + nodes[_].num
        + '</p></li>')
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
        baraja.fan(function(arr){
            return arr[Math.floor(Math.random() * arr.length + 1)-1];
        }(config.fans));

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
