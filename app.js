const keyMap = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"  
};

const crewmateState = new State();

const _obstacles = [new Obstacle("#obstacle1", crewmateState)];

const crewmate = new Crewmate(crewmateState, _obstacles);

const shipBox = document.querySelector(".ship__floor").getBoundingClientRect();
const boundryLeft = shipBox.left;
const boundryRight = shipBox.right;
const boundryTop = shipBox.top;
const boundryBottom = shipBox.bottom;

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


