import { classic } from './variations';

export default class BlackAndWhiteEngine {
  constructor(size, variation = classic) {
    this._variation = variation;
    this.size = size;
    this._getScore = this._getScore.bind(this);
    this._getScoreSafe = this._getScoreSafe.bind(this);
  }
  
  _generateEmptyGrid(percentageAlive) {
    const grid = new Array(this.size);
    
    for(let i = 0; i < this.size; i++) {
      const row = new Array(this.size);
      grid[i] = row;
      for(let j = 0; j < this.size; j++) {
        const rnd = Math.random() * 100;
        if (rnd < percentageAlive) {
          row[j] = rnd < 5 ? 2 : 1;
        } else {
          row[j] = 0;
        }
      }
    }
    
    return grid;
  }
  
  initToRandom(percentageAlive) {
    this._gridA = this._generateEmptyGrid(percentageAlive);
    this._gridB = this._generateEmptyGrid(0);
    this.generation = 0;
  }

  initToBlank() {
    this.initToRandom(0);
  }

  inject(x, y, shape) {
    for(let i = 0; i < shape.length; i++) {
      const row = shape[i];
      for(let j = 0; j < row.length; j++) {
        this._gridA[j + x][i + y] = shape[i][j];
      }
    }
  }
  
  _safeGet(grid, x, y) {
    return this._getVal(grid, (x + this.size) % this.size, (y + this.size) % this.size);
  }

  _getScoreSafe(grid, x, y) {
    return this._safeGet(grid, x, y + 1) +
    this._safeGet(grid, x, y - 1) +
    this._safeGet(grid, x + 1, y) +
    this._safeGet(grid, x - 1, y) +
    this._safeGet(grid, x + 1, y + 1) +
    this._safeGet(grid, x + 1, y - 1) +
    this._safeGet(grid, x - 1, y + 1) +
    this._safeGet(grid, x - 1, y - 1);
  }
  
  _getScore(grid, x, y) {
    return this._getVal(grid, x, y + 1) +
    this._getVal(grid, x, y - 1) +
    this._getVal(grid, x + 1, y) +
    this._getVal(grid, x - 1, y) +
    this._getVal(grid, x + 1, y + 1) +
    this._getVal(grid, x + 1, y - 1) +
    this._getVal(grid, x - 1, y + 1) +
    this._getVal(grid, x - 1, y - 1);
  }

  _getVal(grid, x, y) {
    return grid[x][y] === 0 ? 0 : 1;
  }
  
  _getNextValue(grid, x, y, getScoreFn) {
    const neighbours = getScoreFn(grid, x, y);
    const next = this._variation(neighbours);
    return next === -1 ? grid[x][y] : next;
  }
  
  play() {
    const size = this.size;
    for(let i = 1; i < size - 1; i++) {
      for(let j = 1; j < size - 1; j++) {
        this._gridB[i][j] = this._getNextValue(this._gridA, i, j, this._getScore);
      }
    }
    
    for(let i = 0; i < size; i++) {
      const j = 0;
      this._gridB[i][j] = this._getNextValue(this._gridA, i, 0, this._getScoreSafe);
    }
    
    for(let i = 0; i < size; i++) {
      const j = size - 1;
      this._gridB[i][j] = this._getNextValue(this._gridA, i, j, this._getScoreSafe);
    }
    
    for(let j = 1; j < size - 1; j++) {
      const i = 0;
      this._gridB[i][j] = this._getNextValue(this._gridA, i, j, this._getScoreSafe);
    }
    
    for(let j = 1; j < size - 1; j++) {
      const i = size - 1;
      this._gridB[i][j] = this._getNextValue(this._gridA, i, j, this._getScoreSafe);
    }
    this._tmp = this._gridA;
    this._gridA = this._gridB;
    this._gridB = this._tmp;
    this.generation++;
  }
  
  draw(imageData) {
    for(let i = 0; i < this.size; i++) {
      const row = this._gridA[i];
      for(let j = 0; j < this.size; j++) {
        const index = (i + j * this.size) * 4;

        if (row[j]) {
          imageData.data[index]     = 37;
          imageData.data[index + 1] = 168;
          imageData.data[index + 2] = 45;
          imageData.data[index + 3] = 255;
        } else {
          imageData.data[index]     = 255;
          imageData.data[index + 1] = 240;
          imageData.data[index + 2] = 237;
          imageData.data[index + 3] = 255;
        }
      }
    }
  }

  toArray() {
    return this._gridA;
  }
}
