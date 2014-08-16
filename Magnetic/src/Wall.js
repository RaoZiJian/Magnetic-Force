
var Wall = cc.Class.extend({

    ctor : function(objDesc) {
        var x = parseInt(objDesc.x), y = parseInt(objDesc.y), w = parseInt(objDesc.width), h = parseInt(objDesc.height),
            mapW = parseInt(objDesc.mapW), mapH = parseInt(objDesc.mapH), phyObj;

        if (objDesc.polygonPoints) {
            var polygon = objDesc.polygonPoints;
            var verts = [x, y];
            for (var i = 1, l = polygon.length; i < l; ++i) {
                verts.push(x + parseInt(polygon[i].x));
                verts.push(y - parseInt(polygon[i].y));
            }
            phyObj = new StaticPolyObject(null, verts, cp.vzero);
            phyObj.shape.setCollisionType(Wall.COL_TYPE);
        }
        else {
            phyObj = new StaticObject(x, y, w, h, null);
            phyObj.top.setCollisionType(Wall.COL_TYPE);
            phyObj.left.setCollisionType(Wall.COL_TYPE);
            phyObj.right.setCollisionType(Wall.COL_TYPE);
        }
        phyObj.setElasticity(WallElasticity);
        phyObj.setFriction(WallFriction);
    }
});

Wall.COL_TYPE = 100;

var Gate = cc.Class.extend({
    ctor : function(objDesc) {
        var x = parseInt(objDesc.x), y = parseInt(objDesc.y), w = parseInt(objDesc.width), h = parseInt(objDesc.height);
        if (x < cc.winSize.width/2)
            Level.fp_gate_info = cc.rect(x, y, w, h);
        else
            Level.sp_gate_info = cc.rect(x, y, w, h);
    }
});