const nodes = {};
const edges = [];

const svg = document.getElementById("graph-container");

function addNode() {
    const nodeName = document.getElementById("node-name").value.trim();
    if (!nodeName || nodes[nodeName]) return;

    nodes[nodeName] = { x: Math.random() * 500 + 50, y: Math.random() * 300 + 50 };

    drawGraph();
}

function addEdge() {
    const start = document.getElementById("edge-start").value.trim();
    const end = document.getElementById("edge-end").value.trim();

    if (start && end && nodes[start] && nodes[end] && start !== end) {
        edges.push({ start, end });
        drawGraph();
    }
}

function drawGraph() {
    svg.innerHTML = "";

    // Draw edges
    edges.forEach(({ start, end }) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", nodes[start].x);
        line.setAttribute("y1", nodes[start].y);
        line.setAttribute("x2", nodes[end].x);
        line.setAttribute("y2", nodes[end].y);
        line.setAttribute("stroke", "cyan");
        svg.appendChild(line);
    });

    // Draw nodes
    Object.keys(nodes).forEach(node => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", nodes[node].x);
        circle.setAttribute("cy", nodes[node].y);
        circle.setAttribute("r", 20);
        circle.setAttribute("fill", "cyan");
        circle.setAttribute("stroke", "black");

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", nodes[node].x);
        text.setAttribute("y", nodes[node].y + 5);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "black");
        text.textContent = node;

        svg.appendChild(circle);
        svg.appendChild(text);
    });
}

function runDFS() {
    let startNode = prompt("Enter start node for DFS:");
    if (!nodes[startNode]) return;

    let visited = new Set();
    let stack = [startNode];

    function dfsStep() {
        if (stack.length === 0) return;
        let current = stack.pop();
        if (visited.has(current)) {
            setTimeout(dfsStep, 500);
            return;
        }

        visited.add(current);
        highlightNode(current, "red");

        let neighbors = edges.filter(e => e.start === current || e.end === current)
                             .map(e => e.start === current ? e.end : e.start)
                             .filter(n => !visited.has(n));

        stack.push(...neighbors);
        setTimeout(dfsStep, 500);
    }

    dfsStep();
}

function runBFS() {
    let startNode = prompt("Enter start node for BFS:");
    if (!nodes[startNode]) return;

    let visited = new Set();
    let queue = [startNode];

    function bfsStep() {
        if (queue.length === 0) return;
        let current = queue.shift();
        if (visited.has(current)) {
            setTimeout(bfsStep, 500);
            return;
        }

        visited.add(current);
        highlightNode(current, "green");

        let neighbors = edges.filter(e => e.start === current || e.end === current)
                             .map(e => e.start === current ? e.end : e.start)
                             .filter(n => !visited.has(n));

        queue.push(...neighbors);
        setTimeout(bfsStep, 500);
    }

    bfsStep();
}

function highlightNode(node, color) {
    let circles = svg.querySelectorAll("circle");
    circles.forEach(circle => {
        let text = circle.nextSibling;
        if (text.textContent === node) {
            circle.setAttribute("fill", color);
        }
    });
}
