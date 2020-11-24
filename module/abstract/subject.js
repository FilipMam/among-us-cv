class Subject {
    callbacks = []

    state = {}

    publish = (state) => {
        this.state = Object.assign(this.state, state);
        this.callbacks.forEach(cb => cb(this.state));
    }

    subscribe = (cb) => {
        this.callbacks.push(cb);
    }
}