/**
 * Created by chenryoutou on 14-8-16.
 */

var ScoreController = {

    fp_score : 0,
    sp_score : 0,
    fp_score_label : null,
    sp_score_label : null,

    init : function(game_layer){
        this.fp_score = 0;
        this.sp_score = 0;

        this.fp_score_label = cc.LabelTTF.create();
        this.sp_score_label = cc.LabelTTF.create();
        this.fp_score_label.setPosition(winSize.width/10, winSize.height * 2/3);
        this.sp_score_label.setPosition(winSize.width * 9/10, winSize.height * 2/3);
        game_layer.addChild(this.fp_score_label);
        game_layer.addChild(this.sp_score_label);

    },

    addFpScore : function(){
        this.fp_score ++;

        this.fp_score_label.setText(this.fp_score);
    },

    addSpScore : function(){
        this.sp_score ++;

        this.sp_score_label.setText(this.sp_score);
    }



};