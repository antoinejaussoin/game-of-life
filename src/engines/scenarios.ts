import type { Scenario } from "src/types";

export const random: Scenario = {
  name: "Random",
  description: "Randomly generated board, using the fill setting.",
  init: (engine) => {
    engine.initToRandom();
  },
};

export const firework: Scenario = {
  name: "Firework",
  description: "A firework. Best used with the HighLife variation.",
  init: (engine) => {
    engine.initToBlank();
    const size = engine.size;

    for (let i = 0; i < size; i++) {
      const j = 0;
      engine.set(i, j, 1);
    }

    for (let i = 0; i < size; i++) {
      const j = size - 1;
      engine.set(i, j, 1);
    }

    for (let j = 1; j < size - 1; j++) {
      const i = 0;
      engine.set(i, j, 1);
    }

    for (let j = 1; j < size - 1; j++) {
      const i = size - 1;
      engine.set(i, j, 1);
    }
  },
};

export default [random, firework];
