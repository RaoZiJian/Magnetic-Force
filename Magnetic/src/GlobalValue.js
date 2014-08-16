/**
 * Created by chenryoutou on 14-8-16.
 */

//gameLayer
var SpaceGravite = -300;
var WallElasticity = 2.0;
var WallFriction = 1;
var BackGroundElastricity = 1.2;


//item
var ITEM_MAXSPEED = 650;
var ITEM_WEIGHT_FACTOR = 800;
var ITEM_INIT_FRICTION = 0.25;
var ITEM_INIT_ELASTICITY = 0.3;
var ITEM_MAX_SPEED = 500;


//item controller
var INITIAL_BOMB_NUMBER = 2,
    MAX_BOMB_NUMBER = 10,
    BORN_INTERVAL = 10,
    PRIMI_BORN_NUMBER = 2,
    BORN_NUMBER_VAR = 1,
    BORN_X_VAR = 400,
    BORN_Y_VAR = 50,
    BOMB_R = 20,
    BOMB_R_VAR = 2;


//magnet system
var EFFECTIVE_MAGNET_DIS = 800;
var PLAYER_INIT_MH = 400;
var SAFE_DIS_ADD = 0.5;
var REPULSIVE_FORCE_MUTIPLE = 2;


//player
var PLAYER_WEIGHT = 1;
var PLAYER_MAX_SPEED = 400;
var PLAYER_JUMP_ADD_SPEED_Y = 450;
var PLAYER_INIT_FRICTION = 0.25;
var PLAYER_INIT_ELASTICITY = 0.3;
var PLAYER_ATTRACT_TOP_FORCE = cp.v(0, 2);


//bomb
var EXPLODE_TIME = 15+Math.random()*10;
var EXPLODE_WARNNING_TIME = 1;//the bomb will be explode
var EXPLODE_WEIGHT = 20;
var EXPLODE_RADIUS = 60;
var EXPLODE_ELASTICITY = 10;
var BOMB_JUMP_ADD_SPEED = 100;

var GLOBAL_COL_TYPE = 0;