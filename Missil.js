/**
 * Created by aluno on 22/10/13.
 */
var Missil = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile("missil_5x9.png");
        this.setPosition(new cc.Point(400, 75));
        cc.AudioEngine.getInstance().setEffectsVolume(0.1);
        cc.AudioEngine.getInstance().playEffect("missle",false);
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
        var ver = true
        var move = new cc.MoveTo.create(t/250, new cc.p(x+2,y+2));
        var hide = cc.Hide.create();
        this.runAction(move);
        this.schedule(function(){
            if(this.getPosition().y > y && ver)
            {
                cc.log("end");
                this.kill();
                ver = false;
            }
        })

},
    collideRect:function(p){
        var a = this.getContentSize();
        return cc.rect(p.x - a.width, p.y - a.height,a.width,a.height);
    },
    kill:function(){
        this.stopAllActions();
        cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames("explosao.plist", "explosao.png");

        var iFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("explosao1.png");
        this.initWithSpriteFrame(iFrame);

        var animFrames = [];
        var str = "";
        for (var i = 1; i <= 14; i++) {
            str = "explosao" + i + ".png";
            var frame = cache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.1);
        cc.AnimationCache.getInstance().addAnimation(animation, "boom");

        var animation = cc.AnimationCache.getInstance().getAnimation("boom");

        var action = cc.Animate.create(animation);

        cc.AudioEngine.getInstance().setEffectsVolume(0.1);
        cc.AudioEngine.getInstance().playEffect("bomb",false);

        this.runAction(action);
        this.schedule(function(){
            if(action.isDone())
            {
                this.removeFromParent(true);
                this.setPosition(-1000,-1000);
                cc.log("kill");
            }
        })
    }
});