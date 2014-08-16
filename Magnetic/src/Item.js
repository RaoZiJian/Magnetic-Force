

var Item = cc.Sprite.extend({

    weight : 50,
    maxSpeed : ITEM_MAX_SPEED,
    _friction : ITEM_INIT_FRICTION,
    _elasticity : ITEM_INIT_ELASTICITY,

    phyObj : null,

    dead : false,

    ctor : function(file, type, x, y, sOrR) {
        this._super(file);

        var isCircle = type == Item.CIRCLE_SHAPE;

        var size = this.getContentSize();
        if (isCircle) {
            this.scale = sOrR * 2 / size.width;
            this.weight = sOrR * 4 / ITEM_WEIGHT_FACTOR;
        }
        else {
            this.scaleX = sOrR.width / size.width;
            this.scaleY = sOrR.height / size.height;
            this.weight = (sOrR.width + sOrR.height) / ITEM_WEIGHT_FACTOR;
        }
        this.maxSpeed = ITEM_MAXSPEED;

        this.initPhysics(isCircle, x, y, sOrR);
    },

    getFriction : function() {
        return this._friction;
    },
    setFriction : function(f) {
        this._friction = f;
        this.phyObj.setFriction(this._friction);
    },

    getElasticity : function() {
        return this._elasticity;
    },
    setElasticity : function(f) {
        this._elasticity = f;
        this.phyObj.setElasticity(this._elasticity);
    },

    initPhysics : function (isCircle, x, y, sOrR) {
        var origin = cc.p(x, y);

        if (isCircle) {
            this.phyObj = new CircleObject(this.weight, sOrR, this.maxSpeed, this, origin);
        }
        else {
            this.phyObj = new PhysicsObject(this.weight, sOrR, this.maxSpeed, this, origin);
        }
        this.phyObj.setFriction(this._friction);
        this.phyObj.setElasticity(this._elasticity);
        this.phyObj.shape.setCollisionType(Item.COL_TYPE);
    },

    update : function() {
        var pos = this.phyObj.getPosition();
        if (pos.x < -50 || pos.x > cc.winSize.width + 50 || pos.y < -50) {
            this.die();
            return;
        }

        this.x = pos.x;
        this.y = pos.y;
        this.rotation = -180 * this.phyObj.body.a / Math.PI;
    },

    _realDie : function() {
        cc.pool.putInPool(this);
    },

    die : function () {
        if (this.dead)
            return;
        this.scheduleOnce(this._realDie, 0);
        this.dead = true;
    },

    unuse : function() {
        MagneticSystem.removeOtherItem(this.phyObj.body);
        this.phyObj.removeSelf();
        this.phyObj = null;
        this.removeFromParent(true);
        this.retain();
    },
    reuse : function(file, type, x, y, sOrR) {
        this.release();
        this.setSpriteFrame(file.substr(1));
        var size = this.getContentSize();

        var isCircle = type == Item.CIRCLE_SHAPE;
        if (isCircle) {
            this.scale = sOrR * 2 / size.width;
            this.weight = sOrR * 4 / ITEM_WEIGHT_FACTOR;
        }
        else {
            this.scaleX = sOrR.width / size.width;
            this.scaleY = sOrR.height / size.height;
            this.weight = (sOrR.width + sOrR.height) / ITEM_WEIGHT_FACTOR;
        }
        this.maxSpeed = ITEM_MAXSPEED;
        this.dead = false;

        this.initPhysics(isCircle, x, y, sOrR);
    }
});

Item.create = function(file, type, x, y, sOrR) {
    var ret = null;
    if (cc.pool.hasObj(Item))
        ret = cc.pool.getFromPool(Item, file, type, x, y, sOrR);
    else
        ret = new Item(file, type, x, y, sOrR);
    return ret;
};

var p = Item.prototype;
cc.defineGetterSetter(p, "friction", p.getFriction, p.setFriction);
cc.defineGetterSetter(p, "elasticity", p.getElasticity, p.setElasticity);

Item.COL_TYPE = 11;

Item.CIRCLE_SHAPE = 0;
Item.RECT_SHAPE = 1;


var Bomb = Item.extend({
    bomb_armature : null,
    time : EXPLODE_TIME,
    isExplode : false,
    isEndExplode : false,
    isWarnning : false,
    anime : null,
    ctor : function (file, type, x, y, sOrR) {
        this._super(file, type, x, y , sOrR);
        this.scale = 1;
        this.setAnchorPoint(cc.p(0.35,0.35));
        var animFrames = [];
        for (var i = 1; i < 4; i++) {
            var str = "bomb" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = new cc.Animation(animFrames, 0.1);
        this.anime = cc.animate(animation).repeatForever();
        this.runAction(this.anime);
    },
    update : function (dt) {
        this._super();
        this.time -= dt;
        //console.log(this.time);

        if (!this.isExplode && this.time < EXPLODE_WARNNING_TIME) {
//            if (!this.isWarnning) {
//                this.isWarnning = true;
//                this.runAction(cc.repeatForever(cc.tintTo(1,255,0,0)));
//            }
            if (this.time < 0) {
                this.isExplode = true;
                this.bomb_armature = ccs.Armature.create("explode");
                this.bomb_armature.retain();
                var origin = this.getPosition();

                this.bomb_armature.phyObj = new CircleObject(EXPLODE_WEIGHT, EXPLODE_RADIUS, this.maxSpeed, this.bomb_armature, origin);
                this.bomb_armature.phyObj.setFriction(0);
                this.bomb_armature.phyObj.setElasticity(EXPLODE_ELASTICITY);
//        var body = this.phyObj.body;
//        body.setMoment(Infinity);
                this.bomb_armature.phyObj.shape.setCollisionType(Bomb.EXPLODE_COL_TYPE);

                this.bomb_armature.scaleX = 2;
                this.bomb_armature.scaleY = 2;
                this.bomb_armature.getAnimation().playWithIndex(0);
                this.bomb_armature.setPosition(origin);
                this.getParent().addChild(this.bomb_armature);
            }
        }

//        if (!this.isExplode && this.time < 0) {
//            this.isExplode = true;
//            this.bomb_armature = ccs.Armature.create("explode");
//            this.bomb_armature.retain();
//            var origin = this.getPosition();
//
//            this.bomb_armature.phyObj = new CircleObject(EXPLODE_WEIGHT, EXPLODE_RADIUS, this.maxSpeed, this.bomb_armature, origin);
//            this.bomb_armature.phyObj.setFriction(0);
//            this.bomb_armature.phyObj.setElasticity(EXPLODE_ELASTICITY);
////        var body = this.phyObj.body;
////        body.setMoment(Infinity);
//            this.bomb_armature.phyObj.shape.setCollisionType(Bomb.EXPLODE_COL_TYPE);
//
//            this.bomb_armature.scaleX = 2;
//            this.bomb_armature.scaleY = 2;
//            this.bomb_armature.getAnimation().playWithIndex(0);
//            this.bomb_armature.setPosition(origin);
//            this.getParent().addChild(this.bomb_armature);
//        }
//        console.log("explode : " + this.isExplode + "ecplodedddd " + this.isEndExplode);
        if (this.isExplode && !this.isEndExplode) {

            if (this.bomb_armature.getAnimation().isComplete()) {
                this.isEndExplode = true;
//                console.log("explode : " + this.isExplode + "ecplodedddd " + this.isEndExplode);
                this.bomb_armature.phyObj.removeSelf();
                this.bomb_armature.removeFromParent();
                this.bomb_armature = null;
                this.die();
            }
        }
    },
    unuse : function () {
        this.stopAllActions();
        this._super();
    },
    reuse : function (file, type, x, y, sOrR) {
        this._super(file, type, x, y, sOrR);
        this.scale = 1;
        this.setAnchorPoint(cc.p(0.35,0.35));
        var animFrames = [];
        for (var i = 1; i < 4; i++) {
            var str = "bomb" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = new cc.Animation(animFrames, 0.1);
        this.anime = cc.animate(animation).repeatForever();
        this.runAction(this.anime);
        this.isExplode = false;
        this.isEndExplode = false;
        this.time = EXPLODE_TIME;
    }
});

Bomb.EXPLODE_COL_TYPE = 22;
Bomb.create = function (file, type, x, y, sOrR) {
    var ret = null;
    if (cc.pool.hasObj(Bomb))
        ret = cc.pool.getFromPool(Bomb, file, type, x, y, sOrR);
    else
        ret = new Bomb(file, type, x, y, sOrR);
    return ret;
}
