<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import Sidebar from './sidebar.svelte';
	import { useAuthStore } from './auth/useAuthState';
	import { useEpisodesStore } from './episodes/useEpisodesStore';

	useAuthStore().init();
	useEpisodesStore().init();
</script>

<div class="layout">
	<header class="bg-gray-900 text-white text-center py-4">
		<h1 class="text-3xl font-bold">Rick And Morty Universum</h1>
	</header>

	<div>
		<Sidebar />
		<main class="p-4">
			<slot />
		</main>
	</div>
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.layout > div {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	main {
		flex-grow: 1;
		overflow-y: auto;
		height: 100%;
		@apply bg-gray-100;
	}
</style>
