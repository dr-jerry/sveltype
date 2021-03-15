<script>
    import { actionstore } from './actionstore.js';
    export let keyData = {};
    let focus = false;
    console.log("keyData = " + JSON.stringify(keyData));
    export const stats = {}
    function keyClick (key) {
        if (key.clicked == keyData.key) {
            console.log('klick' + JSON.stringify(key))
        }
    }
    
    const unsubscribe = actionstore.subscribe(keyAction => {
        console.log("keydata " )
       focus = keyAction.focus && keyData.keys.includes(keyAction.focus.toUpperCase());
       if (keyAction.expected && (keyData.keys.includes(keyAction.expected.toUpperCase())  
         || keyData.keys.includes(keyAction.typed.toUpperCase()))) {
           console.log("clicked " + keyData.keys[0] + " " + keyAction.typed)
       }
    });

</script>
<style>
    .key{
        width: 5%;
        margin:  0.313em;
        border: 2px solid #999999;
        border-radius: 5px;
        display: inline-block;
    }
    .key.space{
        width: 45%;
    }
    .key.bksp, .key.tab {
        width: 8%;
    }
    .key.caps {
        width: 9%;
    }
    .key.enter {
        width: 10%;
    }
    .key.shift {
        width: 12%;
    }
    .key.alt, .key.ctrl {
        width: 7%;
    }
    .expected {
        background-image: url(/img/vizier.svg);
        background-position: center;
        background-repeat: no-repeat;
    }
    .bottom-k { height: 50%; width: 100%; vertical-align: bottom; }
    .top-k { height: 50%; width: 100%; vertical-align: baseline; }
</style>
<div class="key {keyData.special ? keyData.class : ''}" class:expected={focus}>
    <div class="bottom-l">
        {@html keyData.keys[0] || "&nbsp;"}
    </div>
    <div class="bottom-k">
        {@html keyData.keys[1] || "&nbsp;"}
    </div>
</div>
