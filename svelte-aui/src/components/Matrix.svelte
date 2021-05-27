<script>

	import { onMount, onDestroy, createEventDispatcher } from 'svelte'

	/* defines */

	import { PROPS, BTN, VARIANT, MTX } from '../Defines.js'
	/* shared */

	import { createClasses, createStyles } from '../utilities/shared.js'
	import { Helper, Event } from '../utilities/events.js'

	/* types, toolkits */

	import { XY, Float } from '../utilities/types.js'
	import { Scale, CopyXY, ScaleXY } from '../utilities/toolkit.js'

	/* defines */


	/* helpers */

	import Any from '../helpers/Any.svelte'
	import Points from '../helpers/Points.svelte'
	import Rotate from '../helpers/Rotate.svelte'
	import Label from '../helpers/Label.svelte'

	export let a;
	export let className = "";
	export let style = "";
	a = { ...PROPS[MTX], ...a }


	let AreaEl;
	let RotateEl;
	let ItemsEl;
	let childProps = [];


	$: type = BTN;
	$: childPropsComputed = (() => { 

		while ( childProps.length > a.count ) childProps.pop();
		while ( childProps.length < a.count ) childProps.push( {...PROPS[a.variant], ...VARIANT[a.variant]} );
		for (let item of childProps) item.type = a.variant;

		return childProps;
	});
	$: position = (a.height == "auto") ? "relative" : "absolute";

	function onUpdated(e) {
		console.log('MATRIX updated');
	}
	onMount( async() => {
	});

	$: classes = createClasses(a, `${className} aui-el aui-matrix` );


</script> 

<template>
	<div class={classes} tabindex={a.tabindex} data-key={a.key}>
		<Label {a} />
		<Rotate ref="RotateRef" bind:this={RotateEl} rotate={a.rotate}>
			<div bind:this={AreaEl} class="aui-matrix-area aui-area" >
				<div bind:this={ItemsEl} class="aui-matrix-items" use:cssVars={{...a, position}}>
					{#each childPropsComputed() as props}
							<Any ref="ItemRef" on:updated={onUpdated} bind:a={props}/>
					{/each}
				</div>
			</div>
		</Rotate>

	</div>
</template>