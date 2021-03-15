<script>
  import Row from "./Row.svelte";
  export let theCourse;
  export let courseText;
  let theLayout = [];
  fetch("layouts/" + theCourse.layout + ".json").then(
    (resp) => (theLayout = resp.json())
  );
</script>

<div class="course description">
  {theCourse.course.description}
</div>
<div class="course keyboard">
  {#await theLayout}
    <p class="waiting">...Waiting</p>
  {:then rows}
    <div class="type input text">{courseText}</div>
    {#each rows as row}
      <Row rowData={row}/>
    {/each}
  {:catch error}<p>error{error.message}</p>
  {/await}
</div>

<style>
  .course.description {
    width: 30em;
    margin: 0 auto;
  }
  .input {
    white-space: nowrap;
    width: 100%;
    font-family: Typewriter;
    font-size: 2.2em;
    height: 2.2em;
    margin: 0.3em;
    padding: 0.1em;
    border: 1px black solid;
    border-radius: 6pt;
    overflow: hidden;
  }
</style>
