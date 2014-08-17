/**
 * Created by chenryoutou on 14-8-16.
 */

//gameLayer
var SpaceGravite = -300;
var WallElasticity = 2.0;
var WallFriction = 1;
var BackGroundElastricity = 1.2;


//item
var ITEM_MAXSPEED = 950,
    ITEM_WEIGHT_FACTOR = 770,
    ITEM_INIT_FRICTION = 0.25,
    ITEM_INIT_ELASTICITY = 0.3,
    ITEM_MAX_SPEED = 500,
    ITEM_SCALE_FACTOR = 2.5;


//item controller
var INITIAL_BOMB_NUMBER = 4,
    MAX_BOMB_NUMBER = 10,
    BORN_INTERVAL = 8,
    PRIMI_BORN_NUMBER = 2,
    BORN_NUMBER_VAR = 1,
    BORN_X_VAR = 400,
    BORN_Y_VAR = 50,
    BOMB_R = 20,
    BOMB_R_VAR = 2;


//magnet system
var EFFECTIVE_MAGNET_DIS = 900;
var PLAYER_INIT_MH = 800;
var SAFE_DIS_ADD = 0.7;
var REPULSIVE_FORCE_MUTIPLE = 2;
var AIR_STREAM_FORCE = 100;


//player
var PLAYER_WEIGHT = 1,
    PLAYER_MAX_SPEED = 400,
    PLAYER_JUMP_TOP = 120,
    PLAYER_JUMP_ADD_SPEED_Y = 380,
    PLAYER_JUMP_FORCE = 450,
    PLAYER_INIT_FRICTION = 0.25,
    PLAYER_INIT_ELASTICITY = 0.3,
//    PLAYER_ATTRACT_TOP_FORCE = cp.v(0, 1),
    PLAYER_PARTICLE_RESET_POS_INTERVAL = 0.5;


//bomb
var EXPLODE_TIME = 20+Math.random()*5;
var EXPLODE_WARNNING_TIME = 3;//the bomb will be explode
var EXPLODE_DEVIATION_TIME = 8;
var EXPLODE_WEIGHT = 5;
var EXPLODE_RADIUS = 30;

var EXPLODE_ELASTICITY = 10;
var BOMB_JUMP_ADD_SPEED = 60;

var GLOBAL_COL_TYPE = 0;

var GAME_INIT_HP = 1;
