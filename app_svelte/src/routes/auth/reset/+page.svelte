<script lang="ts">
	import { writable } from 'svelte/store';
	import FormErrorContainer from '$lib/components/form-error-container.svelte';
	import { resetCredentials } from '../auth.backend';

	let email = '';
	let touched = false;
	let displaySuccessResetMessage = writable(false);
	let errorMessage = '';

	function validateEmail(email: string) {
		return /\S+@\S+\.\S+/.test(email);
	}

	async function reset() {
		touched = true;
		errorMessage = '';

		if (!validateEmail(email)) {
			errorMessage = 'Invalid email address';
			return;
		}

		try {
			await resetCredentials(email);
			displaySuccessResetMessage.set(true);
		} catch (error) {
			console.error('Failed to reset credentials:', error);
			errorMessage = 'Failed to send reset link';
		}
	}
</script>

<div class="bg-white p-8 rounded shadow-md w-full max-w-md">
	<h2 class="text-2xl font-bold mb-6 text-center text-gray-900">Reset password</h2>

	{#if $displaySuccessResetMessage}
		<p>Password reset link has been sent to your email:</p>
		<p class="text-center">
			<strong>{email}</strong>
		</p>
	{:else}
		<div class="mb-4">
			<label for="email" class="block text-gray-700">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				class="input"
				on:blur={() => (touched = true)}
			/>
			{#if touched && errorMessage}
				<FormErrorContainer message={errorMessage} control={{ touched, invalid: !errorMessage }}
				></FormErrorContainer>
			{/if}
		</div>

		<button on:click={reset} class="btn--primary mb-4">Reset</button>

		<div class="flex items-center justify-between mb-6">
			<a href="/auth/login" class="link">Already registered? Login</a>
			<a href="/auth/register" class="link">Need account?</a>
		</div>
	{/if}
</div>
