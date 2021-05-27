<script>

	import { onMount, onDestroy, createEventDispatcher } from 'svelte'

	/* defines */

	import { PROPS, SLDR } from '../Defines.js'

	/* types, toolkits */

	import { Scale } from '../utilities/toolkit.js'
	import { XY } from '../utilities/types.js'

	/* shared */

	import { createClasses, createStyles } from '../utilities/shared.js'
	import { Helper, Event } from '../utilities/events.js'

	/* helpers */

	import Points from '../helpers/Points.svelte'
	import Label from '../helpers/Label.svelte'
	import Bar from '../helpers/Bar.svelte'
	import Rotate from '../helpers/Rotate.svelte'

	export let a;
	export let className = "";
	export let style = "";
	a = { ...PROPS[SLDR], ...a }
	
	let RotateRef;
	let active = true;

	$: classes = createClasses(a, `${className} aui-el aui-number` );



</script> 

<template>
	<div class={classes} style="aui-el aui-number" class:active tabindex={a.tabindex} data-key={a.key}>
		<Rotate rotate={a.rotate} ref={RotateRef}>
			<Label {a} />
			<div class="aui-number-inner">
				<Bar low={0} high={Scale(a.value, a.min, a.max, 0, 1)}/>

				<Points 
					on:updated={ e => a.value = Scale( e.detail.point.x, 0, 1, a.min, a.max) }
					on:focus={ e => active = true}
					on:blur={ e => active = false}
					points={ [ XY( Scale(a.value, a.min, a.max, 0, 1), 0.5 ) ] } 
					immediate={true} 
					smoothing={0.5}
					display={false}
					steps={a.steps}
					rotate={a.rotate} />
			</div>
		</Rotate>

	</div>
</template>