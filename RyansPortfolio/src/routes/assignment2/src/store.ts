import { writable } from 'svelte/store';

export const colorStore = writable<string>("#000000");