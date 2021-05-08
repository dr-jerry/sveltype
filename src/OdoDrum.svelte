<script>
    import Number from "./Number.svelte";
    export let newNumber = 0;
    export let dure = 200;
    let numbers = [parseInt(newNumber)];
    let direction = 0; // idea: if direction is 2 (or -2) drumdirection is constant.

    
    $: direction = drc(numbers[0], parseInt(newNumber), direction);
    $: numbers = rollNumbers(numbers[0], parseInt(newNumber));
    $: removeUntilLast(numbers);

	let drc =  (s, e,d) => s < e  ?  (e - s <= 5 ?  1 : -1 ) : ( s - e >= 5 ? 1 : -1);
    function rollNumbers(s, e) {
        if (s === e) { return [s];}
        else {
            let d = drc(s,e);
            if (d > 1) {
                // the drums can only roll up. Todo (d < -1) the drums can only roll down
                return Array((s>e ? e +10 : e)-s+1).fill().map((_, i) => (s+i) % 10);
            }
            // drums can go up or down depending on the distance of next number
            let sz = (d > 0 && e > s) || (d < 0 && e < s) ? Math.abs(e - s) + 1 : 10 - Math.abs( e-s) + 1
            return Array(sz).fill().map((_, i) => { 
                let n = (s+i*d);
                return n >= 0 ? n % 10 : 10 +n
            });
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
      <Number nr={number} {direction}/>
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