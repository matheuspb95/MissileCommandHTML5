/** Created by aluno on 21/10/13.*/
var MissileCommand = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MissileCommandGame();
        layer.init();
        this.addChild(layer);
    }
})

var MissileCommandGame = cc.Layer.extend({
    init:function(){
        var missil =[];
        var mCont=0;
        var nave=[];
        var mNave=0;

    	var time=600;
    	var score=0;
    	window.setInterval(function(){time--;}, 100);
        this._super();
        this.setTouchEnabled(true);

        var fundo = cc.Sprite.create("fundo.png");
        fundo.setPositionX(400);
        fundo.setPositionY(300);
        this.addChild(fundo);

        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames("cidade.plist", "city.png");
		  
		var HUDt = cc.LabelTTF.create("0:0"+time, "Arial", 25);
		HUDt.setPosition(new cc.Point(750, 575));
		var HUDs = cc.LabelTTF.create("Score: "+score, "Arial", 25);
		HUDs.setPosition(new cc.Point(50, 575));
		this.addChild(HUDs);
		this.addChild(HUDt);

        var cidade = [];
        for(var i=0;i<3;i++)
        {
            cidade[i] = cc.Sprite.createWithSpriteFrameName("cidade1.png");
            cidade[i].setPosition(new cc.Point(55 + i * 108,48));
            this.addChild(cidade[i]);
        }
        for(var i=3;i<6;i++)
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
        this.schedule(function(){
        	if(time % 30 == 0)
            {
                this.addChild(new Nave());
                this.addChild(new Nave());
                this.addChild(new Nave());
            }
            if(time<100)
        	{
        	    HUDt.setString("0:0"+parseInt(time/10));
        	}else {
        	    HUDt.setString("0:"+parseInt(time/10));
        	}
        	if(time<0)
        	{
        		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.2,new Splash));
        	}
        });

        return this;
    },
    onTouchesEnded:function (pTouch,pEvent){
        mCont++;
        missil[mCont] = new Missil();
        this.addChild(missil[mCont]);
        missil[mCont].handleTouch(pTouch[0].getLocation());
    }
});