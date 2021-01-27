class TasksManager extends Subject {

    taskWrapperOpened = false;
    
    constructor() {
        super();

        this.tasks = [
            new ComputerTask(),
            new PanelTask(),
            new TableTask(),
            new WhiteboardTask()
        ];
        this.assignDOMElements();
        this.bindEvents();
    }

    openTaskWrapper = () => {
        const activeTask = this.tasks.find(task => task.active);
        if (activeTask) {
            this.taskWrapperOpened = true;
            this.taskWrapperElement.classList.add("active");
            this.taskWrapperElement.classList.remove("hidden");
            
            document.querySelector(".task.active").classList.remove("active");
            document.querySelector(`.task--${activeTask.key}`).classList.add("active");

            activeTask.open();
        }
    }

    closeTaskWrapper = () => {
        this.taskWrapperOpened = false;
        this.taskWrapperElement.classList.remove("active");
        this.taskWrapperElement.classList.add("hidden");
    }

    activateTask = (task) => {
        if (!task.active) {
            task.setActiveState(true);
            this.useButtonElement.classList.add("active");
        }
    }

    deactivateTask = (task) => {
        if (task.active) {
            task.setActiveState(false);
            this.useButtonElement.classList.remove("active");
        }
    }

    openWhiteboardTask = () => {
        setTimeout(this.getTask("whiteboard").finish, 200);
    }

    assignDOMElements = () => {
        this.taskListButtonElement = document.querySelector(".tasks-list__button");
        this.taskListElement = document.querySelector(".tasks-list");
        this.taskProgressBarElement = document.querySelector(".tasks__progress__bar ");
        this.taskWrapperElement = document.querySelector("#task__wrapper");
        this.closeButtonElement = document.querySelector(".task__close");
        this.taskCompletePromptElement = document.querySelector(".task__prompt")
        this.useButtonElement = document.querySelector(".use");
    }

    bindEvents = () => {
        this.tasks.forEach(task => task.subscribe("finish", this.finishTask));
        this.closeButtonElement.addEventListener("click", this.closeTaskWrapper);
        this.taskListButtonElement.addEventListener("click", () => this.taskListElement.classList.toggle("hidden"));
        this.useButtonElement.addEventListener("click", this.openTaskWrapper);
    }

    getTask = (key) => {
        return this.tasks.find(task => task.key === key);
    }

    finishTask = (key) => {
        this.getTask(key).finished = true;
        document.querySelector(`.tasks-list__item--${key}`).classList.add("finished");
        document.querySelector(`#${key}`).classList.add("finished");
        this.taskCompletePromptElement.classList.add("active");
        this.taskProgressBarElement.classList.add(`tasks__progress__bar--${this.tasks.filter(task => task.finished).length}-finished`);
        
        if (this.tasks.every(task => task.finished)) {
            this.publish("victory");
        }
    }
}