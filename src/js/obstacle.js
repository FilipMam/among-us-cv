class Obstacle {
    boxMargin = window.innerHeight*5/100;

    active = false;

    constructor(selector, domEventsManager, taskManager, task) {
        this.taskManager = taskManager;
        this.element = document.querySelector(`#${selector}`);
        this.box = this.element.getBoundingClientRect();
        
        domEventsManager.subscribe("resize", () => {
            this.box = this.element.getBoundingClientRect();
        });

        this.task = task;
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

    willBeHitByCrewmate = (
        crewmatePositionLeft, 
        crewmatePositionRight, 
        crewmatePositionBottom, 
        crewmatePositionTop
    ) => {
        this.activateIfCrewmateIsNerby((crewmatePositionLeft + crewmatePositionRight)/2, crewmatePositionTop);
        
        return this.left < crewmatePositionRight && 
            this.right > crewmatePositionLeft && 
            this.top < crewmatePositionBottom && 
            this.bottom > crewmatePositionTop;
    }

    activateIfCrewmateIsNerby = (x, y) => {
        if (this.task) {
            if (this.isCrewmateInActivationBoundries(x, y)) {
                this.element.classList.add("active");
                this.taskManager.activateTask(this.task);
            } else {
                this.element.classList.remove("active");
                this.taskManager.deactivateTask(this.task);
            }
        }
    }

    isCrewmateInActivationBoundries = (x, y) => {
        return this.left - this.boxMargin < x && 
            x < this.right + this.boxMargin &&
            this.top - this.boxMargin < y &&
            y < this.bottom + this.boxMargin;
    }
}