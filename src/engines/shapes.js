// http://www.radicaleye.com/lifepage/picgloss/picgloss.html

import { convert } from './convert';

const inject = (container, x, y, shape) => {
  for(let i = 0; i < shape.length; i++) {
    const row = shape[i];
    for(let j = 0; j < row.length; j++) {
      container[i + x][j + y] = shape[i][j];
    }
  }
  return container;
};

export const blank = (width, height) => {
  const grid = [];

  for(let i = 0; i < height; i++) {
    const row = [];
    grid.push(row);
    for(let j = 0; j < width; j++) {
      row.push(0);
    }
  }
  
  return grid;
};

export const gosperGliderGun = {
  name: 'Gosper Glider Gun',
  shape: [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
    [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ]
};

export const blockLayingSwitch = {
  name: 'Block Laying Switch',
  shape: [
    [ 0, 0, 0, 0, 0, 0, 1, 0 ],
    [ 0, 0, 0, 0, 1, 0, 1, 1 ],
    [ 0, 0, 0, 0, 1, 0, 1, 0 ],
    [ 0, 0, 0, 0, 1, 0, 0, 0 ],
    [ 0, 0, 1, 0, 0, 0, 0, 0 ],
    [ 1, 0, 1, 0, 0, 0, 0, 0 ]
  ]
};

export const blockLayingSwitch2 = {
  name: 'Block Laying Switch (2)',
  shape: [
    [ 1, 1, 1, 0, 1 ],
    [ 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 1 ],
    [ 0, 1, 1, 0, 1 ],
    [ 1, 0, 1, 0, 1 ],
  ]
};

export const acorn = {
  name: 'Acorn',
  shape: convert(`..*.....
  ....*...
  .**..***`)
};

export const blinkerShip = {
  name: 'Blinker Ship',
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
  ............*..*...............`)
};

export const centinal = {
  name: 'Centinal',
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
  .**................................................**`)
};

export const gourmet = {
  name: 'Gourmet',
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
 .........**..........`)
};

export const greyCounter = {
  name: 'Grey Counter',
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
  .....*....`)
};

export const heavyweightVolcano = {
  name: 'Heavyweight Volcano',
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
  ............................**.......`)
};

export const lightspeedWire = {
  name: 'Lightspeed Wire',
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
  `)
};

export const sawtooth = {
  name: 'Sawtooth',
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
  `)
};

export const sparky = {
  name: 'Sparky',
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
  `)
};

export const addMargins = size => shape => {
  const grid = blank(shape[0].length + size * 2, shape.length + size * 2);
  return inject(grid, size, size, shape);
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
  lightspeedWire,
  sawtooth,
  sparky
];