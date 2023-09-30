export type Cell = number;
export type Row = Cell[];
export type Board = Row[];

export type WebGlBoard = Uint8Array;

export interface Variation {
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
}

export type Scenario = {
  name: string;
  init: (engine: Engine) => void;
};
