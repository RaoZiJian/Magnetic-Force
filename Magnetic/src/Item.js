

var Item = cc.Sprite.extend({

    weight : 50,
    maxSpeed : ITEM_MAX_SPEED,
    _friction : ITEM_INIT_FRICTION,
    _elasticity : ITEM_INIT_ELASTICITY,

    phyObj : null,

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
        this.phyObj.shape.setCollisionType(Player.COL_TYPE);
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
        this.unscheduleAllCallbacks();
        cc.pool.putInPool(this);
    },

    die : function () {
        this.scheduleOnce(this._realDie, 0.1);
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
        if (!this.isExplode && this.time < 0) {
            this.isExplode = true;
            bomb_armature = ccs.Armature.create("explode");
            bomb_armature.scaleX = 2;
            bomb_armature.scaleY = 2;
            bomb_armature.getAnimation().playWithIndex(0);
            bomb_armature.setPosition(this.getPosition());
            this.getParent().addChild(bomb_armature);
        }

        if (this.isExplode & !this.isEndExplode) {
            if (bomb_armature.getAnimation().isComplete()) {
                this.isEndExplode = true;
                bomb_armature.removeFromParent();
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
        this.time = EXPLODE_TIME;
    }
});

Bomb.create = function (file, type, x, y, sOrR) {
    var ret = null;
    if (cc.pool.hasObj(Bomb))
        ret = cc.pool.getFromPool(Bomb, file, type, x, y, sOrR);
    else
        ret = new Bomb(file, type, x, y, sOrR);
    return ret;
}
