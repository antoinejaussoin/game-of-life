import WebGlColorEngine from "../engines/webgl/webgl-color-engine";
import { derived, writable } from "svelte/store";
import { classic } from "../engines/variations";

export const playing = writable(false);
export const pixelated = writable(false);
export const sizePower = writable(7);
export const fill = writable(20);
export const speed = writable(1);
export const size = derived(sizePower, ($sizePower) => Math.pow(2, $sizePower));

export const engine = derived(
  [size, fill],
  ([s, f]) => new WebGlColorEngine(s, f, classic)
);
