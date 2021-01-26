class Subject {
    callbacks = {};

    publish = (event, data) => {
        this.callbacks[event].forEach(cb => cb(data));
    }

    subscribe = (event, cb) => {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(cb);
    }
}