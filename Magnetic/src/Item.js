

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
            this.weight =(sOrR.width + sOrR.height) / ITEM_WEIGHT_FACTOR;
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
        cc.pool.putInPool(this);
    },

    die : function () {
        this.scheduleOnce(this._realDie, 0);
    },

    unuse : function() {
        this.phyObj.removeSelf();
        this.phyObj = null;
        this.removeFromParent(true);
        this.retain();
    },
    reuse : function(file, type, x, y, sOrR) {
        this.release();
        var tex = cc.textureCache.textureForKey(file);
        var size = this.texture.getContentSize();
        this.setTexture(tex);
        this.setTextureRect(cc.rect(0, 0, size.width, size.height));

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

Item.COL_TYPE = 0;

Item.CIRCLE_SHAPE = 0;
Item.RECT_SHAPE = 1;
