(function() {
  const tasks = [
    new ComputerTask(),
    new PanelTask(),
    new TableTask(),
    new WhiteboardTask()
  ];

  const globalEventsManager = new GlobalEventsManager();
  const shipManager = new ShipManager(globalEventsManager);
  const tasksManager = new TasksManager(tasks);

  const obstacles = 
    tasks.map(task => 
      new Obstacle(`${task.key}`, globalEventsManager, shipManager, tasksManager, task))
    .concat([
      new Obstacle("bed", globalEventsManager, shipManager, tasksManager),
      new Obstacle("cube", globalEventsManager, shipManager, tasksManager,)
    ]);
  
  const crewmate = new Crewmate(shipManager, obstacles);

  const keyMap = {
    37: "left",
    65: "left",
    38: "up",
    87: "up",
    39: "right",
    68: "right",
    40: "down",
    83: "down"  
  };

  document.addEventListener("keydown", (event) => {
      if (!tasksManager.taskWrapperOpened) {
        if (keyMap[event.keyCode]) {
          event.preventDefault();
          crewmate.move(keyMap[event.keyCode]);
        }

        if (event.keyCode === 32) { // space
          tasksManager.openTaskWrapper();
        }
      } else {
        if (event.keyCode === 27) { // esc
          tasksManager.closeTaskWrapper();
        }
      }
  });

  document.addEventListener("keyup", (event) => {
    if (keyMap[event.keyCode]) {
      event.preventDefault();
      crewmate.stopMoving(keyMap[event.keyCode]);
    }
  });

  
})()
