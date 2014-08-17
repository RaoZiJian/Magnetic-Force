var OneGoalLayer = GameLayer.extend({

    createItems : function (){
        this.itemLayer = new OneGoalItemsLayer(this);
        this.addChild(this.itemLayer, ITEM_ZORDER);
    },

    createGameController : function(){
        this.gameController = new OneGoalController(this);
    },

    checkResult : function () {
        var result = this.itemLayer.checkForGoal();
        if (result != ScoreController.HIT_NOTING) {
            this.gameController.gameOverAction();
        }
    }

//    onEnter : function () {
//        this._super();
//        Physics.addCollisionHandler(Player.COL_TYPE, Bomb.EXPLODE_COL_TYPE, null, this.playerBeExplode, null, null);
//    },
//
//    playerBeExplode : function (arb, space, ptr) {
//
//    },
});