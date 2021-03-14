<script>
  import Key from "./Key.svelte";
  export let rowData;
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