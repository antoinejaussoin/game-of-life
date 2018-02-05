import { classic } from '../variations';
import GOL from './gol';
import WebGlEngine from './webgl-engine';

const aliveColour = { r: 70, g: 142, b: 64 };
const deadColour = { r: 244, g: 86, b: 66 };

export default class WebGlColorEngine extends WebGlEngine {
  register(canvas) {
      this.canvas = canvas;
      canvas.height = this.size;
      canvas.width = this.size;
      this.gol = new GOL(canvas, 1, this._variation, true, aliveColour, deadColour);
  }
}
