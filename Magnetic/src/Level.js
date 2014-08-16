/**
 * Created by chenryoutou on 14-8-16.
 */

var Level = {

    levelReader : new TMXReader(),

    createLevel : function(tmxFile) {
        this.levelReader.read(tmxFile);
    },
    fp_gate_info : cc.rect(0, 0, 0, 0),
    sp_gate_info : cc.rect(0, 0, 0, 0),

    createLevel_1 : function (gameLayer, space){

        var staticBody = space.staticBody;

        // Walls
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(winSize.width,0), 15 ),				// bottom
            new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,winSize.height), 15),				// left
            new cp.SegmentShape( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 15),	// right

            new cp.SegmentShape( staticBody, cp.v(0, winSize.height/6), cp.v(winSize.width/10, 0), 10),
            new cp.SegmentShape( staticBody, cp.v(winSize.width * 9/10, 0), cp.v(winSize.width, winSize.height/6), 10),

            new cp.SegmentShape( staticBody, cp.v(winSize.width * 4/10, 0), cp.v(winSize.width * 4.5/10, winSize.height * 0.5/10), 10),
            new cp.SegmentShape( staticBody, cp.v(winSize.width * 4.5/10, winSize.height * 0.5/10), cp.v(winSize.width * 5.5/10, winSize.height * 0.5/10), 10),
            new cp.SegmentShape( staticBody, cp.v(winSize.width * 5.5/10, winSize.height * 0.5/10), cp.v(winSize.width * 6/10, 0), 10)
        ];

        var shape = walls[0];
        shape.setElasticity(BackGroundElastricity);
        shape.setFriction(1);
        space.addStaticShape( shape );

        for ( var i = 1; i < walls.length; i++ ) {
            var shape = walls[i];
            shape.setElasticity(WallElastricity);
            shape.setFriction(1);
            space.addStaticShape( shape );
        }



    },

    createLevel_2 : function (gameLayer, space){

        var staticBody = space.staticBody;

        this.fp_gate_info = cc.rect(0, winSize.height/2 - 120, winSize.width/20 - 20, 120);
        this.sp_gate_info = cc.rect(winSize.width * 19/20 + 20, winSize.height/2 - 120, winSize.width/20 - 20, 120);

        // Walls
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(winSize.width,0), 15 ),				// bottom
            new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,winSize.height), 15),				// left
            new cp.SegmentShape( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 15),	// right

            new cp.SegmentShape( staticBody, cp.v(0, winSize.height/2 - 120), cp.v(winSize.width/20, winSize.height/2 - 120), 15),
            new cp.SegmentShape( staticBody, cp.v(0, winSize.height/2 + 0), cp.v(winSize.width/20, winSize.height/2 + 0), 15),
            new cp.SegmentShape( staticBody, cp.v(winSize.width * 19/20, winSize.height/2 - 120), cp.v(winSize.width, winSize.height/2 - 120), 15),
            new cp.SegmentShape( staticBody, cp.v(winSize.width * 19/20, winSize.height/2 + 0), cp.v(winSize.width, winSize.height/2 + 0), 15)

        ];

        var shape = walls[0];
        shape.setElasticity(BackGroundElastricity);
        shape.setFriction(1);
        space.addStaticShape( shape );

        for ( var i = 1; i < walls.length; i++ ) {
            var shape = walls[i];
            shape.setElasticity(WallElastricity);
            shape.setFriction(1);
            space.addStaticShape( shape );
        }



    }






};