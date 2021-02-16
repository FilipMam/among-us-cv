class DOMEventsManager extends Subject {
    
    keyMap = {
        37: "left",
        65: "left",
        38: "up",
        87: "up",
        39: "right",
        68: "right",
        40: "down",
        83: "down"  
    };

    constructor(tasksManager) {
        super();
        this.checkWindowSize();

        window.addEventListener("resize", () => this.onWindowResize());

        document.addEventListener("keydown", (event) => {
            if (!tasksManager.taskWrapperOpened) {
            if (this.keyMap[event.keyCode]) {
                event.preventDefault();
                this.publish("arrowDown", this.keyMap[event.keyCode]);
            }

            if (event.keyCode === 32) { // space
                tasksManager.openTaskWrapper();
            }
            } else {
            if (event.keyCode === 27) { // esc
                tasksManager.closeTaskWrapper();
            }
            }
        });

        document.addEventListener("keyup", (event) => {
            if (this.keyMap[event.keyCode]) {
                event.preventDefault();
                this.publish("arrowUp", this.keyMap[event.keyCode]);
            }
        });
    }

    onWindowResize = () => {
        this.publish("resize");
        this.checkWindowSize();
    }

    checkWindowSize = () => {
        if (window.innerWidth < window.innerHeight) {
            document.querySelector("body").classList.add("mobile");
        } else {
            document.querySelector("body").classList.remove("mobile");
        }
    }

}