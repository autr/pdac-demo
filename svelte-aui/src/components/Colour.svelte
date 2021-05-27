<script>
	
	import { onMount, onDestroy, createEventDispatcher } from 'svelte'

	import { PROPS, COLR } from '../Defines.js'

	/* shared */

	import { Helper, Event } from '../utilities/events.js'
	import { createClasses, createStyles } from '../utilities/shared.js'

	/* types, toolkits, objects */

	import { HSLA, XY } from '../utilities/types.js'
	import { HSLA2CSS, Scale, CopyHSLA, CopyXY, DistanceXY, AngleXY, Angle, RotateXY, IntersectXY } from '../utilities/toolkit.js'
	import { cloneObject } from '../utilities/objects.js'

	/* helpers */

	import Conic from '../helpers/Conic.svelte'
	import Points from '../helpers/Points.svelte'
	import Swatch from '../helpers/Swatch.svelte'
	import Label from '../helpers/Label.svelte'
	import Number from './Number.svelte'

	export let className = "";
	export let style = "";
	export let a;
	a = { ...PROPS[COLR], ...a }

	let square = false;
	let magnifier = XY(0.5,0.5); 
	let active = false;

	$: obj = { ...PROPS[COLR], ...a };
	$: classes = createClasses(a, `${className} aui-el aui-color` );
	$: styles = createStyles(a, style);


	onMount( async() => {

	})
	function pointToHue(p) {

		const m = XY(0.5,0.5);
		const d = DistanceXY( m, p);
		rotationAngle = Angle( p, m );
		a.value.h = Scale(rotationAngle-90, 0, 360, 1, 0);
	}

	function pointToSatLight( p ) {

		const m = XY(0.5,0.5);
		const d = DistanceXY( m, p);
		const a = Angle(m, p);		


		a.value.s = p.y;
		a.value.l = p.x;
	}

	function pointToSat( p ) {

		const m = XY(0.5,0.5);
		const d = DistanceXY( m, p);
		const a = Angle( p, m );
		let s = Scale(a/360, -0.5, 0.5, 0, 2);
		if (s > 1) s = 2 - s;
		a.value.s = s;
	}

	function onHue( e ) {
		pointToHue(e.detail.point);
	}

	function onSat(e) {
		pointToSat(e.detail.point);
	}

	function onSquareSaturationLightness( e ) {

		pointToSatLight( e.detail.point );

	}

	let pointsConfig = {
		points: [XY(0.5,0.5)],
		immediate: true,
		display: false,
		clamp: false,
		smoothing: 0
	}

	let rotationAngle = 0;
	let hueColor, hslaColor;


	$: colorHSLA = (() => {
		return getColor();
	});

	$: satGradient = (() => {
		return [getColor({s: 1, a:1}), getColor({s: 0, a:1}), getColor({s: 1, a:1})];
	});
	$: lightGradient = (() => {
		return [
			getColor({l: 0}), 
			getColor({l: 0.5}), 
			getColor({l: 1}), 
			getColor({l: 0.5}), 
			getColor({l: 0})
		];
	});
	$: alphaGradient = (() => {
		return [colorHSLA(), 'transparent', colorHSLA()];
	});

	$: getColor = (( hsla ) => {
		const c = Object.assign(cloneObject(a.value),hsla);
		return HSLA2CSS(c);
	});

	let initHue, initSat, initLight, initAlpha;
	let conicStroke = 20;

	let isFocussing = false;

	function onFocus() {
		isFocussing = true;
		active = !active;
	}

	function onBlur() {
		setTimeout( () => {
			isFocussing = false;
		}, 20);
	}

	function onAnywhere() {

		if (isFocussing) return;
		active = false;
	}

</script>

<template>
	<svelte:window
		on:click={ onAnywhere}
		/>
	<div class={classes} style={styles} class:active  tabindex={a.tabindex} data-key={a.key}>
		<Label {a} />
		<Swatch color={a.value} />
		<Points {...pointsConfig} on:focus={ onFocus } on:blur={ onBlur }  />
		<section class="aui-color-dropdown" on:mousedown={ e => isFocussing = true } on:mouseup={ onBlur } >
			<div class="info">
				<!-- <Swatch color={a.value} /> -->
			</div>
			<div class="conic-wrapper">
				<Conic stroke={conicStroke} on:updated={onHue}>
					<Conic stroke={conicStroke} on:updated={onSat} colors={satGradient()}>
						<Conic stroke={conicStroke} on:updated={onSat} colors={lightGradient()}>
							<Conic stroke={conicStroke} on:updated={onSat} colors={alphaGradient()}>
								<canvas width="1" height="1" class="swatch" style="background-color: {colorHSLA()}" />
							</Conic>
						</Conic>
					</Conic>

					{#if square}
						<div class="square" style="transform: rotateZ( {rotationAngle+45}deg );">
							<Points 
								{...pointsConfig}
								display={true}
								clamp={true}
								rotate={rotationAngle+45}
								on:updated={onSquareSaturationLightness} />
							<div class="color" style="background: linear-gradient( 0deg, {getColor( {s: 1, l: 0.5, a: 1} )} 0%, rgb(128,128,128) 100% )" />
							<div class="black" style="background: linear-gradient( 90deg, black 0%, transparent 50%, white 100% )" />
						</div>
					{/if}
				</Conic>
			</div>
		</section>

	</div>
</template>