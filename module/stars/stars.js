
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