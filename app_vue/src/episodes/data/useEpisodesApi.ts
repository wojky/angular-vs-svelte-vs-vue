export type ApiResults<T> = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export async function toggleWatchList(episodeId: number) {
  const response = await fetch(
    `http://localhost:3000/watchlists/${episodeId}/toggle`,
    { method: "POST" }
  );

  return (await response.json()) as { watchList: number[] };
}

export async function getAll() {
  const [page1, page2, page3] = await Promise.all([
    fetch("http://rickandmortyapi.com/api/episode?page=1").then((res) =>
      res.json()
    ),
    fetch("http://rickandmortyapi.com/api/episode?page=2").then((res) =>
      res.json()
    ),
    fetch("http://rickandmortyapi.com/api/episode?page=3").then((res) =>
      res.json()
    ),
  ]);

  return {
    info: {
      count: page1.info.count,
    },
    results: page1.results.concat(page2.results, page3.results),
  } as ApiResults<Episode>;
}
