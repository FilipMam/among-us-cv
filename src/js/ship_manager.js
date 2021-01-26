class ShipManager extends Subject {
    
    obstacles = [];
    boundries = {};

    constructor(tasksManager, domEventsManager) {
        super();

        this.setBoundries();

        this.obstacles = tasksManager.tasks.map(task => 
            new Obstacle(`${task.key}`, domEventsManager, tasksManager, task))
          .concat([
            new Obstacle("bed", domEventsManager, tasksManager),
            new Obstacle("cube", domEventsManager, tasksManager,)
          ]);

        domEventsManager.subscribe("resize", () => {
            this.setBoundries();
        });
    }

    // publish = (state) => {
    //     this.state = Object.assign(this.state, state);
    //     this.callbacks.forEach(cb => cb(this.state));
    // }
    setBoundries() {
        const shipBox = document.querySelector(".ship__floor").getBoundingClientRect();
        this.boundries.left = shipBox.left;
        this.boundries.right = shipBox.right;
        this.boundries.top = shipBox.top;
        this.boundries.bottom = shipBox.bottom;
    }
}