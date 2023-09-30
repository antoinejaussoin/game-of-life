import type { EngineMetadata } from "src/types";

export const engines: EngineMetadata[] = [
  {
    id: "webgl",
    name: "WebGL",
    description:
      "A super-fast implementation using Canvas and WebGL. You will need a GPU.",
    type: "webgl",
  },
  {
    id: "webgl-color",
    name: "WebGL (Color)",
    description:
      "Same as WebGL, but with colors, representing the age of a cell.",
    type: "webgl",
  },
  {
    id: "js-bw",
    name: "2D Canvas",
    description:
      "Simplest, black-and-white, implementation using 2D Canvas. No GPU necessary, but quite slow.",
    type: "2d",
  },
  {
    id: "js-color",
    name: "2D Canvas (Color)",
    description: "Same as 2D Canvas, but with colors.",
    type: "2d",
  },
];
