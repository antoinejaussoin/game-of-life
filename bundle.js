'use strict';

const classic = (neighbours) => {
  if (neighbours < 2 || neighbours > 3) {
    return 0;
  } else if (neighbours === 3) {
    return 1;
  } else {
    return -1;
  }
};

const highLife = (neighbours) => {
  if (neighbours === 3 || neighbours === 6) {
    return 1;
  } else if (neighbours === 2) {
    return -1;
  } else {
    return 0;
  }
};

class BlackAndWhiteEngine {
  constructor(size, imageData, variation = classic) {
    this._variation = variation;
    this.size = size;
    this._imageData = imageData || [];
    this._getScore = this._getScore.bind(this);
    this._getScoreSafe = this._getScoreSafe.bind(this);
  }
  
  _generateEmptyGrid(percentageAlive) {
    const grid = new Array(this.size);
    
    for(let i = 0; i < this.size; i++) {
      const row = new Array(this.size);
      grid[i] = row;
      for(let j = 0; j < this.size; j++) {
        row[j] = Math.random() > (100 - percentageAlive)/100 ? 1 : 0;
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
  
  draw() {
    for(let i = 0; i < this.size; i++) {
      const row = this._gridA[i];
      for(let j = 0; j < this.size; j++) {
        const index = (i + j * this.size) * 4;

        if (row[j]) {
          this._imageData.data[index]     = 37;
          this._imageData.data[index + 1] = 168;
          this._imageData.data[index + 2] = 45;
          this._imageData.data[index + 3] = 255;
        } else {
          this._imageData.data[index]     = 255;
          this._imageData.data[index + 1] = 240;
          this._imageData.data[index + 2] = 237;
          this._imageData.data[index + 3] = 255;
        }
      }
    }
  }

  toArray() {
    return this._gridA;
  }
}

const blank = (width, height) => {
  const grid = [];

  for(let i = 0; i < height; i++) {
    const row = [];
    grid.push(row);
    for(let j = 0; j < width; j++) {
      row.push(0);
    }
  }
  
  return grid;
};

(function(){
  var script=document.createElement('script');
  script.onload=function(){
      var stats=new Stats();
      const counterDiv = document.getElementById('counter');
      counterDiv.appendChild(stats.dom);
      stats.dom.style.position = 'relative';
  stats.dom.style.float = 'right';
      requestAnimationFrame(function loop(){
          stats.update();
          requestAnimationFrame(loop);});
  };
  script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);
})();

function relMouseCoords(event){
  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var canvasX = 0;
  var canvasY = 0;
  var currentElement = this;

  do {
      totalOffsetX += currentElement.offsetLeft;
      totalOffsetY += currentElement.offsetTop;
  }
  while (currentElement = currentElement.offsetParent)

  canvasX = event.pageX - totalOffsetX;
  canvasY = event.pageY - totalOffsetY;

  // Fix for variable canvas width
  canvasX = Math.round( canvasX * (this.width / this.offsetWidth) );
  canvasY = Math.round( canvasY * (this.height / this.offsetHeight) );

  return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

const size = 1000;

// HTML stuff
const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
const imageData = context.getImageData(0, 0, size, size);
const generationLabel = document.getElementById('generation');
canvas.className = "board";
canvas.height = size;
canvas.width = size;

const engine = new BlackAndWhiteEngine(size, imageData, highLife);
engine.initToRandom(3);
//engine.inject(1, 1, blank(size - 2, size - 2));

canvas.addEventListener('click', event => {
    console.log('Event: ', event);
    const cooords = canvas.relMouseCoords(event);
    engine.inject(cooords.x, cooords.y, blank(100, 100));
    displayCanvas();
});

const displayCanvas = () => {
    engine.draw();
    context.putImageData(imageData, 0, 0);
};

const updateGenerationLabel = () => {
    generationLabel.innerText = engine.generation;
};

displayCanvas();

const next = () => {
    displayCanvas();
    engine.play();
    updateGenerationLabel();
    window.requestAnimationFrame(next);
};

document.getElementById('btn').onclick = next;
