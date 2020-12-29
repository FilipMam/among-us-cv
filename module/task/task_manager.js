class TasksManager {
    taskOpened = false;
    
    constructor(tasks) {
        this.state = tasks;
        this.taskNode = document.querySelector("#task");
    }

    addTasks = (tasks) => {
        this._tasks.concat(tasks);
    }

    open = (task) => {
        this.taskOpened = true;
        this.taskNode.classList.add("active");
        this.openTask(task.key);
    }

    openWhiteboardTask = () => {
        const copiedWhiteboardContent = document.querySelector("#whiteboard .whiteboard__content").cloneNode(true);
        const whiteboardTaskWrapper = document.createElement("div");
        whiteboardTaskWrapper.classList.add("whiteboard-task-wrapper", "whiteboard", "active");
        whiteboardTaskWrapper.appendChild(copiedWhiteboardContent);
    
        const tableWidth = window.innerHeight*30/100;
    
        whiteboardTaskWrapper.style.transform = `scale(${window.innerWidth/2/tableWidth})`;
    
        this.taskNode.appendChild(whiteboardTaskWrapper);
    }

    openTask = (key) => {
        const tasksCallbacks = {
            whiteboard: this.openWhiteboardTask
        };

        tasksCallbacks[key]();
    }
}