/**
 * Created by chenryoutou on 14-8-17.
 */

var OverLayer = cc.Layer.extend({

    isNaughtyWin : false,

    init : function() {
        if ( !this._super() ) {
            return false;
        }

        return true;
    },

    onEnter : function() {

        this._super();


        if ( this.isNaughtyWin ){
            this.win_logo = new cc.Sprite("#prupleWinUI.png");
        }else{
            this.win_logo = new cc.Sprite("#redWinUI.png");
        }

        this.win_logo.setPosition(winSize.width/2, winSize.height/2);
        this.win_logo.setScale(0, 0);
        this.addChild(this.win_logo);

        this.win_logo.runAction(
            new cc.Sequence(
                new cc.EaseBackOut(new cc.ScaleTo(0.8, 1.0, 1.0)),
                new cc.DelayTime(2),
                new cc.EaseBackIn(new cc.ScaleTo(0.5, 0.0, 0.0)),
                new cc.CallFunc(this.showOverMenu, this),
                null
            )
        );


    },

    showOverMenu : function (){

        var game_over_logo = new cc.Sprite("#gameOverUI.png");

        var play_again_btn = new cc.MenuItemSprite();


    },

    playAgain : function(){

    },

    backToMainMenu : function (){

    }



});


OverLayer.create = function(isNaughtyWin){

    var layer = new OverLayer();
    if( layer && layer.init() ){
        layer.isNaughtyWin = isNaughtyWin;
        return layer;
    }
    return null;

};