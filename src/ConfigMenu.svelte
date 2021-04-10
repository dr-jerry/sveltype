<script>
   import { createEventDispatcher } from 'svelte';
   const dispatch = createEventDispatcher();
   
   export let configs;
   export let selected;
   let lessons = [];
   let config = configs[0].id
   $: fetch("/lessons/" + config + "/lessons.json", {cache: "no-cache"})
      .then(resp => lessons = resp.json());
   
   let choosen='';
</script>
<style>
@font-face {
  font-family: 'Typewriter';
  font-style: normal;
  font-weight: normal;
  src: url("/fonts/typewcond_regular.otf") format("opentype");
}
.label {
  float: left;
  padding: 0.4em;
}
.space {
  margin-bottom: 1.5em;
  height: 1.3em;
}
.select {
  float: right;
  max-height: 100%;
  padding: 0.1em;
}
.header {
  text-align: left;
  font-size: 1.7em;
}
.contents {
  font-family: Typewriter, monospace;
  font-size: 1.5em;
}
.descript {
  text-align: left;
   font-size: 1.2em;
   padding-left: 2.5em;
}

.selected::before {
  content: ">";
  }
  .selected::after {
    content: "<"
  }

</style>
 <div class="space">
 <div class="label input">Language &amp; Layout</div><div class="select input"><select bind:value={config}>
  {#each configs as item}
	<option value={item.id}>
		{item.txt}
	</option>
  {/each}
</select>
</div>
</div>
<div class="contents">
{#await lessons}
	<p>...waiting</p>
{:then list}
{#each list as item}
<div class="course"><div class="header" on:click={e => choosen === item.row_id ? choosen = "" : choosen = item.row_id}>{item.name}</div>
{#if item.row_id === choosen}
{#each item.courses as course}
<div class="detail">
<div class="descript" class:selected={selected===course.name} on:click={(e) => dispatch('showCourse', {"course": course, "layout": config.substring(config.indexOf("\/")+1)})}>{course.name}</div>
</div>
{/each}
{/if}
</div>
{/each}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
</div>