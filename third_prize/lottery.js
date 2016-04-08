/**
 * a lottery application
 * for the 2016 Student Festival of School of Software, Tsinghua University
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Authored By Zhaoyang Li, SSSAT, 2016.4.
 * lizy14@mails.tsinghua.edu.cn
 */


function getRandom(a, b){ //inclusive
    return Math.floor(Math.random()*(b-a+1))+a;
}
function getTrueRandom(min, max, num, callback){ //inclusive
  $.ajax({
    "type": "GET",
    "url":
      "__https://www.random.org/integers/"
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

function drawCard(i, callback){
  //let's enjoy callback hell
  $('.card'+i).slideDown(100, function(){
    $('.card'+i+' .symbol').fadeIn(100, function(){
      $('.card'+i+' .name' ).fadeIn(50, function(){
        $('.card'+i+' .dec' ).fadeIn(100, function(){
          callback();
        });
      });
    });
  });
}

function draw(arr, callback){
  var str="";
  arr.forEach(function(_, i){
    e = charset[0][_];
    str += ("<div class=\"card card"+ (4-i) + "\">");
    str += ("<div class=\"symbol\">" + "&#"+parseInt(e[0]) + "</div>");
    str += ("<div class=\"name\">" + e[1] + "</div>");
    str += ("<div class=\"dec\">" + e[0] + "</div>");
    str += ("</div>");
  });
  $('.container').html(str);
  
  //let's enjoy callback hell
  $('.container').show(0, function(){
    drawCard(4, function(){
      drawCard(3, function(){
        drawCard(2, function(){
          drawCard(1, function(){
            drawCard(0, function(){
              callback();
            });
          });
        });
      });
    });
  });
}

var lock = false;
function toggleMode(){
  if(lock){
    console.log("locked");
    return;
  }
  lock = true;
  $('.container').fadeOut(200, function(){
    getTrueRandom(0, 823, 5, function(arr){
      draw(arr, function(){
        lock=false;
      });
    });
  });

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
