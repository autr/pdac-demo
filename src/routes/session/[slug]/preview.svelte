<script>

	import { onMount } from 'svelte'
	import { goto } from '@sapper/app';

	import sessions from '../sessions.json'

	// icons...

	import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte";
	import Check from "svelte-material-icons/Check.svelte";
	import Microphone from "svelte-material-icons/Microphone.svelte";
	import Camera from "svelte-material-icons/Camera.svelte";

	// stores...

	import { info, overlay } from './../../stores.js'
	import { stores } from '@sapper/app';
	const { page } = stores();

	// helpers...

	import { Back, AudioLevels }  from 'svelte-touch-os/src/index.js'
	import WebCam from './WebCam.svelte'
	import { Any, Button, Column, Row, Block } from 'svelte-aui/src/index.js'

	const style = "";//"position:absolute;width:calc( 50% - 20px );bottom:10px;";

	let data = sessions.data

	$: session = data.find( item => {
		return $page.params.slug == item.url
	})

	$: isSound = session.point_of_interest == 'sound';

	$: currentMode = overrideMode || session.point_of_interest

	let size = 420

	let overrideMode = null

	function toggleMode() {
		if (currentMode == 'body') overrideMode = 'face'
		if (currentMode == 'face') overrideMode = 'body'
	}

</script>

<!-- check levels and camera... -->

<Back href="/session/{session.url}"/>
<Column a={{grow:true}} className="p06 bt2-solid">

	<div 
		on:click={toggleMode}
		class="flex-grow flex column align-center relative" 
		style="position: relative;width:100%;">

			<Column  a={{grow: true}} className="align-center" style="max-width: 42px;position:absolute;height:100%;width: 2em;left:0.4em;bottom:0.4em;z-index:999" >
				<AudioLevels style="height: 100%" />
				<Microphone size="2em" />
			</Column>
			<WebCam 
				style="width:100%;max-height:65vh;overflow:hidden"
				focus={currentMode} /> 

	</div>

	<Button a={{grow: true}} style="border-width:2px;">
		<a href="/session/{session.url}/1">
			<Check size="1.6em" />
		</a>
	</Button>

	<div 
		style="opacity:0;position:absolute;left:-999999px;top:-999999px">

		{#each session.exercises as exercise, idx}
			<a href="/session/{session.url}/{idx}">{idx}</a>
		{/each}

	</div>

</Column>
