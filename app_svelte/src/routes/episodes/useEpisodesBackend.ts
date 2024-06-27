import type { Episode } from './episode.model';

export async function toggleWatchList(episodeId: number) {
	const res = await fetch(`http://localhost:3000/watchlists/${episodeId}/toggle`, {
		method: 'POST'
	});
	const result: {
		watchList: number[];
	} = await res.json();

	return result;
}

export async function getAll() {
	const [page1, page2, page3] = await Promise.all([
		fetch('http://rickandmortyapi.com/api/episode?page=1').then((res) => res.json()),
		fetch('http://rickandmortyapi.com/api/episode?page=2').then((res_1) => res_1.json()),
		fetch('http://rickandmortyapi.com/api/episode?page=3').then((res_2) => res_2.json())
	] as Promise<{ info: { count: number }; results: Episode[] }>[]);

	return {
		info: {
			count: page1.info.count
		},
		results: page1.results.concat(page2.results, page3.results)
	};
}
