<script>
    import { actionstore } from './actionstore.js';
     export let keyData = {};
    console.log("keyData = " + JSON.stringify(keyData));
    export const stats = {}
    function keyClick (key) {
        if (key.clicked == keyData.key) {
            console.log('klick' + JSON.stringify(key))
        }
    }
    
    const unsubscribe = actionstore.subscribe(keyAction => {
       if console.log("clicked " + keyData.keys[0] + " " + keyAction.typed)
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
    .bottom-k { height: 50%; width: 100%; vertical-align: bottom; }
    .top-k { height: 50%; width: 100%; vertical-align: baseline; }
</style>
<div class="key {keyData.special ? keyData.class : ''}">
    <div class="top-k">
        {@html keyData.keys[0] || "&nbsp;"}
    </div>
    <div class="bottom-k">
        {@html keyData.keys[1] || "&nbsp;"}
    </div>
</div>
