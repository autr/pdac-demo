<script>

	import { onMount, onDestroy, createEventDispatcher } from 'svelte'

	/* defines */

	import { PROPS, JOY, RNG } from '../Defines.js'

	/* types, toolkits */

	import { Scale, CopyXY, ScaleXY } from '../utilities/toolkit.js'
	import { XY, Float } from '../utilities/types.js'

	/* shared */

	import { createClasses, createStyles } from '../utilities/shared.js'
	import { Helper, Event } from '../utilities/events.js'

	/* helpers */

	import Points from '../helpers/Points.svelte'
	import Label from '../helpers/Label.svelte'
	import Bar from '../helpers/Bar.svelte'
	import Rotate from '../helpers/Rotate.svelte'
	import Cross from '../helpers/Cross.svelte'

	export let a;
	export let className = "";
	export let style = "";
	a = { ...PROPS[RNG], ...a }

	export let active = true;
	let RotateRef;

	// points for interaction...

	$: points = (() => {
		if (a.type == RNG) {
			const arr = [
				ScaleXY( XY( a.value.x, 0.5 ), a.min, a.max, XY(0,0), XY(1,1)), 
		 		ScaleXY( XY( a.value.y, 0.5 ), a.min, a.max, XY(0,0), XY(1,1))
			];
			return arr;
		}
		return [ ScaleXY( a.value, a.min, a.max, XY(0,0), XY(1,1)) ]

	});

	// callback from points component...

	function onUpdated( e ) {
		const idx = parseInt(e.detail.idx);
		const p = e.detail.point;

		if (a.type == RNG) {
			a.value = XY( PointsEl.getPoints()[0].x, PointsEl.getPoints()[1].x );
		} else {
			a.value = p;
		}

	}

	// onBlur event handling...

	let PointsEl;

	function onBlur(e) {
		active = false;
		if (a.type == JOY) PointsEl.setEndpoint( 0, XY( Scale(0.5,0,1,a.min.x,a.max.x), Scale(0.5,0,1,a.min.y,a.max.y) ) );
	}

	$: normalised = {x: Scale(a.value.x,a.min.x,a.max.x,0,1), y: Scale(a.value.y,a.min.y,a.max.y,0,1)}; 



	$: classes = createClasses(a, `${className} aui-el aui-vec2` );


</script>

<template>
	<div class={classes} class:active tabindex={a.tabindex} data-key={a.key}>
		<Label {a} />
		<div class="aui-vec2-inner">
			<Rotate rotate={a.rotate} ref={RotateRef}>
				{#if a.type == RNG}
					<Bar low={normalised.x} high={normalised.y - normalised.x}/>
				{:else}
					<Cross {...normalised} />
				{/if}

				<Points 
					bind:this={PointsEl}
					on:updated={onUpdated}
					on:focus={ e => active = true}
					on:blur={ onBlur }
					key={a.key}
					display={true}
					points={points()} 
					smoothing={0.5}
					immediate={false} 
					rotate={a.rotate}
					override={ (a.type == RNG) ? [{y: 0.5},{y: 0.5}] : {}} />
			</Rotate>
		</div>
	</div>
</template>