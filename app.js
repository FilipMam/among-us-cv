(function() {
  const tasks = [
    new Task("whiteboard"),
    new Task("panel"),
    new Task("computer"),
    new Task("table")
  ];

  const shipManager = new ShipManager();
  const taskManager = new TasksManager(tasks);

  const obstacles = 
    tasks.map(task => 
      new Obstacle(`${task.key}`, shipManager, task))
    .concat([
      new Obstacle("bed", shipManager)
    ]);
  
  const crewmate = new Crewmate(shipManager, obstacles);

  const keyMap = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"  
  };

  document.addEventListener("keydown", (event) => {
      if (!taskManager.taskOpened) {

        if (keyMap[event.keyCode]) {
          event.preventDefault();
          crewmate.move(keyMap[event.keyCode]);
        }

        // space
        if (event.keyCode === 32) {   
          const activeTask = tasks.find(task => task.active);
          if (activeTask) activeTask.open();
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
