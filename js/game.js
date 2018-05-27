var game = game || {};

//globals
game.width = 640;
game.height = 320;

//set up canvas
game.canvas = document.createElement('canvas');
game.canvas.width = game.width;
game.canvas.height = game.height;
document.body.appendChild(game.canvas);

//get drawing context
game.context = game.canvas.getContext('2d');

game.context.imageSmoothingEnabled = false;
//game.context.scale(2, 2);
//load image assets
window.addEventListener('load', function(){
    assets.load(['res/images/peon.png',
                 'res/images/well.png',
                 'res/images/background.png',
                 'res/images/fish_btn.png',
                 'res/images/fish_btn_selected.png',
                 'res/images/wood_btn.png',
                 'res/images/wood_btn_selected.png',
                 'res/images/crystal_btn.png',
                 'res/images/crystal_btn_selected.png',
                 'res/images/fish_overlay.png',
                 'res/images/fish_background.png',
                 'res/images/peon_hut.png',
                 'res/images/peon_stone.png',
                 'res/images/plank.png',
                 'res/images/tiles.png',
                 'res/images/chop_background.png',
                 'res/images/title.png']);
    assets.onReady(game.start);
}, false);

//Keyboard input
game.Key = {
    A: false,
    B: false
};

window.onkeydown = function(event){
    var keycode = event.keyCode;
    if(keycode == 90){ //Z
        game.Key.A = true;
    }
    if(keycode == 88){ //X
        game.Key.B = true;
    }
};
window.onkeyup = function(event){
    var keycode = event.keyCode;
    if(keycode == 90){
        game.Key.A = false;
    }
    if(keycode == 88){
        game.Key.B = false;
    }
};

//Score
game.Score = {
    population: 0,
    gold: 0,
    fish: 0,
    wood: 0
};

game.states = [];

game.push = function(state){
    game.states.push(state);
    state.onEnter();
};

game.pop = function(){
    var state = game.states[game.states.length-1];
    state.onExit();
    game.states.pop();
    state = game.states[game.states.length-1];
    state.onEnter();
};

game.pause = function(){
    var state = game.states[game.states.length-1];
    if(state.onPause){
        state.onPause();
    }
};

game.resume = function(){
    var state = game.states[game.states.length-1];
    if(state.onResume){
        state.onResume();
    }
};

//Game Loop
game.start = function(){
    game.push(new game.MenuState());
    game.run();
};

var then = Date.now();
game.run = function(){
    var now = Date.now();
    var delta = (now - then)/1000;

    game.tick(delta);
    game.draw();

    then = now;
    requestAnimationFrame(game.run);
};

game.tick = function(delta){
    var state = game.states[game.states.length-1];
    if(state){
        state.tick(delta);
    }
};

game.draw = function(){
    var state = game.states[game.states.length-1];
    if(state){
        state.draw();
    }
};