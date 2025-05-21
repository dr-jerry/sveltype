<script>  
  let {configs, selected, showCourse, setLang} = $props();

  let lanlayout = $state("");
  let lessons = $state([]);
  $effect(() => fetch("/lessons/" + lanlayout + "/lessons.json", {cache: "no-cache"})
      .then(resp => {lessons = resp.json();
        console.log("lessons is " + JSON.stringify(lessons))
      })
  );
  console.log("setLang : " + setLang + " show Course " + showCourse);
   
  let choosen= $state('');
</script>
<style>
@font-face {
  font-family: 'Typewriter';
  font-style: normal;
  font-weight: normal;
  color: #000000;
  src: url("/fonts/typewcond_regular.otf") format("opentype");
}
.typewriter.menu {
  font-family: Typewriter, monospace;
  font-size: 0.8em;
  cursor: pointer;
  color: #000000;
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
	<div class="lanlayout" onclick={e => {lanlayout = (lanlayout === config.id ? "" : config.id); setLang(config.id.slice(0,2));}}>{config.txt}</div>
  {#if  lanlayout === config.id}
    {#await lessons}
	    <p>...waiting</p>
    {:then list}
      {#each list as item}
        <div class="course">
          <div class="header" onclick={e => choosen === item.name ? choosen = "" : choosen = item.name}>{item.name}</div>
          {#if item.name === choosen}
            {#each item.courses as course}
             <div class="detail">
                <div class="descript" class:selected={selected===course.name} onclick={() => showCourse({"course": course, "layout": lanlayout.substring(lanlayout.indexOf("\/")+1)})}>{course.name}</div>
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