<script lang="ts">
	import type { Character } from './character.model';
	import CharactersFilters from './characters-filters.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import SpinnerLoader from '$lib/components/spinner-loader.svelte';
	import Pagination from '$lib/components/pagination.svelte';

	let characters: Character[] = [];
	let loading = false;
	let totalPages = 0;
	let page = 1;
	let status = '';
	let searchTerm = '';

	onMount(async () => {
		getCharacters({ searchTerm, status }, 1);
	});

	function getCharacters(filters: Partial<{ status: string; searchTerm: string }>, page: number) {
		loading = true;

		const params = new URLSearchParams({
			name: filters.searchTerm || '',

			status,
			page: page.toString()
		});

		const url = new URL('https://rickandmortyapi.com/api/character');
		url.search = params.toString();

		fetch(url)
			.then((res) => {
				return res.ok ? res.json() : { results: [] };
			})
			.then(({ results, info }) => {
				characters = results;
				totalPages = info.pages;
			})
			.finally(() => {
				loading = false;
			});
	}

	async function handleChange(filters: CustomEvent<{ status: string; searchTerm: string }>) {
		getCharacters(filters.detail, 1);
	}

	function goToDetails(id: number): null {
		goto('/characters/' + id);

		return null;
	}

	function onPageChange(event: CustomEvent<{ page: number }>) {
		page = event.detail.page;

		getCharacters({ searchTerm, status }, page);
	}
</script>

<CharactersFilters defaults={{ status, searchTerm }} on:filtersChange={handleChange} />
{#if loading}
	<SpinnerLoader />
{:else}
	<div class="flex flex-wrap gap-4">
		{#each characters as character}
			<button class="card card--button" on:click={goToDetails(character.id)}>
				<img class="rounded-image mb-2 w-24 h-24" src={character.image} alt={character.name} />
				<p class="w-24 text-center text-gray-700">{character.name}</p>
			</button>
		{/each}
		{#if characters.length === 0}
			<p>Empty list</p>
		{/if}
	</div>
{/if}

<Pagination on:pageChange={onPageChange} currentPage={page} {totalPages} />
