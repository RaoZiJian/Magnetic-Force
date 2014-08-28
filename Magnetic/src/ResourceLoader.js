/**
 * Created by kafeier on 2014/8/21.
 */
loadResource = function () {
    var armatureDataManager = ccs.armatureDataManager;
    armatureDataManager.addArmatureFileInfo(res.Robot_exportJSON);
    armatureDataManager.addArmatureFileInfo(res.Explode_exportJSON);
    var spriteFrameCache = cc.spriteFrameCache;
    spriteFrameCache.addSpriteFrames(res.Bomb_plist);
    spriteFrameCache.addSpriteFrames(res.House_plist);
    spriteFrameCache.addSpriteFrames(res.game_ui_plist);
    spriteFrameCache.addSpriteFrames(res.over_ui_plist);
    spriteFrameCache.addSpriteFrames(res.Menu_plist);
    spriteFrameCache.addSpriteFrames(res.GuideUI_plist) ;
}