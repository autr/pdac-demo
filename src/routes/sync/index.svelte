<script>

	import axios from 'axios'
	import { onMount } from 'svelte'
	import { Button, Row, Column } from 'svelte-aui/src/index.js'
	import { Back } from 'svelte-touch-os/src/index.js'
	import { Memory } from 'svelte-touch-os/src/index.js'
	import { info, overlay } from './../stores.js'
	import CheckAll from "svelte-material-icons/CheckAll.svelte";

	import Sync from "svelte-material-icons/Sync.svelte";
	import TrashCan from "svelte-material-icons/TrashCan.svelte";
	
	let data = {}

	let localFiles = 0;

	let allowDanger = false;

	function checkAll() {

		overlay.set( { type: 'wait', message: 'Checking Drive (Demo)' } )
		
		checkAllTrigger += 1

	}

	let checkAllTrigger = 0

	function onCheckAll( trigger ) {

		if (checkAllTrigger == 0) return

		setTimeout( () => {

			data = {
				
				synced: parseInt( Math.random() * 32 ) + 4,
				unsynced: parseInt( Math.random() * 10 ) + 2,
				errors_while_checking: parseInt( Math.random() * 2 ) + 0,
				differences: true
			
			}

			localFiles = data.synced + data.unsynced
			overlay.set( null )
			allowDanger = true
			checkAllTrigger = 0

		}, 1000)
	}

	$: onCheckAll( checkAllTrigger )

	$: usb = {
		_used: 1000000000 + parseInt(Math.random() * 3000000000),
		_capacity: 35800000000
	};
	$: used = Memory( usb._used ).auto + ' (' + Memory(usb._capacity).auto + ')';
	$: available = Memory( usb._capacity - usb._used ).auto;

	onMount( async() => {
		checkAll();
	});

	function syncAll() {
		overlay.set( { type: 'wait', message: 'Syncing Files (Demo)' } )
		triggerFinish += 1
	}

	let triggerFinish = 0

	function finishSync( triggerFinish ) {

		if (triggerFinish == 0) return

		setTimeout( () => {

			overlay.set( { 
				type: 'success',
				message: data.unsynced + ' Uploaded (Demo)', 
				actions: [
					['Home', '/'],
					['Sessions', '/session'],
					['Sync', '/sync'],
			]});

			data.synced += data.differences
			data.differences = false
			data.unsynced = 0
			triggerFinish = 0
			
		}, 1000)
	}

	$: finishSync( triggerFinish ? 9999 : 0 )

	let endClearUp = 0


	$: onEndClearUp( endClearUp ? 9999 : 0 )

	function onEndClearUp( endClearUp ) {
		if (endClearUp == 0) return 

		setTimeout( () => {
			overlay.set( null )
			console.log('END CLEARUP')
			data.differences = false
			endClearUp = 0
			localFiles = 0
		}, 1000 )
	}


	function clearUp() {


		overlay.set( { type: 'wait', message: 'Deleting Local Files (Demo)' } );

		endClearUp += 10

	}

	$: renderInfo = {
		'Used Memory': used,
		'Available Memory': available,
		'Synced Files': data?.synced || 'None',
		'Unsynced Files': `${data?.unsynced || 'None'}`,
		'Local Files': localFiles,
	}
	

</script>

<!-- <div class="bb2-solid"> -->
	<Back href="/"  />
<!-- </div> -->
<Column a={{grow: true}} className="">
	{#each Object.entries(renderInfo) as [name, value]}
		<div 
			class="flex row bt2-solid p06 mb0" 
			style="justify-content: space-between;align-items: center;">

			<div>{name}</div>
			<div>{value}</div>

		</div>

	{/each}

	{#if !data.differences && data.unsynced <= 0 }
		<Button 
			a={{grow: true}} on:click={clearUp} 
			className="mlr06 mb1" >

			<div class="centered">
				<TrashCan size="1.6em" />
				<div class="ml04">Clear Up Space</div>
			</div>
		</Button> 
	{:else}
		<Button 
			a={{grow: true}} 
			on:click={syncAll}  
			className="mlr06 mb1">
			<div class="centered">
				<Sync size="1.6em" />
				<div class="ml04">Sync All</div>
			</div>
		</Button> 
	{/if}
</Column>