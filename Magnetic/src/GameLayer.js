/**
 * Created by chenryoutou on 14-8-15.
 */

var winSize = null;

var SpaceGravite = -300;
var WallElastricity = 2.0;
var BackGroundElastricity = 1.2;

var KeyCode_Z = 90,
    KeyCode_X = 98,
    KeyCode_N = 78,
    KeyCode_M = 77,

    BACK_ZORDER = 0,
    PLAYER_ZORDER = 10,
    ITEM_ZORDER = 11;

var GameLayer = cc.Layer.extend({

    isBegin : false,

    space : null,

    debugNode : null,

    f_player:null,

    s_player:null,

    init : function(){

        if ( !this._super() ){
            return false;
        }

        winSize = cc.director.getWinSize();

        this.createBackground();

        this.createPhysicsWorld();

        this.setupDebugNode();

        this.createWalls();

        this.createPlayers();

        this.createMagnetSystem();

        this.createController();

        return true;
    },

    createBackground : function() {
        var back = new cc.Sprite(res.BackgroundA);
        back.x = cc.winSize.width/2;
        back.y = 0;
        back.anchorY = 0;
        this.addChild(back, BACK_ZORDER);
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

        var space = this.space ;
        var staticBody = space.staticBody;

        // Walls
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(winSize.width,0), 10 ),				// bottom
            new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,winSize.height), 10),				// left
            new cp.SegmentShape( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 10)	// right
        ];


        var shape = walls[0];
        shape.setElasticity(BackGroundElastricity);
        shape.setFriction(1);
        space.addStaticShape( shape );

        for ( var i = 1; i < walls.length; i++ ) {
            var shape = walls[i];
            shape.setElasticity(WallElastricity);
            shape.setFriction(1);
            space.addStaticShape( shape );
        }
    },
    createPlayers : function () {

        this.f_player = new Player(res.RobotA, 50, 100, 25);
        this.addChild(this.f_player, PLAYER_ZORDER);

//        this.space.addBody(f_player.phyObj.body);
//        this.space.addShape(f_player.phyObj.shape);


        this.s_player = new Player(res.RobotB, 50, 300, 25);
        this.addChild(this.s_player, PLAYER_ZORDER);

//        this.space.addBody(s_player.phyObj.body);
//        this.space.addShape(s_player.phyObj.shape);

    },
    createMagnetSystem : function () {

        MagneticSystem.init(this, this.f_player, this.s_player);

        //test
        this.f_player.isMagnet = false;
        this.s_player.isMagnet = false;

        var test_body = new cp.Body(0.05, cp.momentForCircle(1, 0, 20, cp.v(0, 0)));
        var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
        test_shape.setFriction(0.5);
        test_shape.setElasticity(0.5);
        test_body.setPos( cp.v(300, 600) );

        this.space.addBody(test_body);
        this.space.addShape(test_shape);

        MagneticSystem.addOtherItem(test_body);


        var test_body = new cp.Body(0.5, cp.momentForCircle(0.5, 0, 15, cp.v(0, 0)));
        var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
        test_shape.setFriction(0.5);
        test_shape.setElasticity(0.5);
        test_body.setPos( cp.v(500, 600) );

        this.space.addBody(test_body);
        this.space.addShape(test_shape);

        MagneticSystem.addOtherItem(test_body);

        var test_body = new cp.Body(0.5, cp.momentForCircle(0.5, 0, 10, cp.v(0, 0)));
        var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
        test_shape.setFriction(0.5);
        test_shape.setElasticity(0.5);
        test_body.setPos( cp.v(250, 800) );

        this.space.addBody(test_body);
        this.space.addShape(test_shape);

        MagneticSystem.addOtherItem(test_body);

        var test_body = new cp.Body(0.05, cp.momentForCircle(1, 0, 10, cp.v(0, 0)));
        var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
        test_shape.setFriction(0.5);
        test_shape.setElasticity(0.5);
        test_body.setPos( cp.v(550, 900) );

        this.space.addBody(test_body);
        this.space.addShape(test_shape);

        MagneticSystem.addOtherItem(test_body);

        var test_body = new cp.Body(0.5, cp.momentForCircle(0.5, 0, 10, cp.v(0, 0)));
        var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
        test_shape.setFriction(0.5);
        test_shape.setElasticity(0.5);
        test_body.setPos( cp.v(250, 1000) );

        this.space.addBody(test_body);
        this.space.addShape(test_shape);

        MagneticSystem.addOtherItem(test_body);

    },
    createController : function (){

        ItemsController.init(this);

    },

    update : function( delta ) {
        this.space.step( delta );

        MagneticSystem.update(delta);

//        ItemsController.update(delta);

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
    },
    onExit : function () {
        this.unscheduleUpdate();
        this._super();
    },
    onKeyPressed : function (key,event) {
        var target = event.getCurrentTarget();
        console.log(key.toString());
        switch (key) {
            case KeyCode_M:
                console.log("press m");
                target.s_player.isMagnet = true;
                target.s_player.isAttract = false;
                break;
            case KeyCode_N:
                target.s_player.isMagnet = true;
                target.s_player.isAttract = true;
                break;
            case KeyCode_X:
                target.f_player.isMagnet = true;
                target.f_player.isAttract = false;
                break;
            case KeyCode_Z:
                target.f_player.isMagnet = true;
                target.f_player.isAttract = true;
                break;
            default :
                break;
        }
    },
    onKeyReleased : function (key,event) {
        var target = event.getCurrentTarget();
        switch (key) {
            case KeyCode_M:
                target.s_player.isMagnet = false;
            case KeyCode_N:
                target.s_player.isMagnet = false;
                break;
            case KeyCode_X:
                target.f_player.isMagnet = false;
            case KeyCode_Z:
                target.f_player.isMagnet = false;
                break;
            default :
                break;
        }
    }


});


GameLayer.create = function () {
    var gameLayer = new GameLayer();
    if (gameLayer && gameLayer.init()) {
        return gameLayer;
    }
    return null;
};

GameLayer.createScene = function () {
    var gameScene = new cc.Scene();
    gameLayer = GameLayer.create();
    gameScene.addChild(gameLayer);
    return gameScene;
};
