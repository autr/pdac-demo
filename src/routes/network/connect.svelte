<script>

	import axios from 'axios'
	import { stores } from '@sapper/app';
	const { page } = stores();
	import { goto } from '@sapper/app'
	import { onMount } from 'svelte'
	import { info, overlay } from './../stores.js'
	import { Back, Keyboard } from 'svelte-touch-os/src/index.js'
	import { Any, Boolean, Group, Text, Column, Defines as d } from 'svelte-aui/src/index.js'

	export let data;

	let placeholder = `Password for ${$page.query.ssid}`;
	let text = '';


	onMount( async() => {
		console.log(placeholder, text)
	});

	async function submitPassword(e, v) {
		console.log('[NetworkConnect] 🌐  attempting connection to:', e, v, e.detail)
		overlay.set( { type: 'wait', message: 'Connecting to ' + $page.query.ssid } )
		triggerFinish += 1
	}

	let triggerFinish = 0
	$: finishConnect( triggerFinish )
	function finishConnect( triggerFinish ) {

		if (triggerFinish == 0) return

		setTimeout( () => {

			// console.log('[NetworkConnect] ✅🌐  successfully connected:', res);
			goto( '/system' );
			overlay.set(null);
			triggerFinish = 0
		}, 1000)
	}

	
</script>

<style lang="sass">
</style>
<Back href="/network" />


<Column className="p06 keyboard-wrapper bt2-solid" a={{grow: true}}>

	<!-- NB: Textfield was "text" previously, due to performers struggling to see and enter in all characters. Also PSK passed in an URL property. Perhaps not best practice. -->

	<Keyboard 
		placeholder={placeholder} 
		variant="password"
		text={text} 
		on:submit={submitPassword} />
</Column>