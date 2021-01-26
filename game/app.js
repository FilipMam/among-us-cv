(function() {
  const tasks = [
    new ComputerTask(),
    new PanelTask(),
    new TableTask(),
    new WhiteboardTask()
  ];

  const tasksManager = new TasksManager(tasks);
  const domEventsManager = new DOMEventsManager(tasksManager);
  const shipManager = new ShipManager(tasksManager, domEventsManager);
  
  const maskManager = new MaskManager(tasksManager);
  const crewmate = new Crewmate(shipManager, domEventsManager);  
})()
