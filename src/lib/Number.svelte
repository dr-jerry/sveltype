<script>
    let {nr, direction, dure=200} = $props();

    const dy = -2;
    let nh = $state();
  
      function roll(node, { delay = 0, duration= dure}) {
          return {
              delay: delay,
              duration: duration,
              css: (t) => `margin-top: ${1*(-nh/3 + dy - direction*(t) * nh/3)}px`
          }
      }
  </script>
  <style>
  .middle {
      margin-left: 0px;
      margin-top: var(--scroll);
  }
  </style>

  {#key direction}
  <div class="middle" in:roll = {{duration:200}} bind:clientHeight={nh} style="--scroll:{1*(-nh/3 + dy)}px">
      <div>
              {nr-direction >= 0 ? nr - direction % 10 : 9}
      </div>
      <div>
              {nr}
      </div>
      <div>
              {nr+direction >= 0 ? nr + direction % 10 : 9}
      </div>
  </div>
  {/key}