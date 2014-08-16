/**
 * Created by chenryoutou on 14-8-16.
 */


var BORN_IRON_INTERVAL = 0.5;
var BORN_BOMB_INTERVAL = 0.5;

var ItemsController = {


    game_layer : null,

    born_iron_interval : 1,
    born_bomb_interval : 3,


    init : function(game_layer){

        this.game_layer = game_layer;

    },

    update : function ( dt ){

        if ( !this.game_layer.isBegin){
            return false;
        }

        this.born_iron_interval -= dt;
        this.born_bomb_interval -= dt;

        //born iron.
        if (this.born_iron_interval < 0){

            this.born_iron_interval = BORN_IRON_INTERVAL;

            var test_body = new cp.Body(0.1, cp.momentForBox(0.1, 10, 10));
//            var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
            var test_shape = new cp.BoxShape(test_body, 10, 10);
            test_shape.setFriction(0.5);
            test_shape.setElasticity(0.3);

            var winsize = cc.director.getWinSize();

            var x = Math.random() * 750 + 50;

            var y = Math.random() * 200 + 450;

            test_body.setPos( cp.v(x, y) );

            this.game_layer.space.addBody(test_body);
            this.game_layer.space.addShape(test_shape);

            MagneticSystem.addOtherItem(test_body);

        }

        //born bomb.
        if (this.born_bomb_interval < 0){

            this.born_bomb_interval = BORN_BOMB_INTERVAL;


            var test_body = new cp.Body(0.1, cp.momentForCircle(1, 0, 20, cp.v(0, 0)));
            var test_shape = new cp.CircleShape(test_body, 10, cp.v(0, 0));
            test_shape.setFriction(0.5);
            test_shape.setElasticity(0.3);

            var winsize = cc.director.getWinSize();

            var x = Math.random() * 750 + 50;

            var y = Math.random() * 200 + 450;

            test_body.setPos( cp.v(x, y) );

            this.game_layer.space.addBody(test_body);
            this.game_layer.space.addShape(test_shape);

            MagneticSystem.addOtherItem(test_body);


        }


    }



};