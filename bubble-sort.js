const arrayContainer = document.getElementById("array-container");
let array = [];

function generateArray() {
    const input = document.getElementById("array-input").value.trim();

    if (input) {
        // Convert input string into an array of numbers
        array = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    } else {
        // Generate a random array if no input is given
        array = [];
        for (let i = 0; i < 10; i++) {
            array.push(Math.floor(Math.random() * 300) + 20);
        }
    }

    renderArray();
}

function renderArray() {
    arrayContainer.innerHTML = "";
    array.forEach(value => {
        let bar = document.createElement("div");
        bar.style.height = `${value}px`;
        bar.classList.add("bar");
        arrayContainer.appendChild(bar);
    });
}

async function bubbleSort() {
    let bars = document.querySelectorAll(".bar");

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            await new Promise(resolve => setTimeout(resolve, 200)); // Delay for animation

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            bars[j].style.backgroundColor = "cyan";
            bars[j + 1].style.backgroundColor = "cyan";
        }

        bars[array.length - i - 1].style.backgroundColor = "lime"; // Sorted element
    }

    bars[0].style.backgroundColor = "lime"; // Ensure first element is also sorted
}

// Generate default array on page load
generateArray();
