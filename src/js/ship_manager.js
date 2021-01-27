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
    
    setBoundries() {
        const floorBox = document.querySelector(".floor").getBoundingClientRect();
        this.boundries.left = floorBox.left;
        this.boundries.right = floorBox.right;
        this.boundries.top = floorBox.top;
        this.boundries.bottom = floorBox.bottom;
    }
}