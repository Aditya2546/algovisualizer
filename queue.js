let queue = [];

function updateQueueUI() {
    const queueContainer = document.getElementById("queue-container");
    queueContainer.innerHTML = "";

    queue.forEach((item, index) => {
        let element = document.createElement("div");
        element.classList.add("queue-element");
        element.textContent = item;

        if (index === 0) {
            element.style.backgroundColor = "red"; // Highlight front element
        }

        queueContainer.appendChild(element);
    });
}

function enqueue() {
    let input = document.getElementById("queue-input").value;
    if (input !== "") {
        queue.push(input);
        updateQueueUI();
        document.getElementById("queue-input").value = "";
    }
}

function dequeue() {
    if (queue.length > 0) {
        queue.shift();
        updateQueueUI();
    } else {
        alert("Queue is empty!");
    }
}

function peekQueue() {
    if (queue.length > 0) {
        alert("Front Element: " + queue[0]);
    } else {
        alert("Queue is empty!");
    }
}

function clearQueue() {
    queue = [];
    updateQueueUI();
}

document.addEventListener("DOMContentLoaded", updateQueueUI);

