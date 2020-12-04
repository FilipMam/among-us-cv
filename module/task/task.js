class Task {

    finished = false;
    
    constructor(key) {
        this.key = key;
        this.taskListElement = document.querySelector(`.tasks-list-item--${key}`);
    }

    finish = () => {
        this.finished = true;
        this.taskListElement.classList.add("finished");
    }


}