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

class PanelTask extends Task {
    constructor() {
        super("panel");       
        this._assignDOMElements();
        this._bindEvents();
    }

    open = () => {
        if (!this.finished) {
            let message = "";
            let messageArray = "Feel free to contact me or add me to your friends! We can code, work or play Among Us togheter!".split("");
            const inreval = setInterval(() => {
                message += messageArray.shift();
                this.screenPanelElement.innerText = message;
                this.screenPanelPreviewElement.innerText = message;
                if (messageArray.length === 0) {
                    clearInterval(inreval);
                    setTimeout(this.finish, 500);
                }
            }, 50);
        }

    }

    _assignDOMElements = () => {
        this.screenPanelElement = document.querySelector(".task--panel .panel__part--center");
        this.screenPanelPreviewElement = document.querySelector("#panel .panel__part--center");
        
    }
    
    _bindEvents = () => {
    }
}

class TableTask extends Task {
    constructor() {
        super("table");       
        this._assignDOMElements();
        this._bindEvents();
    }

    open = () => {}

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


class WhiteboardTask extends Task {
    constructor() {
        super("whiteboard");       
        this._assignDOMElements();
        this._bindEvents();
    }

    open = () => {}

    _assignDOMElements = () => {
        this.whiteboardTaskElement = document.querySelector(".task.task--whiteboard");
        this.whiteboardSwitchElement = this.whiteboardTaskElement.querySelector(".whiteboard__lamp__switch");
        this.whiteboardPreviewElement = document.querySelector("#whiteboard");
    }
    
    _bindEvents = () => {
        this.whiteboardSwitchElement.addEventListener("click", () => {
            if (!this.finished) {
                this.finish();
            }

            this.whiteboardTaskElement.classList.toggle("light-on");
            this.whiteboardPreviewElement.classList.toggle("light-on");
        })
    }
}