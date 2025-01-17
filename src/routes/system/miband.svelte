
<script>

	import { Back } from 'svelte-touch-os/src/index.js'
	import MiBands from './../db.mibands.js'
	import { Any, Group, Button, Dropdown, Column, Block } from 'svelte-aui/src/index.js';

	import { info, overlay } from './../stores.js'
	export let data;

	let dropdown = {
		options: MiBands.map( (mi, index) => {
			return {
				...mi,
				label: `${mi.mac_address} (${mi.id})`
			}
		}), 
		placeholder: 'Select Miband',
		key: 'label', 
		grow: true,
		value: MiBands.indexOf( MiBands.find( mi => mi.id == $info.mibandNumber ) )
	}


	let triggerFinishSet = 0
	$: onFinishSet( triggerFinishSet ? 999 : 0 )

	function onFinishSet( triggerFinishSet ) {
		if (triggerFinishSet == 0 ) return

		setTimeout( () => {
			console.log(dropdown.value, MiBands.length)
			const newBand = MiBands[ dropdown.value - 1 ]
			if (newBand) {
				info.update( i => {
					i.mibandNumber = newBand.id
					i.mibandName = newBand.mac_address
					return i
				})
			}
			triggerFinishSet = 0
			overlay.set(null)
		}, 1000)
	}

	function setMiBand() {

		overlay.set( { type: 'wait', message: 'Resetting Midband (Demo)'} )
		triggerFinishSet += 10
	}

	let triggerFinishHR = 0
	$: onFinishHR( triggerFinishHR ? 999 : 0 )

	function onFinishHR( triggerFinishHR ) {
		if (triggerFinishHR == 0 ) return

		setTimeout( () => {

			overlay.set(null);
			triggerFinishHR = 0
		}, 1000)
	}

	function reconnectHR() {

		console.log('[Session] ⌚️  Miband reconnecting...');
		overlay.set( { type: 'wait', message: 'Reconnecting ' + $info.mibandName } )
		triggerFinishSet += 10
	}

	import ContentSave from "svelte-material-icons/ContentSave.svelte";
	import Refresh from "svelte-material-icons/Refresh.svelte";
	import Watch from "svelte-material-icons/Watch.svelte";

</script>

<Back href="/system" />
<Column className="p06 bt2-solid flex column" a={{grow:true}}>
	<div class="flex row" style="justify-content: space-between;">
		<div>MiBand</div>
		<div>{ $info.mibandName } ({$info.mibandNumber})</div>
	</div>
	<div class="flex row" style="justify-content: space-between;">
		<div>Status</div>
		<div>
			{ $info.mibandInitialised ? "Initialised" : "Uninitialised" } /
			{ $info.mibandConnected ? "Connected" : "Disconnected" }
		</div>
	</div>
	<Block a={{grow: false}} className="relative" style="position:relative">
		<div style="position:absolute;top:1.25em;left:1em">
			<Watch 
				size="1.4em" />
		</div>
		<Dropdown 
			style="min-height:4em"
			className="icon-inset aui-dropdown"
			bind:a={dropdown} />
	</Block>
	<Button a={{grow:true}} on:click={setMiBand}>
		<div class="centered">
			<ContentSave size="1.4em" />
			<div class="ml04">Save Changes</div>
		</div>
	</Button>
	<Button a={{grow:true}} on:click={reconnectHR}>
	
		<div class="centered">
			<Refresh size="1.4em" />
			<div class="ml04">Reconnect MiBand</div>
		</div>
	</Button>
</Column>