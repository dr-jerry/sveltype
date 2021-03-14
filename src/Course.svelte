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
    width: 100%;
    font-family: Typewriter;
    font-size: 2.2em;
  }
</style>
