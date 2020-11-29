class Crewmate {
    moving = {
        "left": false,
        "right": false,
        "up": false,
        "down": false
    }

    isMovingLeft = false;

    movingAnimtationFrame = 0;

    constructor(state, obstacles) {
        this.state = state;
        this.obstacles = obstacles;
        this.element = document.querySelector("#crewmate");
        this.posX = 0;
        this.posY = 0;
    }

    move(dir) {
        const pace = 0.6;
        const pacePXL = pace*window.innerHeight/100;
        this.moving[dir] = true;

        if (this.movingAnimtationFrame === 0) {
            this.changeAnimationFrame();
        } 

        if (!interval) {
            interval = setInterval(() => {
                let box = this.getBox();

                if (this.moving.left) {
                    let newPosX = box.left - pacePXL;
                    if (newPosX > boundryLeft && !this.willHitObstacle(newPosX, newPosX + box.width, box.bottom, box.height)) {
                        this.posX = this.posX - pace;
                        this.isMovingLeft = true;
                    }
                    
                };

                if (this.moving.right) {
                    let newPosX = box.left + pacePXL;
                    if (newPosX < boundryRight && !this.willHitObstacle(newPosX, newPosX + box.width, box.bottom, box.height)) {
                        this.posX = this.posX + pace;
                        this.isMovingLeft = false;                   
                    } 
                };


                if (this.moving.down) {
                    let newPosY = box.bottom + pacePXL;
                    if (newPosY < boundryBottom && !this.willHitObstacle(box.left, box.right, newPosY, box.height)) {
                        this.posY = this.posY + pace;                        
                    }
                    
                };
                
                if (this.moving.up) {
                    let newPosY = box.bottom - pacePXL;
                    if (newPosY > boundryTop && !this.willHitObstacle(box.left, box.right, newPosY, box.height)) {
                        this.posY = this.posY - pace;
                    };
                }

                const scale = this.isMovingLeft ? "scaleX(-1)" : "";

                this.element.style.transform = `translate3d(${this.posX}vh, ${this.posY}vh, 0) ${scale}`;

                box = this.getBox();

                this.state.publish({crewmateX: box.left + box.width/2, crewmateY: box.bottom});

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
        return this.obstacles.some(obstacle => {
            return (obstacle.left < xR) && 
            obstacle.right > xL && 
            obstacle.top < y && 
            obstacle.bottom > y - height/3;
        })
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
