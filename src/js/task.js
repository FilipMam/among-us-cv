class Task extends Subject {

    finished = false;
    active = false;
    
    constructor(key) {
        super();
        this.key = key;
    }

    finish = () => {
        this.publish("finish", this.key);
    }

    setActiveState = (active) => {
        this.active = active;
    } 
}


class ComputerTask extends Task {
    neverOpened = true;

    constructor() {
        super("computer");       
        this.assignDOMElements();
        this.bindEvents();
    }

    open = () => {
        this.monitorScreenElement.classList.remove("loading");
        
        if (this.neverOpened) {
            this.neverOpened = false;
            this.monitorScreenElement.classList.add("loading");
            let i = 0;
            let interval = setInterval(() => {
                if (i === 105) {
                    clearInterval(interval);
                    setTimeout(() => {
                        this.monitorScreenElement.classList.add("loaded");
                        this.monitorScreenPreviewElement.classList.add("loaded");
                    }, 500);
                } else {
                    this.monitorProgressBarElement.style.width = `${i}%`;
                    i++;
                }
        }, 24)}
    }

    assignDOMElements = () => {
        this.monitorScreenElement = document.querySelector(".monitor__screen");
        this.monitorScreenPreviewElement = document.querySelector(".computer__monitor__screen__content");
        this.monitorProgressBarElement = this.monitorScreenElement.querySelector(".monitor__loading__progress__bar");
        this.monitorLinkElement = this.monitorScreenElement.querySelector(".monitor__content__logo");
    }
    
    bindEvents = () => {
        this.monitorLinkElement.addEventListener("click", () => {
            if (!this.finished) {
                this.finish();
            }
        });
    }
}

class PanelTask extends Task {
    message = "";

    constructor() {
        super("panel");       
        this.assignDOMElements();
        this.bindEvents();
    }

    open = () => {
        if (!this.finished && this.message.length === 0) {
            let messageArray = "     Feel free to contact me or add me to your friends! We can code, work or play Among Us togheter!".split("");
            const inreval = setInterval(() => {
                this.message += messageArray.shift();
                this.screenPanelElement.innerText = this.message;
                this.screenPanelPreviewElement.innerText = this.message;
                if (messageArray.length === 0) {
                    clearInterval(inreval);
                    setTimeout(this.finish, 500);
                }
            }, 75);
        }

    }

    assignDOMElements = () => {
        this.screenPanelElement = document.querySelector(".task--panel .panel__part--center");
        this.screenPanelPreviewElement = document.querySelector("#panel .panel__part--center");
        
    }
    
    bindEvents = () => {
    }
}

class TableTask extends Task {
    constructor() {
        super("table");       
        this.assignDOMElements();
        this.bindEvents();
    }

    open = () => {}

    assignDOMElements = () => {
        this.tableTaskElement = document.querySelector(".task.task--table");
        this.backPageElement = this.tableTaskElement.querySelector(".table__page--back");
        this.frontPageElement = this.tableTaskElement.querySelector(".table__page--front");
    }
    
    bindEvents = () => {
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
        this.assignDOMElements();
        this.bindEvents();
    }

    open = () => {}

    assignDOMElements = () => {
        this.whiteboardTaskElement = document.querySelector(".task.task--whiteboard");
        this.whiteboardSwitchElement = this.whiteboardTaskElement.querySelector(".whiteboard__lamp__switch");
        this.whiteboardPreviewElement = document.querySelector("#whiteboard");
    }
    
    bindEvents = () => {
        this.whiteboardSwitchElement.addEventListener("click", () => {
            if (!this.finished) {
                this.finish();
            }

            this.whiteboardTaskElement.classList.toggle("light-on");
            this.whiteboardPreviewElement.classList.toggle("light-on");
        })
    }
}