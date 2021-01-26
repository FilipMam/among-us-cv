class Crewmate {
    state = {
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
        posX: 0,
        posY: 0,
        pace: 0.6
    }

    constructor(shipManager, domEventsManager) {
        this.shipManager = shipManager;
        this.element = document.querySelector("#crewmate");
        this.nameElement = this.element.querySelector(".crewmate__name");
        const url = new URL(window.location)
        this.nameElement.innerText = url.searchParams.get("name") || "Player";
        this.setDynamicValues();
        domEventsManager.subscribe("arrowDown", this.move.bind(this));
        domEventsManager.subscribe("arrowUp", this.stopMoving.bind(this));
        domEventsManager.subscribe("resize", this.setDynamicValues.bind(this));
    }

    setDynamicValues = () => {
        console.log('xxxx')
        this.state.pacePXL = this.state.pace*window.innerHeight/100;
        this.state.marginBottom = 2.5*window.innerHeight/100 // legs positioned absolute, adding margin to get "proper" boundingClientRect 
    }

    move(dir) {
        const boundries = this.shipManager.boundries;
        const pace = this.state.pace;
        const pacePXL = this.state.pacePXL;

        this.state.moving[dir] = true;

        if (!this.state.movingInterval) {
            this.state.movingInterval = setInterval(() => {
                let box = this.getBox();
                let positionBottom = box.bottom + this.state.marginBottom;

                if (this.state.moving.left) {
                    let newPosX = box.left - pacePXL;
                    if (newPosX > boundries.left && !this.willHitObstacle(newPosX, newPosX + box.width, positionBottom, box.height)) {
                        this.state.posX = this.state.posX - pace;
                        this.state.isMovingLeft = true;
                    }
                    
                };

                if (this.state.moving.right) {
                    let newPosX = box.right + pacePXL;
                    if (newPosX < boundries.right && !this.willHitObstacle(newPosX, newPosX, positionBottom, box.height)) {
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
                    let newPosY = positionBottom - (this.state.marginBottom/2) - pacePXL;
                    if (newPosY > boundries.top && !this.willHitObstacle(box.left, box.right, newPosY, box.height)) {
                        this.state.posY = this.state.posY - pace;
                    };
                }

                const scale = this.state.isMovingLeft ? "scaleX(-1)" : "";
                this.element.style.transform = `translate3d(${this.state.posX}vh, ${this.state.posY}vh, 0) ${scale}`;
                this.nameElement.style.transform = `translate3d(-50%, 0, 0) ${scale}`;;

                if (this.state.movingAnimtationFrame === 0) {
                    this.changeAnimationFrame();
                } 
                
                box = this.getBox();
            } , 12);
        }
    }

    stopMoving = (dir) => {
        this.state.moving[dir] = false;
        if (!Object.entries(this.state.moving).some(entry => entry[1])) {
            clearInterval(this.state.movingInterval);
            clearInterval(this.state.movingAnimtationInterval);
            this.state.movingInterval = null;
            this.state.movingAnimtationInterval = null;
            this.element.classList.remove(`moving--${this.state.movingAnimtationFrame}`);
            this.state.movingAnimtationFrame = 0;
        }
    }

    willHitObstacle = (xL, xR, y) => {
        return this.shipManager.obstacles.filter(obstacle => 
            obstacle.willBeHitByCrewmate(xL, xR, y, y - this.state.marginBottom)).length > 0;
        };

    getBox = () => {
        return this.element.getBoundingClientRect();
    }

    changeAnimationFrame = () => {
        this.updateAnimationFrame();
        this.state.movingAnimtationInterval = setInterval(() => {
            this.updateAnimationFrame();
        }, 60);
    }

    updateAnimationFrame = () => {
        this.element.classList.remove(`moving--${this.state.movingAnimtationFrame}`);
        this.state.movingAnimtationFrame = this.state.movingAnimtationFrame === 12 ? 1 : this.state.movingAnimtationFrame + 1;
        this.element.classList.add(`moving--${this.state.movingAnimtationFrame}`);
    }

}
