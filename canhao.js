/**
 * Created by aluno on 01/11/13.
 */
var canhao = cc.Sprite.extend({
    alive:true,
    ctor:function(pos){
        this._super();
        sprite = cc.SpriteFrameCache.getInstance();
        sprite.addSpriteFrames("canhao.plist", "canhao.png");

        var frame = []
        frame.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("canhao1.png"));
        frame.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("canhao2.png"));
        //frame = frame*4;

        fail = cc.Animate.create(cc.Animation.create(frame, 0.3));

        var f1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("canhao1.png")
        this.initWithSpriteFrame(f1);
        this.setPosition(400,44);
    },
    kill:function(){
        this.alive = false;
        window.setTimeout(function(){this.alive = true},1500);
        this.runAction(fail);
    },
    collideRect:function(p){
        if(this.alive == false)
            return cc.rect(1000000,100000,1,1)
        var a = this.getContentSize();
        return cc.rect(p.x - a.width/2, p.y - a.height/4,a.width,a.height/2);
    }
})
