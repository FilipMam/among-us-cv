class GlobalEventsManager {
    
    _callbacks = []

    constructor() {
        window.addEventListener("resize", () => this.publish("resize"));
    }

    publish = (event) => {
        this._callbacks.forEach(cb => cb(event));
    }

    subscribe = (cb) => {
        this._callbacks.push(cb);
    }

    unsubscribe = (cb) => {
        this._callbacks = this._callbacks.filter(subscribedCb => subscribedCb !== cb);
    }


}