var game = game || {};

game.FishState = function(){
    this.name = 'FishState';
    this.isPaused = false;
    this.isReady = false;

    this.barLength = 250;
    this.fishPos = (Math.random() * (250 - 60) + 60);

    this.reeling = false;
    this.struggling = false;

    this.damage = 0;

    this.reelingTimer = Date.now();
    this.struggleTimer = Date.now();
    this.lengthToStruggle = (Math.random() * (2000 - 1000) + 1000);

    this.tick = function(delta){
        if(this.isReady && !this.isPaused){
            if(game.Key.A){
                //reel in
                this.fishPos -= 4;
                this.reeling = true;
                this.reelingTimer = Date.now();
                game.Key.A = false;
            }
            if(game.Key.B){
                game.pop();
                game.Key.B = false;
            }

            //reeling timer
            if((Date.now() - this.reelingTimer) > 200){
                this.reeling = false;
            }

            if(this.struggling == false){
                if((Date.now() - this.struggleTimer) > this.lengthToStruggle){
                    this.struggling = true;
                    this.struggleTimer = Date.now();
                    this.lengthToStruggle = (Math.random() * (2500 - 500) + 500);                    
                }
            }
            if(this.struggling){
                this.fishPos += 0.1;
                if((Date.now() - this.struggleTimer) > this.lengthToStruggle){
                    this.struggling = false;
                    this.struggleTimer = Date.now();
                    this.lengthToStruggle = (Math.random() * (5000 - 1000) + 1000);
                }
            }

            if(this.reeling && this.struggling){
                this.damage += 0.75;
            }
            if(!this.reeling){
                if(this.damage > 0){
                    this.damage -= 1;
                }else{
                    this.damage = 0;
                }
            }

            if(this.damage > 100){
                this.reset();
            }

            //fish bound checks
            if(this.fishPos > this.barLength){
                //fish escaped go back to play
                game.pop();
            }
            if(this.fishPos <= 0){
                //fish caught add to score and pop to playstate
                game.Score.fish++;
                this.reset();
            }    
        }
    };

    this.draw = function(){
        if(this.isReady && !this.isPaused){
            game.context.drawImage(assets.get('res/images/fish_background.png'), 0, 0);

            game.context.font = '10px Arial';
            game.context.fillStyle = '#000000';
            game.context.fillText('Damage: ' + this.damage, 3, 11);
            game.context.fillStyle = '#ffffff';
            game.context.fillText('Damage: ' + this.damage, 2, 10);  

            game.context.fillStyle = '#ff0000';
            //game.context.fillRect((game.width/2) - (this.barLength)/2, 10, this.barLength, 12);
            game.context.drawImage(assets.get('res/images/fish_overlay.png'), 0, 0, 282, 32, (game.width/2) - (this.barLength/2) - 32, 10, 282, 32);

            game.context.drawImage(assets.get('res/images/fish_btn.png'), 0, 0, 32, 32, (game.width/2) - (this.barLength/2) + this.fishPos, 0, 32, 32);

            if(this.reeling){
                game.context.fillRect(100, 100, 10, 10);
            }
        }
    };

    this.reset = function(){
        this.barLength = 250;
        this.fishPos = (Math.random() * (250 - 60) + 60);

        this.reeling = false;
        this.struggling = false;

        this.damage = 0;

        this.reelingTimer = Date.now();
        this.struggleTimer = Date.now();
        this.lengthToStruggle = (Math.random() * (2000 - 1000) + 1000);
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