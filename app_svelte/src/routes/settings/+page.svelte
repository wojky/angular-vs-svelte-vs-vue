<script lang="ts">
	import { onMount } from 'svelte';
	import { updateSettings } from './useSettingsBackend';
	import { useUserState } from '../auth/useUserState';

	const userStore = useUserState();

	let userEmail: string;
	let settingsForm = {
		currentPassword: '',
		newPassword: '',
		confirmNewPassword: '',
		subscribeNewsletter: false
	};
	let errors = {
		currentPassword: '',
		newPassword: '',
		confirmNewPassword: ''
	};
	let touched = {
		currentPassword: false,
		newPassword: false,
		confirmNewPassword: false
	};

	const unsubscribe = userStore.subscribe((user) => {
		settingsForm.subscribeNewsletter = !!user?.subscribed;
	});

	onMount(() => {
		return () => {
			unsubscribe();
		};
	});

	function validateForm() {
		errors.currentPassword = '';
		errors.newPassword = '';
		errors.confirmNewPassword = '';

		if (!settingsForm.currentPassword) {
			errors.currentPassword = 'Current password is required';
		}
		if (!settingsForm.newPassword) {
			errors.newPassword = 'Password is required';
		} else if (settingsForm.newPassword.length < 6) {
			errors.newPassword = 'Password must be at least 6 characters long';
		} else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])/.test(settingsForm.newPassword)) {
			errors.newPassword = 'Password must include a number and a special character';
		}
		if (settingsForm.newPassword !== settingsForm.confirmNewPassword) {
			errors.confirmNewPassword = 'Passwords do not match';
		}

		return !errors.currentPassword && !errors.newPassword && !errors.confirmNewPassword;
	}

	async function onSubmit(event: any) {
		event.preventDefault();
		touched.currentPassword = true;
		touched.newPassword = true;
		touched.confirmNewPassword = true;

		if (validateForm()) {
			try {
				await updateSettings(settingsForm);
			} catch (error) {
				console.error('Failed to update settings:', error);
			}
		}
	}
</script>

<header class="bg-gray-900 text-white text-center py-4">
	<h1 class="text-3xl font-bold">Settings</h1>
</header>
<div class="flex-grow flex items-center justify-center">
	<div class="bg-white p-8 rounded shadow-md w-full max-w-md">
		<p class="text-center text-gray-700 mb-6">Email: {$userStore?.email}</p>
		<form on:submit={onSubmit}>
			<div class="mb-4">
				<label for="currentPassword" class="block text-gray-700">Current Password</label>
				<input
					id="currentPassword"
					type="password"
					bind:value={settingsForm.currentPassword}
					class="input"
					on:blur={() => (touched.currentPassword = true)}
				/>
				{#if errors.currentPassword && touched.currentPassword}
					<div class="form-control__error">{errors.currentPassword}</div>
				{/if}
			</div>
			<div class="mb-4">
				<label for="newPassword" class="block text-gray-700">New Password</label>
				<input
					id="newPassword"
					type="password"
					bind:value={settingsForm.newPassword}
					class="input"
					on:blur={() => (touched.newPassword = true)}
				/>
				{#if errors.newPassword && touched.newPassword}
					<div class="form-control__error">{errors.newPassword}</div>
				{/if}
			</div>
			<div class="mb-4">
				<label for="confirmNewPassword" class="block text-gray-700">Confirm New Password</label>
				<input
					id="confirmNewPassword"
					type="password"
					bind:value={settingsForm.confirmNewPassword}
					class="input"
					on:blur={() => (touched.confirmNewPassword = true)}
				/>
				{#if errors.confirmNewPassword && touched.confirmNewPassword}
					<div class="form-control__error">{errors.confirmNewPassword}</div>
				{/if}
			</div>
			<div class="mb-6 flex items-center">
				<label class="switch">
					<input type="checkbox" bind:checked={settingsForm.subscribeNewsletter} />
					<span class="slider"></span>
				</label>
				<span class="ml-3 text-gray-700">Subscribe to Newsletter</span>
			</div>
			<div class="flex items-center justify-between">
				<button type="submit" class="btn--primary">Update Settings</button>
			</div>
		</form>
	</div>
</div>
