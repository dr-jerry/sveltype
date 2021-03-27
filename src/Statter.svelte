<script>
    import {statStore} from './actionstore.js';
    let wrongScore = 10;
    let jsonStats
    const unsubscribe = statStore.subscribe(stats => {
        console.log("statter data " + JSON.stringify(stats))
        console.log("wrong score " + wrongScore);
        wrongScore = (stats.missed || []).length;
        jsonStats = JSON.stringify(stats);
    });
</script>
<style>
 </style>
<div class="wrapper">
    {jsonStats}
 </div>
