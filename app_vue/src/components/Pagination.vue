<script setup lang="ts">
const emit = defineEmits<{
  "page-change": [value: { page: number }];
}>();

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

function previousPage() {
  if (props.currentPage > 1) {
    emit("page-change", { page: props.currentPage - 1 });
  }
}

function nextPage() {
  if (props.currentPage < props.totalPages) {
    emit("page-change", { page: props.currentPage + 1 });
  }
}
</script>

<template>
  <div
    class="w-full flex items-center justify-between p-4 bg-white rounded shadow mt-8"
  >
    <button
      @click="previousPage"
      :disabled="props.currentPage === 1"
      class="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>

    <div class="text-gray-700">
      Page {{ props.currentPage }} of {{ props.totalPages }}
    </div>

    <button
      @click="nextPage"
      :disabled="props.currentPage === props.totalPages"
      class="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</template>
