/**
 * Created by aluno on 04/11/13.
 */
var controlsLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        var fundo = new cc.Sprite.create("controls.png");
        fundo.setPositionX(400);
        fundo.setPositionY(300);
        this.addChild(fundo);

        var menuItem1 = new cc.MenuItemFont.create("Back",'Back',this);

        menuItem1.setPosition(new cc.Point(400, 30));

        var menu = cc.Menu.create(menuItem1);
        menu.setPosition(new cc.Point(0,0));

        this.addChild(menu);

        return this;
    },
    Back:function(){
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.1,new Splash));
    }
});


var controls = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new controlsLayer();
        layer.init();
        this.addChild(layer);
    }
});
