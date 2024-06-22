<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useLocations } from "../data/useLocations";
import { useDebouncedRef } from "../../useDebouncedRef";
import SpinnerLoader from "@/components/SpinnerLoader.vue";
import Pagination from "@/components/Pagination.vue";
import type { Pageable } from "@/Pageable.model";

const { data, fetchData, loading } = useLocations();
const input = useDebouncedRef("");
const page = ref(1);

onMounted(() => {
  fetchData({ page: 0, searchTerm: "" });
});

watch(
  () => input.value,
  (value) => {
    page.value = 1;
    fetchData({ page: 1, searchTerm: value });
  }
);

function updateFilters(filters: Partial<Pageable<{ searchTerm: string }>>) {
  fetchData({
    searchTerm: filters.searchTerm || input.value,
    page: filters.page || page.value,
  }).then(() => {
    if (filters.page) {
      page.value = filters.page;
    }
  });
}
</script>

<template>
  <form>
    <input
      v-model="input"
      class="mt-1 mb-8 input"
      placeholder="Search locations by name..."
    />
  </form>

  <SpinnerLoader v-if="loading" />
  <div v-else class="grid grid-cols-2 gap-4">
    <div v-for="location in data.results" class="card grow text-center">
      <p class="font-semibold">{{ location.name }}</p>
      <span class="chip my-2">{{ location.type }}</span>
      <p>🪐 {{ location.dimension }}</p>
      <p class="mt-2 font-bold">🧍‍♂️🧍‍♀️ {{ location.residents.length }}</p>
    </div>
  </div>

  <Pagination
    :currentPage="page"
    :totalPages="data.total"
    @page-change="updateFilters"
  />
</template>
