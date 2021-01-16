import type { Settings } from "src/types";
import { writable } from "svelte/store";

export const pixelated = writable(false);
