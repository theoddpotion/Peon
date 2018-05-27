var game = game || {};

game.ChopState = function(){
    this.name = 'ChopState';
    this.isPaused = false;
    this.isReady = false;

    this.wood = {x: 0, y: game.height/2-16, w: 0, h: 32};
    this.isGrowing = false;
    this.isCut = false;
    this.gravity = 3;

    this.length = (Math.random() * (400 - 100) + 100);

    this.tick = function(delta){
        if(this.isReady && !this.isPaused){
            if(game.Key.A){
                //else{
                    this.isCut = true;
                    this.yVel -= 10;
                    
                    if(this.wood.w > this.length-10 && this.wood.w < this.length+10){
                        game.Score.wood++;
                        this.isGrowing = false;
                    }
                    
                    game.Key.A = false;
                //}
                //game.Key.A = false;
            }
            if(game.Key.B){
                game.pop();
                game.Key.B = false;                
            }

            if(this.isGrowing){
                //this.wood.y -= 2;
                this.wood.w += 2;
            }else{
                this.isGrowing = true;
            }

            if(this.isCut){

                this.wood.x += 3;
                this.wood.y += (this.wood.y * this.gravity) * delta;


            }

            if(this.wood.y > game.height + 16){
                this.reset();
            }

            if(this.wood.w > (game.width-32)){
                this.isCut = true;
                this.yVel -= 10;
            }
        }
    };

    this.draw = function(){
        if(this.isReady && !this.isPaused){
            game.context.drawImage(assets.get('res/images/chop_background.png'), 0, 0);

            game.context.font = '10px Arial';
            game.context.fillStyle = '#000000';
            game.context.fillText('Wood: ' + game.Score.wood, 3, 11);
            game.context.fillStyle = '#ffffff';
            game.context.fillText('Wood: ' + game.Score.wood, 2, 10);

            game.context.fillStyle = '#ffffff';
            game.context.fillRect(this.length-10, 0, 20, game.height);

            
            game.context.drawImage(assets.get('res/images/plank.png'), (320 - this.wood.w/2), 0, this.wood.w, 32, this.wood.x, this.wood.y - (this.wood.h/2), this.wood.w*2, this.wood.h*2);
        }
    };

    this.reset = function(){
       this.wood = {x: 0, y: game.height/2-16, w: 0, h: 32};
        this.isGrowing = false;
        this.isCut = false;
        this.gravity = 3;

        this.length = (Math.random() * (400 - 100) + 100);
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