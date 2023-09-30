import { classic } from "./variations";
import type { Engine } from "src/types";

export default class BlackAndWhiteEngine implements Engine {
  private _variation: any; // Replace 'any' with the actual type of '_variation' if available
  private _gridA: number[][];
  private _gridB: number[][];
  private _tmp: number[][];
  size: number;
  private generation: number;

  constructor(size: number, variation = classic) {
    this._variation = variation;
    this.size = size;
    this._getScore = this._getScore.bind(this);
    this._getScoreSafe = this._getScoreSafe.bind(this);
    this._gridA = [];
    this._gridB = [];
    this.generation = 0;
    this._tmp = [];
  }

  get maxTextureSize() {
    return 6;
  }

  set(x: number, y: number, value: number): void {
    this._gridA[x][y] = value;
  }

  private _generateEmptyGrid(percentageAlive: number): number[][] {
    const grid: number[][] = new Array(this.size);

    for (let i = 0; i < this.size; i++) {
      const row: number[] = new Array(this.size);
      grid[i] = row;
      for (let j = 0; j < this.size; j++) {
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

  initToRandom(percentageAlive?: number) {
    this._gridA = this._generateEmptyGrid(percentageAlive || 50);
    this._gridB = this._generateEmptyGrid(0);
    this.generation = 0;
  }

  initToBlank() {
    this.initToRandom(0);
  }

  inject(x: number, y: number, shape: number[][]) {
    for (let i = 0; i < shape.length; i++) {
      const row = shape[i];
      for (let j = 0; j < row.length; j++) {
        this._gridA[j + x][i + y] = shape[i][j];
      }
    }
  }

  private _safeGet(grid: number[][], x: number, y: number): number {
    return this._getVal(
      grid,
      (x + this.size) % this.size,
      (y + this.size) % this.size
    );
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
      this._getVal(grid, x, y + 1) +
      this._getVal(grid, x, y - 1) +
      this._getVal(grid, x + 1, y) +
      this._getVal(grid, x - 1, y) +
      this._getVal(grid, x + 1, y + 1) +
      this._getVal(grid, x + 1, y - 1) +
      this._getVal(grid, x - 1, y + 1) +
      this._getVal(grid, x - 1, y - 1)
    );
  }

  private _getVal(grid: number[][], x: number, y: number): number {
    return grid[x][y] === 0 ? 0 : 1;
  }

  private _getNextValue(
    grid: number[][],
    x: number,
    y: number,
    getScoreFn: (grid: number[][], x: number, y: number) => number
  ): number {
    const neighbors = getScoreFn(grid, x, y);
    const next = this._variation(neighbors);
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

  draw(imageData: ImageData) {
    for (let i = 0; i < this.size; i++) {
      const row = this._gridA[i];
      for (let j = 0; j < this.size; j++) {
        const index = (i + j * this.size) * 4;

        if (row[j]) {
          imageData.data[index] = 37;
          imageData.data[index + 1] = 168;
          imageData.data[index + 2] = 45;
          imageData.data[index + 3] = 255;
        } else {
          imageData.data[index] = 255;
          imageData.data[index + 1] = 240;
          imageData.data[index + 2] = 237;
          imageData.data[index + 3] = 255;
        }
      }
    }
  }

  toArray(): number[][] {
    return this._gridA;
  }
}
