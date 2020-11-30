class Crewmate {
    moving = {
        "left": false,
        "right": false,
        "up": false,
        "down": false
    }

    isMovingLeft = false;

    movingAnimtationFrame = 0;

    constructor(globalState, obstacles) {
        this.globalState = globalState;
        this.obstacles = obstacles;
        this.element = document.querySelector("#crewmate");
        this.posX = 0;
        this.posY = 0;
    }

    move(dir) {
        const pace = 0.6;
        const pacePXL = pace*window.innerHeight/100;
        const legHeight = 2.5*window.innerHeight/100;//positioned absolute
        const boundries = this.globalState.state.boundries;
        this.moving[dir] = true;

        if (this.movingAnimtationFrame === 0) {
            this.changeAnimationFrame();
        } 

        if (!interval) {
            interval = setInterval(() => {
                let box = this.getBox();
                let positionBottom = box.bottom + legHeight;

                if (this.moving.left) {
                    let newPosX = box.left - pacePXL;
                    if (newPosX > boundries.left && !this.willHitObstacle(newPosX, newPosX + box.width, positionBottom, box.height)) {
                        this.posX = this.posX - pace;
                        this.isMovingLeft = true;
                    }
                    
                };

                if (this.moving.right) {
                    let newPosX = box.right + pacePXL;
                    if (newPosX < boundries.right && !this.willHitObstacle(newPosX, newPosX + box.width, positionBottom, box.height)) {
                        this.posX = this.posX + pace;
                        this.isMovingLeft = false;                   
                    } 
                };


                if (this.moving.down) {
                    let newPosY = positionBottom  + pacePXL;
                    if (newPosY < boundries.bottom && !this.willHitObstacle(box.left, box.right, newPosY, box.height)) {
                        this.posY = this.posY + pace;                        
                    }
                    
                };
                
                if (this.moving.up) {
                    let newPosY = positionBottom - pacePXL;
                    if (newPosY > boundries.top && !this.willHitObstacle(box.left, box.right, newPosY, box.height)) {
                        this.posY = this.posY - pace;
                    };
                }

                const scale = this.isMovingLeft ? "scaleX(-1)" : "";

                this.element.style.transform = `translate3d(${this.posX}vh, ${this.posY}vh, 0) ${scale}`;

                box = this.getBox();

                this.globalState.publish({crewmateX: box.left + box.width/2, crewmateY: box.bottom});

            } , 12);
        }
    }


    stopMoving = (dir) => {
        this.moving[dir] = false;
        if (!Object.entries(this.moving).some(entry => entry[1])) {
            clearInterval(interval);
            clearInterval(this.walkingAnimationInteval);
            interval = null;
            this.walkingAnimationInteval = null;
            this.element.classList.remove(`moving--${this.movingAnimtationFrame}`);
            this.movingAnimtationFrame = 0;
        }
    }

    willHitObstacle = (xL, xR, y, height) => {
        const legHeight = 2.5*window.innerHeight/100;//positioned absolute
        return this.obstacles.some(obstacle => (obstacle.left < xR) && 
            obstacle.right > xL && 
            obstacle.top < y && 
            obstacle.bottom > y - legHeight);
    };

    getBox = () => {
        return this.element.getBoundingClientRect();
    }

    changeAnimationFrame = () => {
        this._updateAnimationFrame();
        this.walkingAnimationInteval = setInterval(() => {
            this._updateAnimationFrame();
        }, 60);
    }

    _updateAnimationFrame = () => {
        this.element.classList.remove(`moving--${this.movingAnimtationFrame}`);
        this.movingAnimtationFrame = this.movingAnimtationFrame === 12 ? 1 : this.movingAnimtationFrame + 1;
        this.element.classList.add(`moving--${this.movingAnimtationFrame}`);
    }

}

let interval = null;
