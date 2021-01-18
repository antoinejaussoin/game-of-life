import type { Variation } from "../types";

export const classic: Variation = {
  js: (neighbours: number) => {
    if (neighbours < 2 || neighbours > 3) {
      return 0;
    } else if (neighbours === 3) {
      return 1;
    } else {
      return -1;
    }
  },
  webGl: `
    if (sum == 3) {
        result = 1;
    } else if (sum == 2) {
        result = -1;
    } else {
        result = 0;
    }
  `,
};

export const highLife: Variation = {
  js: (neighbours) => {
    if (neighbours === 3 || neighbours === 6) {
      return 1;
    } else if (neighbours === 2) {
      return -1;
    } else {
      return 0;
    }
  },
  webGl: `
    if (sum == 3 || sum == 6) {
        result = 1;
    } else if (sum == 2) {
        result = -1;
    } else {
        result = 0;
    }
  `,
};
