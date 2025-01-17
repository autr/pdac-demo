
<script>

	import axios from 'axios'
	import { stores } from '@sapper/app';
	const { page } = stores();
	import { goto } from '@sapper/app'
	import { onMount } from 'svelte'
	import { info, overlay } from './../stores.js'
	import { Back, Keyboard } from 'svelte-touch-os/src/index.js'
	import { Any, Boolean, Button, Group, Text, Column, Defines as d } from 'svelte-aui/src/index.js'

	const start = '\n\n# ---------- auto-generated from pdac -------- >>>>'
	const end =   '# <<<<< ---- auto-generated from pdac -------------\n\n'

	$: txt = true
	$: exists = true

	let turnOffOverlay = 0

	function noOverlay( turnOffOverlay ) {

		if (turnOffOverlay == 0) return

		setTimeout( () => {
			overlay.set(null)
			turnOffOverlay = 0
			exists = !exists
		}, 2000)
	}

	$: noOverlay( turnOffOverlay ? true : 0 )

	function onClick( e ) {
			overlay.set( { type: 'wait', message: 'Restarting DHCP Service (Demo)' } )

			turnOffOverlay += 10
	}

	import FileDocumentBoxPlus from "svelte-material-icons/FileDocumentBoxPlus.svelte";
	import FileDocumentBoxMinus from "svelte-material-icons/FileDocumentBoxMinus.svelte";
	
</script>

<Back href="/system" />
<div class="p06 bt2-solid flex column flex-grow">
	{#if txt}
		<div class="flex row pb04" style="justify-content: space-between;align-items: center;">
			<div>
				Found USB (Demo)
			</div>
			<div>dhcp.txt</div>
		</div>
		<div class="grow flex ptb06">
			<Button a={{grow: true}} on:click={onClick} >
				<div class="centered" style="min-height:4em">
					{#if exists}
						<FileDocumentBoxMinus size="1.4em" />
					{:else}
						<FileDocumentBoxPlus size="1.4em" />
					{/if}
					<div class="pl04">{ (exists) ? 'Remove DHCP Config' : 'Write DHCP Config' }</div>
				</div>
			</Button>
		</div>
	{:else}
		<div class="">No USB dhcp.txt found (demo).</div>
	{/if}
</div>