(function() {
  const tasksManager = new TasksManager();
  const domEventsManager = new DOMEventsManager(tasksManager);
  const shipManager = new ShipManager(tasksManager, domEventsManager);
  
  const maskManager = new MaskManager(tasksManager);
  const crewmate = new Crewmate(shipManager, domEventsManager);  
})()
