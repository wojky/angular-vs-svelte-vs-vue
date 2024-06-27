import { derived, writable } from 'svelte/store';
import type { Episode } from './episode.model';
import { getAll } from './useEpisodesBackend';
import { useUserState } from '../auth/useUserState';

const initialState: Episode[] = [];

const episodesStore = writable<Episode[]>(initialState);
const userStore = useUserState();

export const useEpisodesStore = () => {
	return {
		subscribe: episodesStore.subscribe,
		init: () => {
			getAll().then((res) => {
				episodesStore.set(res.results);
			});
		},
		setEpisodes(episodes: Episode[]) {
			episodesStore.set(episodes);
		},
		watchList: derived([userStore, episodesStore], ([$user, $episodesStore]) => {
			return $user ? $episodesStore.filter((e) => $user.watchList.includes(e.id)) : [];
		})
	};
};
