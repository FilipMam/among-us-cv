class Crewmate {
    moving = {
        "left": false,
        "right": false,
        "up": false,
        "down": false
    }

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

        if (!interval) {
            interval = setInterval(() => {
                let box = this.getBox();

                if (this.moving.left) {
                    let newPosX = box.left - pacePXL;
                    if (newPosX > boundryLeft && !this.willHitObstacle(newPosX, newPosX + box.width, box.bottom, box.height)) {
                        this.posX = this.posX - pace;
                    }
                };

                if (this.moving.right) {
                    let newPosX = box.left + pacePXL;
                    if (newPosX < boundryRight && !this.willHitObstacle(newPosX, newPosX + box.width, box.bottom, box.height)) {
                        this.posX = this.posX + pace;                        
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

                this.element.style.transform = `translate3d(${this.posX}vh, ${this.posY}vh, 0)`;

                box = this.getBox();

                this.state.publish({crewmateX: box.left + box.width/2, crewmateY: box.bottom});

            } , 12);
        }
    }


    stopMoving = (dir) => {
        this.moving[dir] = false;
        if (!Object.entries(this.moving).some(entry => entry[1])) {
            clearInterval(interval);
            interval = null;
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

}

let interval = null;
