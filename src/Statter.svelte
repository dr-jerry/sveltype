<script>
    import { statStore, errors, velocity } from './actionstore.js';
    let wrongScore = 10;
    let jsonStats
    let wrapper;
    const unsubscribe = statStore.subscribe(stats => {
        console.log("statter data " + JSON.stringify(stats))
        console.log("wrong score " + wrongScore);
        wrongScore = (stats.missed || []).length;
        console.log(JSON.stringify(wrapper));
    });
</script>
<style>
    .speed {
        float: left;
        background-color: green;
        width: var(--speed-width);
        margin: 0.5em;
        height: 0.2em;
    }

 </style>
<div class="wrapper" bind:this={wrapper}>
    <div class="speed" style="--speed-width: {10 * $velocity}%">&nbsp;</div>
    speed: {$velocity} errors: {$errors} 
 </div>
