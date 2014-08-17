/**
 * Created by chenryoutou on 14-8-15.
 */

var winSize = null;

var KeyCode_Z = 90,
    KeyCode_X = 88,
    KeyCode_N = 78,
    KeyCode_M = 77,

    BACK_ZORDER = 0,
    BACK_TAG = 33,
    PLAYER_ZORDER = 10,
    TUBE_ZORDER = 200,
    ITEM_ZORDER = 11,
    MAP_ZORDER = 1,
    LEFT_GATE_TAG = 103,
    RIGHT_GATE_TAG = 104,
    MenuUI_ZORDER = 300,
    GuideUI_ZORDER = 301;

var GameLayer = cc.Layer.extend({

    isBegin : false,
    isOver : false,
    inTitle : false,

    space : null,

    debugNode : null,

    f_player:null,

    s_player:null,

    itemLayer : null,

    isEffectPlaying: false,

    gameController : null,

    ctor : function () {
        this._super();
        winSize = cc.director.getWinSize();
    },
    init : function(){

        if ( !this._super() ){
            return false;
        }
//        var armature = ccs.Armature.create("robot");
//        armature.getAnimation().playWithIndex(2);
//        armature.setPosition(200,300);
//        this.addChild(armature,100);

        this.loadResoure();

        this.createBackground();

        this.createPhysicsWorld();
//
        this.setupDebugNode();

        this.createWalls();

        this.createPlayers();

        this.createMagnetSystem();

        this.createItems();

        this.createGameController();
        this.isBegin = true;
        this.isOver = false;
        this.inTitle = false;

        return true;
    },

    initWithMenu : function () {
//        var armature = ccs.Armature.create("robot");
//        armature.getAnimation().playWithIndex(2);
//        armature.setPosition(200,300);
//        this.addChild(armature,100);

        this.isBegin = false;
        this.isOver = false;
        this.inTitle = true;

        this.loadResoure();

        this.createBackground();

        this.showMenu();

        return true;
    },
    createBackground : function() {
//        var back = new cc.Sprite(res.BackgroundA);
//        back.x = cc.winSize.width/2;
//        back.y = 0;
//        back.anchorY = 0;

//
//        var ground = new cc.Sprite(res.Ground);
//        ground.x = cc.winSize.width/2;
//        ground.y = ground.height/2;
//
        var tubeX = cc.winSize.width / 2 - 5, tubeY = cc.winSize.height - 185;
        var tube = new cc.Sprite(res.Tube);
        tube.x = tubeX;
        tube.y = tubeY;
        tube.anchorY = 0;
//
//        //left gate
//        var spriteFrameCache = cc.spriteFrameCache;
//        var left_gate = new cc.Sprite(spriteFrameCache.getSpriteFrame("purpleA.png"));
//        left_gate.setPosition(cc.p(0,0));
//        left_gate.setAnchorPoint(cc.p(0,0));
//
//        //right gate
//        var right_gate = new cc.Sprite(spriteFrameCache.getSpriteFrame("redA.png"));
//        right_gate.setPosition(cc.p(cc.winSize.width, 0));
//        right_gate.setAnchorPoint(cc.p(1,0));
//
////        this.addChild(back, BACK_ZORDER);
//        this.addChild(ground, BACK_ZORDER);
        this.addChild(tube, TUBE_ZORDER);

        // Add Tube Particle system
        this.forceEmitter = new cc.ParticleSystem(res.Pipe);
        this.forceEmitter.setPosition(tubeX, tubeY+tube.height/2);
        this.addChild(this.forceEmitter, TUBE_ZORDER-1);

//        this.addChild(left_gate,BACK_ZORDER,LEFT_GATE_TAG);
//        this.addChild(right_gate,BACK_ZORDER,RIGHT_GATE_TAG);

        var backGround = new BackGroundLayer();
        this.addChild(backGround,BACK_ZORDER,BACK_TAG);

//        this.showMenu();
    },

    createPhysicsWorld : function () {

        Physics.init(this.parent);
        this.space = Physics.world;
        // Gravity
        this.space.gravity = cp.v(0, -300);
    },
    setupDebugNode : function (){
        this.debugNode = cc.PhysicsDebugNode.create( this.space );
        this.debugNode.visible = true ;
        this.addChild( this.debugNode );
    },
    onToggleDebug : function() {
        var state = this.debugNode.visible;
        this.debugNode.visible = !state ;
    },
    createWalls : function () {

        Level.createLevel(res.Level1, this);

    },
    createPlayers : function () {

        this.f_player = new Player("robot", 50, winSize.width/6*5, 57);
        //var index = [5];
        this.f_player.getAnimation().playWithIndex(0);
        this.addChild(this.f_player, PLAYER_ZORDER);
//        this.f_player.isMagnetUpdated = function () {
//           var f_player_label = window.document.getElementById("f_player_magnet");
//            f_player_label.innerHTML = "&nbsp;&nbsp;&nbsp;f_megnet : " + this.isMagnet;
//            //console.log(s_player_label.innerHTML);
//        };
//        this.f_player.isAttractUpdated = function () {
//            var f_player_label = window.document.getElementById("f_player_attratic");
//            f_player_label.innerHTML =  "&nbsp;&nbsp;&nbsp;f_attratic : " + this.isAttract;
//            //console.log(s_player_label.innerHTML);
//        };

        this.s_player = new Player("robot", 50, winSize.width/6, 57);
        this.s_player.getAnimation().playWithIndex(3);
        this.addChild(this.s_player, PLAYER_ZORDER);
//        this.s_player.isMagnetUpdated = function () {
//            var s_player_label = window.document.getElementById("s_player_magnet");
//            s_player_label.innerHTML = "&nbsp;&nbsp;&nbsp;s_megnet : " +this.isMagnet;
//            //console.log(s_player_label.innerHTML);
//        };
//        this.s_player.isAttractUpdated = function () {
//            var s_player_label = window.document.getElementById("s_player_attratic");
//            s_player_label.innerHTML = "&nbsp;&nbsp;&nbsp;s_attratic : " +this.isAttract;
//            //console.log(s_player_label.innerHTML);
//        };

    },
    createMagnetSystem : function () {

        MagneticSystem.init(this, this.f_player, this.s_player);

    },
    createItems : function (){
        this.itemLayer = new ItemsLayer(this);
        this.addChild(this.itemLayer, ITEM_ZORDER);
    },

    createGameController : function(){
      this.gameController = new ScoreController(this);
    },

    checkResult : function () {
        var result = this.itemLayer.checkForGoal();
        if (result != ScoreController.HIT_NOTING) {
            this.gameController.gameOverAction();
        }
    },

    update : function( delta ) {
        if(this.isBegin && !this.inTitle){
            this.space.step( delta );

            this.f_player.phyUpdate();
            this.s_player.phyUpdate();

            MagneticSystem.update(delta);
            this.itemLayer.update(delta);

            if (!this.isOver)
                this.checkResult();
        }
    },

    onEnter : function () {
        this._super();
        this.scheduleUpdate();

        //button listener
        cc.eventManager.addListener({
            event : cc.EventListener.KEYBOARD,
            onKeyPressed : this.onKeyPressed,
            onKeyReleased: this.onKeyReleased
        }, this);
        //setup game begin.
        this.isBegin = true;

        //ccs.A
        Physics.addCollisionHandler(Player.COL_TYPE, Item.COL_TYPE, null, this.playerTouchItem, null, null);
        Physics.addCollisionHandler(Player.COL_TYPE, Wall.COL_TYPE, null, this.playerHitGround, null, null);
        Physics.addCollisionHandler(Player.COL_TYPE, Trampoline.COL_TYPE, null, this.playerHitTrampoline, null, null);
        Physics.addCollisionHandler(Player.COL_TYPE, CornerTrampoline.COL_TYPE, null, this.hitTrampoline, null, null);
        Physics.addCollisionHandler(Bomb.COL_TYPE, CornerTrampoline.COL_TYPE, null, this.hitTrampoline, null, null);
    },
    clear : function() {
        MagneticSystem.clear();
        this.gameController.clear();
        Physics.clear();
    },
    onExit : function () {
        this.unscheduleAllCallbacks();
        this.unscheduleUpdate();
        this._super();
    },
    onKeyPressed : function (key,event) {
        var target = event.getCurrentTarget();

        if ( !target.isBegin || target.isOver){
            return;
        }

        switch (key) {
            case KeyCode_M:
                target.f_player.isMagnet = true;
                target.f_player.isAttract = false;
                target.f_player.repulsion(2);
                break;
            case KeyCode_N:
                target.f_player.isMagnet = true;
                target.f_player.isAttract = true;
                target.f_player.jump();
                target.f_player.attraction(1);
                break;
            case KeyCode_X:
                target.s_player.isMagnet = true;
                target.s_player.isAttract = false;
                target.s_player.repulsion(5);
                break;
            case KeyCode_Z:
                target.s_player.isMagnet = true;
                target.s_player.isAttract = true;
                target.s_player.jump();

                target.s_player.attraction(4);
                break;
            default :
                break;
        }
    },
    onKeyReleased : function (key,event) {
        var target = event.getCurrentTarget();

        if ( !target.isBegin || target.isOver){
            return;
        }

        switch (key) {
            case KeyCode_M:
            case KeyCode_N:
                target.f_player.isMagnet = false;
                target.f_player.normal(0);
                target.f_player.resetJump();
                break;
            case KeyCode_X:
            case KeyCode_Z:
                target.s_player.isMagnet = false;
                target.s_player.normal(3);
                target.s_player.resetJump();
                break;
            default :
                break;
        }
    },
    playerTouchItem : function (arb, space, ptr) {
        var shapes = arb.getShapes();
        var player = shapes[0];
        var item = shapes[1];
        var armature = player.obj.view;
//        console.log("aaaaaaaa");
//        if(armature){
//            console.log(armature.eatItem());
//        }

        //console.log(armature);
//        if(armature){
//            armature.eatItem();
//        }

        return true;
    },
    playerHitGround : function (arb, space, ptr) {
        var shapes = arb.getShapes();
        var player = shapes[0];
        var ground = shapes[1];

//        var n = arb.getNormal(0);
//        var angle = cc.pToAngle( cc.p(n.x, n.y) );
        var angle = Physics.calculAngle(arb);

//        console.log(angle);

//        console.log(v.x + "   " + v.y);
//        var angle = Math.atan2(v.y , v.x);

        var player_armature = player.obj.view;
        player_armature.hitGround(arb.getPoint(0), angle);

        return true;
    },
    playerHitTrampoline : function (arb, space, ptr) {
        var shapes = arb.getShapes();
        var player = shapes[0].obj.view;
        player.jump(Trampoline.JUMP_FACTOR);
    },
    hitTrampoline : function (arb) {
        var shapes = arb.getShapes();
        var target = shapes[0];
        target.body.vx += BOMB_JUMP_ADD_SPEED * Trampoline.JUMP_FACTOR;
        target.body.vy += BOMB_JUMP_ADD_SPEED * Trampoline.JUMP_FACTOR;
    },

    playerBeExplode : function (arb, space, ptr) {

    },

    loadResoure : function () {
        var armatureDataManager = ccs.armatureDataManager;
        armatureDataManager.addArmatureFileInfo(res.Robot_exportJSON);
        armatureDataManager.addArmatureFileInfo(res.Explode_exportJSON);
        var spriteFrameCache = cc.spriteFrameCache;
        spriteFrameCache.addSpriteFrames(res.Bomb_plist);
        spriteFrameCache.addSpriteFrames(res.House_plist);
        spriteFrameCache.addSpriteFrames(res.game_ui_plist);
        spriteFrameCache.addSpriteFrames(res.over_ui_plist);
        spriteFrameCache.addSpriteFrames(res.Menu_plist);
        spriteFrameCache.addSpriteFrames(res.GuideUI_plist) ;
    },
    showMenu : function () {
        var back = this.getChildByTag(BACK_TAG);
        back.scaleX = 1.4;
        back.scaleY = 1.2;
        var target = this;
        var spriteFrame = cc.spriteFrameCache;
        var btn_1p_spriteFrame = spriteFrame.getSpriteFrame("1pBtn.png");
        var btn_1p = new cc.MenuItemImage(btn_1p_spriteFrame,btn_1p_spriteFrame,null/*function () {
            target.runAction(new cc.Sequence(
                new cc.CallFunc(hideUI),
                new cc.DelayTime(2.5),
                new cc.CallFunc(target.playWith1P.call(target))
            ));
        }*/,this);
        btn_1p.setPosition(cc.p(cc.winSize.width / 2 - 47,340));

        var btn_2p_spriteFrame = spriteFrame.getSpriteFrame("2pBtn.png");
        var btn_2p = new cc.MenuItemImage(btn_2p_spriteFrame,btn_2p_spriteFrame,function () {
            target.runAction(new cc.Sequence(
                new cc.CallFunc(hideUI),
                new cc.DelayTime(2),
                new cc.CallFunc(target.playWith2P,target)
            ));
        },this);
        btn_2p.setPosition(cc.p(cc.winSize.width / 2 + 77,230));

        var btn_4p_spriteFrame = spriteFrame.getSpriteFrame("2pBtn.png");
        var btn_4p = new cc.MenuItemImage(btn_4p_spriteFrame,btn_4p_spriteFrame,null/*function () {
            target.runAction(new cc.Sequence(
                new cc.CallFunc(hideUI),
                new cc.DelayTime(2.5),
                new cc.CallFunc(target.playWith4P)
            ));
        },*/,this);
        btn_4p.setPosition(cc.p(cc.winSize.width / 2 - 55,125));

        var btn_help = new cc.Sprite(spriteFrame.getSpriteFrame("helpBtn.png"));
        btn_help.setPosition(cc.p(cc.winSize.width - 55,55));

        var btn_setting = new cc.Sprite(spriteFrame.getSpriteFrame("settingsBtn.png"));
        btn_setting.setPosition(cc.p(55,55));

        var logo_png = new cc.Sprite(spriteFrame.getSpriteFrame("logo.png"));
        logo_png.setAnchorPoint(cc.p(0,0));
        logo_png.setPosition(cc.p(40,320));

        function hideUI () {
            logo_png.runAction( new cc.Sequence(
                new cc.DelayTime(0.5),
                new cc.EaseSineOut(new cc.MoveTo(1.0,cc.p(logo_png.x,cc.winSize.height + 300))))
            );
            btn_1p.runAction( new cc.Sequence(
                 new cc.EaseBackIn(new cc.MoveTo(0.9,cc.p(-500,btn_1p.y))))
            );
            btn_2p.runAction( new cc.Sequence(
                 new cc.DelayTime(0.1),
                 new cc.EaseBackIn(new cc.MoveTo(0.9,cc.p(cc.winSize.width + 500,btn_2p.y))))
            );
            btn_4p.runAction( new cc.Sequence(
                new cc.DelayTime(0.2),
                new cc.EaseBackIn(new cc.MoveTo(0.9,cc.p(-500,btn_4p.y))))
            );
            btn_help.runAction(new cc.Sequence(
                    new cc.DelayTime(0.5),
                    new cc.EaseSineOut(new cc.MoveTo(1.0,cc.p(btn_help.x,-100))))
            );
            btn_setting.runAction(new cc.Sequence(
                    new cc.DelayTime(0.5),
                    new cc.EaseSineOut(new cc.MoveTo(1.0,cc.p(btn_setting.x,-100))))
            );
            back.runAction(new cc.Sequence(
                    new cc.DelayTime(1.5),
                    new cc.ScaleTo(0.8,1.0,1.0)
                )
            );
        }

        var menu = cc.Menu.create(btn_1p,btn_2p,btn_4p);
        menu.setPosition(cc.p(0,0));

//        this.addChild(btn_2p,MenuUI_ZORDER);
//        this.addChild(btn_4p,MenuUI_ZORDER);
        this.addChild(btn_help,MenuUI_ZORDER);
        this.addChild(btn_setting,MenuUI_ZORDER);
        this.addChild(logo_png,MenuUI_ZORDER);
        this.addChild(menu,MenuUI_ZORDER);
    },
    playWith1P : function () {
        console.log("1p");
    },
    playWith2P : function () {
        console.log("2p");


        this.createPhysicsWorld();
//
        this.setupDebugNode();

        this.createWalls();

        this.createPlayers();

        this.createMagnetSystem();

        this.createItems();

        this.createGameController();

        this.isBegin = true;
        this.isOver = false;
        this.inTitle = false;
    },
    playWith4P : function () {
        console.log("4p");
    },
    settingMenu : function () {

    },
    helpMenu  : function () {

    },
    guideUI : function () {
        var spriteFrameCache = cc.spriteFrameCache;
        var guide = new cc.Sprite(spriteFrameCache.getSpriteFrame("guidePic.png"));
        var guide_text = new cc.Sprite(spriteFrameCache.getSpriteFrame("guideText.png"));
        var confirm_btn = new cc.Sprite(spriteFrameCache.getSpriteFrame("confirmBtn.png"));

        this.addChild();
    }
});


GameLayer.create = function () {
    var gameLayer = new GameLayer();
    if (gameLayer && gameLayer.init()) {
        return gameLayer;
    }
    return null;
};

GameLayer.createWithMenu = function() {
    var gameScene = new cc.Scene();
    gameLayer = new GameLayer();
    if(gameLayer && gameLayer.initWithMenu()) {
        gameScene.addChild(gameLayer);
        return gameScene;
    }
    return null;
}
GameLayer.createScene = function () {
    var gameScene = new cc.Scene();
    gameLayer = GameLayer.create();
    gameScene.addChild(gameLayer);
    return gameScene;
};
