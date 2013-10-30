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
        cc.log("dx="+dx+" dy="+dy+" / velx="+velx+" vely="+vely+" t="+t);
        var move = new cc.MoveTo.create(t/250, new cc.p(x,y));
        var hide = cc.Hide.create();
        this.runAction(move);
        this.schedule(function(){
            if(move.isDone())
            {
                this.removeFromParent(true);
                /*var cache = cc.SpriteFrameCache.getInstance();
                cache.addSpriteFrames("explosao.plist", "explosao.png");

                var pre = "explosao";
                var index = 1;
                this.this = cc.Sprite.createWithSpriteFrameName(pre + index +".png");
                this.schedule(function(){
                     index++;
                     this.setSpriteFrame(pre + index + ".png");
                     if(index > 14)
                     {
                         this.remove;
                     }
                });*/
            }
        })
    },
    collideRect:function(){
        var a = this.getContentSize();
        var p = this.getPosition();
        return cc.rect(p.x, p.y,a.width,a.height);
    }
});