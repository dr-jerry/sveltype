<script>
  import Row from "./Row.svelte";
  import { courseLive, statStore, errors, velocity, totalHits, actionStore } from './actionstore.js';
  import Gauge from "./Gauge.svelte";
  import ODO from "./ODO.svelte";
  let {course, courseText} = $props();

  let char2Class = {};
  let wordText = "";
  let wordList = [];
  let theLayout = $state([]);
  function toggleCrossHairs(evt) {
    actionStore.update((as) => ({...as, ...{showCrossHairs: !as.showCrossHairs}}));
  }
  console.log("in Course: " + JSON.stringify(course));
  fetch("layouts/" + course.layout + ".json").then(
    (resp) => { theLayout = resp.json();
        theLayout.then(lt => {
        lt.forEach(row => row.map(key => 

        key.keys.filter(label => label).map(label => {
          if (label.match(/[A-Z]/)) {
            char2Class[label.toLowerCase()] = `${key["class"]} ${key.parentClass}`
          }
          if (label !== ' ') char2Class[label] = `${key["class"]} ${key.parentClass}`})))})});
</script>

<div class="course">
  <div class="description" style="--description-height: {$courseLive ? 2 : 9}em">
  {#if typeof course.course.description === 'string' }
    {@html course.course.description}
  {:else}
    {@html course.course.description.join('')}
  {/if}
 </div>
 <div class="keyboard">
  {#await theLayout}
    <p class="waiting">...Waiting</p>
  {:then rows}
    <div class="type input text">
      <div class="gauge"><Gauge speed={$velocity/8} errorrate={$errors / $totalHits}/>
        <div class="odo"><ODO value={courseText.length}/></div></div> 
        <div class="focus {char2Class[courseText[0]]}">{@html courseText[0] === " " ? "&nbsp;" : courseText[0]}</div>{courseText.substring(1)}
        <div class="key target pointer" onclick={(evt) => {toggleCrossHairs(evt)}}>
          {#if $actionStore.showCrossHairs}
          hide
          {:else}show
        {/if}</div>
    </div>
    <div id="rows"> 
    {#each rows as row}
      <Row rowData={row}/>
    {/each}
    </div>
  {:catch error}<p>error{error.message}</p>
  {/await}
  </div>
  </div>


<style>
  .pointer {
    cursor: pointer;
  }
  .odo {
    font-size: 0.7em;
  }
  .focus {
      width: 0.9em;
      padding-bottom: -0.05em;
      border: 1px solid black;
      display: inline-block;
  }
  .course {
    width: 85%;
    font-family: TypeWriter;
    overflow: hidden
  }
  .focus.rh {
    border-right: 3px solid #CC44BB;
  }
  .focus.lh {
    border-left: 3px solid #CC44BB;
  }
  .course .description {
    font-family: monospace;
    font-size: 1.9em;
    text-align: left;
    max-height: var(--description-height);
    overflow-y: scroll;
    color: #000000;
    transition-property: max-height;
    transition-duration: 1.5s;
  }
  .gauge {
    float: left;
    display: inline-block;
    width: 3em;
    height: 1.5em;
  }  .input {
    white-space: nowrap;
    font-family: Typewriter;
    font-size: 2.2em;
    height: 3.2em;
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 0.1em;
    padding-top: 0.6em;
    padding-bottom:0.6em;
    padding-left: 0.4em;
    border: 1px black solid;
    border-radius: 6pt;
    overflow: hidden;
  }
  .key.target {
    color: #AAAAAA;
    margin-top: 0.2em;
    float: right;
    background-image: url(/img/vizier.svg);
    background-position: 50% 30%;
    background-repeat: no-repeat;
    display: block;
  }

  .focus.pink {
        background-color: #ffb6c1;
    }
    .focus.rf {
        background-color: #eee8aa
    }
    .focus.mf {
        background-color: #e7d0b0;
    }
    .focus.if {
        background-color: #7fffd4;
    }
    .focus.thum {
        background-color: #a9a9a9;
    }
    
</style>
