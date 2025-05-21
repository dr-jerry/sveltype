<script>
    import Number from "./Number.svelte";
    let {target = 0,  dure = 200} = $props();
    let current = $state(target);
    // tc 0  1  2  3  4  5  6  7  8  9  
    // 0  0  -1 -1 -1 -1  1  1  1  1  1   100-104
    // 1  1   0 -1  -1 -1 -1 1  1  1  1  12-15 c*10+t  c > t-5 && c < t+5
    // 2  1   1  0  -1 -1 -1 -1 1  1  1  23-26
    // 3  1   1  1  0  -1 -1 -1 -1 1  1  34-37
    // 4  1   1  1  1  0  -1 -1 -1 -1 1  45-48
    // 5  1   1  1  1  1  0  -1 -1 -1 -1 56-59   
    // 6  -1  1  1  1  1  1  0  -1 -1 -1  67-70        c
    // 7  -1 -1  1  1  1  1  1  0  -1 -1  71,78-80
    // 8  -1 -1 -1  1  1  1  1  1  0  -1  81,82 89,90
    // 9  -1 -1 -1 -1  1  1  1  1  1  0   91-93,100
    let delta = $derived.by(() => {
        let result;
        if (target === current) result = 0;
        else {
            result =  current < target  ?  (target - current <= 5 ?  1 : -1 ) 
                : ( current - target) >= 5 ? 1 : -1; 
        }
        return result;
    });

    function moveToTarget() {
        let id;
        if (delta) {
            id = setInterval(() => {
                if((current + delta) < 0) current+=10;current = Math.abs((current + delta) % 10)}, 200)
        }
        return () => {clearInterval(id)}
    };
    $effect(() => moveToTarget());
</script>
<div class="drum">
    <Number nr={current} direction={delta}/>
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