<script>
	import OdoDrum from "./OdoDrum.svelte";
	export let total;
	let nrDigits = 4;
  function split(number) {
      return Array.from(total.toString().padStart(nrDigits, '0'));
	}
</script>
<div class="total">
	  {#each split(total) as newNumber}
			<OdoDrum {newNumber}/>
		{/each}
</div>
<style>
  .total {
		display: block;
		margin: 5px;
  }
</style>
