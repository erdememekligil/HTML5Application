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
    init: function(){
        this.imageLoad();
    },
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
        this.pos.x = canvas.width / 2;
        this.pos.y = canvas.height / 2;
    }
});

Monster = Entity.extend({
    speed: 100,
    init: function(){
        this.imageLoad();
    },
    imageLoad : function(){
        this.img = new Image();
        this.img.onload = function(){
            Monster.prototype.ready = true;
        };
        this.img.src = "img/monster.png";
    },

    reset : function(){
        this.pos.x = 32 + (Math.random() * (canvas.width - 64));
        this.pos.y = 32 + (Math.random() * (canvas.height - 64));
    }
});