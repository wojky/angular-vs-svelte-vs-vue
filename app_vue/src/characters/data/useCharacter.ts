import { ref } from "vue";
import type { Character } from "../model/character.model";

export function useCharacter() {
  const data = ref<Character | null>(null);
  const error = ref<any>(null);
  const loading = ref(false);

  const fetchData = async (id: string) => {
    loading.value = true;

    const url = new URL(`https://rickandmortyapi.com/api/character/${id}`);

    try {
      const response = await fetch(url);

      data.value = await response.json();
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, fetchData };
}
