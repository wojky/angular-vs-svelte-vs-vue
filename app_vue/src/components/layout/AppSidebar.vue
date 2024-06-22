<script setup lang="ts">
import { useAuthState } from "@/auth/data/useAuthState";
import { useUserState } from "@/auth/data/useUserState";
import { RouterLink } from "vue-router";

const { state } = useUserState();
const { logout } = useAuthState();
</script>

<template>
  <nav class="flex flex-col h-full bg-gray-800 text-white p-4 min-w-40">
    <ul class="space-y-4">
      <li>
        <RouterLink
          to="/characters"
          activeClass="font-semibold text-indigo-400"
          class="hover:text-indigo-400"
        >
          Characters
        </RouterLink>
      </li>

      <li>
        <RouterLink
          to="/episodes"
          exactActiveClass="font-semibold text-indigo-400"
          class="hover:text-indigo-400"
        >
          Episodes
        </RouterLink>
      </li>

      <li v-if="state.user">
        <RouterLink
          to="/episodes/watchlist"
          exactActiveClass="font-semibold text-indigo-400"
          class="hover:text-indigo-400"
        >
          Watchlist ({{ state.user.watchList.length }}) 👷‍♂️
        </RouterLink>
      </li>

      <li>
        <RouterLink
          to="/locations"
          activeClass="font-semibold text-indigo-400"
          class="hover:text-indigo-400"
          >Locations</RouterLink
        >
      </li>
    </ul>

    <div class="mt-auto mb-4">
      <div v-if="state.user">
        <RouterLink
          to="/settings"
          activeClass="font-semibold text-indigo-400"
          class="hover:text-indigo-400"
          >Settings</RouterLink
        >
        <p class="mt-4">{{ state.user.email }}</p>
        <button @click="logout" class="mt-2 btn--secondary">Logout</button>
      </div>
      <RouterLink
        v-else
        to="/auth/login"
        activeClass="font-semibold text-indigo-400"
        class="hover:text-indigo-400"
        >Login</RouterLink
      >
    </div>
  </nav>
</template>
