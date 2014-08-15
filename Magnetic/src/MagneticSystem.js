/**
 * Created by chenryoutou on 14-8-15.
 */


var EFFECTIVE_MAGNET_DIS = 250;
var PLAYER_INIT_MH = 150;


var MagneticSystem = {

    f_player : null,
    s_player : null,

    other_items : null,

    game_layer : null,

    init : function (game_layer, f_player, s_player){

        this.game_layer = game_layer;

        this.f_player = f_player;
        this.s_player = s_player;

        this.f_player.isMagnet = false;
        this.f_player.isAttract = true;

        this.s_player.isMagnet = false;
        this.s_player.isAttract = true;

        this.f_player.mh = PLAYER_INIT_MH;
        this.s_player.mh = PLAYER_INIT_MH;

        this.other_items = [];

    },

    update : function (dt){


        if ( !this.game_layer.isBegin){
            return;
        }

        var fp_attract_dir = this.f_player.isAttract ? 1 : -1;
        var sp_attract_dir = this.s_player.isAttract ? 1 : -1;


        //iterate items.
        for (var i = 0; i<this.other_items.length; i++){

            var other_item = this.other_items[i];
            

        }







    },


    addOtherItem : function (otherItem){

        this.other_items.push(otherItem);

    },


    removeOtherItem : function (otherItem){

        var index = null;

        for ( var i=0; i<this.other_items.length; i++){

            if (this.other_items[i] === otherItem){
                index = i;
                break;
            }

        }

        if (index !== null){
            this.other_items.splice(index, 1);
        }


    }


};


var p2pDis = function(p1, p2){

    var dis = Math.pow( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2), 1/2);

    return dis;
};


/**
 *  return  angle,   regard p2 as zero center point.
 * @param p1
 * @param p2
 */
var p2pAngle = function(p1, p2){

    var x = p1.x - p2.x;
    var y = p1.y - p2.y;

    var angle = Math.atan2(y, x);

    return angle;
};
