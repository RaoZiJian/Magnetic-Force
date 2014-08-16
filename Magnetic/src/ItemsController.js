

var ItemsLayer = cc.Layer.extend({
    game_layer : null,

    born_iron_interval : 1,
    born_bomb_interval : 1,

    ctor : function(game_layer){
        this._super();
        this.game_layer = game_layer;
        this.items = [];
    },

    addItem : function (tex, type, sOrR, friction, elasticity) {
        var x = Math.random() * 750 + 50;
        var y = Math.random() * 200 + 450;
        var item = Bomb.create(tex, type, x, y, sOrR);
        friction !== undefined && (item.friction = friction);
        elasticity !== undefined && (item.elasticity = elasticity);

        MagneticSystem.addOtherItem(item.phyObj.body);
        this.addChild(item);
    },

    update : function ( dt ){
        if ( !this.game_layer.isBegin){
            return false;
        }

        this.born_iron_interval -= dt;
        this.born_bomb_interval -= dt;

        //born iron.
        if (this.born_iron_interval < 0){
            this.born_iron_interval = BORN_IRON_INTERVAL;BORN_IRON_INTERVAL+= 1;
            this.addItem("#bomb1.png", Item.CIRCLE_SHAPE, 22);
        }

        //born bomb.
        if (this.born_bomb_interval < 0){
            this.born_bomb_interval = BORN_BOMB_INTERVAL;BORN_BOMB_INTERVAL+=1;
            this.addItem(res.BombA, Item.RECT_SHAPE, cc.size(30, 50), 0.08);
        }

        var children = this.children;
        for (var i = 0; i < children.length; ++i) {
            children[i].update && children[i].update(dt);
        }
    }
});
