const pace = 0.6;
const pacePXL = pace*window.innerHeight/100;

class Crewmate {
    _state = {
        moving: {
            "left": false,
            "right": false,
            "up": false,
            "down": false
        },
        movingInterval: null,
        isMovingLeft: true,
        movingAnimtationFrame: 0,
        movingAnimtationInterval: null,
        marginBottom: 2.5*window.innerHeight/100, // legs positioned absolute, adding margin to get "proper" boundingClientRect 
        posX: 0,
        posY: 0,
        pace: 0.6
    }

    constructor(globalState, obstacles) {
        this.globalState = globalState;
        this.obstacles = obstacles;
        this.element = document.querySelector("#crewmate");
        this.nameElement = this.element.querySelector(".crewmate__name");
        const url = new URL(window.location)
        this.nameElement.innerText = url.searchParams.get("name") || "Player";
    }

    move(dir) {
        const boundries = this.globalState.state.boundries;
        this._state.moving[dir] = true;

        if (!this._state.movingInterval) {
            this._state.movingInterval = setInterval(() => {
                let box = this._getBox();
                let positionBottom = box.bottom + this._state.marginBottom;

                if (this._state.moving.left) {
                    let newPosX = box.left - pacePXL;
                    if (newPosX > boundries.left && !this._willHitObstacle(newPosX, newPosX + box.width, positionBottom, box.height)) {
                        this._state.posX = this._state.posX - pace;
                        this._state.isMovingLeft = true;
                    }
                    
                };

                if (this._state.moving.right) {
                    let newPosX = box.right + pacePXL;
                    if (newPosX < boundries.right && !this._willHitObstacle(newPosX, newPosX, positionBottom, box.height)) {
                        this._state.posX = this._state.posX + pace;
                        this._state.isMovingLeft = false;                   
                    } 
                };


                if (this._state.moving.down) {
                    let newPosY = positionBottom  + pacePXL;
                    if (newPosY < boundries.bottom && !this._willHitObstacle(box.left, box.right, newPosY, box.height)) {
                        this._state.posY = this._state.posY + pace;                        
                    }
                    
                };
                
                if (this._state.moving.up) {
                    let newPosY = positionBottom - (this._state.marginBottom/2) - pacePXL;
                    if (newPosY > boundries.top && !this._willHitObstacle(box.left, box.right, newPosY, box.height)) {
                        this._state.posY = this._state.posY - pace;
                    };
                }

                const scale = this._state.isMovingLeft ? "scaleX(-1)" : "";
                this.element.style.transform = `translate3d(${this._state.posX}vh, ${this._state.posY}vh, 0) ${scale}`;
                this.nameElement.style.transform = `translate3d(-50%, 0, 0) ${scale}`;;

                if (this._state.movingAnimtationFrame === 0) {
                    this._changeAnimationFrame();
                } 
                
                box = this._getBox();
                this.globalState.publish({crewmateX: box.left + box.width/2, crewmateY: box.bottom});

            } , 12);
        }
    }


    stopMoving = (dir) => {
        this._state.moving[dir] = false;
        if (!Object.entries(this._state.moving).some(entry => entry[1])) {
            clearInterval(this._state.movingInterval);
            clearInterval(this._state.movingAnimtationInterval);
            this._state.movingInterval = null;
            this._state.movingAnimtationInterval = null;
            this.element.classList.remove(`moving--${this._state.movingAnimtationFrame}`);
            this._state.movingAnimtationFrame = 0;
        }
    }

    _willHitObstacle = (xL, xR, y) => {
        return this.obstacles.some(obstacle => (obstacle.left < xR) && 
            obstacle.right > xL && 
            obstacle.top < y && 
            obstacle.bottom > y - this._state.marginBottom);
    };

    _getBox = () => {
        return this.element.getBoundingClientRect();
    }

    _changeAnimationFrame = () => {
        this._updateAnimationFrame();
        this._state.movingAnimtationInterval = setInterval(() => {
            this._updateAnimationFrame();
        }, 60);
    }

    _updateAnimationFrame = () => {
        this.element.classList.remove(`moving--${this._state.movingAnimtationFrame}`);
        this._state.movingAnimtationFrame = this._state.movingAnimtationFrame === 12 ? 1 : this._state.movingAnimtationFrame + 1;
        this.element.classList.add(`moving--${this._state.movingAnimtationFrame}`);
    }

}
