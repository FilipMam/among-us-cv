class Task {

    finished = false;
    active = false;
    
    constructor(key) {
        this.key = key;
        this.taskListElement = document.querySelector(`.tasks-list-item--${key}`);
    }

    open = () => {
        this.taskManager.open(this);
    }

    finish = () => {
        this.finished = true;
        this.taskListElement.classList.add("finished");
    }

    setActiveState = (active) => {
        this.active = active;
    } 
}
