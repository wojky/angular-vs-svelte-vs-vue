<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import AppLayout from "./components/layout/Layout.vue";
import { onMounted } from "vue";
import { verifyToken, watchAuthStatus } from "./auth/data/useAuthState";

const router = useRouter();

onMounted(() => {
  watchAuthStatus(router);
  verifyToken();
});
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<style scoped></style>
