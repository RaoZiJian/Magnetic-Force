var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    BackgroundA : "res/sceneA.jpg",
    RobotA: "res/robotA.png",
    RobotB: "res/robotB.png",
    BombA: "res/bombA.png",
    Robot_plist : "res/animation/robot/robot0.plist",
    Robot_png : "res/animation/robot/robot0.png",
    Robot_exportJSON : "res/animation/robot/robot.ExportJson",
    Explode_exportJSON : "res/animation/explode/explode.ExportJson",
    Explode_png : "res/animation/explode/explode0.png",
    Explode_plist : "res/animation/explode/explode0.plist",
    Bomb_png : "res/animation/bomb/bombAnim.png",
    Bomb_plist : "res/animation/bomb/bombAnim.plist"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}