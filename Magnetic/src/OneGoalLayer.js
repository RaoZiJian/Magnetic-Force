var OneGoalLayer = GameLayer.extend({
    createItems : function (){
        this.itemLayer = new OneGoalItemsLayer(this);
        this.addChild(this.itemLayer, ITEM_ZORDER);
    },

    createBackground : function() {
        // Add Tube Particle system
        this.forceEmitter = new cc.ParticleSystem(res.Pipe);
        this.forceEmitter.setPosition(cc.winSize.width/2, cc.winSize.height - 100);
        this.forceEmitter.scaleX = 0.5;
        this.addChild(this.forceEmitter, TUBE_ZORDER-1);

        var background = new cc.Sprite(res.BackgroundB);
        this.addChild(background, BACK_ZORDER,BACK_TAG);
        background.x = cc.winSize.width/2;
        background.y = cc.winSize.height/2;
    },

    createGameController : function(){
        this.gameController = new OneGoalController(this);
    },

    checkResult : function () {
        var result = this.itemLayer.checkForGoal();
        if (result == OneGoalController.FP_GET_SCORE)
            this.gameController.addFpScore();
        else if (result == OneGoalController.SP_GET_SCORE)
            this.gameController.addSpScore();

        if (this.gameController.isGameOver()) {
            this.gameController.gameOverAction();
        }
    },

    createWalls : function () {
        if (this.walls){
            Level.createLevel(this.walls, this);
        }
    },

    playerTouchBomb : function (arb, space, ptr) {
        var shapes = arb.getShapes();
        var player = shapes[0].obj.view;
        var item = shapes[1].obj.view;
        var gameLayer = player.parent;

        // Own by first player (nasty one)
        if (player == gameLayer.f_player) {
            item.captured(true);
        }
        // naughty one
        else if (player == gameLayer.s_player) {
            item.captured(false);
        }
        return true;
    },
    showGuideUI : function () {//2p guideUI init
        this._super();
        var target  = this;
        var spriteFrameCache = cc.spriteFrameCache;
        var guideLayer = new cc.Layer();
        guideLayer.setPosition(cc.p(0,0));

        var guidePic = new cc.Sprite(spriteFrameCache.getSpriteFrame("guidePicB.png"));
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
            if(!this.clicked_2){
                this.clicked_2 = true;

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
        Physics.addCollisionHandler(Player.COL_TYPE, Trampoline.COL_TYPE, null, this.playerHitTrampoline, null, null);
    }
});