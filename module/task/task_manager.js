class TasksManager {
    taskWrapperOpened = false;
    
    constructor(tasks) {
        this.state = tasks;
        this._assignDOMElements();
        this._bindEvents();
    }

    openTaskWrapper = () => {
        const activeTask = this.state.find(task => task.active);
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
        setTimeout(this._getTask("whiteboard").finish, 200);
    }

    openTableTask = () => {
    }

    _assignDOMElements = () => {
        this.taskListButtonElement = document.querySelector(".tasks-list__button");
        this.taskListElement = document.querySelector(".tasks-list");
        this.taskProgressBarElement = document.querySelector(".tasks__progress__bar ");
        this.taskWrapperElement = document.querySelector("#task__wrapper");
        this.closeButtonElement = document.querySelector(".task__close");
        this.taskCompletePromptElement = document.querySelector(".task__prompt")
        this.useButtonElement = document.querySelector(".use");
    }

    _bindEvents = () => {
        this.state.forEach(task => task.subscribeToTaskFinished(this._finishTask));
        this.closeButtonElement.addEventListener("click", this.closeTaskWrapper);
        this.taskListButtonElement.addEventListener("click", () => this.taskListElement.classList.toggle("hidden"));
        this.useButtonElement.addEventListener("click", this.openTaskWrapper);
    }

    _getTask = (key) => {
        return this.state.find(task => task.key === key);
    }

    _finishTask = (key) => {
        this._getTask(key).finished = true;
        document.querySelector(`.tasks-list__item--${key}`).classList.add("finished");
        document.querySelector(`#${key}`).classList.add("finished");
        this.taskCompletePromptElement.classList.add("active");
        this.taskProgressBarElement.classList.add(`tasks__progress__bar--${this.state.filter(task => task.finished).length}-finished`);
    }
}