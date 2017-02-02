const size = 1000;
const numberOfColours = 500;

const canvas = document.getElementById('board');
canvas.className = "board";
canvas.height = size;
canvas.width = size;
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
const imageData = context.getImageData(0, 0, size, size);


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
        array.push(makeGradientColor(c1, c2, (i/length)*100));
    }

    return array;
}

const deadColours = generateColorArray({ r: 127, g: 0, b: 0}, { r: 255, g: 221, b: 221 }, numberOfColours);
const aliveColours = generateColorArray({ r: 0, g: 127, b: 14}, { r: 201, g: 252, b: 210 }, numberOfColours);

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

const getScoreSafe = (grid, x, y) => {
    return safeGet(grid, x, y + 1) +
        safeGet(grid, x, y - 1) +
        safeGet(grid, x + 1, y) +
        safeGet(grid, x - 1, y) +
        safeGet(grid, x + 1, y + 1) +
        safeGet(grid, x + 1, y - 1) +
        safeGet(grid, x - 1, y + 1) +
        safeGet(grid, x - 1, y - 1);
}

const getScore = (grid, x, y) => {
    return grid[x][y + 1].value +
        grid[x][y - 1].value +
        grid[x + 1][y].value +
        grid[x - 1][y].value +
        grid[x + 1][y + 1].value +
        grid[x + 1][y - 1].value +
        grid[x - 1][y + 1].value +
        grid[x - 1][y - 1].value;
}

const getNextValue = (grid, x, y, getScoreFn) => {
    const score = getScoreFn(grid, x, y);
    if (score < 2 || score > 3) {
        return 0;
    } else if (score === 3) {
        return 1;
    } else {
        return grid[x][y].value;
    }
}

const play = (from, to) => {
    for(let i = 1; i < size - 1; i++) {
        for(let j = 1; j < size - 1; j++) {
            const next = getNextValue(from, i, j, getScore);
            to[i][j].age = from[i][j].value === next ? from[i][j].age + 1 : 0;
            to[i][j].value = next;
        }
    }

    for(let i = 0; i < size; i++) {
        const j = 0;
        const next = getNextValue(from, i, 0, getScoreSafe);
        to[i][0].age = from[i][0].value === next ? from[i][0].age + 1 : 0;
        to[i][0].value = next;
    }

    for(let i = 0; i < size; i++) {
        const j = size - 1;
        const next = getNextValue(from, i, j, getScoreSafe);
        to[i][j].age = from[i][j].value === next ? from[i][j].age + 1 : 0;
        to[i][j].value = next;
    }

    for(let j = 1; j < size - 1; j++) {
        const i = 0;
        const next = getNextValue(from, i, j, getScoreSafe);
        to[i][j].age = from[i][j].value === next ? from[i][j].age + 1 : 0;
        to[i][j].value = next;
    }

    for(let j = 1; j < size - 1; j++) {
        const i = size - 1;
        const next = getNextValue(from, i, j, getScoreSafe);
        to[i][j].age = from[i][j].value === next ? from[i][j].age + 1 : 0;
        to[i][j].value = next;
    }
    
}

const setPixel = (data, i, j, color) => {
    const index = (i + j * size) * 4;
    data.data[index] = color.r;
    data.data[index + 1] = color.g;
    data.data[index + 2] = color.b;
    data.data[index + 3] = 255;
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

            setPixel(imageData, i, j, color);
        }
    }
    context.putImageData(imageData, 0, 0);
}

let gridA = generateEmptyGrid(size);
let gridB = generateEmptyGrid(size);

const next = () => {
    displayCanvas(gridA);
    play(gridA, gridB);
    let tmp = gridA;
    gridA = gridB;
    gridB = tmp;
    window.requestAnimationFrame(next);
}

document.getElementById('btn').onclick = next;

//window.requestAnimationFrame(next);