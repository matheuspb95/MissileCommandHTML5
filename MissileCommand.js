/** Created by aluno on 21/10/13.*/
var MissileCommand = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MissileCommandGame();
        layer.init();
        this.addChild(layer);
    }
});

var MissileCommandGame = cc.Layer.extend({
    init:function(){

    	time=6000;
    	score=0;
        naves=[];
        misseis=[]
        numMisseis=0;
        numNaves=0;
    	window.setInterval(function(){time--;}, 10);
        this._super();
        this.setTouchEnabled(true);

        var fundo = cc.Sprite.create("fundo.png");
        fundo.setPositionX(400);
        fundo.setPositionY(300);
        this.addChild(fundo);

        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames("cidade.plist", "city.png");
		  
		HUDt = cc.LabelTTF.create("0:0"+time, "Arial", 25);
		HUDt.setPosition(new cc.Point(750, 575));
		HUDs = cc.LabelTTF.create("Score: "+score, "Arial", 25);
		HUDs.setPosition(new cc.Point(50, 575));
		this.addChild(HUDs);
		this.addChild(HUDt);

        cidade = [];
        for(var i=0;i<3;i++)
        {
            cidade[i] = cc.Sprite.createWithSpriteFrameName("cidade1.png");
            cidade[i].setPosition(new cc.Point(55 + i * 108,48));
            this.addChild(cidade[i]);
        }
        for(i=3;i<6;i++)
        {
            cidade[i] = cc.Sprite.createWithSpriteFrameName("cidade1.png");
            cidade[i].setPosition(new cc.Point(200 + i * 108,48));
            this.addChild(cidade[i]);
        }
        cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames("canhao.plist", "canhao.png");

        var canhao = cc.Sprite.createWithSpriteFrameName("canhao1.png");
        canhao.setPosition(new cc.Point(400,44));


        this.addChild(canhao);
        this.scheduleUpdate();
        return this;
    },
    update:function(){
        if(time<1000)
        {
            HUDt.setString("0:0"+parseInt(time/100));
        }else {
            HUDt.setString("0:"+parseInt(time/100));
        }
        for(var j=0;j<cidade.length;j++)
        {
            for(i=0;i<naves.length;i++)
            {
                this.cityDestroy(naves[i],cidade[j]);

                for(var k=0;k<misseis.length;k++)
                {
                    this.collideCheck(naves[i],misseis[k]);
                }
            }
        }
        if(time % 300 === 0)
        {
            naves[numNaves] = new Nave();
            this.addChild(naves[numNaves]);
            numNaves++;
            naves[numNaves] = new Nave();
            this.addChild(naves[numNaves]);
            numNaves++;
            naves[numNaves] = new Nave();
            this.addChild(naves[numNaves]);
            numNaves++;
        }
        HUDs.setString("Score: "+score);
        if(time<0)
        {
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.2,new Splash));
        }
    },
    onTouchesEnded:function (pTouch,pEvent){
        misseis[numMisseis] = new Missil();
        this.addChild(misseis[numMisseis]);
        misseis[numMisseis].handleTouch(pTouch[0].getLocation());
        numMisseis++;
    },
    collideCheck:function(nave, missil){
        var a = nave.getContentSize();
        var p = nave.getPosition();
        var rect1 =  cc.rect(p.x - a.width, p.y - a.height, a.width, a.height);
        var b = missil.getContentSize();
        var q = missil.getPosition();
        var rect2 = cc.rect(q.x - b.width, q.y - b.height, q.width, b.height);
        if(cc.rectOverlapsRect(rect1,rect2))
        {
            score++;
            nave.removeFromParent(true);
            nave.setPosition(new cc.Point(-2000,0));
            missil.removeFromParent(true);
            missil.setPosition(new cc.Point(-1000,0));
        }
    },
    cityDestroy:function(nave,cidade)
    {
        var a = nave.getContentSize();
        var p = nave.getPosition();
        var rect1 =  cc.rect(p.x - a.width, p.y - a.height, a.width, a.height);
        var b = cidade.getContentSize();
        var q = cidade.getPosition();
        var rect2 = cc.rect(q.x - b.width, q.y - b.height, q.width, b.height);
        if(cc.rectOverlapsRect(rect1,rect2))
        {
            var pos = new cc.Point(q.x, q.y);
            cidade.removeFromParent(true);
            cidade = cc.Sprite.createWithSpriteFrameName("cidade2.png");
            cidade.setPosition(pos);
            this.addChild(cidade);
            nave.removeFromParent();
            nave.setPosition(new cc.Point(-2000,0));
            cc.log("Cidade destruida!");
        }

    }
});