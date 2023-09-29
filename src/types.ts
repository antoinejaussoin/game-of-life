export type Cell = number;
export type Row = Cell[];
export type Board = Row[];

export type WebGlBoard = Uint8Array;

export interface Variation {
  js: (neighbours: number) => number;
  webGl: string;
}

export interface Colour {
  r: number;
  g: number;
  b: number;
}

export interface Settings {
  pixelated: boolean;
}
