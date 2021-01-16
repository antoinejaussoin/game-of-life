import type { Settings } from "src/types";
import { writable } from "svelte/store";

export const pixelated = writable(false);
export const size = writable(128);
export const fill = writable(20);
export const speed = writable(1);
