class TasksManager {
    taskOpened = false;
    
    constructor(tasks) {
        this.state = tasks;
        this._assignDOMElements();
        this._bindEvents();
    }

    openTaskWrapper = (taskKey) => {
        this.taskOpened = true;
        this.taskWrapperElement.classList.add("active");
        this.taskWrapperElement.classList.remove("hidden");
        this.openTask(taskKey);
    }

    closeTaskWrapper = () => {
        this.taskOpened = false;
        this.taskWrapperElement.classList.remove("active");
        this.taskWrapperElement.classList.add("hidden");
    }

    openWhiteboardTask = () => {
        setTimeout(this._getTask("whiteboard").finish, 200);
    }

    openTableTask = () => {
    }

    openTask = (key) => {
        document.querySelector(".task.active").classList.remove("active");
        document.querySelector(`.task--${key}`).classList.add("active");

        const tasksCallbacks = {
            whiteboard: this.openWhiteboardTask,
            table: this.openTableTask
        };

        tasksCallbacks[key]();
    }

    _assignDOMElements = () => {
        this.taskWrapperElement = document.querySelector("#task__wrapper");
        this.closeButtonElement = document.querySelector(".task__close");
        this.taskCompletePrompt = document.querySelector(".task__prompt")
    }

    _bindEvents = () => {
        this.state.forEach(task => task.subscribeToTaskOpen(this.openTaskWrapper));
        this.state.forEach(task => task.subscribeToTaskFinished(this._finishTask));
        this.closeButtonElement.addEventListener("click", this.closeTaskWrapper);
    }

    _getTask = (key) => {
        return this.state.find(task => task.key === key);
    }

    _finishTask = (key) => {
        this._getTask(key).finish = true;
        document.querySelector(`.tasks-list-item--${key}`).classList.add("finished");
        this.taskCompletePrompt.classList.add("active");
    }
}