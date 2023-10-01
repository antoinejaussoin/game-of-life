import type { Variation } from "../types";

export const classic: Variation = {
  name: "Conway's Classic",
  description: "Classic ruleset by John Conway.",
  js: (neighbors: number) => {
    if (neighbors < 2 || neighbors > 3) {
      return 0;
    } else if (neighbors === 3) {
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
  name: "HighLife",
  description: "Slightly different rules, by Nathan Thompson",
  js: (neighbors) => {
    if (neighbors === 3 || neighbors === 6) {
      return 1;
    } else if (neighbors === 2) {
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

export const AllVariations = [classic, highLife];
