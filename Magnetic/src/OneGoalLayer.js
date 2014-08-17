var OneGoalLayer = GameLayer.extend({

//    createItems : function (){
//        this.itemLayer = new OneGoalItemsLayer(this);
//        this.addChild(this.itemLayer, ITEM_ZORDER);
//    },

//    createGameController : function(){
//        this.gameController = new OneGoalController(this);
//    },

//    checkResult : function () {
//        var result = this.itemLayer.checkForGoal();
//
//    },

//    onEnter : function () {
//        this._super();
//        Physics.addCollisionHandler(Player.COL_TYPE, Bomb.EXPLODE_COL_TYPE, null, this.playerBeExplode, null, null);
//    },
//
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