class State {
    
    callbacks = []

    state = {
        boundries: {}
    }

    constructor() {
        this._setBoundries();
    }

    publish = (state) => {
        this.state = Object.assign(this.state, state);
        this.callbacks.forEach(cb => cb(this.state));
    }

    subscribe = (cb) => {
        this.callbacks.push(cb);
    }

    _setBoundries() {
        const shipBox = document.querySelector(".ship__floor").getBoundingClientRect();
        this.state.boundries.left = shipBox.left;
        this.state.boundries.right = shipBox.right;
        this.state.boundries.top = shipBox.top;
        this.state.boundries.bottom = shipBox.bottom;
    }
}