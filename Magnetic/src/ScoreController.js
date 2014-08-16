/**
 * Created by chenryoutou on 14-8-16.
 */

var ScoreController = {

    fp_score : 0,
    sp_score : 0,

    init : function(){
        this.fp_score = 0;
        this.sp_score = 0;
    },

    addFpScore : function(){
        this.fp_score ++;
    },

    addSpScore : function(){
        this.sp_score ++;
    }



};