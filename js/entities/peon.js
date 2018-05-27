game.Peon = function(pos){
    this.pos = pos;
    this.dir = [0, 0];
    this.homePos = [this.pos[0]-16, this.pos[1]-16];
    this.target = [this.homePos[0], this.homePos[1]];

    this.wandering = true;

    this.hunger = 0;

    this.turnTimer = Date.now();
    this.isMoving = false;

    this.isDead = false;

    this.tick = function(delta){

        if(this.wandering && this.isDead == false){
            if(((Date.now() - this.turnTimer) > 5000) && !this.isMoving){
                //set new target
                this.target[0] = (Math.random() * game.width - 12);
                this.target[1] = (Math.random() * game.height - 16);
                this.isMoving = true;
            }
            if(this.isMoving){
                if(this.pos[0] <= this.target[0]) this.dir[0] = 1;
                else if(this.pos[0] > this.target[0]) this.dir[0] = -1;
                if(this.pos[1] <= this.target[1]) this.dir[1] = 1;
                else if(this.pos[1] > this.target[1]) this.dir[1] = -1;
                if(Math.abs(this.pos[0] - this.target[0]) < 5 && Math.abs(this.pos[1] - this.target[1]) < 5){
                    this.dir[0] = 0;
                    this.dir[1] = 0;
                    this.turnTimer = Date.now();
                    this.isMoving = false;
                }
            }
            
        }else{
            if(this.pos[0] <= this.homePos[0]) this.dir[0] = 1;
            else if(this.pos[0] > this.homePos[0]) this.dir[0] = -1;
            if(this.pos[1] <= this.homePos[1]) this.dir[1] = 1;
            else if(this.pos[1] > this.homePos[1]) this.dir[1] = -1;

            if(Math.abs(this.pos[0] - this.homePos[0]) < 5 && Math.abs(this.pos[1] - this.homePos[1]) < 5){
                this.dir[0] = 0;
                this.dir[1] = 0;
                //if(this.isDead == false)
                    this.hunger -= 0.5;

                if(this.hunger <= 0){
                    this.hunger = 0;
                    if(game.Score.fish > 0 && this.isDead == false){
                        game.Score.fish -= 1;
                    }else{
                        if(this.isDead == false){
                            game.Score.population -= 1;
                        }
                        this.isDead = true;

                    }
                    this.wandering = true;
                    this.turnTimer = Date.now();
                }
            }
        }
        this.pos[0] += this.dir[0];
        this.pos[1] += this.dir[1];

        this.hunger += 0.005;
        if(this.hunger > 10){
            this.hunger = 10;
            this.wandering = false;
        }

        if(this.isMoving){
            if(this.pos[0] < 0){
                this.pos[0] = 0;
            }else
            if(this.pos[0] > game.width - 12){
                this.pos[0] = game.width - 12;
            }

            if(this.pos[1] < 0){
                this.pos[1] = 0;
            }else
            if(this.pos[1] > game.height - 16){
                this.pos[1] = game.height - 16;
            }
        }
    };

    
};