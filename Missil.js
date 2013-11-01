/**
 * Created by aluno on 22/10/13.
 */
var Missil = cc.Sprite.extend({
    ctor:function(){
        this.initWithFile("missil_5x9.png");
        this.setPosition(new cc.Point(400, 75));
    },
    handleTouch:function(touchLocation)
    {
        var x = touchLocation.x;
        var y = touchLocation.y;
        var angle = ((Math.atan2((400 - x),(75 - y)) * 180) / Math.PI)+180;
        this.setRotation(angle);
        var dx = x-400;
        var dy = y-75;
        var velx = dx*dx;
        var vely = dy*dy;
        var t = Math.sqrt(velx+vely);
        var move = new cc.MoveTo.create(t/250, new cc.p(x,y));
        var hide = cc.Hide.create();
        this.runAction(move);
        this.schedule(function(){
            if(move.isDone())
            {
                this.kill();
            }
        })
    },
    collideRect:function(p){
        var a = this.getContentSize();
        return cc.rect(p.x - a.width, p.y - a.height,a.width,a.height);
    },
    kill:function(){
        this.removeFromParent(true);
        this.setPosition(new cc.p(100000,0));
    }
});