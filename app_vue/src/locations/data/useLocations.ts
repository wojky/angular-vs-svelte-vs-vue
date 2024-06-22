import { ref } from "vue";
import type { Pageable } from "@/Pageable.model";
import type { SeriesLocation } from "../model/location.model";

export function useLocations() {
  const data = ref<{ results: SeriesLocation[]; total: number }>({
    results: [],
    total: 0,
  });
  const error = ref<any>(null);
  const loading = ref(false);

  const fetchData = async ({
    page,
    searchTerm,
  }: Pageable<{ searchTerm: string }>) => {
    loading.value = true;

    const x = new URLSearchParams({
      name: searchTerm.trim().toLowerCase(),
      page: page.toString(),
    });

    const url = new URL("https://rickandmortyapi.com/api/location");

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
