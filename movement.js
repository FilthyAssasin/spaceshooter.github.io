let enterKeyPressed = false;
let ship = document.getElementById("ship");
let rotateAngle = 0; 
let move;
let rotation;
let rotating = false;
let moving = false;
let x = 900;
let y = 450;
document.getElementById("spaceShipDiv").style.transform = "translate(" + x + "px," + y + "px)";
document.getElementById("bulletDiv").style.transform = "translate(" + x + "px," + y + "px)";
let angle;
let shotOnce = false;

window.addEventListener("keydown", function(event){
    if(event.keyCode == 13){
        enterKeyPressed = true;
        var x = document.getElementsByClassName("beginText");
        for(var i = 0;i<x.length;i++){
            if(i == 1){
                continue;
            }
            x[i].style.visibility = "hidden";
        }
        x[1].innerHTML = "Shoot down opponents. Last man standing wins!"
    }
    if(enterKeyPressed && event.keyCode == 32){
        shoot();
    }
    if(enterKeyPressed && (event.keyCode == 65 || event.keyCode == 68)){
        rotate(event.keyCode);
    }
    if(enterKeyPressed && (event.keyCode == 83 || event.keyCode == 87)){
        Move(event.keyCode);
    }
});

window.addEventListener("keyup", function(event){
    if(event.keyCode == 65){
        clearInterval(rotation);
        rotating = false;
    }
    else if(event.keyCode == 68){
        clearInterval(rotation);
        rotating = false;
    }
    else if(event.keyCode == 83){
        clearInterval(move);
        moving = false;
    }
    else if(event.keyCode == 87){
        clearInterval(move);
        moving = false;
    }
});

function rotate(key){
    if(key == 65){
        if(!rotating){
            rotateAngle = rotateAngle - 15;
            rotating = true;
            rotation = setInterval(function(){
                ship.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");
                rotateAngle = rotateAngle - 15;
            },100)
        }
    }
    if(key == 68){
        if(!rotating){
            rotateAngle = rotateAngle + 15;
            rotating = true;
            rotation = setInterval(function(){
                ship.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");
                rotateAngle = rotateAngle + 15;
            },100)
        }
    }
}

function Move(key){
    angle = rotateAngle%360;
    angle = angle * (Math.PI/180);
    if(key == 87){
        if(!moving){
            moving = true;
            move = setInterval(function(){
                angle = rotateAngle%360;
                angle = angle * (Math.PI/180);
                x += Math.sin(angle)*30 ;
                y -= Math.cos(angle)*30;
                document.getElementById("spaceShipDiv").style.transform = "translate(" + x + "px," + y + "px)";
                
            },100);
        }
    }
    if(key == 83){
        if(!moving){
            moving = true;
            move = setInterval(function(){
                angle = rotateAngle%360;
                angle = angle * (Math.PI/180);
                x -= Math.sin(angle)*30;
                y += Math.cos(angle)*30;
                document.getElementById("spaceShipDiv").style.transform = "translate(" + x + "px," + y + "px)";
            },100);
        }
    }
}

function shoot(){
    let X = x;
    let Y = y;
    let ANGLE = angle;
    let countTime = 0;
    if(!shotOnce){
        let bullet = setInterval(function(){
            ANGLE = rotateAngle%360;
            ANGLE = ANGLE * (Math.PI/180);
            X += Math.sin(ANGLE)*60;
            Y -= Math.cos(ANGLE)*60;
            countTime += 100
            if(countTime == 2000){
                clearInterval(bullet);
                countTime = 0;
                shotOnce = false;
            }
        },100)
    }
}