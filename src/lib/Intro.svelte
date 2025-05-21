<script>
    let {language="en"} = $props() ;
    let introText = $state("");
    let theIntro = $state({});
    let index = $state(0);
    let arrayString = $state([]);
    function type() {
      setTimeout(() => {index++;
        type()}, 100 + Math.random() * 520);
    }

   $effect(() => fetch("lessons/" + language + "/intro.json").then(
    (resp) => { theIntro = resp.json();
        theIntro.then((intro) => {
          index = 0;
          arrayString = intro.text.split(/(<.*?>)|/).filter(Boolean);
          type();
        })}));
</script>
<main>
  {#await  theIntro}
  <div> waiting..</div>
  {:then text}
    <div><span class="typed">{@html arrayString.slice(0, 1+(index % arrayString.length)).join("")}</span><span class="untyped">{@html arrayString.slice(1+(index  % arrayString.length)).join("")}</span></div>
{:catch error}
<span> catching went wrong: `{error.message}`</span>
{/await}
<div class="footer">
  <a href="https://www.github.com/dr-jerry/sveltype">Source Code</a>
</div>
</main>
<style>
  .typed {
    color: #000000;
  }
  .untyped {
    color: #BBBBBB;
  }
  .footer {
    margin-top: 2.5em;
  }
</style>