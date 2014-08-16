
var Wall = cc.Class.extend({
    phyObj : null,
    o : cc.p(),
    friction : 1,

    ctor : function(objDesc) {
        var x = parseInt(objDesc.x), y = parseInt(objDesc.y), w = parseInt(objDesc.width), h = parseInt(objDesc.height),
            mapW = parseInt(objDesc.mapW), mapH = parseInt(objDesc.mapH);

        if (objDesc.polygonPoints) {
            var polygon = objDesc.polygonPoints;
            var verts = [x, y];
            for (var i = 1, l = polygon.length; i < l; ++i) {
                verts.push(x + parseInt(polygon[i].x));
                verts.push(y - parseInt(polygon[i].y));
            }
            this.phyObj = new StaticPolyObject(this, verts, cp.vzero);
            this.phyObj.shape.setCollisionType(Wall.COL_TYPE);
        }
        else {
            this.phyObj = new StaticObject(x, y, w, h, this);
            this.phyObj.top.setCollisionType(Wall.COL_TYPE);
        }
        this.phyObj.setElasticity(WallElastricity);
        this.phyObj.setFriction(this.friction);
    }
});

Wall.COL_TYPE = 100;