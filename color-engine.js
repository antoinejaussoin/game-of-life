const numberOfColours = 1000;

export default class ColorEngine {
  constructor(size, canvas) {
    this.size = size;
    if (canvas) {
      const context = canvas.getContext('2d');
      this._imageData = context.getImageData(0, 0, size, size);
    }
    this._deadColours = this._generateColorArray({ r: 127, g: 0, b: 0}, { r: 255, g: 221, b: 221 }, numberOfColours);
    this._aliveColours = this._generateColorArray({ r: 0, g: 127, b: 14}, { r: 201, g: 252, b: 210 }, numberOfColours);
    this._oscilatingAlive = { r: 201, g: 252, b: 210 };
    this._oscilatingDead = { r: 255, g: 221, b: 221 };
    this.init();
  }

  _generateEmptyGrid() {
    const grid = [];

    for(let i = 0; i < this.size; i++) {
        const row = [];
        grid.push(row);
        for(let j = 0; j < this.size; j++) {
            row.push({
                value: Math.random() > 0.8 ? 1 : 0,
                age: 0
            });
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
    return grid[(x + this.size) % this.size][(y + this.size) % this.size].value;
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
    return grid[x][y + 1].value +
        grid[x][y - 1].value +
        grid[x + 1][y].value +
        grid[x - 1][y].value +
        grid[x + 1][y + 1].value +
        grid[x + 1][y - 1].value +
        grid[x - 1][y + 1].value +
        grid[x - 1][y - 1].value;
  }

  _getNextValue(grid, x, y, getScoreFn) {
    const score = getScoreFn(grid, x, y);
    if (score < 2 || score > 3) {
        return 0;
    } else if (score === 3) {
        return 1;
    } else {
        return grid[x][y].value;
    }
  }

  _update(from, to, i, j, next) {
    const age = from[i][j].value === next ? from[i][j].age + 1 : 0;
    to[i][j].age = age;
    to[i][j].osc = age === 0 ? from[i][j].osc + 1 : 0;
    to[i][j].value = next;
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
      data.data[index] = color.r;
      data.data[index + 1] = color.g;
      data.data[index + 2] = color.b;
      data.data[index + 3] = 255;
  }

  _makeGradientColor(color1, color2, percent) {
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

  _generateColorArray(c1, c2, length) {
      const array = [];

      for (let i = 0; i < length; i++) {
          array.push(this._makeGradientColor(c1, c2, (i/length)*100));
      }

      return array;
  }

  get canvasArray() {
    for(let i = 0; i < this.size; i++) {
        const row = this._gridA[i];
        for(let j = 0; j < this.size; j++) {
            const cell = row[j];
            const value = cell.value;
            const isOscillating = cell.osc > 10;
            const age = 
                isOscillating ?
                    (cell.osc < numberOfColours ? cell.osc : numberOfColours - 1) :
                    (cell.age < numberOfColours ? cell.age : numberOfColours - 1);
            const color = value ? this._aliveColours[age] : this._deadColours[age];

            this._setPixel(this._imageData, i, j, color);
        }
    }
    return this._imageData;
  }
}