<script>

	import { Back, WebCam } from 'svelte-touch-os/src/index.js'
	import { Any, Row, Column, Button, Toggle } from 'svelte-aui/src/index.js'
	import Microphone from "svelte-material-icons/Microphone.svelte";
	import { AudioLevels }  from 'svelte-touch-os/src/index.js'
	
	let currentFocus = 'face'

	let size = 420

	function onClickBody( b ) {
		// console.log('BODY', b)
		isFace.value = !b
		if (isBody.value) currentFocus = 'body'
	}

	function onClickFace( b ) {
		// console.log('FACE', b)
		isBody.value = !b
		if (isFace.value) currentFocus = 'face'
	}

	let isFace = {grow: true, value: true}
	let isBody = {grow: true, value: false}

	$: onClickBody( isBody.value ? 1 : 0 )
	$: onClickFace( isFace.value ? 1 : 0 )

	function toggle() {
		isBody.value = !isBody.value
		isFace.value = !isFace.value
	}

</script>


<Back href="/camera" />


<div 
	on:click={toggle}
	style="position: relative">
	<Column  a={{grow: true}} className="align-center set-fill" style="max-width: 42px;position:absolute;height:100%;width: 2em;left:1em;bottom:0.6em;z-index:999" >
		<AudioLevels style="height: 100%" />
		<Microphone size="2em" />
	</Column>
	<Column 
		a={{grow: true}} className="plr06">
		<WebCam 
			focus={currentFocus}
			style="border:2px solid var(--fg);width:100%;height:{size*0.75}px;max-height:{size*0.75}px;overflow:hidden" /> 
	</Column>
</div>

<Row a={{grow: true}} className="plr06 pb06">

		<Toggle 
			className="aui-toggle"
			bind:a={isBody}>
			<!-- <VideoOutline size="1.4em" /> -->
			<div class="ml04">Body</div>
		</Toggle>

		<Toggle 
			className="aui-toggle"
			bind:a={isFace}>
				<!-- <Stop size="1.4em" /> -->
			<div class="ml04">Face</div>
		</Toggle>
</Row>