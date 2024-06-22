import type { Pageable } from "@/Pageable.model";
import { computed, ref } from "vue";
import type { CharactersFilters } from "../views/Characters.vue";

const filters = ref({
  status: "" as Lowercase<"Dead" | "Alive" | "unknown" | "">,
  searchTerm: "",
  page: 1,
});

const state = computed(() => {
  return {
    filters: filters.value,
  };
});

export function useCharactersState() {
  return {
    state,
    updateFilters: (update: Partial<Pageable<CharactersFilters>>) => {
      filters.value = {
        ...filters.value,
        ...update,
      };
    },
  };
}
