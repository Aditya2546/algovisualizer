class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertAtEnd(value) {
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let temp = this.head;
            while (temp.next) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
        this.updateUI();
    }

    insertAtStart(value) {
        let newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.updateUI();
    }

    deleteValue(value) {
        if (!this.head) return;
        if (this.head.value === value) {
            this.head = this.head.next;
            this.updateUI();
            return;
        }

        let temp = this.head;
        while (temp.next && temp.next.value !== value) {
            temp = temp.next;
        }

        if (temp.next) {
            temp.next = temp.next.next;
        }
        this.updateUI();
    }

    clearList() {
        this.head = null;
        this.updateUI();
    }

    updateUI() {
        const listContainer = document.getElementById("list-container");
        listContainer.innerHTML = "";
        let temp = this.head;

        while (temp) {
            let nodeDiv = document.createElement("div");
            nodeDiv.classList.add("list-node");
            nodeDiv.textContent = temp.value;
            listContainer.appendChild(nodeDiv);

            if (temp.next) {
                let arrow = document.createElement("div");
                arrow.classList.add("arrow");
                arrow.textContent = "→";
                listContainer.appendChild(arrow);
            }
            temp = temp.next;
        }
    }
}

const linkedList = new LinkedList();

function insertAtEnd() {
    let input = document.getElementById("list-input").value;
    if (input) {
        linkedList.insertAtEnd(input);
        document.getElementById("list-input").value = "";
    }
}

function insertAtStart() {
    let input = document.getElementById("list-input").value;
    if (input) {
        linkedList.insertAtStart(input);
        document.getElementById("list-input").value = "";
    }
}

function deleteValue() {
    let input = document.getElementById("list-input").value;
    if (input) {
        linkedList.deleteValue(input);
        document.getElementById("list-input").value = "";
    }
}

function clearList() {
    linkedList.clearList();
}
