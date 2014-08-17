var OneGoalLayer = GameLayer.extend({

    createItems : function (){
        this.itemLayer = new OneGoalItemsLayer(this);
        this.addChild(this.itemLayer, ITEM_ZORDER);
    },

    createGameController : function(){
        this.gameController = new ScoreController(this);
    },

    checkResult : function () {
        var result = this.itemLayer.checkForGoal();
        if (result != ScoreController.HIT_NOTING) {
            this.gameController.gameOverAction();
        }
    },

//    onEnter : function () {
//        this._super();
//        Physics.addCollisionHandler(Player.COL_TYPE, Bomb.EXPLODE_COL_TYPE, null, this.playerBeExplode, null, null);
//    },
//
    playerTouchItem : function (arb, space, ptr) {
        var shapes = arb.getShapes();
        var player = shapes[0].obj.view;
        var item = shapes[1].obj.view;

        // Own by first player (nasty one)
        if (player == this.f_player) {
            
        }
        // naughty one
        else if (player == this.s_player) {

        }
    }
});