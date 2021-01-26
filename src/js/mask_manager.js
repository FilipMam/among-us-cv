class MaskManager {

    maskElemenet = document.querySelector(".mask"); 

    constructor(tasksManager) {
        this.initializeWelcomeScreen();
    }

    initializeWelcomeScreen = () => {
        this.maskElemenet.classList.add("mask--shown");
        setTimeout(() => {
            this.maskElemenet.classList.add("mask--hidding");
            setTimeout(() => {
                this.maskElemenet.classList.add("mask--hidden");
            }, 2500)
        }, 3000)
    }

}