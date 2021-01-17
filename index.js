// Creates an NxN grid of div elements
function makeGrid() {
    for(let i = 0; i < n*n; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        // cell.style.border = (gridOn) ? 'border: 1px solid grey' : 'border: none';
        cell.style.cssText = (gridOn) ? `flex: 1 1 calc(${100 / n}% - 2px); border: 1px solid grey` : `flex: 1 1 ${100 / n}%; border: none`;
        grid.appendChild(cell);
    }
}

function removeCells() {
    while(grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function createListeners() {
    // When mouse hovers over a cell, color changes
    cells.forEach(cell => cell.addEventListener('mouseenter', function(e) {
        let color;
        if(colorMode === 'black') {
            color = 'black';
        } else if(colorMode === 'random') {
            const r = Math.round(Math.random() * 1000 % 255);
            const g = Math.round(Math.random() * 1000 % 255);
            const b = Math.round(Math.random() * 1000 % 255);
            color = `rgb(${r}, ${g}, ${b})`;
        } else if(colorMode === 'eraser') {
            color = 'white';
        }
        
        this.style.backgroundColor = color;
    }));
}

function initGrid() {
    cells.forEach(cell => cell.style.backgroundColor = 'white');
    // n = Number(prompt("Enter a value between 1-100"));
    removeCells();
    makeGrid();
    cells = document.querySelectorAll('.cell');
    createListeners();
}

const grid = document.querySelector('#grid');
const clearBtn = document.querySelector('#clear');
const randomBtn = document.querySelector('#random');
const blackBtn = document.querySelector('#black');
const eraserBtn = document.querySelector('#eraser');
const gridBtn = document.querySelector('#gridtoggle');
const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('#sliderValue');
let n = 16;
let colorMode = 'black';
let gridOn = false;

sliderValue.textContent = n;
makeGrid();
let cells = document.querySelectorAll('.cell');
createListeners();

clearBtn.addEventListener('click', function(e) {
    cells.forEach(cell => cell.style.backgroundColor = 'white');
});

randomBtn.addEventListener('click', function() {
    colorMode = 'random';
});

blackBtn.addEventListener('click', function() {
    colorMode = 'black';
});

eraserBtn.addEventListener('click', function() {
    colorMode = 'eraser';
});

gridBtn.addEventListener('click', function(e) {
    gridOn = !gridOn;
    if(gridOn) {
        this.textContent = "Grid Off";
        cells.forEach(cell => cell.style.cssText = `flex: 1 1 calc(${100 / n}% - 2px); border: 1px solid grey`);
    } else {
        this.textContent = "Grid On";
        cells.forEach(cell => cell.style.cssText = `flex: 1 1 ${100 / n}%; border: none`);
    }
});

slider.addEventListener('input', function(e) {
    n = this.value;
    sliderValue.textContent = n;
    initGrid();
});
