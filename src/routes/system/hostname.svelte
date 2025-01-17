
<script>
  import axios from 'axios'
  import { Back, Keyboard } from 'svelte-touch-os/src/index.js'
  import { Any, Group, Button, Dropdown, Column } from 'svelte-aui/src/index.js';

  import { info, overlay } from './../stores.js'
  export let data;

  let dropdown = {options: data, key: 'hostname'};
  let hostname;

  $: hostname = $info.colorName;

  function onChanged(e) {
    hostname = dropdown.options[dropdown.value].hostname;
  }
  function saveHostname( e ) {
    overlay.set( { type: 'wait', message: 'Setting Hostname to ' + e.detail } )

    triggerFinish = 1
  }

  let triggerFinish = 0
  $: onFinish( triggerFinish )

  function onFinish( triggerFinish ) {
    if (triggerFinish == 0 ) return

    setTimeout( () => {
      overlay.set( {
        type: 'success', 
        message: 'Hostname Successfully Set',
        actions: [
          ['System', '/system'],
          ['Home', '/'],
        ]
      })
      triggerFinish = 0
    }, 1000)
  }

</script>
<Back href="/system" />
<Column className="mlr06 keyboard-wrapper mb06" a={{grow: true}}>
  <Keyboard placeholder="Enter Hostname" text={hostname} on:submit={saveHostname} />
</Column>
