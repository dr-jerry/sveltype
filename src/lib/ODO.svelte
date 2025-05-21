<script>
	import OdoDrum from "./OdoDrum.svelte";
	let {value, nrDigits = 4, dure = 200} = $props();
  function split(number) {
      return Array.from(number.toString().padStart(nrDigits, '0')).map((num) => parseInt(num, 10));
	}
</script>
<div class="total">
	  {#each split(value) as target}
			<OdoDrum  {target} {dure}/>
		{/each}
</div>
<style>
  .total {
		display: block;
		margin: 5px;
  }
</style>
