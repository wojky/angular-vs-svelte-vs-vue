<script lang="ts">
	import { writable } from 'svelte/store';
	import FormErrorContainer from '$lib/components/form-error-container.svelte';
	import { register } from '../auth.backend';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let confirmPassword = '';
	let acceptPolicy = false;
	let subscribeNewsletter = false;
	let displaySuccessRegisterMessage = writable(false);

	let touched = {
		email: false,
		password: false,
		confirmPassword: false,
		acceptPolicy: false
	};

	let errors = {
		email: '',
		password: '',
		confirmPassword: '',
		acceptPolicy: ''
	};

	function validateForm() {
		errors.email = '';
		errors.password = '';
		errors.confirmPassword = '';
		errors.acceptPolicy = '';

		if (!email) {
			errors.email = 'Invalid email address';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Invalid email address';
		}

		if (!password) {
			errors.password = 'Password is required';
		} else if (password.length < 6) {
			errors.password = 'Password must be at least 6 characters long';
		} else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
			errors.password = 'Password must include a number and a special character';
		}

		if (password !== confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		if (!acceptPolicy) {
			errors.acceptPolicy = 'You must accept the service policy';
		}

		return !errors.email && !errors.password && !errors.confirmPassword && !errors.acceptPolicy;
	}

	async function onSubmit(event: any) {
		event.preventDefault();
		touched.email = true;
		touched.password = true;
		touched.confirmPassword = true;
		touched.acceptPolicy = true;

		if (validateForm()) {
			try {
				await register(email, password, subscribeNewsletter);
				displaySuccessRegisterMessage.set(true);
			} catch (error) {
				console.error('Registration failed:', error);
			}
		}
	}
</script>

<div class="bg-white p-8 rounded shadow-md w-full max-w-md">
	<h2 class="text-2xl font-bold mb-6 text-center text-gray-900">Register</h2>

	{#if $displaySuccessRegisterMessage}
		<p>Great! Now go to your mailbox and confirm sign up!</p>
	{:else}
		<form on:submit={onSubmit}>
			<div class="mb-4">
				<label for="email" class="block text-gray-700">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					class="input"
					on:blur={() => (touched.email = true)}
				/>
				<FormErrorContainer
					control={{ touched: touched.email, invalid: !errors.email }}
					message="Invalid email address"
				/>
			</div>
			<div class="mb-4">
				<label for="password" class="block text-gray-700">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					class="input"
					on:blur={() => (touched.password = true)}
				/>
				<FormErrorContainer
					control={{ touched: touched.password, invalid: !errors.password }}
					message="Password must be at least 6 characters long, include a number and a special character"
				/>
			</div>
			<div class="mb-4">
				<label for="confirmPassword" class="block text-gray-700">Confirm Password</label>
				<input
					id="confirmPassword"
					type="password"
					bind:value={confirmPassword}
					class="input"
					on:blur={() => (touched.confirmPassword = true)}
				/>
				<FormErrorContainer
					control={{ touched: touched.confirmPassword, invalid: !errors.confirmPassword }}
					message="Passwords do not match"
				/>
			</div>

			<div class="mb-6">
				<div class="flex items-center">
					<label class="switch">
						<input type="checkbox" bind:checked={acceptPolicy} />
						<span class="slider"></span>
					</label>
					<span class="ml-3 text-gray-700">Accept Service Policy</span>
				</div>
				<FormErrorContainer
					control={{ touched: touched.acceptPolicy, invalid: !errors.acceptPolicy }}
					message="You must accept the service policy"
				/>
			</div>

			<div class="mb-6 flex items-center">
				<label class="switch">
					<input type="checkbox" bind:checked={subscribeNewsletter} />
					<span class="slider"></span>
				</label>
				<span class="ml-3 text-gray-700">Subscribe to Newsletter</span>
			</div>

			<div class="flex items-center justify-between">
				<button type="submit" class="btn--primary">Register</button>
				<a href="/auth/login" class="text-indigo-500 hover:underline cursor-pointer">Login</a>
			</div>
		</form>
	{/if}
</div>
