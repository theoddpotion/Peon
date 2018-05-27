var game = game || {};

game.CaveState = function(){
    this.name = 'CaveState';
    this.isPaused = false;
    this.isReady = false;

    var Tile = function(){
        this.type = Math.floor(Math.random() * 4);
        switch(this.type){
            case 0:
                this.health = 0;
                break;
            case 1:
                this.health = 1;
                break;
            case 2:
                this.health = 3;
                break;
            case 3:
                this.health = 5;
                break;
            default:
                break;
        }
    };

    this.tiles = [];
    for(var i = 0; i < 10; i++){
        this.tiles.push(new Tile());
    }
    this.tiles[0].type = 0;

    this.pos = 0;

    this.tick = function(delta){
        if(this.isReady && !this.isPaused){
            if(game.Key.A){
                if(this.pos < this.tiles.length-1){
                    var nextTile = this.tiles[this.pos+1];
                    nextTile.health -= 1;
                    if(nextTile.health < 0){
                        game.Score.gold += nextTile.type;
                        this.pos += 1;
                    }
                }else{
                    this.reset();
                }

                game.Key.A = false;
            }
            if(game.Key.B){
                game.pop();
                game.Key.B = false;                
            }

            
        }
    };

    this.draw = function(){
        if(this.isReady && !this.isPaused){
            game.context.clearRect(0, 0, game.width, game.height);

            

            for(var i = 0; i < 10; i++){
                var tile = this.tiles[i];

                if(tile.health > 0 && tile.type != 0){
                    game.context.drawImage(assets.get('res/images/tiles.png'), tile.type * 32, 0, 32, 32, i * 64, game.height/2-32, 64, 64);
                }
            }

            for(var i = 0; i <= 1; i++){
                for(var j = 0; j < 10; j++){
                    game.context.drawImage(assets.get('res/images/tiles.png'), 0, 0, 32, 32, j * 64, i * 64, 64, 64);
                }
            }

            for(var i = 0; i <= 1; i++){
                for(var j = 0; j < 10; j++){
                    game.context.drawImage(assets.get('res/images/tiles.png'), 0, 0, 32, 32, j * 64, (game.height-128) +i * 64, 64, 64);
                }
            }

            game.context.drawImage(assets.get('res/images/peon.png'), 0, 0, 12, 16, this.pos * 64 + 32, game.height/2, 24, 32);

            game.context.font = '10px Arial';
            game.context.fillStyle = '#000000';
            game.context.fillText('Crystals: ' + game.Score.gold, 3, 11);
            game.context.fillStyle = '#ffffff';
            game.context.fillText('Crystals: ' + game.Score.gold, 2, 10);
        }
    };

    this.reset = function(){
        this.tiles = [];
        for(var i = 0; i < 10; i++){
            this.tiles.push(new Tile());
        }
        this.tiles[0].type = 0;

        this.pos = 0;
    };

    this.onEnter = function(){
        this.isReady = true;
    };
    this.onExit = function(){
        this.isReady = false;
    };

    this.onPause = function(){
        this.isPaused = true;
    };
    this.onResume = function(){
        this.isPaused = false;
    };
};