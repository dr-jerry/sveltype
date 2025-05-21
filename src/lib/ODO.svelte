<script>
	import OdoDrum from "./OdoDrum.svelte";
	export let value;
	export let nrDigits = 4;
	export let dure = 200;
  function split(number) {
      return Array.from(number.toString().padStart(nrDigits, '0'));
	}
</script>
<div class="total">
	  {#each split(value) as newNumber}
			<OdoDrum {newNumber} {dure}/>
		{/each}
</div>
<style>
  .total {
		display: block;
		margin: 5px;
  }
</style>
