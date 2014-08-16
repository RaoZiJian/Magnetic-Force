var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    BackgroundA : "res/sceneAbg.png",
    RobotA: "res/robotA.png",
    RobotB: "res/robotB.png",
    BombA: "res/bombA.png",
    Robot_plist : "res/animation/robot/robot0.plist",
    Robot_png : "res/animation/robot/robot0.png",
    Robot_exportJSON : "res/animation/robot/robot0.ExportJson"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}