var game = game || {};

game.PlayState = function(){
    this.name = 'PlayState';
    this.isPaused = false;
    this.isReady = false;

    this.selectorPos = 0;
    this.areaCount = 3;

    this.wellPos = [game.width/2 - 16, game.height/2 - 16];

    this.maxPop = 1;
    this.peons = [];
    this.peons.push(new game.Peon([Math.random() * game.width - 12, Math.random() * game.height - 16]));//need to fix. spawns almost outside room
    game.Score.population++;

    this.spawnTimer = 0;

    this.tick = function(delta){
        if(this.isReady && !this.isPaused){
            if(game.Key.A){
                switch(this.selectorPos){
                    case 0:
                        game.push(new game.FishState());
                        game.Key.A = false;
                        break;
                    case 1:
                        game.push(new game.ChopState());
                        game.Key.A = false;
                        break;
                    case 2:
                        game.push(new game.CaveState());
                        game.Key.A = false;
                        break;
                    default:
                        game.Key.A = false;
                        break;
                }
            }
            if(game.Key.B){
                this.selectorPos = (this.selectorPos + 1) % this.areaCount;
                game.Key.B = false;
            }

            for(var i = 0; i < this.peons.length; i++){
                this.peons[i].tick(delta);
            }

            if(game.Score.fish > 0 && game.Score.wood > 0 && game.Score.population < this.maxPop){
                if((Date.now() - this.spawnTimer) > (Math.random() * (10000 - 5000) + 5000)){
                    this.peons.push(new game.Peon([Math.random() * game.width - 12, Math.random() * game.height - 16]));
                    game.Score.wood -= 1;
                    game.Score.population++;
                    this.spawnTimer = Date.now();
                }
            }

            this.maxPop = Math.floor(game.Score.gold / 10 + 1);
        }
    };

    this.draw = function(){
        if(this.isReady && !this.isPaused){
            game.context.drawImage(assets.get('res/images/background.png'), 0, 0);

            game.context.drawImage(assets.get('res/images/well.png'), 0, 0, 32, 32, this.wellPos[0], this.wellPos[1], 32, 32);

            for(var i = 0; i < this.peons.length; i++){
                var peon = this.peons[i];
                if(peon.isDead == false){
                    game.context.drawImage(assets.get('res/images/peon_hut.png'), 0, 0, 16, 16, peon.homePos[0], peon.homePos[1], 32, 32);
                    game.context.drawImage(assets.get('res/images/peon.png'), 0, 0, 12, 16, peon.pos[0], peon.pos[1], 12, 16);
                }else{
                    game.context.drawImage(assets.get('res/images/peon_stone.png'), 0, 0, 8, 8, peon.homePos[0]+8, peon.homePos[1]+16, 16, 16);
                }
            }

            if(this.selectorPos == 0){
                game.context.drawImage(assets.get('res/images/fish_btn_selected.png'), 0, 0, 32, 32, (game.width/3) - 32, game.height-70, 64, 64);
            }else{
                game.context.drawImage(assets.get('res/images/fish_btn.png'), 0, 0, 32, 32, (game.width/3) - 32, game.height-70, 64, 64);
            }
            
            game.context.font = '21px Arial';
            game.context.fillStyle = '#000000';
            game.context.fillText(game.Score.fish, (game.width/3)+16, game.height-8);
            game.context.fillStyle = '#ffffff';
            game.context.fillText(game.Score.fish, (game.width/3)+15, game.height-10);

            if(this.selectorPos == 1){
                game.context.drawImage(assets.get('res/images/wood_btn_selected.png'), 0, 0, 32, 32, (game.width/2) - 32, game.height-70, 64, 64);
            }else{
                game.context.drawImage(assets.get('res/images/wood_btn.png'), 0, 0, 32, 32, (game.width/2) - 32, game.height-70, 64, 64);
            }

            game.context.fillStyle = '#000000';
            game.context.fillText(game.Score.wood, (game.width/2)+16, game.height-8);
            game.context.fillStyle = '#ffffff';
            game.context.fillText(game.Score.wood, (game.width/2)+15, game.height-10);

            if(this.selectorPos == 2){
                game.context.drawImage(assets.get('res/images/crystal_btn_selected.png'), 0, 0, 32, 32, game.width-(game.width/3) - 32, game.height-70, 64, 64);
            }else{
                game.context.drawImage(assets.get('res/images/crystal_btn.png'), 0, 0, 32, 32, game.width - (game.width/3) - 32, game.height-70, 64, 64);
            }

            game.context.fillStyle = '#000000';
            game.context.fillText(game.Score.gold, game.width-(game.width/3)+16, game.height-8);
            game.context.fillStyle = '#ffffff';
            game.context.fillText(game.Score.gold, game.width-(game.width/3)+15, game.height-10);
            

            game.context.font = '10px Arial';

            game.context.fillStyle = '#000000';
            game.context.fillText('Population: ' + game.Score.population + '/' + this.maxPop, 3, 11);
            game.context.fillStyle = '#ffffff';
            game.context.fillText('Population: ' + game.Score.population + '/' + this.maxPop, 2, 10);
           
        }
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