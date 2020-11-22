class Obstacle {

    boxMargin = window.innerHeight*5/100;

    constructor(selector, state) {
        this.element = document.querySelector(selector);
        this.box = this.element.getBoundingClientRect(); 
        state.subscribe(s => {
            if (this.isInBoundries(s.crewmateX, s.crewmateY)) {
                this.element.classList.add("active");
            } else {
                this.element.classList.remove("active");
            }
        });
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

    isInBoundries = (x, y) => {
        return (this.left - this.boxMargin < x) && 
            (x < this.right + this.boxMargin) &&
            (this.top - this.boxMargin < y) &&
            (y < this.bottom + this.boxMargin);
    }

}