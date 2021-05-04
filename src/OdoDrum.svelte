<script>
    import Number from "./Number.svelte";
    export let newNumber = 0;
    export let dure = 200;
    let numbers = [newNumber];

    $: numbers = rollNumbers(numbers[0], newNumber);
    $: removeUntilLast(numbers);

    function rollNumbers(s, e) {
            if (s === e) return [s];
            else {
                var result = Array((s>e ? e +10 : e)-s+1).fill().map((_, i) => (s+i) % 10);
                return result;
            }
    }
    
    function removeUntilLast(nrs) {
        if (nrs.length > 1) {
            setTimeout((nrs) => {numbers = nrs.slice(1);focus = nrs[0]}, dure, numbers)
        }
    }
</script>
<div class="drum">
    {#each numbers.slice(0,1) as number (number)}
      <Number nr={number}/>
    {/each}
</div>
<style>
  .drum {
    display: inline-block;
    width: 0.6em;
    height: 1.1em;
    border: solid black 1px;
    overflow: hidden;
  }
</style>
    