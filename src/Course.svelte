<script>
  import Row from "./Row.svelte";
  import { statStore, errors, velocity } from './actionstore.js';
  import Gauge from "./Gauge.svelte";
  export let theCourse;
  export let courseText;
  let theLayout = [];
  fetch("layouts/" + theCourse.layout + ".json").then(
    (resp) => (theLayout = resp.json())
  );
</script>

<div class="course">
  <div class="description">
  {#if typeof theCourse.course.description === 'string' }
    {@html theCourse.course.description}
  {:else}
    {@html theCourse.course.description.join('')}
  {/if}
 </div>
 <div class="keyboard">
  {#await theLayout}
    <p class="waiting">...Waiting</p>
  {:then rows}
    <div class="type input text">
      <div class="gauge"><Gauge speed={$velocity/8} errors={$errors/20}/></div>
        <span class="focus">{@html courseText[0] === " " ? "&nbsp;" : courseText[0]}</span>{courseText.substring(1)}
    </div>
    {#each rows as row}
      <Row rowData={row}/>
    {/each}
  {:catch error}<p>error{error.message}</p>
  {/await}
  </div>
</div>


<style>
  .focus {
      padding-bottom: -0.05em;
      background-color: #CC44BB;
      border-bottom: 2px solid #CC4444;
  }
  .course {
    width: 85%;
    font-family: TypeWriter;
  }
  .course .description {
    font-size: 1.9em;
    text-align: left;
  }
  .gauge {
    float: left;
    display: inline-block;
    width: 3em;
    height: 3em;
  }
  .input {
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
</style>
