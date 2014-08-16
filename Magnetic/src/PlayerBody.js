/**
 * Created by chenryoutou on 14-8-15.
 */

var PLAYER_WEIGHT = 1,
    PLAYER_SPEED = 200;

var Player = cc.Sprite.extend({

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

    ctor : function(file, r, x, y) {
        this._super(file);

        var size = this.texture.getContentSize(),
            sx = r / size.width, sy = r / size.height;
        this.scale = sx > sy ? sx * 2 : sy * 2;
        this.width = this.height = r * 2;
        this.r = r;

        this.width = this.r * 2;
        this.height = this.r * 2;

        this.maxSpeed = PLAYER_SPEED;

        this.initPhysics(x, y, this.r);
    },

    onEnter: function() {
        this._super();
        this.scheduleUpdate();
    },
    onExit : function () {
        this.unscheduleUpdate();
        this._super();
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
        var size = cc.size(r * 2, r * 2),
            origin = cc.p(x, y);

        this.phyObj = new CircleObject(this.weight, size.width/2, this.maxSpeed, this, origin);
        this.phyObj.setFriction(this.friction);
        this.phyObj.setElasticity(this.elasticity);
        var body = this.phyObj.body;
//        body.setMoment(Infinity);
        this.phyObj.shape.setCollisionType(Player.COL_TYPE);

//        // Bottom sensor
//        this.bottomSensor = new cp.SegmentShape(body, cp.v(w/8-w/2, -h/2), cp.v(w*7/8-w/2, -h/2), 3);
//        Physics.world.addShape(this.bottomSensor);
//        this.bottomSensor.setSensor(true);
//        this.bottomSensor.setCollisionType(Hero.BOTTOM_COL_TYPE);
//        // Left sensor
//        this.leftSensor = new cp.SegmentShape(body, cp.v(-w/2, h/8-h/2), cp.v(-w/2, h*7/8-h/2), 3);
//        this.leftSensor.setSensor(true);
//        this.leftSensor.setCollisionType(Hero.LEFT_COL_TYPE);
//        Physics.world.addShape(this.leftSensor);
//        // Bottom sensor
//        this.rightSensor = new cp.SegmentShape(body, cp.v(w/2, h/8-h/2), cp.v(w/2, h*7/8-h/2), 3);
//        this.rightSensor.setSensor(true);
//        this.rightSensor.setCollisionType(Hero.RIGHT_COL_TYPE);
//        Physics.world.addShape(this.rightSensor);
    },

    update : function() {
        var pos = this.phyObj.getPosition();
        this.x = pos.x;
        this.y = pos.y;
    }


    //just like the PhysicsSprite.

//    _syncPosition:function () {
//        var locPosition = this._position, locBody = this.phyObj.body;
//        if (locPosition.x != locBody.p.x || locPosition.y != locBody.p.y) {
//            cc.Sprite.prototype.setPosition.call(this, locBody.p.x, locBody.p.y);
//        }
//    },
//    _syncRotation:function () {
//        this._rotationRadians = this.phyObj.body.GetAngle();
//    },
//
//    setPosition:function (newPosOrxValue, yValue) {
//        if (yValue === undefined) {
//            this.phyObj.body.p.x = newPosOrxValue.x;
//            this.phyObj.body.p.y = newPosOrxValue.y;
//        } else {
//            this.phyObj.body.p.x = newPosOrxValue;
//            this.phyObj.body.p.y = yValue;
//        }
//        //this._syncPosition();
//    },
//
//    getPosition:function () {
//        var locBody = this.phyObj.body;
//        return {x:locBody.p.x, y:locBody.p.y};
//    },
//
//    getRotation:function () {
//        return this._ignoreBodyRotation ? cc.radiansToDegrees(this._rotationRadiansX) : -cc.radiansToDegrees(this.phyObj.body.a);
//    },
//    setRotation:function (r) {
//        if (this._ignoreBodyRotation) {
//            cc.Sprite.prototype.setRotation.call(this, r);
//        } else {
//            this.phyObj.body.a = -cc.degreesToRadians(r);
//            //this._syncRotation();
//        }
//    },
//
//    setIgnoreBodyRotation: function(b) {
//        this._ignoreBodyRotation = b;
//    },
//
//    /**
//     * @deprecated
//     */
//    nodeToParentTransform: function(){
//        return this.getNodeToParentTransform();
//    },
//    getNodeToParentTransform:function () {
//        if(cc._renderType === cc._RENDER_TYPE_CANVAS)
//            return this._nodeToParentTransformForCanvas();
//
//        var locBody = this.phyObj.body, locAnchorPIP = this._anchorPointInPoints, locScaleX = this._scaleX, locScaleY = this._scaleY;
//        var x = locBody.p.x;
//        var y = locBody.p.y;
//
//        if (this._ignoreAnchorPointForPosition) {
//            x += locAnchorPIP.x;
//            y += locAnchorPIP.y;
//        }
//
//        // Make matrix
//        var radians = locBody.a;
//        var c = Math.cos(radians);
//        var s = Math.sin(radians);
//
//        // Although scale is not used by physics engines, it is calculated just in case
//        // the sprite is animated (scaled up/down) using actions.
//        // For more info see: http://www.cocos2d-iphone.org/forum/topic/68990
//        if (!cc._rectEqualToZero(locAnchorPIP)) {
//            x += c * -locAnchorPIP.x * locScaleX + -s * -locAnchorPIP.y * locScaleY;
//            y += s * -locAnchorPIP.x * locScaleX + c * -locAnchorPIP.y * locScaleY;
//        }
//
//        // Rot, Translate Matrix
//        this._transform = cc.affineTransformMake(c * locScaleX, s * locScaleX,
//                -s * locScaleY, c * locScaleY,
//            x, y);
//
//        return this._transform;
//    },
//
//    _nodeToParentTransformForCanvas: function () {
//        if (this.dirty) {
//            var t = this._transform;// quick reference
//            // base position
//            var locBody = this._body, locScaleX = this._scaleX, locScaleY = this._scaleY, locAnchorPIP = this._anchorPointInPoints;
//            t.tx = locBody.p.x;
//            t.ty = locBody.p.y;
//
//            // rotation Cos and Sin
//            var radians = -locBody.a;
//            var Cos = 1, Sin = 0;
//            if (radians) {
//                Cos = Math.cos(radians);
//                Sin = Math.sin(radians);
//            }
//
//            // base abcd
//            t.a = t.d = Cos;
//            t.b = -Sin;
//            t.c = Sin;
//
//            // scale
//            if (locScaleX !== 1 || locScaleY !== 1) {
//                t.a *= locScaleX;
//                t.c *= locScaleX;
//                t.b *= locScaleY;
//                t.d *= locScaleY;
//            }
//
//            // adjust anchorPoint
//            t.tx += Cos * -locAnchorPIP.x * locScaleX + -Sin * locAnchorPIP.y * locScaleY;
//            t.ty -= Sin * -locAnchorPIP.x * locScaleX + Cos * locAnchorPIP.y * locScaleY;
//
//            // if ignore anchorPoint
//            if (this._ignoreAnchorPointForPosition) {
//                t.tx += locAnchorPIP.x;
//                t.ty += locAnchorPIP.y;
//            }
//            this._transformDirty = false;
//        }
//        return this._transform;
//    },
//
//    isDirty:function(){
//        return !this.phyObj.body.isSleeping();
//    },
//    setDirty: function(){ }


});

var p = Player.prototype;
cc.defineGetterSetter(p, "isMagnet", p.getMagnet, p.setMagnet);
cc.defineGetterSetter(p, "isAttract", p.getAttract, p.setAttract);

Player.COL_TYPE = 0;