<script>
	import { page } from '$app/stores';

	let activeClass = '';
	export let href = '';

	$: {
		$page.url.pathname === href ? (activeClass = ' active') : (activeClass = '');
	}
</script>

<a {href} class={'hover:text-indigo-400' + activeClass}><slot /></a>

<style>
	.active {
		@apply font-semibold text-indigo-400;
	}
</style>
