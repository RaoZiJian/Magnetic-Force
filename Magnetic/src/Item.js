

var Item = cc.Sprite.extend({

    weight : 50,
    maxSpeed : ITEM_MAX_SPEED,
    _friction : ITEM_INIT_FRICTION,
    _elasticity : ITEM_INIT_ELASTICITY,

    phyObj : null,

    ctor : function(file, w, h, x, y) {
        this._super(file);

        var size = this.texture.getContentSize();
        this.scaleX = w / size.width;
        this.scaleY = h / size.height;

        this.maxSpeed = ITEM_MAXSPEED;
        this.weight = (w + h) / ITEM_WEIGHT_FACTOR;

        this.initPhysics(x, y, w, h);
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

    initPhysics : function (x, y, width, height) {
        var size = cc.size(width, height),
            origin = cc.p(x, y);

        this.phyObj = new PhysicsObject(this.weight, size, this.maxSpeed, this, origin);
        this.phyObj.setFriction(this._friction);
        this.phyObj.setElasticity(this._elasticity);
        this.phyObj.shape.setCollisionType(Player.COL_TYPE);
    },

    update : function() {
        var pos = this.phyObj.getPosition();
        this.x = pos.x;
        this.y = pos.y;
        this.rotation = -180 * this.phyObj.body.a / Math.PI;
    }
});

var p = Item.prototype;
cc.defineGetterSetter(p, "friction", p.getFriction, p.setFriction);
cc.defineGetterSetter(p, "elasticity", p.getElasticity, p.setElasticity);

Item.COL_TYPE = 0;