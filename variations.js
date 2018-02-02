export const classic = (neighbours) => {
  if (neighbours < 2 || neighbours > 3) {
    return 0;
  } else if (neighbours === 3) {
    return 1;
  } else {
    return -1;
  }
};

export const highLife = (neighbours) => {
  if (neighbours === 3 || neighbours === 6) {
    return 1;
  } else if (neighbours === 2) {
    return -1;
  } else {
    return 0;
  }
};
