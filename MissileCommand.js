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
    	time=600;
    	score=0;
        naves=[];
        misseis=[];
        numMisseis=0;
        numNaves=0;
        numCid=6;
        verNaves = true;
        verCanhao = true;
    	window.setInterval(function(){time--;}, 100);
        this._super();
        this.setTouchEnabled(true);

        var fundo = cc.Sprite.create("fundo.png");
        fundo.setPositionX(400);
        fundo.setPositionY(300);
        this.addChild(fundo);

        ct = [6];
        for(var i=0;i<6;i++)
        {
            ct[i] = new City(i);
            this.addChild(ct[i]);
        }
		  
		HUDt = cc.LabelTTF.create("0:0"+time, "Arial", 25);
		HUDt.setPosition(new cc.Point(750, 575));
		HUDs = cc.LabelTTF.create("Score: "+score, "Arial", 25);
		HUDs.setPosition(new cc.Point(50, 575));
		this.addChild(HUDs);
		this.addChild(HUDt);

        cn = new canhao();
        this.addChild(cn);


        this.schedule(function(){

            if(time<100)
            {
                HUDt.setString("0:0"+parseInt(time/10));
            }else
            {
                HUDt.setString("0:"+parseInt(time/10));
            }
            if(time % 60 == 0 && verNaves && time > 60)
            {
                naves.push(new Nave());
                this.addChild(naves[numNaves]);
                numNaves++;
                naves.push(new Nave());
                this.addChild(naves[numNaves]);
                numNaves++;
                naves.push(new Nave());
                this.addChild(naves[numNaves]);
                numNaves++;
                verNaves = false;
                window.setTimeout(function(){verNaves = true}, 500);
            }
            if(time<0 || numCid == 0)
            {
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.2,new Splash));
            }
            for(var a=0;a<naves.length;a++)
            {
                /*if(this.collide(naves[a],cn))
                {
                    naves[a].kill();
                    cn.kill();
                }*/
                for(var b=0;b<ct.length;b++)
                {
                    if(this.collide(naves[a], ct[b]))
                    {
                        naves[a].kill();
                        ct[b].kill();
                        numCid--;
                    }
                }
                for(var c=0;c<misseis.length;c++)
                {
                    if(this.collide(naves[a], misseis[c]))
                    {
                        naves[a].kill();
                        misseis[c].kill();
                        score++;
                        HUDs.setString("Score: "+score);
                    }
                }
            }
        });
        return this;
    },
    onTouchesEnded:function (pTouch,pEvent){
        if(verCanhao)
        {
            misseis.push(new Missil());
            this.addChild(misseis[numMisseis]);
            misseis[numMisseis].handleTouch(pTouch[0].getLocation());
            numMisseis++;
            verCanhao = false;
            window.setTimeout(function(){verCanhao = true}, 500);
        }
    },
    collide:function (a, b) {
        var pos1 = a.getPosition();
        var pos2 = b.getPosition();

        var aRect = a.collideRect(pos1);
        var bRect = b.collideRect(pos2);
        return cc.rectIntersectsRect(aRect, bRect);
    }
});