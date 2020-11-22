const keyMap = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"  
};

const state = new State();


// const _obstacles = [document.querySelector(".obstacle")];
const _obstacles = [new Obstacle("#obstacle1", state)];

const crewmate = new Crewmate(state, _obstacles);

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
});

document.addEventListener("keyup", (event) => {
  if (keyMap[event.keyCode]) {
    event.preventDefault();
    crewmate.stopMoving(keyMap[event.keyCode]);
  }
});


