/**
 * Created by chenryoutou on 14-8-16.
 */

//gameLayer
var SpaceGravite = -300;
var WallElasticity = 2.0;
var WallFriction = 1;
var BackGroundElastricity = 1.2;


//item
var ITEM_MAXSPEED = 600,
    ITEM_WEIGHT_FACTOR = 800,
    ITEM_INIT_FRICTION = 0.15,
    ITEM_INIT_ELASTICITY = 0.3,
    ITEM_MAX_SPEED = 500,
    ITEM_SCALE_FACTOR = 2.5;


//item controller
var INITIAL_BOMB_NUMBER = 5,
    MAX_BOMB_NUMBER = 16,
    BORN_INTERVAL = 3,
    PRIMI_BORN_NUMBER = 2,
    BORN_NUMBER_VAR = 1,
    BORN_X_VAR = 400,
    BORN_Y_VAR = 50,
    BOMB_R = 20,
    BOMB_R_VAR = 5;


//magnet system
var EFFECTIVE_MAGNET_DIS = 800;
var PLAYER_INIT_MH = 500;
var SAFE_DIS_ADD = 0.5;
var REPULSIVE_FORCE_MUTIPLE = 2;


//player
var PLAYER_WEIGHT = 1;
var PLAYER_MAX_SPEED = 400;
var PLAYER_JUMP_ADD_SPEED_Y = 300;
var PLAYER_INIT_FRICTION = 0.15;
var PLAYER_INIT_ELASTICITY = 0.3;
var PLAYER_ATTRACT_TOP_FORCE = cp.v(0, 2);


//bomb
var EXPLODE_TIME = 10;
var EXPLODE_WARNNING_TIME = 5;//the bomb will be explode
var EXPLODE_WEIGHT = 10;
var EXPLODE_RADIUS = 50;
var EXPLODE_ELASTICITY = 10;
var BOMB_JUMP_ADD_SPEED = 200;

var GLOBAL_COL_TYPE = 0;