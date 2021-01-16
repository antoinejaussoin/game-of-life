// This is a modified version of https://github.com/skeeto/webgl-game-of-life

import Igloo from "./igloo";
import quadVert from "./glsl/quad.vert";
import copyFrag from "./glsl/copy.frag";
import golFrag from "./glsl/gol.frag";
import type { Board, Colour, Variation, WebGlBoard } from "src/types";

export default class GOL {
  aliveColour: Colour;
  deadColour: Colour;
  igloo: any;
  scale: number;
  viewsize: Float32Array;
  statesize: Float32Array;
  programs: any;
  textures: any;
  buffers: any;
  framebuffers: any;
  constructor(
    canvas: HTMLCanvasElement,
    scale: number,
    variation: Variation,
    useAge: boolean,
    aliveColour: Colour,
    deadColour: Colour
  ) {
    this.aliveColour = aliveColour;
    this.deadColour = deadColour;
    // @ts-ignore
    var igloo = (this.igloo = new Igloo(canvas) as any);
    var gl = igloo.gl;
    if (gl == null) {
      alert("Could not initialize WebGL!");
      throw new Error("No WebGL");
    }
    scale = this.scale = scale || 4;
    var w = canvas.width,
      h = canvas.height;
    this.viewsize = new Float32Array([w, h]);
    this.statesize = new Float32Array([w / scale, h / scale]);

    gl.disable(gl.DEPTH_TEST);
    this.programs = {
      copy: igloo.program(quadVert, copyFrag),
      gol: igloo.program(
        quadVert,
        golFrag(variation.webGl, deadColour, aliveColour, useAge)
      ),
    };
    this.buffers = {
      quad: igloo.array(Igloo.QUAD2),
    };
    this.textures = {
      front: igloo
        .texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
        .blank(this.statesize[0], this.statesize[1]),
      back: igloo
        .texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
        .blank(this.statesize[0], this.statesize[1]),
    };
    this.framebuffers = {
      step: igloo.framebuffer(),
    };
  }

  /**
   * Set the entire simulation state at once.
   * @param {Object} state Boolean array-like
   * @returns {GOL} this
   */
  set(state: WebGlBoard) {
    var rgba = new Uint8Array(this.statesize[0] * this.statesize[1] * 4);
    for (var i = 0; i < state.length; i++) {
      var ii = i * 4;
      const colour = state[i] ? this.aliveColour : this.deadColour;
      rgba[ii] = colour.r;
      rgba[ii + 1] = colour.g;
      rgba[ii + 2] = colour.b;
      rgba[ii + 3] = 255;
    }
    this.textures.front.subset(
      rgba,
      0,
      0,
      this.statesize[0],
      this.statesize[1]
    );
    return this;
  }

  /**
   * Fill the entire state with random values.
   * @param {number} [p] Chance of a cell being alive (0.0 to 1.0)
   * @returns {GOL} this
   */
  setRandom(p: number) {
    const size = this.statesize[0] * this.statesize[1];
    p = p == null ? 0.5 : p;
    var rand = new Uint8Array(size);
    for (var i = 0; i < size; i++) {
      rand[i] = Math.random() < p ? 1 : 0;
    }
    this.set(rand);
    return this;
  }

  /**
   * Clear the simulation state to empty.
   * @returns {GOL} this
   */
  setEmpty() {
    this.set(new Uint8Array(this.statesize[0] * this.statesize[1]));
    return this;
  }

  /**
   * Swap the texture buffers.
   * @returns {GOL} this
   */
  swap() {
    var tmp = this.textures.front;
    this.textures.front = this.textures.back;
    this.textures.back = tmp;
    return this;
  }

  /**
   * Step the Game of Life state on the GPU without rendering anything.
   * @returns {GOL} this
   */
  step() {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.back);
    this.textures.front.bind(0);
    gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.gol
      .use()
      .attrib("quad", this.buffers.quad, 2)
      .uniformi("state", 0)
      .uniform("scale", this.statesize)
      .draw(gl.TRIANGLE_STRIP, 4);
    this.swap();
    return this;
  }

  /**
   * Render the Game of Life state stored on the GPU.
   * @returns {GOL} this
   */
  draw() {
    var gl = this.igloo.gl;
    this.igloo.defaultFramebuffer.bind();
    this.textures.front.bind(0);
    gl.viewport(0, 0, this.viewsize[0], this.viewsize[1]);
    this.programs.copy
      .use()
      .attrib("quad", this.buffers.quad, 2)
      .uniformi("state", 0)
      .uniform("scale", this.viewsize)
      .draw(gl.TRIANGLE_STRIP, 4);
    return this;
  }

  /**
   * Set the state at a specific position.
   * @param {number} x
   * @param {number} y
   * @param {boolean} state True/false for live/dead
   * @returns {GOL} this
   */
  poke(x: number, y: number, state: number) {
    const colour = state ? this.aliveColour : this.deadColour;
    this.textures.front.subset([colour.r, colour.g, colour.b, 255], x, y, 1, 1);
    return this;
  }

  /**
   * @returns {Object} Boolean array-like of the simulation state
   */
  get() {
    var gl = this.igloo.gl,
      w = this.statesize[0],
      h = this.statesize[1];
    this.framebuffers.step.attach(this.textures.front);
    var rgba = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgba);
    var state = new Uint8Array(w * h);
    for (var i = 0; i < w * h; i++) {
      state[i] = rgba[i * 4] > 128 ? 1 : 0;
    }
    return state;
  }

  toArray() {
    var gl = this.igloo.gl,
      w = this.statesize[0],
      h = this.statesize[1];
    const result = new Array(w);
    this.framebuffers.step.attach(this.textures.front);
    var rgba = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgba);

    for (let i = 0; i < w; i++) {
      const row = new Array(w);
      result[i] = row;
      for (let j = 0; j < w; j++) {
        row[j] = rgba[(i * w + j) * 4] === this.deadColour.r ? 0 : 1;
      }
    }

    return result;
  }
}

// /**
//  * Game of Life simulation and display.
//  * @param {HTMLCanvasElement} canvas Render target
//  * @param {number} [scale] Size of each cell in pixels (power of 2)
//  */
// export default function GOL(
//   canvas: HTMLCanvasElement,
//   scale: number,
//   variation: Variation,
//   useAge: boolean,
//   aliveColour: string,
//   deadColour: string
// ) {
//   this.aliveColour = aliveColour;
//   this.deadColour = deadColour;
//   var igloo = (this.igloo = new Igloo(canvas));
//   var gl = igloo.gl;
//   if (gl == null) {
//     alert("Could not initialize WebGL!");
//     throw new Error("No WebGL");
//   }
//   scale = this.scale = scale || 4;
//   var w = canvas.width,
//     h = canvas.height;
//   this.viewsize = new Float32Array([w, h]);
//   this.statesize = new Float32Array([w / scale, h / scale]);

//   gl.disable(gl.DEPTH_TEST);
//   this.programs = {
//     copy: igloo.program(quadVert, copyFrag),
//     gol: igloo.program(
//       quadVert,
//       golFrag(variation.webGl, deadColour, aliveColour, useAge)
//     ),
//   };
//   this.buffers = {
//     quad: igloo.array(Igloo.QUAD2),
//   };
//   this.textures = {
//     front: igloo
//       .texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
//       .blank(this.statesize[0], this.statesize[1]),
//     back: igloo
//       .texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
//       .blank(this.statesize[0], this.statesize[1]),
//   };
//   this.framebuffers = {
//     step: igloo.framebuffer(),
//   };
// }
