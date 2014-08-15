/**
 * Created by chenryoutou on 14-8-15.
 */

var PLAYER_WEIGHT = 1,
    PLAYER_SPEED = 200;

var Player = cc.Sprite.extend({

    isMagnet : false,
    isAttract : true,
    mh : 0,

    weight : PLAYER_WEIGHT,
    maxSpeed : 200,
    r : 0,
    friction : 0.8,
    elasticity : 0.3,

    phyObj : null,

    ctor : function(file, r, x, y) {
        this._super(file);

        var size = this.texture.getContentSize();
        this.r = size.width > size.height ? size.width/2 : size.height/2;

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

    initPhysics : function (x, y, r) {
        var size = cc.size(r * 2, r * 2),
            origin = cc.p(x, y);

        this.phyObj = new CircleObject(this.weight, size.width/2, this.maxSpeed, this, origin);
        this.phyObj.setFriction(this.friction);
        this.phyObj.setElasticity(this.elasticity);
        var body = this.phyObj.body;
        body.setMoment(Infinity);
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

});

Player.COL_TYPE = 0;