

var GameLevels = [
    // Ordinary
    function (showMenu) {
        return new OneGoalLayer(showMenu);
    },

    // One goal
    function (showMenu) {
        return new OneGoalLayer(showMenu);
    }
];

var current_level = 0;
var nextLevel = function (showMenu) {
    var gameScene = new cc.Scene();
    var level = GameLevels[current_level](showMenu);
    gameScene.addChild(level);

    current_level++;
    if (current_level >= GameLevels.length) {
        current_level = 0;
    }
    return gameScene;
};