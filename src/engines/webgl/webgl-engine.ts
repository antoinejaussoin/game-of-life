import type { Board, Engine, EngineType, Variation } from "src/types";
import { classic } from "../variations";
import GOL from "./gol";

const aliveColour = { r: 70, g: 142, b: 64 };
const deadColour = { r: 252, g: 209, b: 209 };

export default class WebGlEngine implements Engine {
  isWebgl = true;
  private _fill: number;
  _variation: Variation;
  size: number;
  gol: GOL | null;
  generation: number;
  canvas: HTMLCanvasElement | null;

  constructor(size: number, fill: number, variation = classic) {
    this._fill = fill;
    this._variation = variation;
    this.size = Math.pow(2, Math.ceil(Math.log(size) / Math.log(2)));
    this.gol = null;
    this.generation = 0;
    this.canvas = null;
  }

  get type() {
    return "webgl" as EngineType;
  }

  initToRandom() {
    if (this.gol) {
      this.gol.setRandom(this._fill / 100);
      this.generation = 0;
    }
  }

  initToBlank() {
    if (this.gol) {
      this.gol.setEmpty();
    }
  }

  register(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.height = this.size;
    canvas.width = this.size;
    this.gol = new GOL(
      canvas,
      1,
      this._variation,
      false,
      aliveColour,
      deadColour
    );
  }

  inject(x: number, y: number, shape: Board) {
    if (this.gol) {
      for (let i = 0; i < shape.length; i++) {
        const row = shape[i];
        for (let j = 0; j < row.length; j++) {
          this.gol.poke(j + x, this.size - (i + y), shape[i][j]);
        }
      }
    }
  }

  set(x: number, y: number, value: number) {
    if (this.gol) {
      this.gol.poke(x, y, value);
    }
  }

  play() {
    if (this.gol) {
      this.gol.step();
      this.generation++;
    }
  }

  draw() {
    if (this.gol) {
      this.gol.draw();
    }
  }

  toArray() {
    if (this.gol) {
      return this.gol.toArray();
    }
  }

  get maxTextureSize() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
      return 6;
    }
    return Math.log2(gl.getParameter(gl.MAX_TEXTURE_SIZE) / 2);
  }
}
