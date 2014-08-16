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
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(winSize.width,0), 5 ),				// bottom
            new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,winSize.height), 5),				// left
            new cp.SegmentShape( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 5)	// right
        ];

        for ( var i = 0; i < walls.length; i++ ) {
            var shape = walls[i];
            shape.setElasticity(2);
            shape.setFriction(1);
            space.addStaticShape( shape );
        }
    },
    createPlayers : function () {

        this.f_player = new Player(res.CloseNormal_png, 20, 100, 200);
        this.addChild(this.f_player);


        this.s_player = new Player(res.CloseNormal_png, 20, 300, 200);
        this.addChild(this.s_player);

    },
    createMagnetSystem : function () {

        MagneticSystem.init(this, this.f_player, this.s_player);

        //test
        this.f_player.isMagnet = true;
        this.s_player.isMagnet = true;
//        this.f_player.isAttract = false;
//        this.s_player.isAttract = false;

        var test_body = new cp.Body(0.1, cp.momentForCircle(1, 0, 20, cp.v(0, 0)));
        var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
        test_shape.setFriction(0.5);
        test_shape.setElasticity(0.3);
        test_body.setPos( cp.v(300, 600) );

        this.space.addBody(test_body);
        this.space.addShape(test_shape);

        MagneticSystem.addOtherItem(test_body);

//        var test_body = new cp.Body(0.1, cp.momentForCircle(1, 0, 15, cp.v(0, 0)));
//        var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
//        test_shape.setFriction(0.5);
//        test_shape.setElasticity(0.3);
//        test_body.setPos( cp.v(500, 600) );
//
//        this.space.addBody(test_body);
//        this.space.addShape(test_shape);
//
//        MagneticSystem.addOtherItem(test_body);
//
//        var test_body = new cp.Body(0.1, cp.momentForCircle(1, 0, 10, cp.v(0, 0)));
//        var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
//        test_shape.setFriction(0.5);
//        test_shape.setElasticity(0.3);
//        test_body.setPos( cp.v(250, 800) );
//
//        this.space.addBody(test_body);
//        this.space.addShape(test_shape);
//
//        MagneticSystem.addOtherItem(test_body);
//
//        var test_body = new cp.Body(0.1, cp.momentForCircle(1, 0, 10, cp.v(0, 0)));
//        var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
//        test_shape.setFriction(0.5);
//        test_shape.setElasticity(0.3);
//        test_body.setPos( cp.v(550, 900) );
//
//        this.space.addBody(test_body);
//        this.space.addShape(test_shape);
//
//        MagneticSystem.addOtherItem(test_body);
//
//        var test_body = new cp.Body(0.1, cp.momentForCircle(1, 0, 10, cp.v(0, 0)));
//        var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
//        test_shape.setFriction(0.5);
//        test_shape.setElasticity(0.3);
//        test_body.setPos( cp.v(250, 1000) );
//
//        this.space.addBody(test_body);
//        this.space.addShape(test_shape);
//
//        MagneticSystem.addOtherItem(test_body);

    },
    update : function( delta ) {
        this.space.step( delta );

        MagneticSystem.update(delta);
    },
    onEnter : function () {
        this._super();
        this.scheduleUpdate();

        //setup game begin.
        this.isBegin = true;
    },
    onExit : function () {
        this.unscheduleUpdate();
        this._super();
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
