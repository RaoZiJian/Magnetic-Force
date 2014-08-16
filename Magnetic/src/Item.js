
var Item = cc.Sprite.extend({

    _isMagnet : false,
    _isAttract : true,
    isMagnetUpdated : null,
    isAttractUpdated : null,
    mh : 0,

    weight : PLAYER_WEIGHT,
    maxSpeed : 200,
    r : 0,
    friction : 0.8,
    elasticity : 0.3,

    phyObj : null,

    _ignoreBodyRotation:false,

    ctor : function(file, w, h, x, y) {
        this._super(file);

        var size = this.texture.getContentSize();
        this.scaleX = w / size.width;
        this.scaleY = h / size.height;

        this.maxSpeed = PLAYER_SPEED;

        this.initPhysics(x, y, w, h);
    },

    initPhysics : function (x, y, width, height) {
        var size = cc.size(width, height),
            origin = cc.p(x, y);

        this.phyObj = new PhysicsObject(this.weight, size, this.maxSpeed, this, origin);
        this.phyObj.setFriction(this.friction);
        this.phyObj.setElasticity(this.elasticity);
        this.phyObj.shape.setCollisionType(Player.COL_TYPE);
    },

    update : function() {
        var pos = this.phyObj.getPosition();
        this.x = pos.x;
        this.y = pos.y;
        this.rotation = -180 * this.phyObj.body.a / Math.PI;
    }
});

Item.COL_TYPE = 0;