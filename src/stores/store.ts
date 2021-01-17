import { derived, writable } from "svelte/store";

export const playing = writable(true);
export const pixelated = writable(false);
export const sizePower = writable(7);
export const fill = writable(20);
export const speed = writable(1);
export const size = derived(sizePower, ($sizePower) => Math.pow(2, $sizePower));
