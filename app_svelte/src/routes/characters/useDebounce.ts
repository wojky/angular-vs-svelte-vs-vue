import { writable } from 'svelte/store';

export function useDebounce(initialValue: string, delay = 300) {
	const { subscribe, set } = writable(initialValue);
	let timeout: number;

	function debouncedSet(value: string) {
		clearTimeout(timeout);
		timeout = setTimeout(() => set(value), delay);
	}

	return {
		subscribe,
		set: debouncedSet
	};
}
