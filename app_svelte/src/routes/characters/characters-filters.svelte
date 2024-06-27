<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { useDebounce } from './useDebounce';

	export let defaults: any = { status: 'dead' };

	const dispatch = createEventDispatcher();
	const searchTerm = useDebounce(defaults.searchTerm || '', 500);

	let inputValue = '';
	let status = defaults.status || '';
	let initialProcessed = false;

	function filtersChanged() {
		dispatch('filtersChange', {
			status,
			searchTerm: $searchTerm
		});
	}

	const statuses = [
		{ label: 'Any', value: '' },
		{ label: 'Alive', value: 'alive' },
		{ label: 'Dead', value: 'dead' },
		{ label: 'unknown', value: 'unknown' }
	];

	$: searchTerm.set(inputValue);

	onMount(() => {
		searchTerm.subscribe((value) => {
			if (initialProcessed) {
				filtersChanged();
			} else {
				initialProcessed = true;
			}
		});
	});
</script>

<form>
	<input bind:value={inputValue} class="mt-1 mb-6 input" placeholder="Search characters..." />
	<div class="flex w-full justify-between">
		<p>Status:</p>
		{#each statuses as { label, value }}
			<div class="mb-6 flex items-center">
				<label class="switch">
					<input
						on:input={filtersChanged}
						name="status"
						type="radio"
						bind:group={status}
						{value}
						checked={value === status}
					/>
					<span class="slider"></span>
				</label>
				<span class="ml-2 text-gray-700">{label}</span>
			</div>
		{/each}
	</div>
</form>
