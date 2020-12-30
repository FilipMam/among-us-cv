class Task {

    _taskFinishedCallbacks = [];

    finished = false;
    active = false;
    
    constructor(key) {
        this.key = key;
    }

    publishTaskFinished = () => {
        this._taskFinishedCallbacks.forEach(cb => cb(this.key));
    }

    subscribeToTaskFinished = (cb) => {
        this._taskFinishedCallbacks.push(cb);
    }

    finish = () => {
        this.publishTaskFinished(this.key);
    }

    setActiveState = (active) => {
        this.active = active;
    } 
}

class TableTask extends Task {
    constructor() {
        super("table");       
        this._assignDOMElements();
        this._bindEvents();
    }

    // open = () => {
    //     this.tableTaskElement.classList.remove("clicked");

    // }

    _assignDOMElements = () => {
        this.tableTaskElement = document.querySelector(".task.task--table");
        this.backPageElement = this.tableTaskElement.querySelector(".table__page--back");
        this.frontPageElement = this.tableTaskElement.querySelector(".table__page--front");
    }
    
    _bindEvents = () => {
        const togglePage = () => {
            this.tableTaskElement.classList.toggle("flipped");
            if (!this.finished) {
                this.finish();
            }
        }

        this.backPageElement.addEventListener("click", () => {
            if (!this.tableTaskElement.classList.contains("flipped")) {
                togglePage();
            }
        });

        this.frontPageElement.addEventListener("click", () => {
            if (this.tableTaskElement.classList.contains("flipped")) {
                togglePage();
            }
        });
    }
}