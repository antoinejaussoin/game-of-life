import { classic } from '../variations';
import GOL from './gol';

export default class WebGlEngine {
  isWebgl = true;

  constructor(size, fill, variation = classic) {
    this._fill = fill;
    this._variation = variation;
    this.size = Math.pow(2, Math.ceil(Math.log(size)/Math.log(2)));;
  }
  
  initToRandom() {
    this.gol.setRandom(this._fill / 100);
    this.generation = 0;
  }

  initToBlank() {
    this.gol.setEmpty();
  }

  register(canvas) {
      this.canvas = canvas;
      canvas.height = this.size;
      canvas.width = this.size;
      this.gol = new GOL(canvas, 1, this._variation);
  }

  inject(x, y, shape) {
    for(let i = 0; i < shape.length; i++) {
      const row = shape[i];
      for(let j = 0; j < row.length; j++) {
        this.gol.poke(j + x, this.size - (i + y), shape[i][j]);
      }
    }
  }
  
  
  play() {
    this.gol.step();
    this.generation++;
  }
  
  draw() {
    this.gol.draw();
  }

  toArray() {
    return this._gridA;
  }
}
