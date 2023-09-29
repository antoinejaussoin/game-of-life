import WebGlColorEngine from "../engines/webgl/webgl-color-engine";
import { derived, writable } from "svelte/store";
import { classic } from "../engines/variations";

export const playing = writable(false);
export const generation = writable(0);
export const pixelated = writable(true);
export const sizePower = writable(7);
export const fill = writable(20);
export const speed = writable(1);
export const fps = writable(60);
export const size = derived(sizePower, ($sizePower) => Math.pow(2, $sizePower));
export const pixelPerSecond = derived(
  [size, speed, fps, playing],
  ([si, sp, fp, p]) => (p ? si * si * sp * fp : 0)
);

export const engine = derived(
  [size, fill],
  ([s, f]) => new WebGlColorEngine(s, f, classic)
);
