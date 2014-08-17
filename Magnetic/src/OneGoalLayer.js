var OneGoalLayer = GameLayer.extend({

//    createItems : function (){
//        this.itemLayer = new OneGoalItemsLayer(this);
//        this.addChild(this.itemLayer, ITEM_ZORDER);
//    },

    createGameController : function(){
        this.gameController = new OneGoalController(this);
    },

    checkResult : function () {
        var result = this.itemLayer.checkForGoal();
        if (result == OneGoalItemsLayer.FP_GET_SCORE)
            this.gameController.addFpScore();
        else if (result = OneGoalItemsLayer.SP_GET_SCORE)
            this.gameController.addSpScore();

        if (this.gameController.isGameOver()) {
            this.gameController.gameOverAction();
        }
    },

    createWalls : function () {
        Level.createLevel(res.Level1, this);
    },

    playerTouchBomb : function (arb, space, ptr) {
        var shapes = arb.getShapes();
        var player = shapes[0].obj.view;
        var item = shapes[1].obj.view;
        var gameLayer = player.parent;

        // Own by first player (nasty one)
        if (player == gameLayer.f_player) {
            item.captured(true);
        }
        // naughty one
        else if (player == gameLayer.s_player) {
            item.captured(false);
        }
    }
});