class Obstacle {
    boxMargin = window.innerHeight*5/100;

    active = false;

    constructor(selector, domEventsManager, shipManager, taskManager, task) {
        this.state = shipManager.state;
        this.taskManager = taskManager;
        this.element = document.querySelector(`#${selector}`);
        this.box = this.element.getBoundingClientRect();
        
        domEventsManager.subscribe("resize", () => {
            this.box = this.element.getBoundingClientRect();
        });

        if (task) {
            this.task = task;
            shipManager.subscribe(state => {
                this.state = state;
                this.activateIfCrewmateIsNerby();
            });
        }
    }

    get left() {
        return this.box.left;
    }

    get right() {
        return this.box.right;
    }
    
    get top() {
        return this.box.top;
    }

    get bottom() {
        return this.box.bottom;
    }

    activateIfCrewmateIsNerby = () => {
        if (this.isInBoundries(this.state.crewmateX, this.state.crewmateY)) {
            this.element.classList.add("active");
            this.taskManager.activateTask(this.task);
        } else {
            this.element.classList.remove("active");
            this.taskManager.deactivateTask(this.task);
        }
    }

    isInBoundries = (x, y) => { 
        return (this.left - this.boxMargin < x) && 
            (x < this.right + this.boxMargin) &&
            (this.top - this.boxMargin < y) &&
            (y < this.bottom + this.boxMargin);
    }
}