<script lang="ts">
	import { useUserState } from '../../auth/useUserState';
	import { useEpisodesStore } from '../useEpisodesStore';
	import { toggleWatchList } from '../useEpisodesBackend';

	const episodesStore = useEpisodesStore();
	const userStore = useUserState();

	const watchList = episodesStore.watchList;

	function remove(id: number) {
		toggleWatchList(id).then(({ watchList }) => {
			userStore.updateUser({ watchList });
		});
	}
</script>

<p class="text-5xl mb-6 text-center">👀</p>
<div class="grid grid-cols-2 gap-4">
	{#each $watchList as episode}
		<div class="card grow text-center">
			<p class="font-semibold">{episode.name}</p>
			<p>🎬 {episode.episode}</p>

			<button
				on:click={() => {
					remove(episode.id);
				}}
				class="mt-4 btn--secondary"
			>
				Remove
			</button>
		</div>
	{/each}
</div>
