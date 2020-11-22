class Crewmate {
    constructor(selector){
        this.element = document.querySelector(selector);
        this.posX = 0;
        this.posY = 0;
        this.moving = false;
        this.facing = "left";
    }

    move(dir) {
        const pace = 1;
        const pacePXL = pace*window.innerHeight/100;

        moving[dir] = true;

        if (!interval) {
            interval = setInterval(() => {
                const box = this.element.getBoundingClientRect();
                if (moving.left) {
                    let newPosX = box.left - pacePXL;
                    if (newPosX > boundryLeft && !willHitObstacle(newPosX, box.bottom, box)) {
                        this.posX = this.posX - pace;
                    }
                };

                if (moving.right) {
                    let newPosX = box.right + pacePXL;
                    if (newPosX < boundryRight && !willHitObstacle(newPosX, box.bottom, box)) {
                        this.posX = this.posX + pace;                        
                    } 
                };


                if (moving.down) {
                    let newPosY = box.bottom + pacePXL;
                    if (newPosY < boundryBottom && !willHitObstacle(box.left, newPosY, box)) {
                        this.posY = this.posY + pace;                        
                    }
                    
                };
                
                if (moving.up) {
                    let newPosY = box.bottom - pacePXL;
                    if (newPosY > boundryTop && !willHitObstacle(box.left, newPosY, box)) {
                        this.posY = this.posY - pace;
                    };
                }

                this.element.style.transform = `translate3d(${this.posX}vh, ${this.posY}vh, 0)`;
            } , 24);
        }
    }

}

const crewmate = new Crewmate("#crewmate");

const keyMap = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"  
};

const moving = {
    "left": false,
    "right": false,
    "up": false,
    "down": false
};

const obstacles = [document.querySelector(".obstacle")];

let interval = null;

const shipBox = document.querySelector(".ship__floor").getBoundingClientRect();
const boundryLeft = shipBox.left;
const boundryRight = shipBox.right;
const boundryTop = shipBox.top;
const boundryBottom = shipBox.bottom;

const stopMoving = (dir) => {
    moving[dir] = false;
    if (!Object.entries(moving).some(entry => entry[1])) {
        clearInterval(interval);
        interval = null;
    }
}

document.addEventListener("keydown", (event) => {
    crewmate.move(keyMap[event.keyCode]);
});

document.addEventListener("keyup", (event) => {
    stopMoving(keyMap[event.keyCode]);
})

const willHitObstacle = (x, y, crewmate) => {
    return obstacles.some(obstacle => {
        const box = obstacle.getBoundingClientRect();
        return (box.left < x + crewmate.width) && box.right > x && box.top < y && box.bottom > y - crewmate.height/3;
    })
};



