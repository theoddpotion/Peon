var game = game || {};

game.MenuState = function(){
    this.name = 'MenuState';
    this.isPaused = false;
    this.isReady = false;
    this.tick = function(delta){
        if(this.isReady && !this.isPaused){
            if(game.Key.A){
                game.push(new game.PlayState());
                game.Key.A = false;
            }
        }
    };
    this.draw = function(){
        if(this.isReady && !this.isPaused){
            game.context.clearRect(0, 0, game.width, game.height);

            game.context.drawImage(assets.get('res/images/title.png'), 0, 0);

            game.context.font = '20px Arial';
            game.context.fillStyle = '#ffffff';
            game.context.fillText("Press Z to play!", 5, game.height-5);
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