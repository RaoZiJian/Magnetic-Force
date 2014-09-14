/**
 * Created by chenryoutou on 14-8-15.
 */


var MagneticSystem = {

    f_player : null,
    s_player : null,

    other_items : null,

    game_layer : null,

    init : function (game_layer, f_player, s_player){

        this.game_layer = game_layer;

        this.f_player = f_player;
        this.s_player = s_player;

        this.f_player.isMagnet = true;
        this.f_player.isAttract = false;

        this.s_player.isMagnet = true;
        this.s_player.isAttract = false;

        this.f_player.mh = 0;
        this.s_player.mh = 0;

        this.other_items = [];
    },

    clear : function(){
        this.f_player = null;
        this.s_player = null;
        this.other_items = null;
        this.game_layer = null;
    },

    update : function (dt){


        if ( !this.game_layer.isBegin){
            return;
        }


        //don't do this.
//        if ( !this.f_player.isMagnet && !this.s_player.isMagnet ){
//            return;
//        }


        // update player mh.
        this.updatePlayerMH(dt);



//        var fp_attract_dir = this.f_player.isAttract ? 1 : -1;
        var fp_attract_dir = this.f_player.isAttract ? 1 : -1 * REPULSIVE_FORCE_MUTIPLE;
//        var sp_attract_dir = this.s_player.isAttract ? 1 : -1;
        var sp_attract_dir = this.s_player.isAttract ? 1 : -1 * REPULSIVE_FORCE_MUTIPLE;


        //var fp_pos = this.f_player.phyObj.body.getPos() + cp.v(this.f_player.phyObj.body.rot.y * 30, this.f_player.phyObj.body.rot.x * 30);
        //var sp_pos = this.s_player.phyObj.body.getPos() + cp.v(this.s_player.phyObj.body.rot.y * 30, this.s_player.phyObj.body.rot.x * 30);

        var fp_pos = pAddp(this.f_player.phyObj.body.getPos(), cp.v(-this.f_player.phyObj.body.rot.y * PLAYER_MAGNET_OFFSET, this.f_player.phyObj.body.rot.x * PLAYER_MAGNET_OFFSET));
        var sp_pos = pAddp(this.s_player.phyObj.body.getPos(), cp.v(-this.s_player.phyObj.body.rot.y * PLAYER_MAGNET_OFFSET, this.s_player.phyObj.body.rot.x * PLAYER_MAGNET_OFFSET));

        //console.log("aaa  " + SAFE_DIS_ADD );


        var fp_f = cp.v(0, 0);
        var sp_f = cp.v(0, 0);

        //iterate items.
        for (var i = 0; i<this.other_items.length; i++){

            var other_item = this.other_items[i];

            var oi_pos = other_item.getPos();

            var oi_f = cp.v(0, 0);

            var dis_2_fp = p2pDis(fp_pos, oi_pos);
            var dis_2_sp = p2pDis(sp_pos, oi_pos);

            if (dis_2_fp < EFFECTIVE_MAGNET_DIS && this.f_player.isMagnet){

                var magnet_f = this.f_player.mh / Math.pow( dis_2_fp/100 + SAFE_DIS_ADD, 3 );

                var angle = p2pAngle(fp_pos, oi_pos);

                oi_f.x += magnet_f * Math.cos(angle) * fp_attract_dir;
                oi_f.y += magnet_f * Math.sin(angle) * fp_attract_dir;

                fp_f.x += - magnet_f * Math.cos(angle) * fp_attract_dir * PLAYER_ITEM_MAGNETIC_FACTOR;
                fp_f.y += - magnet_f * Math.sin(angle) * fp_attract_dir * PLAYER_ITEM_MAGNETIC_FACTOR;

            }

            if (dis_2_sp < EFFECTIVE_MAGNET_DIS && this.s_player.isMagnet){

                var magnet_f = this.s_player.mh / Math.pow( dis_2_sp/100 + SAFE_DIS_ADD, 3 );

                var angle = p2pAngle(sp_pos, oi_pos);

                oi_f.x += magnet_f * Math.cos(angle) * sp_attract_dir;
                oi_f.y += magnet_f * Math.sin(angle) * sp_attract_dir;

                sp_f.x += - magnet_f * Math.cos(angle) * sp_attract_dir * PLAYER_ITEM_MAGNETIC_FACTOR;
                sp_f.y += - magnet_f * Math.sin(angle) * sp_attract_dir * PLAYER_ITEM_MAGNETIC_FACTOR;

            }

            //set oi magnet.
            other_item.f = oi_f;


        }


        //fp ~ sp

        var fpsp_dis = p2pDis(fp_pos, sp_pos);

        if (fpsp_dis < EFFECTIVE_MAGNET_DIS){


            //fp magnet
            if (this.f_player.isMagnet){

                var magnet_fp_f = this.f_player.mh / Math.pow(fpsp_dis/100 + SAFE_DIS_ADD, 3);

                var sp_angle = p2pAngle(fp_pos, sp_pos);

                sp_f.x += magnet_fp_f * Math.cos(sp_angle) * fp_attract_dir;
                sp_f.y += magnet_fp_f * Math.sin(sp_angle) * fp_attract_dir;

                fp_f.x += - magnet_fp_f * Math.cos(sp_angle) * fp_attract_dir;
                fp_f.y += - magnet_fp_f * Math.sin(sp_angle) * fp_attract_dir;

            }

            //sp magnet
            if (this.s_player.isMagnet){

                var magnet_sp_f = this.s_player.mh / Math.pow(fpsp_dis/100 + SAFE_DIS_ADD, 3);

                var fp_angle = p2pAngle(sp_pos, fp_pos);

                fp_f.x += magnet_sp_f * Math.cos(fp_angle) * sp_attract_dir;
                fp_f.y += magnet_sp_f * Math.sin(fp_angle) * sp_attract_dir;

                sp_f.x += - magnet_sp_f * Math.cos(fp_angle) * sp_attract_dir;
                sp_f.y += - magnet_sp_f * Math.sin(fp_angle) * sp_attract_dir;


            }

        }

        //if attract , add top f
//        if ( this.f_player.isMagnet && this.f_player.isAttract){
//
//            fp_f.x += PLAYER_ATTRACT_TOP_FORCE.x;
//            fp_f.y += PLAYER_ATTRACT_TOP_FORCE.y;
//
//        }
//        if ( this.s_player.isMagnet && this.s_player.isAttract){
//
//            sp_f.x += PLAYER_ATTRACT_TOP_FORCE.x;
//            sp_f.y += PLAYER_ATTRACT_TOP_FORCE.y;
//        }


        //calculate jump_f
//        fp_f = pAddp(fp_f, this.f_player.jump_f);
//        sp_f = pAddp(sp_f, this.s_player.jump_f);
//        if (this.f_player.isJump) fp_f = pAddp(fp_f, cp.v (0, PLAYER_JUMP_FORCE *  300 / (this.f_player.y + 100)  ) );
//        if (this.s_player.isJump) sp_f = pAddp(sp_f, cp.v (0, PLAYER_JUMP_FORCE *  300 / (this.s_player.y + 100)  ) );


        fp_f = pAddp(fp_f, this.f_player.rocketForce);
        sp_f = pAddp(fp_f, this.s_player.rocketForce);
        console.log("" + this.f_player.rocketForce.x + "   " + this.f_player.rocketForce.y);

        //calculate airstream force
        if (this.f_player.y > AIR_EFFECTIVE_HEIGHT){
            fp_f = pAddp(fp_f, cp.v(0, - this.f_player.y / (cc.winSize.height - this.f_player.y) * AIR_STREAM_FORCE ));
        }
        if (this.s_player.y > AIR_EFFECTIVE_HEIGHT){
            sp_f = pAddp(sp_f, cp.v(0, - this.s_player.y / (cc.winSize.height - this.s_player.y) * AIR_STREAM_FORCE ));
        }


        //set fp sp receieve magnet
        this.f_player.phyObj.body.f = fp_f;
        this.s_player.phyObj.body.f = sp_f;


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


    },


    updatePlayerMH : function (dt) {
        // f_player
        if ( this.f_player.isAttract ) {
            if (this.f_player.mh < PLAYER_INIT_MH) {
                this.f_player.mh = PLAYER_INIT_MH;
            }
            else if (this.f_player.mh < PLAYER_MH_MAX) {
                this.f_player.mh += dt * PLAYER_MH_INCREASE_FACTOR;
            }
        }
        else {
            if (this.f_player.mh > 0) {
                this.f_player.mh -= dt * PLAYER_MH_DECREASE_FACTOR;
            }
            else {
                this.f_player.mh = 0;
            }
        }

        // s_player
        if (this.s_player.isAttract ) {
            if (this.s_player.mh < PLAYER_INIT_MH) {
                this.s_player.mh = PLAYER_INIT_MH;
            }
            else if (this.s_player.mh < PLAYER_MH_MAX) {
                this.s_player.mh += dt * PLAYER_MH_INCREASE_FACTOR;
            }
        }
        else {
            if ( this.s_player.mh > 0) {
                this.s_player.mh -= dt * PLAYER_MH_DECREASE_FACTOR;
            }
            else {
                this.s_player.mh = 0;
            }
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


var pAddp = function(p1, p2){
    var p = cp.v(p1.x + p2.x , p1.y + p2.y);
    return p;
};