const numberOfColours = 1000;

export default class BlackAndWhiteEngine {
  constructor(size, canvas) {
    this.size = size;
    if (canvas) {
      const context = canvas.getContext('2d');
      this._imageData = context.getImageData(0, 0, size, size);
    }
    this.init();
  }
  
  _generateEmptyGrid() {
    const grid = [];
    
    for(let i = 0; i < this.size; i++) {
      const row = [];
      grid.push(row);
      for(let j = 0; j < this.size; j++) {
        row.push(Math.random() > 0.6 ? 1 : 0);
      }
    }
    
    return grid;
  }
  
  init() {
    this._gridA = this._generateEmptyGrid();
    this._gridB = this._generateEmptyGrid();
    this.generation = 0;
  }
  
  _safeGet(grid, x, y) {
    return grid[(x + this.size) % this.size][(y + this.size) % this.size];
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
    return grid[x][y + 1] +
    grid[x][y - 1] +
    grid[x + 1][y] +
    grid[x - 1][y] +
    grid[x + 1][y + 1] +
    grid[x + 1][y - 1] +
    grid[x - 1][y + 1] +
    grid[x - 1][y - 1];
  }
  
  _getNextValue(grid, x, y, getScoreFn) {
    const score = getScoreFn(grid, x, y);
    if (score < 2 || score > 3) {
      return 0;
    } else if (score === 3) {
      return 1;
    } else {
      return grid[x][y];
    }
  }
  
  _update(from, to, i, j, next) {
    to[i][j] = next;
  }
  
  play() {
    const getScore = this._getScore.bind(this);
    const getScoreSafe = this._getScoreSafe.bind(this);
    for(let i = 1; i < this.size - 1; i++) {
      for(let j = 1; j < this.size - 1; j++) {
        const next = this._getNextValue(this._gridA, i, j, getScore);
        this._update(this._gridA, this._gridB, i, j, next);
      }
    }
    
    for(let i = 0; i < this.size; i++) {
      const j = 0;
      const next = this._getNextValue(this._gridA, i, 0, getScoreSafe);
      this._update(this._gridA, this._gridB, i, j, next);
    }
    
    for(let i = 0; i < this.size; i++) {
      const j = this.size - 1;
      const next = this._getNextValue(this._gridA, i, j, getScoreSafe);
      this._update(this._gridA, this._gridB, i, j, next);
    }
    
    for(let j = 1; j < this.size - 1; j++) {
      const i = 0;
      const next = this._getNextValue(this._gridA, i, j, getScoreSafe);
      this._update(this._gridA, this._gridB, i, j, next);
    }
    
    for(let j = 1; j < this.size - 1; j++) {
      const i = this.size - 1;
      const next = this._getNextValue(this._gridA, i, j, getScoreSafe);
      this._update(this._gridA, this._gridB, i, j, next);
    }
    let tmp = this._gridA;
    this._gridA = this._gridB;
    this._gridB = tmp;
    this.generation++;
  }
  
  _setPixel(data, i, j, color) {
    const index = (i + j * this.size) * 4;
    data.data[index] = color[0];
    data.data[index + 1] = color[1];
    data.data[index + 2] = color[2];
    data.data[index + 3] = 255;
  }
  
  get canvasArray() {
    for(let i = 0; i < this.size; i++) {
      const row = this._gridA[i];
      for(let j = 0; j < this.size; j++) {
        const cell = row[j];
        const color = cell ? [255, 255, 255] : [0, 0, 0];
        
        this._setPixel(this._imageData, i, j, color);
      }
    }
    return this._imageData;
  }
}
