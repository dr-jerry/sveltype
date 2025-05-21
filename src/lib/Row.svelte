<script>
  import Key from "./Key.svelte";
  let {rowData} = $props();
  console.log("row : " + rowData);
</script>
<style>
  .row {
    width: 100%;
  }
</style>
<div class="row">
{#each rowData as key}
<Key keyData={key}/>
{/each}
</div>