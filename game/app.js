(function() {
  const tasks = [
    new ComputerTask(),
    new PanelTask(),
    new TableTask(),
    new WhiteboardTask()
  ];

  const tasksManager = new TasksManager(tasks);
  const domEventsManager = new DOMEventsManager(tasksManager);
  const shipManager = new ShipManager(domEventsManager);

  const obstacles = 
    tasks.map(task => 
      new Obstacle(`${task.key}`, domEventsManager, shipManager, tasksManager, task))
    .concat([
      new Obstacle("bed", domEventsManager, shipManager, tasksManager),
      new Obstacle("cube", domEventsManager, shipManager, tasksManager,)
    ]);
  
  const maskManager = new MaskManager(tasksManager);
  const crewmate = new Crewmate(shipManager, obstacles, domEventsManager);  
})()
