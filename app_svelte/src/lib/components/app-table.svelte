<script lang="ts" context="module">
	export type TableColumnDefinition<T> = {
		order: number;
		name: keyof T;
		title?: string;
		component?: any; // Svelte component
		computeValue?: (item: T) => string;
	};
</script>

<script lang="ts" generics="T extends { id: number }">
	export let data: T[] = [];
	export let config: TableColumnDefinition<T>[] = [];
</script>

<div class="grid-container" style:--num-columns={config.length}>
	{#each config as column (column.order)}
		<div class="grid-item bg-indigo-100 text-indigo-800 font-semibold">
			{column.title || column.name}
		</div>
	{/each}
</div>

{#each data as record (record.id)}
	<div class="grid-container mt-3" style:--num-columns={config.length}>
		{#each config as column (column.order)}
			<div class="grid-item">
				{#if column.component}
					<svelte:component this={column.component} {record} {column} />
				{:else}
					{column.computeValue ? column.computeValue(record) : record[column.name]}
				{/if}
			</div>
		{/each}
	</div>
{/each}

<style>
	.grid-container {
		--num-columns: 2;
		display: grid;
		grid-template-columns: repeat(var(--num-columns), 1fr);
		gap: 10px;
	}

	.grid-item {
		border: 1px solid #ccc;
		padding: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
