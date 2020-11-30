const globalState = new State();

const _obstacles = [new Obstacle("#obstacle1", globalState)];

const crewmate = new Crewmate(globalState, _obstacles);


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
      const activeObstacle = _obstacles.find(obstacle => obstacle.active);
      if (activeObstacle) activeObstacle.finish();
    }

});

document.addEventListener("keyup", (event) => {
  if (keyMap[event.keyCode]) {
    event.preventDefault();
    crewmate.stopMoving(keyMap[event.keyCode]);
  }
});


// a() 