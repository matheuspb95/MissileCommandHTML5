/**
 * Created by aluno on 23/10/13.
 */
var Nave = cc.Sprite.extend({
    ctor:function(){
        this.initWithFile("naves_7x10.png");
        var posx = Math.random()*800;
        var angle;
        var velx;
        var vely;
        var V = 2;
        this.setPosition(new cc.Point(posx, 600));
        if(posx < 400)
        {
            angle = -45;
            velx = Math.sin(angle*0.0174)*V;
            vely = Math.cos(angle * 0.0174) * V;
        }else{
            angle = 45;
            velx = Math.sin(angle*0.0174)*V;
            vely = Math.cos(angle * 0.0174) * V;
        }
        this.setRotation(angle);
        this.schedule(function(){
            this.setPosition(new cc.Point(this.getPosition().x-velx,this.getPosition().y-vely))
            if(this.getPositionY() < 30)
            {
                this.removeFromParent(true);
            }
        })
    },
    collideRect:function(){
        var a = this.getContentSize();
        var p = this.getPosition();
        return cc.rect(p.x - a.width/2, p.y - a.height/4,a.width,a.height/2);
    }
})
