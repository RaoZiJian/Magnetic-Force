/**
 * Created by kafeier on 2014/8/21.
 */


var MenuLayer_ZORDER = 1,
    MenuLayer_TAG = 1;
var MenuLayer = cc.Layer.extend({
    isClicked : false,
    ctor : function () {
        this._super();
        this.isClicked = false;
    },
    onEnter : function () {
        this._super();

        var target = this;
        var spriteFrame = cc.spriteFrameCache;

        //the backGround
        var backGround = new cc.Sprite(res.BackgroundA);
        backGround.x = cc.winSize.width/2;
        backGround.y = 0;
        backGround.anchorY = 0;
        backGround.scaleX = 1.4;
        backGround.scaleY = 1.2;
        this.addChild(backGround,BACK_ZORDER);

        /*Menu UI*/

        //ordinaryBtn
        var ordinarySpriteFrame = spriteFrame.getSpriteFrame("1pBtn.png");
        var ordinaryBtn = new cc.MenuItemImage(ordinarySpriteFrame,ordinarySpriteFrame,function () {//when click
            if (!this.isClicked) {
                this.isClicked = true;

                target.runAction(new cc.Sequence(
                    new cc.CallFunc(hideUI),//the menu ui action
                    new cc.DelayTime(2.5),//wait for action finish
                    new cc.CallFunc(this.ordinaryGame, this)
                ));
            }
        },this);
        ordinaryBtn.setPosition(cc.p(cc.winSize.width / 2 - 47,340));

        //oneGoalBtn
        var oneGoalSpriteFrame = spriteFrame.getSpriteFrame("2pBtn.png");
        var oneGoalBtn = new cc.MenuItemImage(oneGoalSpriteFrame,oneGoalSpriteFrame,function () {
            if (!this.isClicked) {
                this.isClicked = true;

                target.runAction(new cc.Sequence(
                    new cc.CallFunc(hideUI),//the menu ui action
                    new cc.DelayTime(2.5),
                    new cc.CallFunc(this.oneGoalGame, this)

                ));
            }
        },this);
        oneGoalBtn.setPosition(cc.p(cc.winSize.width / 2 + 77,230));

        //btn 4p
        var btn_4p_spriteFrame = spriteFrame.getSpriteFrame("4pBtn.png");
        var btn_4p = new cc.MenuItemImage(btn_4p_spriteFrame,btn_4p_spriteFrame,function () {
             target.runAction(new cc.Sequence(
                 new cc.CallFunc(hideUI),
                 new cc.DelayTime(2.5),
                 new cc.CallFunc(this.playWith4P,this)
             ));
         },this);
        btn_4p.setPosition(cc.p(cc.winSize.width / 2 - 55,125));

        var helpBtn = new cc.Sprite(spriteFrame.getSpriteFrame("helpBtn.png"));
        helpBtn.setPosition(cc.p(cc.winSize.width - 55,55));

        var settingBtn = new cc.Sprite(spriteFrame.getSpriteFrame("settingsBtn.png"));
        settingBtn.setPosition(cc.p(55,55));

        var logo = new cc.Sprite(spriteFrame.getSpriteFrame("logo.png"));
        logo.setAnchorPoint(cc.p(0,0));
        logo.setPosition(cc.p(40,320));

        //hide the menu ui when click button
        function hideUI () {
            logo.runAction( new cc.Sequence(
                    new cc.DelayTime(0.5),
                    new cc.EaseSineOut(new cc.MoveTo(1.0,cc.p(logo.x,cc.winSize.height + 300))))
            );
            ordinaryBtn.runAction( new cc.Sequence(
                    new cc.EaseBackIn(new cc.MoveTo(0.9,cc.p(-500,ordinaryBtn.y))))
            );
            oneGoalBtn.runAction( new cc.Sequence(
                    new cc.DelayTime(0.1),
                    new cc.EaseBackIn(new cc.MoveTo(0.9,cc.p(cc.winSize.width + 500,oneGoalBtn.y))))
            );
            btn_4p.runAction( new cc.Sequence(
                    new cc.DelayTime(0.2),
                    new cc.EaseBackIn(new cc.MoveTo(0.9,cc.p(-500,btn_4p.y))))
            );
            helpBtn.runAction(new cc.Sequence(
                    new cc.DelayTime(0.5),
                    new cc.EaseSineOut(new cc.MoveTo(1.0,cc.p(helpBtn.x,-100))))
            );
            settingBtn.runAction(new cc.Sequence(
                    new cc.DelayTime(0.5),
                    new cc.EaseSineOut(new cc.MoveTo(1.0,cc.p(settingBtn.x,-100))))
            );
            backGround.runAction(new cc.Sequence(
                    new cc.DelayTime(1.5),
                    new cc.ScaleTo(0.8,1.0,1.0)
                )
            );
        }

        var menu = cc.Menu.create(ordinaryBtn,oneGoalBtn,btn_4p);
        menu.setPosition(cc.p(0,0));

        this.addChild(helpBtn);
        this.addChild(settingBtn);
        this.addChild(logo);
        this.addChild(menu);
    },
    ordinaryGame : function () {//to the odrinaryGame
        current_level = 0;
//        var parent_scene = this.parent;//gameScene
        var gameScene = new cc.Scene();
        var gameLayer = new OrdinaryLayer(res.Level1);
        gameScene.addChild(gameLayer,GameLayer_ZORDER);
        cc.director.runScene(gameScene);
    },
    oneGoalGame : function () {//to the oneGoalGmae
        current_level = 1;//for next level,if not use,can delete

        var gameScene = new cc.Scene();
        var gameLayer = new OneGoalLayer(res.Level2);
        gameScene.addChild(gameLayer,GameLayer_ZORDER);
        cc.director.runScene(gameScene);
    },
    playWith4P : function () {

    }
});

MenuLayer.createScene = function () {
    var menuScene = new cc.Scene();
    var menuLayer = new MenuLayer();
    menuLayer.setPosition(cc.p(0,0));
    menuScene.addChild(menuLayer,MenuLayer_ZORDER,MenuLayer_TAG);
    return menuScene;
}
