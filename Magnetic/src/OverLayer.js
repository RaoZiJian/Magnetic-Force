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

        var win_logo = null;

        if ( this.isNaughtyWin ){
            win_logo = new cc.Sprite("prupleWinUI.png");
        }else{
            win_logo = new cc.Sprite("redWinUI.png");
        }

        win_logo.setPosition(winSize.width/2, winSize.height/2);
        this.addChild(win_logo);


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