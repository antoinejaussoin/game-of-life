import type { Color, ColorWithCss, Variation } from "src/types";
import { classic } from "./variations";

const numberOfColours: number = 1000;

export default class ColorEngine {
  isWebgl: boolean = false;
  private _fill: number;
  private _variation: any; // Replace 'any' with the actual type of 'variation'
  canvas: HTMLCanvasElement | null;
  private _context: CanvasRenderingContext2D | null;
  size: number;
  private _imageData: ImageData | null;
  private _gridA: { value: number; age: number; osc: number }[][];
  private _gridB: { value: number; age: number; osc: number }[][];
  generation: number;
  private _deadColours: ColorWithCss[];
  private _aliveColours: ColorWithCss[];

  constructor(size: number, fill: number, variation: Variation = classic) {
    this._fill = fill;
    this._variation = variation;
    this.size = size;
    this._deadColours = this._generateColorArray(
      { r: 127, g: 0, b: 0 },
      { r: 255, g: 221, b: 221 },
      numberOfColours
    );
    this._aliveColours = this._generateColorArray(
      { r: 0, g: 127, b: 14 },
      { r: 201, g: 252, b: 210 },
      numberOfColours
    );
    this.canvas = null;
    this._context = null;
    this._imageData = null;
    this._gridA = [];
    this._gridB = [];
    this.generation = 0;
  }

  private _generateEmptyGrid(
    percentageAlive: number
  ): { value: number; age: number; osc: number }[][] {
    const grid: { value: number; age: number; osc: number }[][] = new Array(
      this.size
    );

    for (let i = 0; i < this.size; i++) {
      const row: { value: number; age: number; osc: number }[] = new Array(
        this.size
      );
      grid[i] = row;
      for (let j = 0; j < this.size; j++) {
        row[j] = {
          value: Math.random() > (100 - percentageAlive) / 100 ? 1 : 0,
          age: 0,
          osc: 0,
        };
      }
    }

    return grid;
  }

  register(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    console.log(canvas);
    if (context) {
      context.imageSmoothingEnabled = true;
      canvas.height = this.size;
      canvas.width = this.size;
      this._context = context;
      this._imageData = context.getImageData(0, 0, this.size, this.size);
    }
  }

  initToRandom() {
    this._gridA = this._generateEmptyGrid(this._fill);
    this._gridB = this._generateEmptyGrid(0);
    this.generation = 0;
  }

  initToBlank() {
    this._gridA = this._generateEmptyGrid(0);
    this._gridB = this._generateEmptyGrid(0);
    this.generation = 0;
  }

  inject(x: number, y: number, shape: number[][]) {
    for (let i = 0; i < shape.length; i++) {
      const row = shape[i];
      for (let j = 0; j < row.length; j++) {
        this._gridA[j + x][i + y].value = shape[i][j];
      }
    }
  }

  set(x: number, y: number, value: number) {
    this._gridA[x][y].value = value;
  }

  private _safeGet(
    grid: { value: number; age: number; osc: number }[][],
    x: number,
    y: number
  ): number {
    return grid[(x + this.size) % this.size][(y + this.size) % this.size].value;
  }

  private _getScoreSafe(
    grid: { value: number; age: number; osc: number }[][],
    x: number,
    y: number
  ): number {
    return (
      this._safeGet(grid, x, y + 1) +
      this._safeGet(grid, x, y - 1) +
      this._safeGet(grid, x + 1, y) +
      this._safeGet(grid, x - 1, y) +
      this._safeGet(grid, x + 1, y + 1) +
      this._safeGet(grid, x + 1, y - 1) +
      this._safeGet(grid, x - 1, y + 1) +
      this._safeGet(grid, x - 1, y - 1)
    );
  }

  private _getScore(
    grid: { value: number; age: number; osc: number }[][],
    x: number,
    y: number
  ): number {
    return (
      grid[x][y + 1].value +
      grid[x][y - 1].value +
      grid[x + 1][y].value +
      grid[x - 1][y].value +
      grid[x + 1][y + 1].value +
      grid[x + 1][y - 1].value +
      grid[x - 1][y + 1].value +
      grid[x - 1][y - 1].value
    );
  }

  private _getNextValue(
    grid: { value: number; age: number; osc: number }[][],
    x: number,
    y: number,
    getScoreFn: (
      grid: { value: number; age: number; osc: number }[][],
      x: number,
      y: number
    ) => number
  ): number {
    const neighbours = getScoreFn(grid, x, y);
    const next = this._variation.js(neighbours);
    return next === -1 ? grid[x][y].value : next;
  }

  private _update(
    from: { value: number; age: number; osc: number }[][],
    to: { value: number; age: number; osc: number }[][],
    i: number,
    j: number,
    next: number
  ) {
    const age = from[i][j].value === next ? from[i][j].age + 1 : 0;
    to[i][j].age = age;
    to[i][j].osc = age === 0 ? from[i][j].osc + 1 : 0;
    to[i][j].value = next;
  }

  play() {
    const getScore = this._getScore.bind(this);
    const getScoreSafe = this._getScoreSafe.bind(this);
    for (let i = 1; i < this.size - 1; i++) {
      for (let j = 1; j < this.size - 1; j++) {
        const next = this._getNextValue(this._gridA, i, j, getScore);
        this._update(this._gridA, this._gridB, i, j, next);
      }
    }

    for (let i = 0; i < this.size; i++) {
      const j = 0;
      const next = this._getNextValue(this._gridA, i, 0, getScoreSafe);
      this._update(this._gridA, this._gridB, i, j, next);
    }

    for (let i = 0; i < this.size; i++) {
      const j = this.size - 1;
      const next = this._getNextValue(this._gridA, i, j, getScoreSafe);
      this._update(this._gridA, this._gridB, i, j, next);
    }

    for (let j = 1; j < this.size - 1; j++) {
      const i = 0;
      const next = this._getNextValue(this._gridA, i, j, getScoreSafe);
      this._update(this._gridA, this._gridB, i, j, next);
    }

    for (let j = 1; j < this.size - 1; j++) {
      const i = this.size - 1;
      const next = this._getNextValue(this._gridA, i, j, getScoreSafe);
      this._update(this._gridA, this._gridB, i, j, next);
    }
    let tmp = this._gridA;
    this._gridA = this._gridB;
    this._gridB = tmp;
    this.generation++;
  }

  private _setPixel(data: ImageData, i: number, j: number, color: Color) {
    const index = (i + j * this.size) * 4;
    data.data[index] = color.r;
    data.data[index + 1] = color.g;
    data.data[index + 2] = color.b;
    data.data[index + 3] = 255;
  }

  private _makeGradientColor(color1: Color, color2: Color, percent: number) {
    var newColor: { r: number; g: number; b: number; cssColor: string } = {
      r: 0,
      g: 0,
      b: 0,
      cssColor: "",
    };

    function makeChannel(a: number, b: number): number {
      return a + Math.round((b - a) * (percent / 100));
    }

    function makeColorPiece(num: number): string {
      num = Math.min(num, 255); // not more than 255
      num = Math.max(num, 0); // not less than 0
      var str = num.toString(16);
      if (str.length < 2) {
        str = "0" + str;
      }
      return str;
    }

    newColor.r = makeChannel(color1.r, color2.r);
    newColor.g = makeChannel(color1.g, color2.g);
    newColor.b = makeChannel(color1.b, color2.b);
    newColor.cssColor =
      "#" +
      makeColorPiece(newColor.r) +
      makeColorPiece(newColor.g) +
      makeColorPiece(newColor.b);
    return newColor;
  }

  private _generateColorArray(
    c1: Color,
    c2: Color,
    length: number
  ): ColorWithCss[] {
    const array: { r: number; g: number; b: number; cssColor: string }[] = [];

    for (let i = 0; i < length; i++) {
      array.push(this._makeGradientColor(c1, c2, (i / length) * 100));
    }

    return array;
  }

  draw() {
    for (let i = 0; i < this.size; i++) {
      const row = this._gridA[i];
      for (let j = 0; j < this.size; j++) {
        const cell = row[j];
        const value = cell.value;
        const isOscillating = cell.osc > 10;
        const age = isOscillating
          ? cell.osc < numberOfColours
            ? cell.osc
            : numberOfColours - 1
          : cell.age < numberOfColours
          ? cell.age
          : numberOfColours - 1;
        const color = value ? this._aliveColours[age] : this._deadColours[age];

        this._setPixel(this._imageData!, i, j, color);
      }
    }
    this._context?.putImageData(this._imageData!, 0, 0);
  }

  toArray(): number[][] {
    return this._gridA.map((row) => row.map((cell) => cell.value));
  }
}
