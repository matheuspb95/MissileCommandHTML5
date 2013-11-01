/**
 * Created by aluno on 31/10/13.
 */
var City = cc.Sprite.extend({
    alive:true,
    ctor:function(pos){
        cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames("cidade.plist", "city.png");

        var frame = []
        frame.push(cache.getSpriteFrame("cidade2.png"));
        frame.push(cache.getSpriteFrame("cidade3.png"));



        var explode = cc.Animation.create(frame, 0.3);
        action = cc.Animate.create(explode);


        this.initWithSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("cidade1.png"));

        if(pos < 3)
            this.setPosition(55 + 108*pos,48);
        else
            this.setPosition(200 + 108*pos,48);
    },
    kill:function(){
        this.runAction(action);
        cc.log("cidade destruida");
        if(this.displayFrame() == cache.getSpriteFrame("cidade3.png"));
        {
            this.alive = false
        }
    },
    collideRect:function(p){
        if(this.alive == false)
            return cc.rect(1000000,100000,1,1)
        var a = this.getContentSize();
        return cc.rect(p.x - a.width/2, p.y - a.height/4,a.width,a.height/2);
    }
})
