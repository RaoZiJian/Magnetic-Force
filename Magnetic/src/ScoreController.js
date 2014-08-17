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
    fp_score_num : 0,
    sp_score_num : 0,
    fp_lat_score : false,
    fp_last_score : false,
    fp_deviation_time : 3,
    sp_deviation_time : 3,

    ctor : function(game_layer){
        this._super(game_layer);
        this.fp_hp = GAME_INIT_HP;
        this.sp_hp = GAME_INIT_HP;

        this.fp_hp_label = cc.LabelTTF.create("3");
        this.sp_hp_label = cc.LabelTTF.create("3");

        this.fp_lat_score = false;
        this.sp_last_score = false;
        this.fp_score_num = 0;
        this.sp_score_num = 0;
        this.fp_deviation_time = 3;
        this.sp_deviation_time = 3;


        this.fp_hp_label.setPosition(winSize.width/10, winSize.height * 2/3);
        this.sp_hp_label.setPosition(winSize.width * 9/10, winSize.height * 2/3);
        this.fp_hp_label.setFontSize(50);
        this.sp_hp_label.setFontSize(50);
        game_layer.addChild(this.fp_hp_label);
        game_layer.addChild(this.sp_hp_label);
//        this.showHP(500,500,3);
    },

    hitSpHouse : function(){
        this.sp_hp --;

        if (this.fp_last_score && this.sp_deviation_time > 0) {

        }
        this.showHP(cc.winSize.width + 7,570,this.sp_hp);

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

        this.showHP(0 - 7,570,this.fp_hp);

        if ( this.fp_hp >= 0) {
            this.fp_hp_label.setString(this.fp_hp);
            var leftGate = this.game_layer.getChildByTag(BACK_TAG).getChildByTag(LEFT_GATE_TAG);

            var spriteFrameCache = cc.spriteFrameCache;
            var leftSpriteFrame = null;
//            console.log(this.fp_hp);
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
    },
    showHP : function (x,y,hp) {
        console.log("aaa");
        var gameLayer  = this.game_layer;
        var spriteFrameCache = cc.spriteFrameCache;
        var hpBoard = new cc.Sprite(spriteFrameCache.getSpriteFrame("hpBoard.png"));
        hpBoard.setPosition(cc.p(x,y));


        if( x < 20) {
            if( hp > 0) {
                var hpText = new cc.Sprite(spriteFrameCache.getSpriteFrame("hp" + hp + ".png"));
            }
            hpText.setPosition(cc.p(130,90));
            hpBoard.addChild(hpText);
            hpBoard.rotation = -90;
            hpBoard.setAnchorPoint(cc.p(0,0));
            hpBoard.flippedX = true;
            hpBoard.runAction(new cc.Sequence(
                new cc.RotateBy(0.1,90),
                new cc.DelayTime(1),
                new cc.RotateBy(0.1,-90)
            ));
        }
        else {
            if( hp > 0) {
                var hpText = new cc.Sprite(spriteFrameCache.getSpriteFrame("hp" + hp + ".png"));
            }
            hpText.setPosition(cc.p(100,90));
            hpBoard.addChild(hpText);
            hpBoard.setAnchorPoint(cc.p(1,0));
            hpBoard.rotation = 90;
            hpBoard.runAction(new cc.Sequence(
                new cc.RotateBy(0.1,-90),
                new cc.DelayTime(1),
                new cc.RotateBy(0.1,90)
            ));
        }


//        console.log(hp);
        gameLayer.addChild(hpBoard,400);
    },
    update : function (dt) {
        this._super(dt);


    }
});

ScoreController.HIT_NOTING = 0;
ScoreController.HIT_FP_HOUSE = 1;
ScoreController.HIT_SP_HOUSE = 2;

var OneGoalController = GameController.extend({

    fp_score : 0,
    sp_score : 0,

    game_time : GAME_TIME_LENGTH,

    fp_score_label : null,
    sp_score_label : null,
    game_time_label : null,

    game_time_show_interval : 5,
    game_time_show_interval_last_ten : 0,

    ctor : function(game_layer){
        this._super(game_layer);

        this.fp_score = 0;
        this.sp_score = 0;
        this.game_time = GAME_TIME_LENGTH;

        this.fp_score_label = cc.LabelTTF.create("0", "LuckiestGuy", 100);
        this.fp_score_label.setColor( cc.color( 123, 0, 255) );
        this.fp_score_label.lineWidth = 10;
        this.fp_score_label.strokeStyle = cc.color(0,0,0);
        this.sp_score_label = cc.LabelTTF.create("0", "LuckiestGuy", 100);
        this.sp_score_label.setColor( cc.color( 255, 0, 0) );
        this.sp_score_label.lineWidth = 10;
        this.sp_score_label.strokeStyle = cc.color(0,0,0);
        this.game_time_label = cc.LabelTTF.create(""+GAME_TIME_LENGTH, "LuckiestGuy", 100);
        this.game_time_label.setColor( cc.color( 255, 255, 0) );
        this.game_time_label.lineWidth = 10;
        this.game_time_label.strokeStyle = cc.color(0,0,0);

        this.fp_score_label.setPosition( 100, 500 );
        this.sp_score_label.setPosition( 1180, 500 );
        this.game_time_label.setPosition( 640, 600 );

        this.fp_score_label.setScale(0,0);
        this.sp_score_label.setScale(0,0);
        this.game_time_label.setScale(0,0);

        var action = new cc.Sequence(
            new cc.DelayTime(1),
            new cc.EaseBackOut( new cc.ScaleTo(0.8, 1.0, 1.0) ),
            new cc.DelayTime(1.5),
            new cc.EaseBackIn( new cc.ScaleTo(0.5, 0.0, 0.0) )
        );

        this.game_layer.addChild(this.fp_score_label);
        this.game_layer.addChild(this.sp_score_label);
        this.game_layer.addChild(this.game_time_label);

        this.fp_score_label.runAction(action);
        this.sp_score_label.runAction(action.clone());
        this.game_time_label.runAction(action.clone());


    },


    update : function (dt) {
        this.game_time -= dt;

        this.game_time_show_interval -= dt;

        if(this.game_time_show_interval < 0 && this.game_time >= 9.5){
            this.game_time_show_interval = 5;

            this.game_time_label.setString("" + Math.floor(this.game_time + 0.5));

            var action = new cc.Sequence(
                new cc.EaseBackOut( new cc.ScaleTo(0.8, 1.0, 1.0) ),
                new cc.DelayTime(1.5),
                new cc.EaseBackIn( new cc.ScaleTo(0.5, 0.0, 0.0) )
            );
            this.game_time_label.runAction(action);
        }

        if(this.game_time <= 10){

            this.game_time_show_interval_last_ten -= dt;

            if (this.game_time_show_interval_last_ten <= 0){
                this.game_time_show_interval_last_ten = 1;

                this.game_time_label.setString("" + Math.floor(this.game_time + 0.5));

            }
        }

    },

    isGameOver : function () {

        if (this.game_time < 0) {
            return true;
        }
        return false;
    },

    addFpScore : function () {

        this.fp_score ++;

        this.fp_score_label.setString("" + this.fp_score);

        var action = new cc.Sequence(
            new cc.EaseBackOut( new cc.ScaleTo(0.8, 1.0, 1.0) ),
            new cc.DelayTime(1.5),
            new cc.EaseBackIn( new cc.ScaleTo(0.5, 0.0, 0.0) )
        );

        this.fp_score_label.runAction(action);

    },

    addSpScore : function () {

        this.sp_score ++;

        this.sp_score_label.setString("" + this.sp_score);

        var action = new cc.Sequence(
            new cc.EaseBackOut( new cc.ScaleTo(0.8, 1.0, 1.0) ),
            new cc.DelayTime(1.5),
            new cc.EaseBackIn( new cc.ScaleTo(0.5, 0.0, 0.0) )
        );

        this.sp_score_label.runAction(action);

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
