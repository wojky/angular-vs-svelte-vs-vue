<script setup lang="ts">
import AppSidebar from "./AppSidebar.vue";
</script>

<template>
  <div class="layout">
    <header class="bg-gray-900 text-white text-center py-4">
      <h1 class="text-3xl font-bold">Rick And Morty Universum</h1>
    </header>

    <div>
      <AppSidebar />
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.layout > div {
  display: flex;
  flex: 1;
  overflow: hidden;
}

main {
  flex-grow: 1;
  overflow-y: auto;
  height: 100%;
  @apply bg-gray-100;
}
</style>
