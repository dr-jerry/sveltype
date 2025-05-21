<script>
    export let nr;
    export let direction; // only use 1 or -1 indicates direction.
    export let dure=200;
      var nh;
  
      function roll(node, { delay = 1,
                                               duration= dure}) {
          return {
              delay: delay,
              duration: duration,
              css: t => `margin-top: ${-nh/3 + direction*(t-1) * nh/3}px`
          }
      }
  </script>
  <style>
  .middle {
      margin-left: 0px;
      margin-top: var(--scroll);
  }
  </style>
  <div class="middle" out:roll bind:clientHeight={nh} style="--scroll:{-nh/3}px">
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