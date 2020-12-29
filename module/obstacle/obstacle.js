class Obstacle {

    boxMargin = window.innerHeight*5/100;

    active = false;

    constructor(selector, globalState, task) {
        this.state = globalState.state;
        this.element = document.querySelector(`#${selector}`);
        this.box = this.element.getBoundingClientRect();
        
        if (task) {
            this.task = task;
            globalState.subscribe(state => {
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
            this.active = true;
            this.task.setActiveState(true);
        } else {
            this.element.classList.remove("active");
            this.task.setActiveState(false);
        }
    }

    isInBoundries = (x, y) => {
        return (this.left - this.boxMargin < x) && 
            (x < this.right + this.boxMargin) &&
            (this.top - this.boxMargin < y) &&
            (y < this.bottom + this.boxMargin);
    }

    finish = () => {
        if (this.task && !this.task.finished) {
            this.element.classList.add("finished");
            this.task.finish();
        }
    }

}