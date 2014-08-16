/**
 * Created by chenryoutou on 14-8-16.
 */

var ScoreController = {

    fp_hp : GAME_INIT_HP,
    sp_hp : GAME_INIT_HP,
    fp_hp_label : null,
    sp_hp_label : null,
    game_layer : null,

    isGameOver : false,

    init : function(game_layer){
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

        this.game_layer = game_layer;

        this.isGameOver = false;
    },

    hitSpHouse : function(){
        this.sp_hp --;
        console.log(this.sp_hp);

        if ( this.sp_hp >= 0) {
            this.sp_hp_label.setString(this.sp_hp);
            var rightGate = this.game_layer.getChildByTag(RIGHT_GATE_TAG);

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

        if (this.sp_hp === 0 && !this.isGameOver){
            this.gameOver();
        }
    },


    hitFpHouse : function(){
        this.fp_hp --;

        if ( this.fp_hp >= 0) {
            this.fp_hp_label.setString(this.fp_hp);
            var leftGate = this.game_layer.getChildByTag(LEFT_GATE_TAG);

            var spriteFrameCache = cc.spriteFrameCache;
            var leftSpriteFrame = null;
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

        if (  this.fp_hp === 0 && !this.isGameOver){
            this.gameOver();
        }

    },

    gameOver : function (){

        this.isGameOver = true;


        var isNaughtyWin = this.sp_hp === 0;

        var over_layer = OverLayer.create(isNaughtyWin);

        this.game_layer.getParent().addChild( over_layer );


    },
    explodeCallBack : function (armature, movementType, movementID) {
        if (movementType == ccs.MovementEventType.complete) {
//            console.log("explode");
//            armature.getAnimation().playWithIndex(0);
            armature.removeFromParent();
        }

    }



};