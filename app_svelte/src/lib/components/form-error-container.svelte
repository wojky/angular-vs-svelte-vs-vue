<script lang="ts">
	export let control: { invalid: boolean; touched: boolean };
	export let message: string;
</script>

{#if control && control.invalid && control.touched}
	<div class="form-control__error">
		<slot>{message}</slot>
	</div>
{/if}
