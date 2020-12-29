class Task {

    _taskOpenedCallbacks = [];
    _taskFinishedCallbacks = [];

    finished = false;
    active = false;
    
    constructor(key) {
        this.key = key;
    }

    open = () => {
        this.publishTaskOpen();
    }

    publishTaskOpen = () => {
        this._taskOpenedCallbacks.forEach(cb => cb(this.key));
    }

    publishTaskFinished = () => {
        this._taskFinishedCallbacks.forEach(cb => cb(this.key));
    }

    subscribeToTaskOpen = (cb) => {
        this._taskOpenedCallbacks.push(cb);
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
