var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "img/background.png";

//Game objects
var hero = new Hero();
hero.imageLoad();

var monster = new Monster();
monster.imageLoad();

var render = function () {
    //TODO: tum hero , monster vb. objeleri listede tut
    if(bgReady)
        ctx.drawImage(bgImage, 0, 0);
    if(hero.ready)//hero.ready
        ctx.drawImage(hero.img, hero.pos.x, hero.pos.y);
    if(monster.ready)//monster.ready
        ctx.drawImage(monster.img, monster.pos.x, monster.pos.y);
    
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
    if(remainingTime <= 0)
        clearInterval(mainLoopInterval);
    
    //Update positions & collides
    updateObjectPositions(hero,delta / 1000);
    if(hero.collides(monster)){
        hero.reset();
        monster.reset();
        score++;
    }
    render();
    then = now;
};

//Initialize game
var score = 0;
var timeStart = Date.now();
var remainingTime = 15;
hero.reset();
monster.reset();
var then = Date.now();
var mainLoopInterval = setInterval(mainLoop,100/3);