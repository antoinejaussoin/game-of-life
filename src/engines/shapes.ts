// http://www.radicaleye.com/lifepage/picgloss/picgloss.html

import type { Board, Row, Shape, ShapePreset } from "src/types";
import { convert } from "./convert";

function inject(container: Board, x: number, y: number, shape: Shape): Board {
  for (let i = 0; i < shape.length; i++) {
    const row = shape[i];
    for (let j = 0; j < row.length; j++) {
      container[i + x][j + y] = shape[i][j];
    }
  }
  return container;
}

export function blank(width: number, height: number): Board {
  const grid: Board = [];

  for (let i = 0; i < height; i++) {
    const row: Row = [];
    grid.push(row);
    for (let j = 0; j < width; j++) {
      row.push(0);
    }
  }

  return grid;
}

export const gosperGliderGun: ShapePreset = {
  name: "Gosper Glider Gun",
  shape: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

export const blockLayingSwitch: ShapePreset = {
  name: "Block Laying Switch",
  shape: [
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 1, 1],
    [0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0],
  ],
};

export const blockLayingSwitch2: ShapePreset = {
  name: "Block Laying Switch (2)",
  shape: [
    [1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1],
    [0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1],
  ],
};

export const acorn: ShapePreset = {
  name: "Acorn",
  shape: convert(`..*.....
  ....*...
  .**..***`),
};

export const blinkerShip: ShapePreset = {
  name: "Blinker Ship",
  shape: convert(
    `............*..*...............
  ...........*...................
  ...........*...*...............
  ...**......****................
  ..****.........................
  .**.**.........................
  ..**.....**.***................
  ........*.....**.......*....***
  .......**.......*......*....*.*
  ........*.....**.......*....***
  ..**.....**.***................
  .**.**.........................
  ..****.........................
  ...**......****................
  ...........*...*...............
  ...........*...................
  ............*..*...............`
  ),
};

export const centinal: ShapePreset = {
  name: "Centinal",
  shape: convert(
    `.**................................................**
  ..*................................................*.
  ..*.*.....................**.....................*.*.
  ...**........*............**............**.......**..
  ............**..........................*.*..........
  ...........**.............................*..........
  ............**..**......................***..........
  .....................................................
  .....................................................
  .....................................................
  ............**..**......................***..........
  ...........**.............................*..........
  ............**..........................*.*..........
  ...**........*............**............**.......**..
  ..*.*.....................**.....................*.*.
  ..*................................................*.
  .**................................................**`
  ),
};

export const gourmet: ShapePreset = {
  name: "Gourmet",
  shape: convert(
    `...........**........
 ...........*.........
 ...*.**.**.*.....**..
 ...**.*.*.*......*...
 .........*........*..
 .................**..
 .....................
 ............*....**..
 .*.........*.*..*.*..
 .***......**.**..*...
 ....*.............***
 ...*.*..............*
 ...**................
 .....................
 ...**................
 ...*........*........
 ....*......*.*.*.**..
 ...**.....*.**.**.*..
 ..........*..........
 .........**..........`
  ),
};

export const greyCounter: ShapePreset = {
  name: "Grey Counter",
  shape: convert(
    `.....*....
  ....*.*...
  .....*....
  ..........
  ...*****..
  ..*.....*.
  .*.*...*.*
  ..*.....*.
  ...*****..
  ..........
  .....*....
  ....*.*...
  .....*....`
  ),
};

export const heavyweightVolcano: ShapePreset = {
  name: "Heavyweight Volcano",
  shape: convert(
    `..........*..........................
  .........*.*.........................
  .......***.*.........................
  ......*....**.*......................
  ......*.**...**......**..............
  .....**.*.**.........*.*.............
  ..........*.*****......*..*.**.......
  ...*.**.**.*.....*....**.*.**.*......
  ......**.....****........*....*......
  .*...*.*..*...*.*....**.*.****.**....
  .*...*.*..**.*.**.**....*.*....*.*...
  ......**...***.**.*.***.*..***...*...
  ...*.**.**.**.............*.*..*.*.**
  ............*......*.*.*.*..**.*.*.*.
  .....**.*.*.**......**.*.*.*...*.*.*.
  ......*.**.*..*.......*.**..****.**..
  ......*....*.*........*...**.........
  .....**....**........**...*..*.......
  ............................**.......`
  ),
};

export const lightSpeedWire: ShapePreset = {
  name: "Lightspeed Wire",
  shape: convert(
    `....*..*..*..*..*..*..*..*..*..*..*..*..*..*..*..*..*..*..*..*...
  ....**********************************************************...
  .................................................................
  ..**************************************************************.
  .*.................................*.......*..........*.........*
  .****.**.*..*****..***************....*****....*******...********
  .....*...**.....**.......*.......*........*............*.........
  .******..*..*****..*****....******....*****....*******...********
  .*......................*.........*........*..........*.........*
  ..**************************************************************.
  .................................................................
  ....**********************************************************...
  ....*..*..*..*..*..*..*..*..*..*..*..*..*..*..*..*..*..*..*..*...
  `
  ),
};

export const sawtooth: ShapePreset = {
  name: "Sawtooth",
  shape: convert(
    `......****
  .....*...*
  .........*
  .**..*..*.
  .***......
  .**..*..*.
  .........*
  .....*...*
  ......****
  `
  ),
};

export const sparky: ShapePreset = {
  name: "Sparky",
  shape: convert(
    `...........*....................
  ...........*...............**...
  .......**.*.***..........**...*.
  .*.**.**.**..*.*...**.****......
  .*...**..*.**..***..*.**..**...*
  .*.**....***.*.***......**..*...
  .........**.*...............*..*
  .*.**....***.*.***......**..*...
  .*...**..*.**..***..*.**..**...*
  .*.**.**.**..*.*...**.****......
  .......**.*.***..........**...*.
  ...........*...............**...
  ...........*....................
  `
  ),
};

export function addMargins(size: number) {
  return function addShape(shape: Shape) {
    const grid = blank(shape[0].length + size * 2, shape.length + size * 2);
    return inject(grid, size, size, shape);
  };
}

export default [
  gosperGliderGun,
  blockLayingSwitch,
  blockLayingSwitch2,
  acorn,
  blinkerShip,
  centinal,
  gourmet,
  greyCounter,
  heavyweightVolcano,
  lightSpeedWire,
  sawtooth,
  sparky,
];
