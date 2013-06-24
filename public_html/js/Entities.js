Entity = Class.extend({
    pos : {x:0,y:0},
    ready : false,
    img : null,

    imageLoad : function(){
    },
    collides : function(otherObject){
        var w = 32;
        var h = 32;
        if(this.pos.x <= (otherObject.pos.x + w)
                && (this.pos.x +w) >= otherObject.pos.x
                && this.pos.y <= (otherObject.pos.y + h)
                && (this.pos.y + h) >= otherObject.pos.y
        )
            return true;
        else
            return false;
    },
            
    reset : function(){
    }
});

Hero = Entity.extend({
    speed: 256,
    imageLoad : function(){
        var myImg = new Image();
        myImg.onload = function(){
            Hero.prototype.ready = true;
            //console.log("caller is " + arguments.callee.caller.toString());
        };
        myImg.src = "img/hero.png";
        this.img = myImg;
    },
    
    reset : function(){
        hero.pos.x = canvas.width / 2;
        hero.pos.y = canvas.height / 2;
    }
});
/*
var hero = {
    x: 0,
    y: 0,
    speed: 256,
    img : null,
    ready : false
};
hero.img = new Image();
hero.img.onload =  function() {
    hero.ready = true;
};
hero.img.src = "img/hero.png";*/
/*
var monster = {
    x:0,
    y:0
};
*/
Monster = Entity.extend({
    speed: 100,
    imageLoad : function(){
        this.img = new Image();
        this.img.onload = function(){
            Monster.prototype.ready = true;
        };
        this.img.src = "img/monster.png";
    },

    reset : function(){
        monster.pos.x = 32 + (Math.random() * (canvas.width - 64));
        monster.pos.y = 32 + (Math.random() * (canvas.height - 64));
    }
});