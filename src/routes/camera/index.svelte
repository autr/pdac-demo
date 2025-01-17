<script>

	import { onMount } from 'svelte'
	import axios from 'axios'
	import { Back, WebCam } from 'svelte-touch-os/src/index.js'
	import { Timestamp } from 'svelte-touch-os/src/index.js'
	import { Column, Button, Toggle, Text, Row } from 'svelte-aui/src/index.js';

	import { info, overlay } from './../stores.js'
	export let page = {};
	export let data = {};


	function fileName() {
		return $info.hostname + '_test_'+Timestamp();
	}

	let sessionId = { value: fileName() }; 

	let audioSettings = { grow: true, value: true };
	let videoSettings = { grow: true, value: true };
	let heartRateSettings = { grow: true, value: false };

	let rtspSettings = { grow: true, value: false };
	let fileSettings = { grow: true, value: true };
	let windowSettings = { grow: true, value: false };

	let triggerStart = 0
	$: onStart( triggerStart )
	function onStart( triggerStart ) {

		if (triggerStart == 0) return

		setTimeout( () => {
			overlay.set(null);
			triggerStart = 0
			isCameraOpen = true
		}, 1000)
	}

	function start() {

		const config = {
			'session-id': sessionId.value, 
			sources: {
				audio: {
					active: audioSettings.value
				},
				video: {
					active: videoSettings.value
				},
				heartrate: {
					active: heartRateSettings.value
				}
			},
			sinks: {
				rstp: {
					active: rtspSettings.value
				},
				file: {
					active: fileSettings.value
				},
				window: {
					active: windowSettings.value
				}
			}
		};

		console.log('[Camera] 📸 opening camera', config)

		overlay.set( { type: 'wait', message: 'Opening Camera Backend (Simulated)' } )

		triggerStart += 10
	}

	let triggerStop = 0
	$: onStop( triggerStop )
	function onStop( triggerStop ) {

		if (triggerStop == 0) return

		setTimeout( () => {
			overlay.set(null);
			triggerStop = 0
			isCameraOpen = false
		}, 1000)
	}

	function stop() {

		overlay.set( { type: 'wait', message: 'Closing Camera Backend (Simulated)' } )
		triggerStop += 10
	}


	onMount( async() => {

		if (process.browser && navigator.mediaDevices) { 
			navigator.mediaDevices.enumerateDevices().then(function (devices) {
				for(var i = 0; i < devices.length; i ++){
						var device = devices[i];
						if (device.kind === 'videoinput') {
							console.log('[Camera] 🎥  camera available', i, {...device});
						}
				}
			});
		}
	 });

	let isCameraOpen = false;


	import VideoOutline from "svelte-material-icons/VideoOutline.svelte";
	import Play from "svelte-material-icons/Play.svelte";
	import Stop from "svelte-material-icons/Stop.svelte";

</script>

<Back href="/system" />
<!-- <Column> -->
	<Row className="bt2-solid p06 cgrow mb0">
		<Toggle style="min-height:3em" bind:a={audioSettings}>Audio</Toggle>
		<Toggle style="min-height:3em" bind:a={videoSettings}>Video</Toggle>
		<Toggle style="min-height:3em" bind:a={heartRateSettings}>Heartrate</Toggle>
	</Row>
	<Row className="bt2-solid p06 mb0">
		<Toggle style="min-height:3em" bind:a={rtspSettings}>RTSP</Toggle>
		<Toggle style="min-height:3em" bind:a={fileSettings}>File</Toggle>
		<Toggle style="min-height:3em" bind:a={windowSettings}>Window</Toggle>
	</Row>
	<Row className="p06 pt0" a={{grow:true}}>

		<Button a={{grow: true}} >
			<a href="/camera/preview">
				<VideoOutline size="1.4em" />
				<div class="ml04">Preview</div>
			</a>
		</Button>

		<Button a={{grow: true}} on:click={() => isCameraOpen ? stop() : start()}>
			<div class="centered">
				{#if isCameraOpen}<Stop size="1.4em" />{:else}<Play size="1.4em" />{/if}
				<div class="ml04">{isCameraOpen ? 'Stop' : 'Start'}</div>
			</div>
		</Button>

	</Row>
<!-- </Column> -->