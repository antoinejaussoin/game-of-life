import WebGlColorEngine from "../engines/webgl/webgl-color-engine";
import { derived, writable } from "svelte/store";
import { classic } from "../engines/variations";
import { engines } from "../engines/engines";
import WebGlEngine from "../engines/webgl/webgl-engine";
import BlackAndWhiteEngine from "../engines/bw-engine";
import ColorEngine from "../engines/color-engine";

export const playing = writable(false);
export const generation = writable(0);
export const pixelated = writable(true);
export const sizePower = writable(7);
export const fill = writable(20);
export const speed = writable(1);
export const fps = writable(60);
export const engineType = writable(engines.find((e) => e.id === "webgl-color"));
export const size = derived(sizePower, ($sizePower) => Math.pow(2, $sizePower));
export const pixelPerSecond = derived(
  [size, speed, fps, playing],
  ([si, sp, fp, p]) => (p ? si * si * sp * fp : 0)
);

export const engine = derived([size, fill, engineType], ([s, f, t]) => {
  switch (t.id) {
    case "webgl-color":
      return new WebGlColorEngine(s, f, classic);
    case "webgl":
      return new WebGlEngine(s, f, classic);
    case "js-bw":
      return new BlackAndWhiteEngine(s, f, classic);
    case "js-color":
      return new ColorEngine(s, f, classic);
    default:
      throw Error("Cannot find this engine: " + t.id);
  }
});
