<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { useAuthStore } from '../useAuthState';

	const authStore = useAuthStore();

	let loginForm = {
		email: 'test@test.pl',
		password: 'testtest'
	};

	let touched = {
		email: false,
		password: false
	};

	let errors = {
		email: '',
		password: ''
	};

	function validateForm() {
		errors.email = '';
		errors.password = '';

		if (!loginForm.email) {
			errors.email = 'Valid email is required';
		} else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
			errors.email = 'Email address is invalid';
		}

		if (!loginForm.password) {
			errors.password = 'Password is required';
		} else if (loginForm.password.length < 6) {
			errors.password = 'Password must be at least 6 characters';
		}

		return !errors.email && !errors.password;
	}

	function onSubmit(event) {
		event.preventDefault();
		touched.email = true;
		touched.password = true;

		if (validateForm()) {
			console.log(loginForm.email, loginForm.password);
			authStore.login(loginForm.email, loginForm.password);
		}
	}
</script>

<form class="bg-white p-8 rounded shadow-md w-full max-w-md" on:submit={onSubmit}>
	<div class="mb-4">
		<label for="email" class="block text-gray-700">Email</label>
		<input
			id="email"
			type="email"
			bind:value={loginForm.email}
			class="mt-1 input"
			on:blur={() => (touched.email = true)}
		/>
		{#if errors.email && touched.email}
			<div class="form-control__error">{errors.email}</div>
		{/if}
	</div>
	<div class="mb-4">
		<label for="password" class="block text-gray-700">Password</label>
		<input
			id="password"
			type="password"
			bind:value={loginForm.password}
			class="input"
			on:blur={() => (touched.password = true)}
		/>
		{#if errors.password && touched.password}
			<div class="form-control__error">{errors.password}</div>
		{/if}
	</div>
	<a href="/auth/reset" class="link mb-4 block">Password lost?</a>
	<div class="flex items-center justify-between mb-6">
		<button type="submit" class="btn--primary">Login</button>
		<a href="/auth/register" class="link">Register</a>
	</div>
</form>
