class Crewmate {

    state = {
        moving: {
            "left": false,
            "right": false,
            "up": false,
            "down": false
        },
        isMovingLeft: false,
        movingAnimtationFrame: 0,
        posX: 0,
        posY: 0
    }

    constructor(globalState, obstacles) {
        this.globalState = globalState;
        this.obstacles = obstacles;
        this.element = document.querySelector("#crewmate");
    }

    move(dir) {
        const pace = 0.6;
        const pacePXL = pace*window.innerHeight/100;
        const legHeight = 2.5*window.innerHeight/100;//positioned absolute
        const boundries = this.globalState.state.boundries;
        this.state.moving[dir] = true;

        if (this.state.movingAnimtationFrame === 0) {
            this.changeAnimationFrame();
        } 

        if (!interval) {
            interval = setInterval(() => {
                let box = this.getBox();
                let positionBottom = box.bottom + legHeight;

                if (this.state.moving.left) {
                    let newPosX = box.left - pacePXL;
                    if (newPosX > boundries.left && !this.willHitObstacle(newPosX, newPosX + box.width, positionBottom, box.height)) {
                        this.state.posX = this.state.posX - pace;
                        this.state.isMovingLeft = true;
                    }
                    
                };

                if (this.state.moving.right) {
                    let newPosX = box.right + pacePXL;
                    if (newPosX < boundries.right && !this.willHitObstacle(newPosX, newPosX + box.width, positionBottom, box.height)) {
                        this.state.posX = this.state.posX + pace;
                        this.state.isMovingLeft = false;                   
                    } 
                };


                if (this.state.moving.down) {
                    let newPosY = positionBottom  + pacePXL;
                    if (newPosY < boundries.bottom && !this.willHitObstacle(box.left, box.right, newPosY, box.height)) {
                        this.state.posY = this.state.posY + pace;                        
                    }
                    
                };
                
                if (this.state.moving.up) {
                    let newPosY = positionBottom - pacePXL;
                    if (newPosY > boundries.top && !this.willHitObstacle(box.left, box.right, newPosY, box.height)) {
                        this.state.posY = this.state.posY - pace;
                    };
                }

                const scale = this.state.isMovingLeft ? "scaleX(-1)" : "";

                this.element.style.transform = `translate3d(${this.state.posX}vh, ${this.state.posY}vh, 0) ${scale}`;

                box = this.getBox();

                this.globalState.publish({crewmateX: box.left + box.width/2, crewmateY: box.bottom});

            } , 12);
        }
    }


    stopMoving = (dir) => {
        this.state.moving[dir] = false;
        if (!Object.entries(this.state.moving).some(entry => entry[1])) {
            clearInterval(interval);
            clearInterval(this.walkingAnimationInteval);
            interval = null;
            this.walkingAnimationInteval = null;
            this.element.classList.remove(`moving--${this.state.movingAnimtationFrame}`);
            this.state.movingAnimtationFrame = 0;
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
        this.element.classList.remove(`moving--${this.state.movingAnimtationFrame}`);
        this.state.movingAnimtationFrame = this.state.movingAnimtationFrame === 12 ? 1 : this.state.movingAnimtationFrame + 1;
        this.element.classList.add(`moving--${this.state.movingAnimtationFrame}`);
    }

}

let interval = null;
