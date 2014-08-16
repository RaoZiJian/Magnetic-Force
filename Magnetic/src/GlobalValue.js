/**
 * Created by chenryoutou on 14-8-16.
 */

//gameLayer
var SpaceGravite = -300;
var WallElasticity = 2.0;
var WallFriction = 1;
var BackGroundElastricity = 1.2;


//item
var ITEM_MAXSPEED = 600;
var ITEM_WEIGHT_FACTOR = 800;
var ITEM_INIT_FRICTION = 0.15;
var ITEM_INIT_ELASTICITY = 0.3;
var ITEM_MAX_SPEED = 500;


//item controller
var BORN_IRON_INTERVAL = 20;
var BORN_BOMB_INTERVAL = 20;


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
var EXPLODE_TIME = 300;
