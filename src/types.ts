export type Cell = number;
export type Row = Cell[];
export type Board = Row[];

export type WebGlBoard = Uint8Array;

export interface Variation {
  name: string;
  description: string;
  js: (neighbours: number) => number;
  webGl: string;
}

export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface ColorWithCss extends Color {
  cssColor: string;
}

export interface Settings {
  pixelated: boolean;
}

export type ShapePreset = {
  name: string;
  shape: Shape;
};

export type Shape = number[][];

export interface Engine {
  initToBlank(): void;
  initToRandom(percentageAlive?: number): void;
  size: number;
  set(x: number, y: number, value: number): void;
  maxTextureSize: number;
  type: EngineType;
}

export type Scenario = {
  name: string;
  description: string;
  init: (engine: Engine) => void;
};

export type EngineMetadata = {
  id: EngineId;
  type: EngineType;
  name: string;
  description: string;
};

export type EngineId = "webgl" | "webgl-color" | "js-bw" | "js-color";
export type EngineType = "webgl" | "2d";
