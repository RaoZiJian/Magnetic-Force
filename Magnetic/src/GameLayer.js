/**
 * Created by chenryoutou on 14-8-15.
 */

var winSize = null;

var GameLayer = cc.Layer.extend({

    isBegin : false,

    space : null,

    debugNode : null,

    init : function(){

        if ( !this._super() ){
            return false;
        }

        winSize = cc.director.getWinSize();

        this.createPhysicsWorld();

        this.setupDebugNode();

        this.createWalls();

        this.createPlayers();

        this.createMagnetSystem();

        return true;
    },
    createPhysicsWorld : function () {

        Physics.init(this.parent);
        this.space = Physics.world;
        // Gravity
        this.space.gravity = cp.v(0, -100);

    },
    setupDebugNode : function (){
        this.debugNode = cc.PhysicsDebugNode.create( this.space );
        this.debugNode.visible = true ;
        this.addChild( this.debugNode );
    },
    createWalls : function () {

        var space = this.space ;
        var staticBody = space.staticBody;

        // Walls
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(winSize.width,0), 0 ),				// bottom
            new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,winSize.height), 0),				// left
            new cp.SegmentShape( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 0)	// right
        ];

        for ( var i = 0; i < walls.length; i++ ) {
            var shape = walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            space.addStaticShape( shape );
        }
    },
    createPlayers : function () {

        var f_player = new Player(res.CloseNormal_png, 30, 100, 100);
        this.addChild(f_player);

//        this.space.addBody(f_player.phyObj.body);
//        this.space.addShape(f_player.phyObj.shape);


        var s_player = new Player(res.CloseNormal_png, 50, 700, 100);
        this.addChild(s_player);

//        this.space.addBody(s_player.phyObj.body);
//        this.space.addShape(s_player.phyObj.shape);


    },
    createMagnetSystem : function () {

    },
    update : function( delta ) {
        this.space.step( delta );

//        MagneticSystem.update(dt);
    },
    onEnter : function () {
        this._super();

        this.scheduleUpdate();

        //setup game begin.
        this.isBegin = true;
    },
    onExit : function () {
        this.unscheduleUpdate();
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
    var gameLayer = GameLayer.create();
    gameScene.addChild(gameLayer);
    return gameScene;
};