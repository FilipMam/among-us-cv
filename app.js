(function() {
  const tasks = [
    new Task("whiteboard")
  ];

  const globalState = new State(tasks);

  const obstacles = 
    tasks.map(task => 
      new Obstacle(`${task.key}`, globalState, task))
    .concat([
      new Obstacle("obstacle1", globalState)
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
        const activeObstacle = obstacles.find(obstacle => obstacle.active);
        if (activeObstacle) activeObstacle.finish();
      }

  });

  document.addEventListener("keyup", (event) => {
    if (keyMap[event.keyCode]) {
      event.preventDefault();
      crewmate.stopMoving(keyMap[event.keyCode]);
    }
  });
})()
