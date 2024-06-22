<script setup lang="ts">
import { RouterLink } from "vue-router";
import { computed, ref } from "vue";
import { useAuthState } from "../data/useAuthState";
import { useEmailValidation } from "../../useEmailValidation";

const { login } = useAuthState();

const email = ref("test@test.pl");
const password = ref("testtest");

const emailError = computed(() => {
  return !useEmailValidation(email.value);
});

const passwordError = computed(() => {
  return password.value.length < 6;
});

function onSubmit() {
  if (emailError.value || passwordError.value) {
    return;
  }

  login(email.value, password.value);
}
</script>

<template>
  <form
    class="bg-white p-8 rounded shadow-md w-full max-w-md"
    @submit.prevent="onSubmit"
  >
    <div class="mb-4">
      <label for="email" class="block text-gray-700">Email</label>
      <input id="email" type="email" v-model="email" class="mt-1 input" />
      <div v-if="emailError" class="form-control__error">
        Valid email is required
      </div>
    </div>
    <div class="mb-4">
      <label for="password" class="block text-gray-700">Password</label>
      <input id="password" type="password" v-model="password" class="input" />
      <div v-if="passwordError" class="form-control__error">
        Password is required
      </div>
    </div>
    <RouterLink to="/auth/reset" class="link mb-4 block"
      >Password lost?</RouterLink
    >
    <div class="flex items-center justify-between mb-6">
      <button type="submit" class="btn--primary">Login</button>
      <RouterLink to="/auth/register" class="link">Register</RouterLink>
    </div>
  </form>
</template>
