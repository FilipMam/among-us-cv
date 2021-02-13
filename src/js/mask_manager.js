class MaskManager {

    maskElemenet = document.querySelector(".mask"); 

    constructor(tasksManager) {
        this.openWelcomeScreen();
        tasksManager.subscribe("victory", this.openVictoryScreen);
    }

    openWelcomeScreen = () => {
        this.maskElemenet.classList.add("mask--shown");
        setTimeout(() => {
            this.maskElemenet.classList.add("mask--hidding");
            setTimeout(() => {
                this.maskElemenet.classList.add("mask--hidden");
            }, 2500)
        }, 3000)
    }

    openVictoryScreen = () => {
        setTimeout(() => {
            this.maskElemenet.classList.remove("mask--hidding", "mask--hidden");
            this.maskElemenet.classList.add("mask--shown", "mask--victory");
        }, 500);

    }

}