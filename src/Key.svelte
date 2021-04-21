<script>
    import { actionStore } from './actionstore.js';
    export let keyData = {};
    let focus = false;
    export const stats = {}
    
    // const unsubscribe = actionStore.subscribe(keyAction => {
    //    focus = keyAction.focus && keyData.keys.includes(keyAction.focus.toUpperCase());
    //    if (keyAction.expected && (keyData.keys.includes(keyAction.expected.toUpperCase())  
    //      || keyData.keys.includes(keyAction.typed.toUpperCase()))) {
    //        console.log("clicked " + keyData.keys[0] + " " + keyAction.typed)
    //    }
    // });

</script>
<style>
    .wrapper {
        display: inline-block;
        width: 7%;
    }
    .key {
        margin:  0.313em;
        padding-bottom: 0.33em;
        border: 2px solid #999999;
        border-radius: 5px;
        height: 100%;
    }
    .pink {
        background-color: #ffb6c1;
    }
    .rf {
        background-color: #eee8aa
    }
    .mf {
        background-color: #e7d0b0;
    }
    .if {
        background-color: #7fffd4;
    }
    .thum {
        background-color: #a9a9a9;
    }
    .lh {
        background-color: #ffeeee;
    }
    .wrapper.space{
        width: 45%;
    }
    .wrapper.bksp, .wrapper.tab {
        width: 8%;
    }
    .wrapper.caps {
        width: 7%;
    }
    .wrapper.enter {
        width: 8%;
    }
    .wrapper.shift {
        width: 8%;
    }
    .wrapper.alt, .wrapper.ctrl {
        width: 7%;
    }
    .lh.right {
        box-shadow: 4px 0px 1px red;
    }
    .expected {
        background-image: url(/img/vizier.svg);
        background-position: 50% 30%;
        background-repeat: no-repeat;
    }
    .bottom-k { height: 50%; width: 100%; vertical-align: bottom; }
    .top-k { height: 50%; width: 100%; vertical-align: baseline; }
</style>
<div class="wrapper {keyData.parentClass ? keyData.parentClass : 'niks'}">
   <div class="key {keyData.class ? keyData.class : ''}" class:expected={focus}>
        <div class="bottom-l">
            {@html (keyData.keys[0] === ' ' || !keyData.keys[0] ? "&nbsp;" : keyData.keys[0])}
        </div>
        <div class="bottom-k">
            {@html keyData.keys[1] || "&nbsp;"}
        </div>
    </div>
</div>
