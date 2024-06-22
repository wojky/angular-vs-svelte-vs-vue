<script setup lang="ts">
const props = defineProps<{
  hasError: boolean;
}>();
</script>

<template>
  <div v-if="hasError" class="form-control__error">
    <slot />
  </div>
</template>
