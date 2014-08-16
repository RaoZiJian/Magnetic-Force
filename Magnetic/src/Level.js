/**
 * Created by chenryoutou on 14-8-16.
 */

var Level = {


    createLevel_1 : function (gameLayer, space){

        var staticBody = space.staticBody;

        // Walls
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(winSize.width,0), 10 ),				// bottom
            new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,winSize.height), 10),				// left
            new cp.SegmentShape( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 10),	// right

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


    }






};