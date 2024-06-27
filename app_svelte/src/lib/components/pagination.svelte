<script>
	import { createEventDispatcher } from 'svelte';

	export let currentPage = 0;
	export let totalPages = 0;

	const dispatch = createEventDispatcher();

	function previousPage() {
		if (currentPage > 1) {
			dispatch('pageChange', {
				page: currentPage - 1
			});
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			dispatch('pageChange', {
				page: currentPage + 1
			});
		}
	}
</script>

<div class="flex items-center justify-between p-4 bg-white rounded shadow mt-8 w-full">
	<button
		on:click={previousPage}
		disabled={currentPage === 1}
		class="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
	>
		Previous
	</button>

	<div class="text-gray-700">
		Page {currentPage} of {totalPages}
	</div>

	<button
		on:click={nextPage}
		disabled={currentPage === totalPages}
		class="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
	>
		Next
	</button>
</div>
