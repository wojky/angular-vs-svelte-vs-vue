<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import CharactersFilters from "../components/CharactersFilters.vue";
import Pagination from "../../components/Pagination.vue";
import SpinnerLoader from "../../components/SpinnerLoader.vue";
import { useCharacters } from "../data/useCharacters";
import { useCharactersState } from "../data/useCharactersState";
import type { Character } from "../model/character.model";
import type { Pageable } from "@/Pageable.model";
import type { CharactersPageFilters } from "../model/character-page-filters.model";

export type CharactersFilters = Pageable<CharactersPageFilters>;

const { data, loading, fetchData } = useCharacters();
const router = useRouter();

const { state, updateFilters: updateStateFilters } = useCharactersState();

function goToDetails(ch: Character) {
  router.push({ name: `character`, params: { id: ch.id } });
}

function updateFilters(updated: Partial<CharactersFilters>) {
  updateStateFilters({
    ...state.value,
    page: 1,
    ...updated,
  });
}

watch(
  () => state.value.filters,
  (value) => {
    fetchData(value);
  }
);

onMounted(() => {
  fetchData(state.value.filters);
});
</script>

<template>
  <CharactersFilters
    @filters-changed="updateFilters"
    :defaults="state.filters"
  />
  <SpinnerLoader v-if="loading" />
  <div v-else class="flex flex-wrap gap-4">
    <button
      v-for="character in data.results"
      @click="goToDetails(character)"
      class="card card--button"
    >
      <img
        class="w-24 h-24 rounded-image mb-2"
        :src="character.image"
        :alt="character.name"
      />
      <p class="w-24 text-center text-gray-700">{{ character.name }}</p>
    </button>

    <p v-if="!data.results.length">Empty list</p>
  </div>

  <Pagination
    :currentPage="state.filters.page"
    :totalPages="data.total"
    @page-change="updateFilters"
  />
</template>
