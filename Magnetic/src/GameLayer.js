/**
 * Created by chenryoutou on 14-8-15.
 */

var winSize = null;

var SpaceGravite = -300;
var WallElastricity = 2.0;
var BackGroundElastricity = 1.2;

var KeyCode_Z = 90,
    KeyCode_X = 88,
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

        this.f_player = new Player(res.RobotA, 20, 100, 25);
        this.addChild(this.f_player, PLAYER_ZORDER);
        this.f_player.isMagnetUpdated = function () {
           // window.document.getElementById("s_player_status").innerHTML("fuck");
        };

//        this.space.addBody(f_player.phyObj.body);
//        this.space.addShape(f_player.phyObj.shape);


        this.s_player = new Player(res.RobotB, 20, 200, 25);
        this.addChild(this.s_player, PLAYER_ZORDER);

//        this.space.addBody(s_player.phyObj.body);
//        this.space.addShape(s_player.phyObj.shape);

    },
    createMagnetSystem : function () {

        MagneticSystem.init(this, this.f_player, this.s_player);

    },
    createController : function (){

        ItemsController.init(this);

    },

    update : function( delta ) {
        this.space.step( delta );

        MagneticSystem.update(delta);

        ItemsController.update(delta);

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
