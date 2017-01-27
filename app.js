const root = document.getElementById('node');
root.className = "grid";

const generateEmptyGrid = size => {
    const grid = [];

    for(let i = 0; i < size; i++) {
        const row = [];
        grid.push(row);
        for(let j = 0; j < size; j++) {
            row.push(Math.random() > 0.8 ? 1 : 0);
        }
    }

    // grid[3][2] = 1;
    // grid[3][3] = 1;
    // grid[3][4] = 1;

    // grid[10][10] = 1;
    // grid[10][11] = 1;
    // grid[11][10] = 1;
    // grid[11][11] = 1;

    return grid;
}

const safeGet = (grid, x, y) => {
    let actualX;
    let actualY;

    if (x < 0) {
        actualX = grid.length - 1;
    } else if (x === grid.length) {
        actualX = 0;
    } else {
        actualX = x;
    }

    if (y < 0) {
        actualY = grid.length - 1;
    } else if (y === grid.length) {
        actualY = 0;
    } else {
        actualY = y;
    }

    return grid[actualX][actualY];
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
    if (x === 2 && y === 3) {
        console.log('Score: ', score);
    }
    if (score < 2) {
        return 0;
    } else if (score > 3) {
        return 0;
    } else if (score === 3) {
        return 1;
    } else {
        return grid[x][y];
    }
}

const play = (from, to) => {
    for(let i = 0; i < from.length; i++) {
        for(let j = 0; j < from.length; j++) {
            to[i][j] = getNextValue(from, i, j);
        }
    }
}

const displayGrid = grid => {
    root.innerHTML = '';
    for(let i = 0; i < grid.length; i++) {
        const row = grid[i];
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        root.appendChild(rowElement);
        for(let j = 0; j < grid.length; j++) {
            const cell = row[j];
            const cellElement = document.createElement('div');
            cellElement.className = 'cell ' + (cell ? 'alive': 'dead');
            // cellElement.innerText = getScore(grid, i, j);
            rowElement.appendChild(cellElement);
        }
    }
}


const size = 50;

let gridA = generateEmptyGrid(size);
let gridB = generateEmptyGrid(size);

const next = () => {
    displayGrid(gridA);
    play(gridA, gridB);
    let tmp = gridA;
    gridA = gridB;
    gridB = tmp;
}

setInterval(() => {
    next();
}, 15);

document.getElementById('btn').onclick = next;
displayGrid(gridA);
// displayGrid(grid);