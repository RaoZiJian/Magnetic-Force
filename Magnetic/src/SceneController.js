

var GameLevels = [
    // Ordinary
    function () {
        return new OrdinaryLayer(res.Level1);
    },

    // One goal
    function () {
        return new OneGoalLayer(res.Level2);
    }
];

var current_level = 0;

var nextLevel = function (gameScene, level) {
    current_level++;
    if (current_level >= GameLevels.length) {
        current_level = 0;
    }
    
    current_level = level === undefined ? current_level : level;
    levelLayer = GameLevels[current_level]();
    Global_Value.initWithConfig(Config[current_level]);
    gameScene.removeAllChildren(true);
    gameScene.addChild(levelLayer);

    return levelLayer;
};
var replayLevel = function (gameScene, level) {
    current_level = level === undefined ? current_level : level;
    levelLayer = GameLevels[current_level]();
    Global_Value.initWithConfig(Config[current_level]);
    gameScene.removeAllChildren(true);
    gameScene.addChild(levelLayer);
    return levelLayer;
};