<script setup lang="ts">
import { computed, ref } from "vue";
import { resetCredentials } from "../data/useAuthApi";
import { useEmailValidation } from "@/useEmailValidation";
import FormErrorContainer from "../../components/FormErrorContainer.vue";

const email = ref("");
const displaySuccessResetMessage = ref(false);

const emailError = computed(() => {
  return !useEmailValidation(email.value);
});

async function reset() {
  if (emailError.value) {
    return;
  }

  resetCredentials(email.value).then(() => {
    displaySuccessResetMessage.value = true;
  });
}
</script>

<template>
  <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-900">
      Reset password
    </h2>

    <div v-if="displaySuccessResetMessage">
      <p>Password reset link has been sent to your email:</p>
      <p class="text-center">
        <strong>{{ email }}</strong>
      </p>
    </div>
    <div v-else>
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input id="email" type="email" v-model="email" class="input" />
        <FormErrorContainer :has-error="emailError">
          Invalid email address
        </FormErrorContainer>
      </div>

      <button @click="reset" class="btn--primary mb-4">Reset</button>

      <div class="flex items-center justify-between mb-6">
        <RouterLink to="/auth/login" class="link"
          >Already registered? Login</RouterLink
        >
        <RouterLink to="/auth/register" class="link">Need account?</RouterLink>
      </div>
    </div>
  </div>
</template>
