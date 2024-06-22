<script setup lang="ts">
import type { Episode } from "../data/useEpisodesApi";
import { useEpisodesState } from "../data/useEpisodesState";

const { state, toggleWatchList } = useEpisodesState();

function remove(episode: Episode) {
  toggleWatchList(episode);
}
</script>

<template>
  <p class="text-5xl mb-6 text-center">👀</p>
  <div class="grid grid-cols-2 gap-4">
    <div v-for="episode in state.watchLists" class="card grow text-center">
      <p class="font-semibold">{{ episode.name }}</p>
      <p>🎬 {{ episode.episode }}</p>

      <button @click="remove(episode)" class="mt-4 btn--secondary">
        Remove
      </button>
    </div>
  </div>
</template>
