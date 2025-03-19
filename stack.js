let stack = [];

function updateStackUI() {
    const stackContainer = document.getElementById("stack-container");
    stackContainer.innerHTML = "";

    stack.forEach((item, index) => {
        let element = document.createElement("div");
        element.classList.add("stack-element");
        element.textContent = item;

        if (index === stack.length - 1) {
            element.style.backgroundColor = "red"; // Highlight top element
        }

        stackContainer.prepend(element); // Adds new elements at the bottom
    });
}

function push() {
    let input = document.getElementById("stack-input").value;
    if (input !== "") {
        stack.push(input);
        updateStackUI();
        document.getElementById("stack-input").value = "";
    }
}

function pop() {
    if (stack.length > 0) {
        stack.pop();
        updateStackUI();
    } else {
        alert("Stack is empty!");
    }
}

function peek() {
    if (stack.length > 0) {
        alert("Top Element: " + stack[stack.length - 1]);
    } else {
        alert("Stack is empty!");
    }
}

function clearStack() {
    stack = [];
    updateStackUI();
}

document.addEventListener("DOMContentLoaded", updateStackUI);
