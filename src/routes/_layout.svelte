
<script>

	// js modules...

	import { onMount, setContext, onDestroy } from 'svelte'
	import { goto } from '@sapper/app'
	import axios from 'axios'
	import cssVars from 'svelte-css-vars'

	// pdac modules...

	import Colors from './db.colors.js'
	import MiBands from './db.mibands.js'
	import { info, overlay, konsole, backend, eyeball } from './stores.js'

	// helpers modules...

	import { Memory, Strip, Back } from 'svelte-touch-os/src/index.js'
	import { Any, Group, AUI, Column, Button } from 'svelte-aui/src/index.js'

	// material icons...

	import Wifi from "svelte-material-icons/Wifi.svelte";
	import Brain from "svelte-material-icons/Brain.svelte";
	import TemperatureCelsius from "svelte-material-icons/TemperatureCelsius.svelte";
	import WifiStrengthOffOutline from "svelte-material-icons/WifiStrengthOffOutline.svelte";
	import Sleep from "svelte-material-icons/Sleep.svelte";
	import WatchVariant from "svelte-material-icons/WatchVariant.svelte";

	import { API_ERROR, API_SUCCESS, API_TRY, API_VIZ } from './types.js'

	let ws;
	let maxLines = 60
	let PdacEl;

	import { stores } from '@sapper/app';
	const { page } = stores();


	if (process.browser) {
		window.safelySend = safelySend;
	}
	// ---------------------

	onMount( async() => {

			console.log('[_layout.svelte] 📦 mounted');
			page.subscribe(({ path, params, query }) => {

				console.log('[_layout.svelte] 📄 page changed : subscribe', path);
				info.grab().then( r => {
					wsPoll()
					bufferPoll()
				})
			})

	});


	function bufferPoll() {

		if (buffer.length > 0) { 
			console.log('[_layout.svelte] ⛑  buffersize...', buffer.length);
			buffer.forEach( data => appendToKonsole( data ))
			buffer = []
		}

		setTimeout( () => {
			bufferPoll()
		}, 100)
	}
	function wsPoll() {

		if (!ws) {
			wsConnect()
		} else if (ws.readyState == ws.CLOSED) {
			console.log('[_layout.svelte] 👁 🛑  remove CLOSED websocket...');
			ws = null
			window.websocketsClient = null
		}

		setTimeout( () => {
			wsPoll()
		}, 2000)
	}

	function wsConnect() {
		if (process.browser && !ws) {
			const url = `ws://${$info.ip}:8765`
			// console.log('[_layout.svelte] 👁 ⚡️  opening websocket...', url)
			// ws = new WebSocket(url);
			// ws.addEventListener('open', onOpen)
			// ws.addEventListener('message', onMessage)
			// ws.addEventListener('error', onError)
			// ws.addEventListener('close', onClose)
			// window.websocketsClient = ws;
		}
	}

	function safelySend( str ) {
		if (ws) {

			if (ws.readyState == 1) {
				console.log('[_layout.svelte] ⚡️😮⚡️  safely send');
				ws.send( str )
			} else{
				console.log('[_layout.svelte] 🤯⚡️😮⚡️🤯  not ready to send'); 
			}
		} else {
			console.log('[_layout.svelte] ❌⚡️😮⚡️❌  not websockets object to send with');
		}
	}

	function onOpen(e) {
		console.log('[_layout.svelte] 👁 ✅  opened websocket...', e.currentTarget.url);
	}
	function onError(err) {
		console.log('[_layout.svelte] 👁 ❌  error with websocket...', err);
		ws.close()
	}
	function onClose(err) {
		console.log('[_layout.svelte] 👁 🛑  closed and delete websockets...');
	}

	let buffer = []

	function onMessage(e) {
		console.log('[_layout.svelte] 👁 ✨  received websocket message...', e.data);
		buffer.push( e.data )
	}


	// ---------------------

	onDestroy( async() => {

		if (process.browser && ws) {
			console.log('[_layout.svelte] 👁 🛑  closing websocket...')
			ws.close()
			window.websocketsClient = null;
		}
	});

	function appendToKonsole( str ) {

		try {
			const j = JSON.parse( str )
			// konsole.update( k => {
			//   k.unshift( { timestamp: j.timestamp || '~', type: j.type || '~', message: j.message || '~', title: j.title || '~' } )
			//   while (k.length > maxLines) k.slice(1)
			//   return k
			// })
			if ( j.type == API_VIZ || j.type == "viz" || j.type == "visual" ) {
				console.log('[_layout.svelte] 👁 👁 👁  setting visual:', j.title, j.message, j.button);
				eyeball.update( e => {
					e.title = j.title
					e.message = j.message
					e.button = j.button
					return e
				})

			}
			// console.log('[_layout.svelte] 👁 ✨ ✅  parsed socket message:');
			// backend.update( b => { 
			//   b = j.config
			//   return b
			// })
		} catch( err ) {
			console.log('[_layout.svelte] 👁 ✨ ❌  error parsing message:', err.message);

		}
	}


	function debugColor() {

			eyeball.update( e => {
				const tt = [ 'liebe', 'trauer', 'wut', 'freude', 'uberraschung', 'verachtung', 'angst' ]
				e.title = tt[ parseInt(Math.random() * 7) ]
				console.log('SETTING TITLE TO:', e.title)
				return e
			})
	}

	if (process.browser) window.debugColour = debugColor

	$: isPi = (process.browser) ? navigator.appVersion.indexOf('Linux armv7l') !== -1 : false;





	import Check from "svelte-material-icons/Check.svelte";
	import AlertCircleOutline from "svelte-material-icons/AlertCircleOutline.svelte";

	
	import Home from "svelte-material-icons/Home.svelte";
	import Human from "svelte-material-icons/Human.svelte";
	import Sync from "svelte-material-icons/Sync.svelte";
	import DramaMasks from "svelte-material-icons/DramaMasks.svelte";
	import Cogs from "svelte-material-icons/Cogs.svelte";

	import AllColors from './db.colors.js'

	function onColorChange( e ) {
		info.setColorIndex( parseInt(e.target.value) + 1 )
	}

</script>

<base href="/pdac-demo/">

<svelte:head>
	<title>PDAC</title>
</svelte:head>

<style lang="sass" global>
@import '../styles/app'
</style>

<svelte:window  />
<main> 
	<div bind:this={PdacEl}  
		id="pdac" 
		class={`aui  ${ (isPi) ? 'hide-cursor' : ''} bg-${ $info.color.bg } relative rel txt-${ $info.color.fg }`} 
		style="--fg: { $info.fgColor }; --bg: { $info.bgColor }">
		<header class="header bb2-solid">
			<select
				class="absolute t0 l0 fill"
				style="opacity:0"
				on:change={onColorChange}>
				{#each AllColors as color, index}
					<option
						value={index}>
						{color.hostname}
					</option>
				{/each}
			</select>
			<label>
				<Brain />&nbsp;
				{$info.mbMemory}mb&nbsp;
				{$info.temperature}
				<TemperatureCelsius /> 
			</label>
			<label>
				{$info.colorName}&nbsp;

				<WatchVariant />
				&nbsp;{$info.mibandNumber}
			</label>
			<label>
				<Wifi /> 
				&nbsp;192.168.1.{$info.deviceIndex}
			</label>
		</header>

		{#if $overlay}
			<div class="overlay" >
				<Column a={{grow: true}} >
					{#if $overlay.type === 'wait'}
						<div class="justify-center mt4">
							<div class="spinner">
								<span />
								<span />
								<span />
								<span />
							</div>
						</div>
					{/if}

					{#if $overlay.type === 'error'}
						<AlertCircleOutline size="1.6em" />
						<div style="align-items:center" class="mlr04">
							Status: {$overlay.status}
							<br />
							Message: {@html $overlay.message}
						</div>
					{:else}
						<div style="align-items:center" class="ml04">
							{#if $overlay.type == 'success'}
								<Check size="1.6em" />
							{/if}
							<div class="mlr04">{@html $overlay.message}</div>
						</div>
					{/if}

					{#if $overlay.actions}
						{#each $overlay.actions as action }
							<Button 
								a={{grow: true}} 
								style="width:100%" 
								on:click={ e => overlay.set(null) }>
								<a href={action[1]}>

									{#if action[0].toLowerCase() == 'home'}
										<Home size="1.4em" />
									{:else if action[0].toLowerCase() == 'session' || action[0].toLowerCase() == 'sessions'}
										<Human size="1.4em" />
									{:else if action[0].toLowerCase() == 'sync'}
										<Sync size="1.4em" />
									{:else if action[0].toLowerCase() == 'stage'}
										<DramaMasks size="1.4em" />
									{:else if action[0].toLowerCase() == 'system'}
										<Cogs size="1.4em" />
									{/if}
									<span class="ml04">{action[0]}</span>

								</a>
							</Button>
						{/each}
					{/if}
					{#if $overlay.type === 'error' || $overlay.refresh}
						<Button a={{grow: true}} style="width:100%" on:click={ e => { window.location = window.location } }>{ $overlay.refresh || "Refresh" }</Button>
					{/if}
					{#if $overlay.type === 'error' || $overlay.close} 
						<Button a={{grow: true}} style="width:100%" on:click={ e => overlay.set(null) }>{ $overlay.close || "Close" }</Button>
					{/if} 
				</Column>
			</div>
		{/if}

		<div class="container">
			<Column a={{grow: true}} className="pdac-main-column">
				<slot />
			</Column>
		</div>
	</div>
</main>

