<script>
	export let speed;
    export let errors;
	export let radius=50;
    let delta, point, pointr;
    const deltaR = -10;
	$: point = calculateDelta(1/6, speed, errors, radius);


    let calculateM = (d,f) => `${20-d*Math.cos(f*Math.PI)} ${70 + d* Math.sin(Math.PI * f)}`;
	function calculateDelta(a0, a1, errors, rad) {
        console.log("velo in gauge is " + a1);
		let ang0 = 2* a0 * Math.PI;
		let ang1 = 1.8 * a1 * Math.PI + ang0;
        let angr = 1.8 * errors * Math.PI + ang0;
        console.log("errors is " + errors + "ang r2 is " + angr);    
		let result = {x: rad * (Math.sin(ang0) - Math.sin(ang1))
									, y: rad * ( Math.cos(ang1) - Math.cos(ang0)), l: (ang1-ang0) > Math.PI ? 1 : 0
                      ,errors: {x: (rad + deltaR) * (Math.sin(ang0) - Math.sin(angr))
								, y: (rad + deltaR) * ( Math.cos(angr) - Math.cos(ang0)), l: (angr-ang0) > Math.PI ? 1 : 0}};
		return result;
	}
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
			<path d="M {calculateM(0,1/6)} a {radius} {radius} 0 {point.l} 1 {point.x} {point.y} " stroke="green" 
         stroke-width="4" fill="none"/>
         <path d="M {calculateM(deltaR,1/6)} a {radius + deltaR} {radius + deltaR} 0 {point.errors.l} 1 {point.errors.x} {point.errors.y} " stroke="red" 
         stroke-width="4" fill="none"/>
</svg>
