<script>
	import Link from '$lib/components/link.svelte';
	import { useAuthStore } from './auth/useAuthState';
	import { useUserState } from './auth/useUserState';

	const store = useUserState();
	const { logout } = useAuthStore();
</script>

<nav class="flex flex-col h-full bg-gray-800 text-white p-4 min-w-40">
	<ul class="space-y-4">
		<li>
			<Link href="/characters">Characters</Link>
		</li>
		<li>
			<Link href="/episodes">Episodes</Link>
		</li>
		{#if $store}
			<li>
				<Link href="/episodes/watchlist">Watchlist ({$store.watchList.length}) 👷‍♂️</Link>
			</li>
		{/if}

		<li>
			<Link href="/locations">Locations</Link>
		</li>
	</ul>

	<div class="mt-auto mb-4">
		{#if $store}
			<Link href="/settings">Settings</Link>
			<p class="mt-4">{$store.email}</p>
			<button on:click={logout} class="mt-2 btn--secondary"> Logout </button>
		{:else}
			<Link href="/auth">Login</Link>
		{/if}
	</div>
</nav>
