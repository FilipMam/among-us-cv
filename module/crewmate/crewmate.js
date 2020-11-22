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
        this.element.style.transform = `translate3d(${this.posX}vh, ${this.posY}vh, 0)`;

        
        this.state.subscribe((s) => {
            this.posX = s.crewmateX;
            this.posY = s.crewmateY;

            this.element.style.transform = `translate3d(${this.posX}vh, ${this.posY}vh, 0)`;
        });
    }

    move(dir) {
        const pace = 1.2;
        const pacePXL = pace*window.innerHeight/100;
        this.moving[dir] = true;

        if (!interval) {
            interval = setInterval(() => {
                const box = this.element.getBoundingClientRect();

                if (this.moving.left) {
                    let newPosX = box.left - pacePXL;
                    if (newPosX > boundryLeft && !this.willHitObstacle(newPosX, box.bottom, box)) {
                        this.posX = this.posX - pace;
                    }
                };

                if (this.moving.right) {
                    let newPosX = box.right + pacePXL;
                    if (newPosX < boundryRight && !this.willHitObstacle(newPosX, box.bottom, box)) {
                        this.posX = this.posX + pace;                        
                    } 
                };


                if (this.moving.down) {
                    let newPosY = box.bottom + pacePXL;
                    if (newPosY < boundryBottom && !this.willHitObstacle(box.left, newPosY, box)) {
                        this.posY = this.posY + pace;                        
                    }
                    
                };
                
                if (this.moving.up) {
                    let newPosY = box.bottom - pacePXL;
                    if (newPosY > boundryTop && !this.willHitObstacle(box.left, newPosY, box)) {
                        this.posY = this.posY - pace;
                    };
                }

                this.state.publish({crewmateX: this.posX, crewmateY: this.posY});

            } , 24);
        }
    }


    stopMoving = (dir) => {
        this.moving[dir] = false;
        if (!Object.entries(this.moving).some(entry => entry[1])) {
            clearInterval(interval);
            interval = null;
        }
    }

    willHitObstacle = (x, y, crewmate) => {
        return this.obstacles.some(obstacle => {
            return (obstacle.left < x + crewmate.width) && obstacle.right > x && obstacle.top < y && obstacle.bottom > y - crewmate.height/3;
        })
    };

}

let interval = null;
