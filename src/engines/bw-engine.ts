import type { Engine, EngineType, Variation } from "src/types";
import { classic } from "./variations";

export default class BlackAndWhiteEngine implements Engine {
  isWebgl: boolean = false;
  private _variation: Variation;
  private _fill: number;
  canvas: HTMLCanvasElement | null;
  private _context: CanvasRenderingContext2D | null;
  size: number;
  private _imageData: ImageData | null;
  private _gridA: number[][];
  private _gridB: number[][];
  generation: number;
  private _tmp: number[][];

  constructor(size: number, fill: number, variation: Variation = classic) {
    this._variation = variation;
    this._fill = fill;
    this.size = size;
    this._getScore = this._getScore.bind(this);
    this._getScoreSafe = this._getScoreSafe.bind(this);
    this.canvas = null;
    this._context = null;
    this._imageData = null;
    this._gridA = [];
    this._gridB = [];
    this.generation = 0;
    this._tmp = [];
  }
  get maxTextureSize() {
    return 8;
  }

  get type() {
    return "2d" as EngineType;
  }

  private _generateEmptyGrid(percentageAlive: number): number[][] {
    const grid: number[][] = new Array(this.size);

    for (let i = 0; i < this.size; i++) {
      const row: number[] = new Array(this.size);
      grid[i] = row;
      for (let j = 0; j < this.size; j++) {
        row[j] = Math.random() > (100 - percentageAlive) / 100 ? 1 : 0;
      }
    }

    return grid;
  }

  register(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (context) {
      console.log(canvas);
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
        this._gridA[j + x][i + y] = shape[i][j];
      }
    }
  }

  set(x: number, y: number, value: number) {
    this._gridA[x][y] = value;
  }

  private _safeGet(grid: number[][], x: number, y: number): number {
    return grid[(x + this.size) % this.size][(y + this.size) % this.size];
  }

  private _getScoreSafe(grid: number[][], x: number, y: number): number {
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

  private _getScore(grid: number[][], x: number, y: number): number {
    return (
      grid[x][y + 1] +
      grid[x][y - 1] +
      grid[x + 1][y] +
      grid[x - 1][y] +
      grid[x + 1][y + 1] +
      grid[x + 1][y - 1] +
      grid[x - 1][y + 1] +
      grid[x - 1][y - 1]
    );
  }

  private _getNextValue(
    grid: number[][],
    x: number,
    y: number,
    getScoreFn: (grid: number[][], x: number, y: number) => number
  ): number {
    const neighbors = getScoreFn(grid, x, y);
    const next = this._variation.js(neighbors);
    return next === -1 ? grid[x][y] : next;
  }

  play() {
    const size = this.size;
    for (let i = 1; i < size - 1; i++) {
      for (let j = 1; j < size - 1; j++) {
        this._gridB[i][j] = this._getNextValue(
          this._gridA,
          i,
          j,
          this._getScore
        );
      }
    }

    for (let i = 0; i < size; i++) {
      const j = 0;
      this._gridB[i][j] = this._getNextValue(
        this._gridA,
        i,
        0,
        this._getScoreSafe
      );
    }

    for (let i = 0; i < size; i++) {
      const j = size - 1;
      this._gridB[i][j] = this._getNextValue(
        this._gridA,
        i,
        j,
        this._getScoreSafe
      );
    }

    for (let j = 1; j < size - 1; j++) {
      const i = 0;
      this._gridB[i][j] = this._getNextValue(
        this._gridA,
        i,
        j,
        this._getScoreSafe
      );
    }

    for (let j = 1; j < size - 1; j++) {
      const i = size - 1;
      this._gridB[i][j] = this._getNextValue(
        this._gridA,
        i,
        j,
        this._getScoreSafe
      );
    }
    this._tmp = this._gridA;
    this._gridA = this._gridB;
    this._gridB = this._tmp;
    this.generation++;
  }

  draw() {
    if (this._imageData) {
      for (let i = 0; i < this.size; i++) {
        const row = this._gridA[i];
        for (let j = 0; j < this.size; j++) {
          const index = (i + j * this.size) * 4;

          if (row[j]) {
            this._imageData.data[index] = 37;
            this._imageData.data[index + 1] = 168;
            this._imageData.data[index + 2] = 45;
            this._imageData.data[index + 3] = 255;
          } else {
            this._imageData.data[index] = 255;
            this._imageData.data[index + 1] = 240;
            this._imageData.data[index + 2] = 237;
            this._imageData.data[index + 3] = 255;
          }
        }
      }
      this._context?.putImageData(this._imageData, 0, 0);
    }
  }

  toArray(): number[][] {
    return this._gridA;
  }
}
