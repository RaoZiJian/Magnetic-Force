/**
 * Created by chenryoutou on 14-8-16.
 */

var GameController = cc.Class.extend({
    game_layer : null,
    ctor : function(game_layer) {
        this.game_layer = game_layer;
    },

    update : function (dt) {

    },

    isGameOver : function () {
        return false;
    },

    gameOverAction : function () {},

    clear : function() {}
});

var ScoreController = GameController.extend({

    fp_hp : GAME_INIT_HP,
    sp_hp : GAME_INIT_HP,
    fp_hp_label : null,
    sp_hp_label : null,
    game_layer : null,

    ctor : function(game_layer){
        this._super(game_layer);
        this.fp_hp = GAME_INIT_HP;
        this.sp_hp = GAME_INIT_HP;

        this.fp_hp_label = cc.LabelTTF.create("3");
        this.sp_hp_label = cc.LabelTTF.create("3");
        this.fp_hp_label.setPosition(winSize.width/10, winSize.height * 2/3);
        this.sp_hp_label.setPosition(winSize.width * 9/10, winSize.height * 2/3);
        this.fp_hp_label.setFontSize(50);
        this.sp_hp_label.setFontSize(50);
        game_layer.addChild(this.fp_hp_label);
        game_layer.addChild(this.sp_hp_label);
    },

    hitSpHouse : function(){
        this.sp_hp --;

        if ( this.sp_hp >= 0) {
            this.sp_hp_label.setString(this.sp_hp);
            var rightGate = this.game_layer.getChildByTag(BACK_TAG).getChildByTag(RIGHT_GATE_TAG);

            var spriteFrameCache = cc.spriteFrameCache;
            var rightSpriteFrame = null;
            switch (this.sp_hp) {
                case 2:
                    rightSpriteFrame = spriteFrameCache.getSpriteFrame("redB.png");
                    break;
                case 1:
                    rightSpriteFrame = spriteFrameCache.getSpriteFrame("redC.png");
                    break;
                case 0:
                    rightSpriteFrame = spriteFrameCache.getSpriteFrame("redD.png");
                    break;
            }
            if (rightSpriteFrame) {
                rightGate.setSpriteFrame(rightSpriteFrame);

                var explode = ccs.Armature.create("explode");
                explode.setPosition(cc.p(cc.winSize.width - 50 ,320));
                explode.scaleX = 3;
                explode.scaleY = 3;
                explode.getAnimation().playWithIndex(0);
                cc.audioEngine.playEffect(res.explosion_ogg,false);
                explode.getAnimation().movementEvent = this.explodeCallBack;
                this.game_layer.addChild(explode);
            }

        }
    },


    hitFpHouse : function(){
        this.fp_hp --;

        if ( this.fp_hp >= 0) {
            this.fp_hp_label.setString(this.fp_hp);
            var leftGate = this.game_layer.getChildByTag(BACK_TAG).getChildByTag(LEFT_GATE_TAG);

            var spriteFrameCache = cc.spriteFrameCache;
            var leftSpriteFrame = null;
            console.log(this.fp_hp);
            switch (this.fp_hp) {
                case 2:
                    leftSpriteFrame = spriteFrameCache.getSpriteFrame("purpleB.png");
                    break;
                case 1:
                    leftSpriteFrame = spriteFrameCache.getSpriteFrame("purpleC.png");
                    break;
                case 0:
                    leftSpriteFrame = spriteFrameCache.getSpriteFrame("purpleD.png");
                    break;
            }
            if (leftSpriteFrame) {
                leftGate.setSpriteFrame(leftSpriteFrame);

                var explode = ccs.Armature.create("explode");
                explode.setPosition(cc.p(50,320));
                explode.scaleX = 3;
                explode.scaleY = 3;
                explode.getAnimation().playWithIndex(0);
                cc.audioEngine.playEffect(res.explosion_ogg,false);
                explode.getAnimation().movementEvent = this.explodeCallBack;
//
                this.game_layer.addChild(explode);
            }
        }
    },

    isGameOver : function () {
        if (this.fp_hp === 0 || this.sp_hp === 0){
            return true;
        }
        else
            return false;
    },

    gameOverAction : function () {
        this.game_layer.isOver = true;
        var isNaughtyWin = this.sp_hp === 0;

        var over_layer = OverLayer.create(isNaughtyWin, this.game_layer);

        this.game_layer.getParent().addChild( over_layer );
    },

    explodeCallBack : function (armature, movementType, movementID) {
        if (movementType == ccs.MovementEventType.complete) {
//            console.log("explode");
//            armature.getAnimation().playWithIndex(0);
            armature.removeFromParent();
        }
    },

    clear : function(){
        this.fp_hp = GAME_INIT_HP;
        this.sp_hp = GAME_INIT_HP;

        this.fp_hp_label = null;
        this.sp_hp_label = null;
        this.game_layer = null;
    }
});

ScoreController.HIT_NOTING = 0;
ScoreController.HIT_FP_HOUSE = 1;
ScoreController.HIT_SP_HOUSE = 2;

var OneGoalController = GameController.extend({

    fp_score : 0,
    sp_score : 0,

    game_time : GAME_TIME_LENGTH,

    ctor : function(game_layer){
        this._super(game_layer);

        this.fp_score = 0;
        this.sp_score = 0;
        this.game_time = GAME_TIME_LENGTH;
    },


    update : function (dt) {
        this.game_time -= dt;
    },

    isGameOver : function () {

        if (this.game_time < 0) {
            return true;
        }
        return false;
    },

    addFpScore : function () {

        this.fp_score ++;
    },

    addSpScore : function () {

        this.sp_score ++;
    },

    gameOverAction : function () {
        this.game_layer.isOver = true;

        var isNaughtyWin = this.fp_score > this.sp_score;

        var over_layer = OverLayer.create(isNaughtyWin, this.game_layer);

        this.game_layer.getParent().addChild( over_layer );
    },

    clear : function() {



    }

});

OneGoalController.FP_GET_SCORE = 3;
OneGoalController.SP_GET_SCORE = 4;
OneGoalController.NO_ONE_GET_SCORE = 5;