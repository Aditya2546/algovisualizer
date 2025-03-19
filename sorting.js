const arrayContainer = document.getElementById("array-container");
const speedSlider = document.getElementById("speed-slider");
let array = [];

function generateArray() {
    const input = document.getElementById("array-input").value.trim();
    if (input) {
        array = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    } else {
        array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 300) + 20);
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

async function startSorting() {
    let type = document.getElementById("sort-type").value;
    if (type === "bubble") await bubbleSort();
    else if (type === "selection") await selectionSort();
    else if (type === "insertion") await insertionSort();
    else if (type === "merge") await mergeSort(0, array.length - 1);
    else if (type === "quick") await quickSort(0, array.length - 1);
}

// 🎯 Bubble Sort
async function bubbleSort() {
    let bars = document.querySelectorAll(".bar");
    let delay = speedSlider.value;

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            await new Promise(resolve => setTimeout(resolve, delay));

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            bars[j].style.backgroundColor = "cyan";
            bars[j + 1].style.backgroundColor = "cyan";
        }
        bars[array.length - i - 1].style.backgroundColor = "lime";
    }
    bars[0].style.backgroundColor = "lime";
}

// 🎯 Selection Sort
async function selectionSort() {
    let bars = document.querySelectorAll(".bar");
    let delay = speedSlider.value;

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = "red";
            await new Promise(resolve => setTimeout(resolve, delay));

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }

            bars[j].style.backgroundColor = "cyan";
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[minIndex].style.height = `${array[minIndex]}px`;
        }

        bars[i].style.backgroundColor = "lime";
    }
    bars[array.length - 1].style.backgroundColor = "lime";
}

// 🎯 Insertion Sort
async function insertionSort() {
    let bars = document.querySelectorAll(".bar");
    let delay = speedSlider.value;

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = "red";
        await new Promise(resolve => setTimeout(resolve, delay));

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1]}px`;
            j--;
        }

        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;

        bars[i].style.backgroundColor = "lime";
    }
}

// 🎯 Merge Sort
async function mergeSort(left, right) {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
}

async function merge(left, mid, right) {
    let bars = document.querySelectorAll(".bar");
    let delay = speedSlider.value;
    let temp = [];
    
    let i = left, j = mid + 1;

    while (i <= mid && j <= right) {
        bars[i].style.backgroundColor = "red";
        bars[j].style.backgroundColor = "red";

        await new Promise(resolve => setTimeout(resolve, delay));

        if (array[i] < array[j]) {
            temp.push(array[i++]);
        } else {
            temp.push(array[j++]);
        }
    }

    while (i <= mid) temp.push(array[i++]);
    while (j <= right) temp.push(array[j++]);

    for (let k = left; k <= right; k++) {
        array[k] = temp[k - left];
        bars[k].style.height = `${array[k]}px`;
        bars[k].style.backgroundColor = "lime";
    }
}

// 🎯 Quick Sort
async function quickSort(low, high) {
    if (low < high) {
        let pivotIndex = await partition(low, high);
        await quickSort(low, pivotIndex - 1);
        await quickSort(pivotIndex + 1, high);
    }
}

async function partition(low, high) {
    let bars = document.querySelectorAll(".bar");
    let delay = speedSlider.value;
    let pivot = array[high];
    let i = low - 1;

    bars[high].style.backgroundColor = "yellow";

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = "red";
        await new Promise(resolve => setTimeout(resolve, delay));

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;
        }

        bars[j].style.backgroundColor = "cyan";
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[high].style.height = `${array[high]}px`;

    bars[high].style.backgroundColor = "cyan";
    return i + 1;
}

generateArray();
