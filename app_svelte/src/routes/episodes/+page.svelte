<script lang="ts">
	import type { TableColumnDefinition } from '$lib/components/app-table.svelte';
	import AppTable from '$lib/components/app-table.svelte';
	import AddToWatchlistCell from './add-to-watchlist-cell.svelte';
	import { derived } from 'svelte/store';
	import { useEpisodesStore } from './useEpisodesStore';

	const config: TableColumnDefinition<{
		id: number;
		name: string;
		airdate: string;
		episodeCode: string;
		characters: string[];
	}>[] = [
		{
			order: 2,
			name: 'name',
			title: 'Name'
		},
		{
			order: 3,
			name: 'episodeCode',
			title: 'Season',
			computeValue: ({ episodeCode }) => episodeCode.slice(0, episodeCode.indexOf('E'))
		},
		{
			order: 4,
			name: 'episodeCode',
			title: 'Episode',
			computeValue: ({ episodeCode }) => episodeCode.slice(episodeCode.indexOf('E'))
		},
		{
			order: 5,
			name: 'airdate',
			title: 'Airdate'
		},
		{
			order: 6,
			name: 'characters',
			title: 'Characters',
			computeValue: (item) => `🧍‍♂️🧍‍♀️${item.characters.length.toString()}`
		},
		{
			order: 7,
			name: 'characters',
			title: ' ',

			component: AddToWatchlistCell
		}
	];

	const episodesStore = useEpisodesStore();
	const episodesDataSource = derived(episodesStore, ($episodesStore) => {
		return $episodesStore.map((e) => {
			return {
				id: e.id,
				name: e.name,
				airdate: e.air_date,
				episodeCode: e.episode,
				characters: e.characters
			};
		});
	});
</script>

<AppTable {config} data={$episodesDataSource}></AppTable>
