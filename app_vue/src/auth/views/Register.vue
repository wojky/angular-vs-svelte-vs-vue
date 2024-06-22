<script setup lang="ts">
import { computed, ref } from "vue";
import { register } from "../data/useAuthApi";
import { useEmailValidation } from "@/useEmailValidation";
import FormErrorContainer from "@/components/FormErrorContainer.vue";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const acceptPolicy = ref(false);
const subscription = ref(false);

const emailError = computed(() => {
  return !useEmailValidation(email.value);
});
const passwordError = computed(() => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
  return !passwordRegex.test(password.value);
});

const confirmPasswordError = computed(() => {
  return password.value !== confirmPassword.value;
});

const acceptPolicyError = computed(() => !acceptPolicy.value);

async function onSubmit() {
  await register(email.value, password.value, subscription.value);

  displaySuccessRegisterMessage.value = true;
}

const displaySuccessRegisterMessage = ref(false);
</script>

<template>
  <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-900">Register</h2>

    <p v-if="displaySuccessRegisterMessage">
      Great! Now go to your mailbox and confirm sign up!
    </p>
    <form v-else @submit.prevent="onSubmit">
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input id="email" type="email" v-model="email" class="input" />
        <FormErrorContainer :hasError="emailError">
          Invalid email address
        </FormErrorContainer>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input id="password" type="password" v-model="password" class="input" />
        <FormErrorContainer :hasError="passwordError">
          Password must be at least 6 characters long, include a number and a
          special character
        </FormErrorContainer>
      </div>
      <div class="mb-4">
        <label for="confirmPassword" class="block text-gray-700"
          >Confirm Password</label
        >
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <FormErrorContainer :hasError="confirmPasswordError">
          Passwords do not match
        </FormErrorContainer>
      </div>

      <div class="mb-6">
        <div class="flex items-center">
          <label class="switch">
            <input type="checkbox" v-model="acceptPolicy" />
            <span class="slider"></span>
          </label>
          <span class="ml-3 text-gray-700">Accept Service Policy</span>
        </div>
        <FormErrorContainer :hasError="acceptPolicyError">
          You must accept the service policy
        </FormErrorContainer>
      </div>

      <div class="mb-6 flex items-center">
        <label class="switch">
          <input type="checkbox" v-model="subscription" />
          <span class="slider"></span>
        </label>
        <span class="ml-3 text-gray-700">Subscribe to Newsletter</span>
      </div>

      <div class="flex items-center justify-between">
        <button type="submit" class="btn--primary">Register</button>
        <RouterLink
          to="/auth/login"
          class="text-indigo-500 hover:underline cursor-pointer"
          >Login</RouterLink
        >
      </div>
    </form>
  </div>
</template>
