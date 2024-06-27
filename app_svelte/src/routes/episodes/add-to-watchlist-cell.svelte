<script lang="ts">
	import type { TableColumnDefinition } from '$lib/components/app-table.svelte';
	import { useUserState, type UserInfo } from '../auth/useUserState';
	import type { Episode } from './episode.model';
	import { toggleWatchList } from './useEpisodesBackend';

	export let record: Episode;
	export let column: TableColumnDefinition<Episode>;

	const user = useUserState();

	function toggleEpisode(episode: Episode) {
		toggleWatchList(episode.id).then(({ watchList }) => {
			user.updateUser({
				watchList
			});
		});
	}

	function isOnWatchList(episode: Episode, user: UserInfo): boolean {
		return user.watchList.includes(episode.id);
	}
</script>

{#if $user}
	<label class="switch">
		<input
			type="checkbox"
			on:change={() => toggleEpisode(record)}
			checked={isOnWatchList(record, $user)}
		/>
		<span class="slider"></span>
	</label>
{:else}
	<p class="font-semibold text-xs">Login if you want to wishlist this episode</p>
{/if}
