/**
 * Created by chenryoutou on 14-8-15.
 */



var Player = cc.Sprite.extend({

    _isMagnet : false,
    _isAttract : true,
    isMagnetUpdated : null,
    isAttractUpdated : null,
    mh : 0,

    weight : PLAYER_WEIGHT,
    maxSpeed : 200,
    r : 0,
    friction : PLAYER_INIT_FRICTION,
    elasticity : PLAYER_INIT_ELASTICITY,

    phyObj : null,

    _ignoreBodyRotation:false,

    ctor : function(file, r, x, y) {
        this._super(file);

        var size = this.texture.getContentSize(),
            sx = r / size.width, sy = r / size.height;
        this.scale = sx > sy ? sx * 2 : sy * 2;
        this.r = r;

        this.maxSpeed = PLAYER_MAX_SPEED;

        this.initPhysics(x, y, this.r);

        //this.eatItem();
    },

    setMagnet : function(magnet) {
        this._isMagnet = magnet;
        if (this.isMagnetUpdated)
            this.isMagnetUpdated();
    },
    getMagnet : function() {
        return this._isMagnet;
    },

    setAttract : function(attract) {
        this._isAttract = attract;
        if (this.isAttractUpdated)
            this.isAttractUpdated();
    },
    getAttract : function() {
        return this._isAttract;
    },

    initPhysics : function (x, y, r) {
        var origin = cc.p(x, y);

        this.phyObj = new CircleObject(this.weight, r, this.maxSpeed, this, origin);
        this.phyObj.setFriction(this.friction);
        this.phyObj.setElasticity(this.elasticity);
//        var body = this.phyObj.body;
//        body.setMoment(Infinity);
        this.phyObj.shape.setCollisionType(Player.COL_TYPE);
    },

    update : function() {
        var pos = this.phyObj.getPosition();
        this.x = pos.x;
        this.y = pos.y;
        this.rotation = -180 * this.phyObj.body.a / Math.PI;
    },


    jump : function (){

        if(this.y < 80){
            this.phyObj.body.vy += PLAYER_JUMP_ADD_SPEED_Y;
        }

    },
    eatItem : function () {
        // create sprite sheet
//        cc.spriteFrameCache.addSpriteFrames(res.Robot_plist);
//        this.spriteSheet = cc.SpriteBatchNode.create(res.Robot_png);
//        this.addChild(this.spriteSheet);
//
//        // init runningAction
//        var animFrames = [];
//        for (var i = 0; i < 8; i++) {
//            var str = "runner" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFrames.push(frame);
//        }
//
//        var animation = cc.Animation.create(animFrames, 0.1);
//        this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));

        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.Robot_plist);
        var animCache = cc.animationCache;
        animCache.addAnimations(res.Robot_plist);

        var mouthOpen = animCache.getAnimation("Awaiting");
        mouthOpen.setRestoreOriginalFrame(true);

        this.runAction(cc.animate(mouthOpen));

    }



});

var p = Player.prototype;
cc.defineGetterSetter(p, "isMagnet", p.getMagnet, p.setMagnet);
cc.defineGetterSetter(p, "isAttract", p.getAttract, p.setAttract);

Player.COL_TYPE = 0;