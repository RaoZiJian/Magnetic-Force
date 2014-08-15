/**
 * Created by chenryoutou on 14-8-15.
 */


var GameLayer = cc.Layer.extend({

    isBegin : false,

    init : function(){

        if ( !this._super() ){
            return false;
        }

        this.createPhysicsWorld();

        this.setupDebugNode();

        this.createWalls();

        this.createPlayers();

        this.createMagnetSystem();

        return true;
    }



});