import type { EngineMetadata } from "src/types";

export const engines: EngineMetadata[] = [
  { id: "webgl", name: "WebGL", description: "WebGL", type: "webgl" },
  {
    id: "webgl-color",
    name: "WebGL Color",
    description: "WebGL Color",
    type: "webgl",
  },
  { id: "js-bw", name: "JS BW", description: "JS BW", type: "2d" },
  { id: "js-color", name: "JS Color", description: "JS Color", type: "2d" },
];
