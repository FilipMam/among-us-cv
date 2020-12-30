(function() {
  const tasks = [
    new Task("whiteboard"),
    new Task("panel"),
    new Task("computer"),
    new TableTask()
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
      if (!taskManager.taskWrapperOpened) {
        if (keyMap[event.keyCode]) {
          event.preventDefault();
          crewmate.move(keyMap[event.keyCode]);
        }

        if (event.keyCode === 32) { // space
          taskManager.openTaskWrapper();
        }
      } else {
        if (event.keyCode === 27) { // esc
          taskManager.closeTaskWrapper();
        }
      }
  });

  document.addEventListener("keyup", (event) => {
    if (keyMap[event.keyCode]) {
      event.preventDefault();
      crewmate.stopMoving(keyMap[event.keyCode]);
    }
  });

  // render stars
  const starContainer = document.querySelector("#stars"); 
  for (let i=0; i<100; i++) {
    const randomNumber = Math.random();
    const translateX = randomNumber*100;
    const delay = i*1/50;
    const starElement = document.createElement("span");
    starElement.classList.add("star");
    starElement.style.left = `${translateX}%`;
    starElement.style.animationDelay = `${delay}s`;
    starContainer.appendChild(starElement);
  }
  
})()
