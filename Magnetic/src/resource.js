var res = {
    BackgroundA : "res/sceneA.jpg",
    RobotA: "res/robotA.png",
    RobotB: "res/robotB.png",
    BombA: "res/bombA.png",
    Robot_plist : "res/animation/robot/robot0.plist",
    Robot_png : "res/animation/robot/robot0.png",
    Robot_exportJSON : "res/animation/robot/robot.ExportJson",
    Level1 : "res/level1.tmx"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}