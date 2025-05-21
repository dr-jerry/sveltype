<script>

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
   
  export let configs;
  export let selected;
  let lanlayout = "";
  let lessons = [];
  $: fetch("/lessons/" + lanlayout + "/lessons.json", {cache: "no-cache"})
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
.typewriter.menu {
  font-family: Typewriter, monospace;
  cursor: pointer;
}
.header {
  text-align: left;
  font-size: 1.7em;
  padding-left: 1.2em;
}
.lanlayout{
  text-align: left;
  font-size: 1.9em;
}
.descript {
  text-align: left;
   font-size: 1.4em;
   padding-left: 2.5em;
   margin: 0.3em;
}

.selected::before {
  content: ">";
  }
  .selected::after {
    content: "<"
  }

</style>
<div class="typewriter menu">
{#each configs as config}
	<div class="lanlayout" on:click={e => lanlayout = (lanlayout === config.id ? "" : config.id)}>{config.txt}</div>
  {#if  lanlayout === config.id}
    {#await lessons}
	    <p>...waiting</p>
    {:then list}
      {#each list as item}
        <div class="course">
          <div class="header" on:click={e => choosen === item.name ? choosen = "" : choosen = item.name}>{item.name}</div>
          {#if item.name === choosen}
            {#each item.courses as course}
             <div class="detail">
                <div class="descript" class:selected={selected===course.name} on:click={(e) => dispatch('showCourse', {"course": course, "layout": lanlayout.substring(lanlayout.indexOf("\/")+1)})}>{course.name}</div>
              </div>
            {/each}
          {/if}
        </div>
      {/each}
    {:catch error}
	    <p style="color: red">{error.message}</p>
    {/await}
  {/if}
{/each}
</div>