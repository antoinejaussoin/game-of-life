const size = 100;
const canvasSize = 100;
const numberOfColours = 50;


const root = document.getElementById('node');
root.className = "grid";

const canvas = document.getElementById('board');
canvas.className = "board";
canvas.height = size;
canvas.width = size;
const context = canvas.getContext('2d');
context.imageSmoothingEnabled= false;
// context.translate(0.5, 0.5);


function makeGradientColor(color1, color2, percent) {
    var newColor = {};

    function makeChannel(a, b) {
        return(a + Math.round((b-a)*(percent/100)));
    }

    function makeColorPiece(num) {
        num = Math.min(num, 255);   // not more than 255
        num = Math.max(num, 0);     // not less than 0
        var str = num.toString(16);
        if (str.length < 2) {
            str = "0" + str;
        }
        return(str);
    }

    newColor.r = makeChannel(color1.r, color2.r);
    newColor.g = makeChannel(color1.g, color2.g);
    newColor.b = makeChannel(color1.b, color2.b);
    newColor.cssColor = "#" + 
                        makeColorPiece(newColor.r) + 
                        makeColorPiece(newColor.g) + 
                        makeColorPiece(newColor.b);
    return(newColor);
}

const generateColorArray = (c1, c2, length) => {
    const array = [];

    for (let i = 0; i < length; i++) {
        array.push(makeGradientColor(c1, c2, (i/length)*100).cssColor);
    }

    return array;
}

const deadColours = generateColorArray({ r: 127, g: 0, b: 0}, { r: 255, g: 221, b: 221 }, numberOfColours);
const aliveColours = generateColorArray({ r: 0, g: 127, b: 14}, { r: 231, g: 255, b: 221 }, numberOfColours);

const generateEmptyGrid = size => {
    const grid = [];

    for(let i = 0; i < size; i++) {
        const row = [];
        grid.push(row);
        for(let j = 0; j < size; j++) {
            row.push({
                value: Math.random() > 0.8 ? 1 : 0,
                age: 0
            });
        }
    }

    return grid;
}

const safeGet = (grid, x, y) => {
    let actualX;
    let actualY;

    if (x < 0) {
        actualX = size - 1;
    } else if (x === size) {
        actualX = 0;
    } else {
        actualX = x;
    }

    if (y < 0) {
        actualY = size - 1;
    } else if (y === size) {
        actualY = 0;
    } else {
        actualY = y;
    }

    return grid[actualX][actualY].value;
}

const getScore = (grid, x, y) => {
    return safeGet(grid, x, y + 1) +
        safeGet(grid, x, y - 1) +
        safeGet(grid, x + 1, y) +
        safeGet(grid, x - 1, y) +
        safeGet(grid, x + 1, y + 1) +
        safeGet(grid, x + 1, y - 1) +
        safeGet(grid, x - 1, y + 1) +
        safeGet(grid, x - 1, y - 1);
}

const getNextValue = (grid, x, y) => {
    const score = getScore(grid, x, y);
    if (score < 2) {
        return 0;
    } else if (score > 3) {
        return 0;
    } else if (score === 3) {
        return 1;
    } else {
        return grid[x][y].value;
    }
}

const play = (from, to) => {
    for(let i = 0; i < from.length; i++) {
        for(let j = 0; j < from.length; j++) {
            const next = getNextValue(from, i, j);
            to[i][j].age = from[i][j].value === next ? from[i][j].age + 1 : 0;
            to[i][j].value = next;
        }
    }
}

const nodes = [];

const createHtml = size => {
    root.innerHTML = '';
    for(let i = 0; i < size; i++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        root.appendChild(rowElement);
        nodes.push([]);
        for(let j = 0; j < size; j++) {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.onclick = () => {
                gridA[i][j].value = gridA[i][j].value === 0 ? 1 : 0;
                gridA[i][j].age = 0;
            }
            rowElement.appendChild(cellElement);
            nodes[i][j] = cellElement;
        }
    }
}

const displayGrid = grid => {
    for(let i = 0; i < size; i++) {
        const row = grid[i];
        const rowNodes = nodes[i];
        for(let j = 0; j < size; j++) {
            const cell = row[j];
            const value = cell.value;
            const age = cell.age < numberOfColours ? cell.age : numberOfColours;
            const cellElement = rowNodes[j];
            cellElement.style.backgroundColor = value ? aliveColours[age] : deadColours[age];
        }
    }
}

const displayCanvas = grid => {
    const renderArray = {};
    
    for(let i = 0; i < size; i++) {
        const row = grid[i];
        for(let j = 0; j < size; j++) {
            const cell = row[j];
            const value = cell.value;
            const age = cell.age < numberOfColours ? cell.age : numberOfColours - 1;
            const color = value ? aliveColours[age] : deadColours[age];

            if (!renderArray[color]) {
                renderArray[color] = [];
            }

            renderArray[color].push({i, j});
        }
    }

    const keys = Object.keys(renderArray);

    for (let x = 0; x < keys.length; x++) {
        const colour = keys[x];
        const cells = renderArray[colour];
        context.fillStyle = colour;
        for (let y = 0; y < cells.length; y++) {
            const { i, j } = cells[y];
            context.fillRect(
                i/size * canvasSize,
                j/size * canvasSize,
                1, 1);
        }
    }
}

let gridA = generateEmptyGrid(size);
let gridB = generateEmptyGrid(size);
createHtml(size);

const next = () => {
    // displayGrid(gridA);
    displayCanvas(gridA);
    play(gridA, gridB);
    let tmp = gridA;
    gridA = gridB;
    gridB = tmp;
    window.requestAnimationFrame(next);
}

// setInterval(() => {
//     next();
// }, 150);

document.getElementById('btn').onclick = next;
displayGrid(gridA);
// displayGrid(grid);

window.requestAnimationFrame(next);