class Task {

    finished = false;
    active = false;
    
    constructor(key) {
        this.key = key;
        this.taskListElement = document.querySelector(`.tasks-list-item--${key}`);
    }

    finish = () => {
        this.finished = true;
        this.taskListElement.classList.add("finished");
    }

    setActiveState = (active) => {
        this.active = active;
    } 


}

class WhiteboardTask extends Task {
    constructor() {
        super("whiteboard");
    }

    open = () => {
        document.querySelector("#whiteboard").style.transform = "scale(2)";
        this.finish();
    }

}

class PanelTask extends Task {
    constructor() {
        super("panel");
    }

    open = () => {
        document.querySelector("#panel").style.transform = "scale(2)";
        this.finish();
    }

}