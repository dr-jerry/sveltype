<script>
	let { speed, errorrate, radius=40} = $props();
    let delta, pointr;
    const deltaR = -10;
	const point = $derived(calculateDelta(1/6, speed, errorrate, radius));


    let calculateM = (d,f) => `${20-d*Math.cos(f*Math.PI)} ${70 + d* Math.sin(Math.PI * f)}`;
	function calculateDelta(a0, a1, errors, rad) {
		let ang0 = 2* a0 * Math.PI;
		let ang1 = 1.8 * a1 * Math.PI + ang0;
        let angr = 1.8 * (1-errorrate) * Math.PI + ang0;
		let result = {x: rad * (Math.sin(ang0) - Math.sin(ang1))
									, y: rad * ( Math.cos(ang1) - Math.cos(ang0)), l: (ang1-ang0) > Math.PI ? 1 : 0
                      ,errors: {x: (rad + deltaR) * (Math.sin(ang0) - Math.sin(angr))
								, y: (rad + deltaR) * ( Math.cos(angr) - Math.cos(ang0)), l: (angr-ang0) > Math.PI ? 1 : 0}};
		return result;
	}
</script>
<style>
	.svgauge {
		width: 3em;
		height: 1.9em;
	}
	.errorrate {
		stroke-width: 4px;
		fill: none;
		stroke: var(--errorcolor);	
	}
</style>

<svg class="svgauge" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75">
	<path d="M {calculateM(0,1/6)} a {radius} {radius} 0 {point.l} 1 {point.x} {point.y} " stroke="green" 
         stroke-width="4" fill="none"/>
    <path d="M {calculateM(deltaR,1/6)} a {radius + deltaR} {radius + deltaR} 0 {point.errors.l} 1 {point.errors.x} {point.errors.y} " 
		 class="errorrate" style="--errorcolor: {"#"+Math.floor(errorrate*255).toString(16).padStart(2, '0')+Math.floor((1-errorrate)*255).toString(16).padStart(2, '0')+"02"}"/>
</svg>
