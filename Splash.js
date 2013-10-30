var SplashLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        var size = cc.Director.getInstance().getWinSize();
        var fundo = new cc.Sprite.create("Splash.png");
        fundo.setPositionX(400);
        fundo.setPositionY(300);
        this.addChild(fundo);

        var menuItem1 = new cc.MenuItemFont.create("Start",'Start',this);
        var menuItem2 = new cc.MenuItemFont.create("Controls",'Controls',this);
        var menuItem3 = new cc.MenuItemFont.create("Scores",'Scores',this);
        var menuItem4 = new cc.MenuItemFont.create("Credits",'Credits',this);

        menuItem1.setPosition(new cc.Point(size.width/2,size.height/2+50));
        menuItem2.setPosition(new cc.Point(size.width/2,size.height/2));
        menuItem3.setPosition(new cc.Point(size.width/2,size.height/2-50));
        menuItem4.setPosition(new cc.Point(size.width/2,size.height/2-100));

        var menu = cc.Menu.create(menuItem1,menuItem2,menuItem3,menuItem4);
        menu.setPosition(new cc.Point(0,0));

        this.addChild(menu);

        return this;
    },
    Start:function(){
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2,new MissileCommand));
    },
    Controls:function(){
    },
    Score:function(){

    },
    Credits:function(){
        
    }
});


var Splash = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new SplashLayer();
        layer.init();
        this.addChild(layer);
    }
});