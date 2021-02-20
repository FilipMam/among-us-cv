const list = [
    [".ship__container"],
    [".floor__upper-part"],
    [".floor__corridor"],
    [".floor__tails"],
    [".wall"],
    [".picture"],
    [".doors"],
    [".camera"],
    [".vent"],
    ["#bed"],
    ["#panel"],
    ["#computer", ".computer__monitor"],
    ["#table"],
    ["#whiteboard"],
    [".floor__platform"],
    [".ship__wing--left", ".ship__wing--right", ".ship__engine--left", ".ship__engine--right"],
    ["#stars"],
    [],
    [],
    [],
    [],
    [],
    [".tasks-list", ".tasks__progress", ".use"]
]

list.forEach(s => {
    s.forEach(selector => document.querySelector(selector).classList.add("hidden"));
});

const hide = () => {
    list.forEach((s, i) => {
        if (s) {
            setTimeout(() => {
                s.forEach(selector => document.querySelector(selector).classList.remove("hidden"));
            },i*2000)
        }
    });
}

setTimeout(hide,10000);

