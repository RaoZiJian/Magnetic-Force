/**
 * Created by kafeier on 2014/8/28.
 */

var TUBE_ZORDER = 200,
    TUBE_TAG = 200;

var OrdinaryLayer = GameLayer.extend({
    createItems : function () {
        this.itemLayer = new ItemsLayer(this);
        this.addChild(this.itemLayer, ITEM_ZORDER);
    },
    createBackground : function () {
        var tubeX = cc.winSize.width / 2 - 5, tubeY = cc.winSize.height - 185;

        var tube = new cc.Sprite(res.Tube);
        tube.x = tubeX;
        tube.y = tubeY;
        tube.anchorY = 0;

        this.addChild(tube, TUBE_ZORDER,TUBE_TAG);

        // Add Tube Particle system
        this.forceEmitter = new cc.ParticleSystem(res.Pipe);
        this.forceEmitter.setPosition(tubeX, cc.winSize.height - 185 + tube.height/2);
        this.addChild(this.forceEmitter, TUBE_ZORDER-1);

        var backGround = new BackGroundLayer();
        this.addChild(backGround,BACK_ZORDER,BACK_TAG);
    },
    createWalls : function () {
        if (this.walls) {
            Level.createLevel(this.walls, this);
        }
    },
    createGameController : function(){
        this.gameController = new ScoreController(this);
    },
    showGuideUI : function () {//2p guideUI init
        var target  = this;
        var spriteFrameCache = cc.spriteFrameCache;
        var guideLayer = new cc.Layer();
        guideLayer.setPosition(cc.p(0,0));

        var guidePic = new cc.Sprite(spriteFrameCache.getSpriteFrame("guidePic.png"));
        guidePic.setPosition(cc.p(cc.winSize.width / 2 ,cc.winSize.height + 200));
        guidePic.runAction(new cc.Sequence(
            new cc.DelayTime(0.1),
            new cc.EaseBackOut(new cc.MoveTo(1.0,cc.p(cc.winSize.width / 2 ,520)))
        ));
        var guideText = new cc.Sprite(spriteFrameCache.getSpriteFrame("guideText.png"));
        guideText.setPosition(cc.p(-300 , 180));
        guideText.runAction(new cc.Sequence(
            new cc.DelayTime(0.3),
            new cc.EaseBackOut(new cc.MoveTo(1.0,cc.p(cc.winSize.width / 2 ,180)))
        ));

        var confirmBtnFrame = spriteFrameCache.getSpriteFrame("confirmBtn.png")
        var confirmBtn = new cc.MenuItemImage(confirmBtnFrame,confirmBtnFrame,function () {
            if( !this.clicked_1){
                this.clicked_1 = true;

                target.runAction(new cc.Sequence(
                    new cc.CallFunc(hideUI),
                    new cc.DelayTime(2.3),
                    new cc.CallFunc(target.startGame,target)
                ));
            }
        },this);
        confirmBtn.setPosition(cc.p(cc.winSize.width - 200 , 60));
        var menu = new cc.Menu(confirmBtn);
        menu.setPosition(cc.p(0,0));

        function hideUI () {
            guidePic.runAction(new cc.Sequence(
                new cc.DelayTime(0.3),
                new cc.EaseBackIn(new cc.MoveTo(1.0,cc.p(cc.winSize.width / 2 ,cc.winSize.height + 200)))
            ));
            guideText.runAction(new cc.Sequence(
                new cc.DelayTime(0.1),
                new cc.EaseBackIn(new cc.MoveTo(1.0,cc.p(-500 ,guideText.y)))
            ));
            menu.runAction(new cc.Sequence(
                new cc.DelayTime(0.5),
                new cc.EaseBackOut(new cc.MoveTo(1.0,cc.p(cc.winSize.height + 200 ,menu.y)))
            ));
        }

        guideLayer.addChild(guidePic);
        guideLayer.addChild(guideText);
        guideLayer.addChild(menu);
        this.addChild(guideLayer,GuideUI_ZORDER,GuideUI_TAG);
    },
    createPhysicsWorld : function () {
        this._super();
        Physics.addCollisionHandler(Player.COL_TYPE, CornerTrampoline.COL_TYPE, null, this.hitTrampoline, null, null);
        Physics.addCollisionHandler(Bomb.COL_TYPE, CornerTrampoline.COL_TYPE, null, this.hitTrampoline, null, null);
    },
    checkResult : function () {
        var result = this.itemLayer.checkForGoal();
        if (result == ScoreController.HIT_FP_HOUSE) {
            this.gameController.hitFpHouse();
        }
        else if (result == ScoreController.HIT_SP_HOUSE) {
            this.gameController.hitSpHouse();
        }
        if (this.gameController.isGameOver()) {
            this.gameController.gameOverAction();
        }
    }
});