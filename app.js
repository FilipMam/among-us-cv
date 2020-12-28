(function() {
  const tasks = [
    new WhiteboardTask(),
    new PanelTask(),
    new ComputerTask(),
    new TableTask()
  ];

  const globalState = new State(tasks);

  const obstacles = 
    tasks.map(task => 
      new Obstacle(`${task.key}`, globalState, task))
    .concat([
      new Obstacle("bed", globalState)
    ]);
  
  const crewmate = new Crewmate(globalState, obstacles);

  const keyMap = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"  
  };

  document.addEventListener("keydown", (event) => {
      if (keyMap[event.keyCode]) {
        event.preventDefault();
        crewmate.move(keyMap[event.keyCode]);
      }

      // space
      if (event.keyCode === 32) {   
        const activeTask = tasks.find(task => task.active);
        if (activeTask) activeTask.open();
      }

  });

  document.addEventListener("keyup", (event) => {
    if (keyMap[event.keyCode]) {
      event.preventDefault();
      crewmate.stopMoving(keyMap[event.keyCode]);
    }
  });
})()
