<script>
    export let nr;
    export let dure=200;
	var nh;

    function rollNumbers(s, e) {
      return Array((s>e ? e +10 : e)-s+1).fill().map((_, i) => (s+i) % 10)
    }
	  	
    function roll(node, { delay = 1,
                            duration= dure}) {
        return {
            delay: delay,
            duration: duration,
            css: t => `margin-top: ${-nh/3 -(1-t) * nh/3}px`
        }
    }
</script>
<style>
.middle {
	margin-left: 0px;
	margin-top: var(--scroll);
}
</style>
<div class="middle" out:roll bind:clientHeight={nh} style="--scroll:{-nh/3}px">
	<div>
			{nr-1 % 10}
	</div>
    <div>
			{nr}
	</div>
	<div>
			{nr+1 % 10 }
	</div>
</div>

