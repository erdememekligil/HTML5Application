//Create Canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "img/background.png";


var render = function () {
    if(bgReady)
        ctx.drawImage(bgImage, 0, 0);
    for(var i=0; i<monsters.length; i++){
        if(monsters[i].ready)
            ctx.drawImage(monsters[i].img, monsters[i].pos.x, monsters[i].pos.y);
    }
    for(var i=0; i<heroes.length; i++){
        if(heroes[i].ready)
            ctx.drawImage(heroes[i].img, heroes[i].pos.x, heroes[i].pos.y);
    }
    
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + score, 32, 32);
    if(remainingTime <= 0)
        ctx.fillText("Game Over",32,0);
    else
        ctx.fillText("Time: " + Math.floor(remainingTime),32,0);
};

var mainLoop = function() {
    var now = Date.now();
    var delta = now - then;
    remainingTime = remainingTime - delta/1000;
    if(remainingTime <= 0){
        clearInterval(spawnMonsterInterval)
        clearInterval(mainLoopInterval);
    }
    
    //Update positions
    updateObjectPositions(hero,delta / 1000);
    //Collisions
    for(var i=0; i<heroes.length; i++){
        for(var j=0; j<monsters.length; j++){
            if(heroes[i].collides(monsters[j]) ){
                heroes[i].reset();
                score++;
                monsters.splice(j,1);
            }
        }
    }
    
    
    render();
    then = now;
};

var spawnMonster = function(){
    var newMonster = new Monster();
    newMonster.reset();
    monsters.push(newMonster);
};

//Initialize game objects
var heroes = [];
var monsters = [];

var hero = new Hero();
heroes.push(hero);

var monster = new Monster();
monsters.push(monster);

//Initialize game
var score = 0;
var timeStart = Date.now();
var remainingTime = 15;
hero.reset();
monster.reset();
var then = Date.now();
var mainLoopInterval = setInterval(mainLoop,100/3);//30FPS
var spawnMonsterInterval = setInterval(spawnMonster,1000);//Every second.