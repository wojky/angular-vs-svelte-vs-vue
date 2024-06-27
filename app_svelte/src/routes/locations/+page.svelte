<script lang="ts">
	import { onMount } from 'svelte';
	import type { SeriesLocation } from './location.model';
	import { useDebounce } from '../characters/useDebounce';
	import SpinnerLoader from '$lib/components/spinner-loader.svelte';
	import Pagination from '$lib/components/pagination.svelte';

	let locations: SeriesLocation[] = [];
	const searchTerm = useDebounce('', 500);
	let inputValue = '';
	let loading = false;
	let totalPages = 0;
	let page = 1;

	$: searchTerm.set(inputValue);

	onMount(() => {
		searchTerm.subscribe((v) => {
			page = 1;
			getLocations(v, page);
		});
	});

	function getLocations(name: string, page: number) {
		loading = true;
		const params = new URLSearchParams({ name, page: page.toString() });

		const url = new URL('https://rickandmortyapi.com/api/location');
		url.search = params.toString();

		fetch(url)
			.then((res) => {
				return res.ok ? res.json() : { results: [] };
			})
			.then(({ results, info }) => {
				locations = results;
				totalPages = info.pages;
			})
			.finally(() => {
				loading = false;
			});
	}

	function onPageChange(event: any) {
		page = event.detail.page;
		getLocations($searchTerm, page);
	}
</script>

<input bind:value={inputValue} class="mt-1 mb-8 input" placeholder="Search locations by name..." />
{#if loading}
	<SpinnerLoader />
{:else}
	<div class="grid grid-cols-2 gap-4">
		{#each locations as location}
			<div class="card grow text-center">
				<p class="font-semibold">{location.name}</p>
				<span class="chip my-2">{location.type}</span>
				<p>🪐 {location.dimension}</p>
				<p class="mt-2 font-bold">🧍‍♂️🧍‍♀️ {location.residents.length}</p>
			</div>
		{/each}
		{#if locations.length === 0}
			<p>Empty list</p>
		{/if}
	</div>
{/if}
<Pagination on:pageChange={onPageChange} currentPage={page} {totalPages} />
