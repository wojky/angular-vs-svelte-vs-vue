import { ref } from "vue";
import type { Character } from "../model/character.model";
import type { Pageable } from "@/Pageable.model";
import type { CharactersPageFilters } from "../model/character-page-filters.model";

export function useCharacters() {
  const data = ref<{ results: Character[]; total: number }>({
    results: [],
    total: 0,
  });
  const error = ref<any>(null);
  const loading = ref(false);

  const fetchData = async ({
    page,
    searchTerm,
    status,
  }: Pageable<CharactersPageFilters>) => {
    loading.value = true;

    const x = new URLSearchParams({
      name: searchTerm.trim().toLowerCase(),
      status: status.toLowerCase(),
      page: page.toString(),
    });

    const url = new URL("https://rickandmortyapi.com/api/character");

    url.search = x.toString();

    try {
      const response = await fetch(url);
      const payload = await response.json();

      data.value = { results: payload.results, total: payload.info.pages };
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, fetchData };
}
