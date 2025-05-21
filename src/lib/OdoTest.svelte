<script>
	import ODO from "./ODO.svelte";
	let value = 0;
	let nrd = 4;
	let dure = 200
	function plus() {
		value = parseInt(value)+1;
	}
	function min() { value = parseInt(value) > 0 ? parseInt(value)-1 : parseInt(value)}
	function plusnrd() { nrd = nrd +1}
	function minrd() { nrd = nrd -1}
</script>

<h1>Old fashioned odo meter</h1>
with rolling digits, maybe you have seen it in old cars or tapedecks.<br>

the number: <input type="text" bind:value={value}/><span on:click={plus}>&#x21e7;</span>&nbsp;<span on:click={min}>&#x21e9;</span><br>
nr of digits {nrd} <span on:click={plusnrd}>&#x21e7;</span>&nbsp;<span on:click={minrd}>&#x21e9;</span>
<br>
nummer is {value}
<ODO {value} nrDigits={nrd} {dure}/>