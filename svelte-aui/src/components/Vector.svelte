<script>

	import { onMount, onDestroy, createEventDispatcher } from 'svelte'

	/* defines */

	import { PROPS, VCTR } from '../Defines.js'

	/* helpers */

	import Points from '../helpers/Points.svelte'
	import Rotate from '../helpers/Rotate.svelte'
	import Label from '../helpers/Label.svelte'

	/* shared */

	import { createClasses, createStyles } from '../utilities/shared.js'
	import { Helper, Event } from '../utilities/events.js'

	export let a;
	export let className = "";
	export let style = "";
	a = { ...PROPS[VCTR], ...a }

	let PointsEl; 
 

	function onUpdated(e) { 
		
	}


	$: classes = createClasses(a, `${className} aui-el aui-vector` );

</script>

<template>
	<div class={classes} tabindex={a.tabindex} data-key={a.key}>
		<Label {a} />
		<Rotate rotate={a.rotate}>

			<Points 
				bind:this={PointsEl}
				on:updated={onUpdated}
				on:blur={ onBlur }
				key={a.key}
				display={true}
				points={[]} 
				smoothing={0.5}
				immediate={true} 
				rotate={a.rotate} />
		</Rotate>

	</div>
</template>