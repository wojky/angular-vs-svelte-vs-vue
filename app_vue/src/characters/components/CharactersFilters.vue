<script setup lang="ts">
import { watch, computed, ref } from "vue";
import { useDebouncedRef } from "../../useDebouncedRef";
import type { CharactersPageFilters } from "../model/character-page-filters.model";

const emit = defineEmits<{
  "filters-changed": [value: CharactersPageFilters];
}>();

const props = defineProps<{ defaults: CharactersPageFilters }>();

const input = useDebouncedRef(props.defaults.searchTerm);
const status = ref<Lowercase<"Dead" | "Alive" | "unknown" | "">>(
  props.defaults.status
);

const filters = computed(() => {
  return { searchTerm: input.value, status: status.value };
});

watch(
  () => filters.value,
  (value) => {
    emit("filters-changed", value);
  }
);
</script>

<template>
  <form>
    <input
      v-model="input"
      class="mt-1 mb-6 input"
      placeholder="Search characters..."
    />

    <div class="flex w-full justify-between">
      <p>Status:</p>
      <div class="mb-6 flex items-center">
        <label class="switch">
          <input type="radio" v-model="status" value="" />
          <span class="slider"></span>
        </label>
        <span class="ml-2 text-gray-700">Any</span>
      </div>
      <div class="mb-6 flex items-center">
        <label class="switch">
          <input type="radio" v-model="status" value="alive" />
          <span class="slider"></span>
        </label>
        <span class="ml-2 text-gray-700">Alive</span>
      </div>

      <div class="mb-6 flex items-center">
        <label class="switch">
          <input type="radio" v-model="status" value="dead" />
          <span class="slider"></span>
        </label>
        <span class="ml-2 text-gray-700">Dead</span>
      </div>

      <div class="mb-6 flex items-center">
        <label class="switch">
          <input type="radio" v-model="status" value="unknown" />
          <span class="slider"></span>
        </label>
        <span class="ml-2 text-gray-700">unknown</span>
      </div>
    </div>
  </form>
</template>
