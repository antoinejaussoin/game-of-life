const inject = (container, x, y, shape) => {
  console.log('Container: ', container.length, container[0].length);
  console.log('Shape: ', shape.length, shape[0].length);
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

export const gosperGliderGun = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
  [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];

export const blockLayingSwitch = [
  [ 0, 0, 0, 0, 0, 0, 1, 0 ],
  [ 0, 0, 0, 0, 1, 0, 1, 1 ],
  [ 0, 0, 0, 0, 1, 0, 1, 0 ],
  [ 0, 0, 0, 0, 1, 0, 0, 0 ],
  [ 0, 0, 1, 0, 0, 0, 0, 0 ],
  [ 1, 0, 1, 0, 0, 0, 0, 0 ]
];

export const blockLayingSwitch2 = [
  [ 1, 1, 1, 0, 1 ],
  [ 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 1, 1 ],
  [ 0, 1, 1, 0, 1 ],
  [ 1, 0, 1, 0, 1 ],
];

export const addMargins = size => shape => {
  const grid = blank(shape[0].length + size * 2, shape.length + size * 2);
  return inject(grid, size, size, shape);
}