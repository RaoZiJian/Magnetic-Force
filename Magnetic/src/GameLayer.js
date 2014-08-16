/**
 * Created by chenryoutou on 14-8-15.
 */

var winSize = null;

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

    itemLayer : null,

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

        this.createItems();

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

        Level.createLevel_1(this, this.space);

    },
    createPlayers : function () {

        this.f_player = new Player(res.RobotA, 50, 300, 57);

        this.addChild(this.f_player, PLAYER_ZORDER);
        this.f_player.isMagnetUpdated = function () {
           var f_player_label = window.document.getElementById("f_player_magnet");
            f_player_label.innerHTML = "&nbsp;&nbsp;&nbsp;f_megnet : " + this.isMagnet;
            //console.log(s_player_label.innerHTML);
        };
        this.f_player.isAttractUpdated = function () {
            var f_player_label = window.document.getElementById("f_player_attratic");
            f_player_label.innerHTML =  "&nbsp;&nbsp;&nbsp;f_attratic : " + this.isAttract;
            //console.log(s_player_label.innerHTML);
        };



        this.s_player = new Player(res.RobotB, 50, 1000, 57);

        this.addChild(this.s_player, PLAYER_ZORDER);
        this.s_player.isMagnetUpdated = function () {
            var s_player_label = window.document.getElementById("s_player_magnet");
            s_player_label.innerHTML = "&nbsp;&nbsp;&nbsp;s_megnet : " +this.isMagnet;
            //console.log(s_player_label.innerHTML);
        };
        this.s_player.isAttractUpdated = function () {
            var s_player_label = window.document.getElementById("s_player_attratic");
            s_player_label.innerHTML = "&nbsp;&nbsp;&nbsp;s_attratic : " +this.isAttract;
            //console.log(s_player_label.innerHTML);
        };

    },
    createMagnetSystem : function () {

        MagneticSystem.init(this, this.f_player, this.s_player);

    },
    createItems : function (){
        this.itemLayer = new ItemsLayer(this);
        this.addChild(this.itemLayer, ITEM_ZORDER);
    },

    update : function( delta ) {
        this.space.step( delta );

        MagneticSystem.update(delta);
        this.f_player.update();
        this.s_player.update();

        this.itemLayer.update(delta);
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
        switch (key) {
            case KeyCode_M:
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
                break;
            case KeyCode_N:
                target.s_player.isMagnet = false;
                break;
            case KeyCode_X:
                target.f_player.isMagnet = false;
                break;
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
