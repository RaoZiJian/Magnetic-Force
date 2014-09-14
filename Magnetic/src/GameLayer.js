/**
 * Created by chenryoutou on 14-8-15.
 */

var KeyCode_Z = 90,
    KeyCode_X = 88,
    KeyCode_N = 78,
    KeyCode_M = 77,

    BACK_ZORDER = 0,
    BACK_TAG = 33,
    PLAYER_ZORDER = 10,
    ITEM_ZORDER = 11,
    MAP_ZORDER = 1,
    GameLayer_ZORDER = 301,
    OverLayer_ZORDER = 303,
    GuideUI_ZORDER = 310,
    GuideUI_TAG = 310;

var GameLayer = cc.Layer.extend({

    isBegin : false,

    isOver : false,

    space : null,

    debugNode : null,

    f_player:null,

    s_player:null,

    itemLayer : null,

    isEffectPlaying: false,

    gameController : null,

    walls : null,//the walls map

    ctor : function (walls) {//the walls map
        this._super();

        this.walls = walls;
        this.init();

    },
    init : function(){//init game

        if ( !this._super() ){
            return false;
        }

        this.createBackground();
        this.showGuideUI();
        this.isBegin = false;
        this.isOver = false;

        return true;
    },
    createBackground : function() {
    },
    createPhysicsWorld : function () {
        Physics.init(this.parent);
        this.space = Physics.world;
        // Gravity
        this.space.gravity = cp.v(0, -300);

        //ccs.A
        Physics.addCollisionHandler(Player.COL_TYPE, Bomb.COL_TYPE, null, this.playerTouchBomb, null, null);
        Physics.addCollisionHandler(Player.COL_TYPE, Wall.COL_TYPE, null, this.playerHitGround, null, null);
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
    },
    createPlayers : function () {

        this.f_player = new Player("robot", 50, cc.winSize.width/6*5, 57);
        this.f_player.normal(0);
        this.addChild(this.f_player, PLAYER_ZORDER);

        this.s_player = new Player("robot", 50, cc.winSize.width/6, 57);
        this.s_player.normal(3);
        this.addChild(this.s_player, PLAYER_ZORDER);
    },
    createMagnetSystem : function () {

        MagneticSystem.init(this, this.f_player, this.s_player);

    },
    createItems : function (){
    },
    createGameController : function(){
    },
    checkResult : function () {
    },
    update : function( delta ) {
        if(this.isBegin){
            this.space.step( delta );

            this.f_player.phyUpdate(delta);
            var x = this.f_player.x;
            if (x < -40 || x > cc.winSize.width + 40)
                this.gameController.forceWin(GameController.SP_WIN);
            this.s_player.phyUpdate(delta);
            x = this.s_player.x;
            if (x < -40 || x > cc.winSize.width + 40)
                this.gameController.forceWin(GameController.FP_WIN);

            MagneticSystem.update(delta);
            this.itemLayer.update(delta);

            if (!this.isOver){
                this.gameController.update(delta);
                this.checkResult();
            }
        }
    },
    onEnter : function () {
        this._super();
        this.scheduleUpdate();
        //setup game begin.
        this.isBegin = false;

        //button listener
        cc.eventManager.addListener({
            event : cc.EventListener.KEYBOARD,
            onKeyPressed : this.onKeyPressed,
            onKeyReleased: this.onKeyReleased
        }, this);
    },
    clear : function() {
        MagneticSystem.clear();
        this.gameController && this.gameController.clear();
        Physics.clear();
    },
    onExit : function () {
        cc.eventManager.removeAllListeners();
        this.unscheduleAllCallbacks();
        this.unscheduleUpdate();
        this._super();
    },
    onKeyPressed : function (key,event) {
        var target = event.getCurrentTarget();

        if ( !target.isBegin || target.isOver || !target.f_player || !target.s_player){
            return;
        }

        switch (key) {
            case KeyCode_M:
//                console.log("mmmm" );
                target.f_player.isMagnet = true;
                target.f_player.isAttract = true;
                target.f_player.rocketEject();
//                target.f_player.setScale(PLAYER_SCALE,PLAYER_SCALE);
                target.f_player.attraction(1);
                break;
//            case KeyCode_N:
//                target.f_player.isMagnet = true;
//                target.f_player.isAttract = true;
//                target.f_player.jump();
//                target.f_player.setScale(0.95,0.95);
//                target.f_player.attraction(1);
//                break;
//            case KeyCode_X:
//                target.s_player.isMagnet = true;
//                target.s_player.isAttract = false;
//                target.s_player.repulsion(5);
//                break;
            case KeyCode_Z:
                target.s_player.isMagnet = true;
                target.s_player.isAttract = true;
                target.s_player.rocketEject();//rocket to go
//                console.log("z :" + target.s_player.scale);
//                target.s_player.setScale(PLAYER_SCALE,PLAYER_SCALE);
                target.s_player.attraction(4);//animation
                break;
            default :
                break;
        }
    },
    onKeyReleased : function (key,event) {
        var target = event.getCurrentTarget();

        if ( !target.isBegin || target.isOver || !target.f_player || !target.s_player){
            return;
        }

        switch (key) {
//            case KeyCode_N:
//                target.f_player.setScale(1/0.95,1/0.95);
            case KeyCode_M:
                target.f_player.setScale(1/PLAYER_SCALE,1/PLAYER_SCALE);
                target.f_player.isAttract = false;
                target.f_player.normal(0);
                console.log("mmmm release");
                target.f_player.setRocket(true);
                break;
//            case KeyCode_Z:
//                target.s_player.setScale(1/0.9,1/0.9);
            case KeyCode_Z:
//                console.log("ffffff :" + target.s_player.scale);
                target.s_player.setScale(1/PLAYER_SCALE,1/PLAYER_SCALE);
//                console.log("ffffff :" + target.s_player.scale);
                target.s_player.isAttract = false;
                target.s_player.normal(3);
                target.s_player.setRocket(true);
                break;
            default :
                break;
        }
    },
    playerTouchBomb : function (arb, space, ptr) {
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
    showGuideUI : function () {
    },
    startGame : function () {
        var guideUI = this.getChildByTag(GuideUI_TAG);
        if (guideUI) {
            guideUI.removeFromParent();
        }

        Global_Value.initWithConfig(Config[current_level]);

        this.createPhysicsWorld();
//
        //this.setupDebugNode();

        this.createWalls();

        this.createPlayers();

        this.createMagnetSystem();

        this.createItems();

        this.createGameController();

        this.isBegin = true;
        this.isOver = false;
    }
});
