<script>
	import { createEventDispatcher } from 'svelte';
	import { Scale, FindClosest, Div2NormXY, Norm2DivXY, Clamp, BlendXY, CompareXY, CopyXY, ClampXY, RoundedXY } from '../utilities/toolkit.js'
	import { Int, Float, XY } from '../utilities/types.js'
	import { isEmptyObject } from '../utilities/objects.js'

	// properties...

	export let key = "Points";
	export let points = [];
	export let immediate = false;
	export let rotate = 0;
	export let override = {};
	export let steps = 3840;
	export let smoothing = 0.9;
	export let display = true;
	export let clamp = true;

	// active fingers...

	let active = {};

	// div reference...

	let area;

	// dispatch...

	const dispatch = createEventDispatcher();

	// smoothing...

	let isSmoothing = false;
	let endpoints = {};
	let smoothed = {};

	let debug = { sent: 0, skipped: 0, log: false };


	function overridePoint( idx, p ) {
		if ( override[idx] ) {
			if (override[idx].y) p.y = override[idx].y;
			if (override[idx].x) p.x = override[idx].x;
		}
		return p;
	} 

	function touchDown( finger, e ) {


		let p = Div2NormXY( e, area, rotate, {} );
		const idx = FindClosest( p, points );
		p = overridePoint( idx, p );

		logEvent('touchDown', key, idx);

		// if its immediate, active point is already there...

		if (immediate) p = CopyXY( points[idx] );

		const isActive = area[idx] != undefined;
		const sameFinger = (isActive) ? area[idx].finger === finger : false;

		if (!isActive || (isActive && !sameFinger)) {
			active[idx] = { 
				...p, 
				finger: finger, 
				origin: CopyXY( points[idx] )
			};
		}

		// if its immediate, trigger move and update...

		if (immediate) touchMove( finger, e );

		// it is now focussed...

		dispatch( 'focus' );
	}


	function touchMove( finger, e  ) {


		const keys = Object.keys(active);
		for (let i = 0; i < keys.length; i++ ) {
			const idx = keys[i];
			const exists = active[idx];
			if ( Int(exists.finger) === Int(finger) ) {
				logEvent('touchMove', key, idx);
				let p;
				p = Div2NormXY( e, area, rotate, {} );
				logPoint("a:", idx, p.x);
				p = overridePoint( idx, p );
				logPoint("b:", idx, p.x);
				p = XY( active[idx].origin.x - (active[idx].x - p.x), active[idx].origin.y - (active[idx].y - p.y) );
				logPoint("c:", idx, p.x);
				p = (clamp) ? ClampXY( p, 0, 1 ) : p;
				logPoint("d:", idx, p.x);
				setEndpoint( idx, p );
			}
		}
	}

	function touchUp( finger, e ) {


		const keys = Object.keys(active);
		const hadTouches = keys.length > 0;
		for (let i = 0; i < keys.length; i++ ) {
			const idx = keys[i];
			if ( Int(active[idx].finger) === Int(finger) ) {
				logEvent('touchUp', key, idx);
				delete active[idx];
			}
		}
		if (Object.keys(active).length == 0 && hadTouches) dispatch( 'blur' );
	}

	export function getPoints() {
		return points;
	}

	export function setEndpoint( idx, point ) {
		point = RoundedXY( point, steps );
		smoothed[idx] = CopyXY(points[idx]);
		endpoints[idx] = CopyXY(point);
		logPoint('setEndpoint', idx, point.x);
		if (!isSmoothing) {
			window.requestAnimationFrame(smooth);
			debug.sent = 0;
			debug.skipped = 0;
		}
	}

	function logPoint(str, idx, p) {
		if (debug.log) console.log(str, Float(p, 2), idx, (points.length == 2) ? `${Float(points[0].x,2)} ${Float(points[1].x,2)}` : '' );
	}
	function logEvent(str, key, idx) {
		if (debug.log) {
			console.log(`${str}:${key}`, (idx) ? idx : '', (points.length == 2) ? `${Float(points[0].x,2)} ${Float(points[1].x,2)}` : '');
		}
	}

	function setPoint( idx, p ) {

		logPoint("current:", idx, points[idx].x);
		points[idx] = CopyXY(p);
		logPoint("updated:", idx, points[idx].x);
		dispatch('updated', { point: points[idx], idx: idx });
	}


	function smooth() {

		const keys = Object.keys(endpoints);
		let cont = false;
		for (let i = 0; i < keys.length; i++) {
			const idx = keys[i];

			const oldSmooth = CopyXY( smoothed[idx] );
			smoothed[idx] = BlendXY( smoothed[idx], endpoints[idx], smoothing);

			if (!cont) cont = !CompareXY( smoothed[idx], endpoints[idx], steps);
			if (!CompareXY( smoothed[idx], oldSmooth, steps)) {
				setPoint(idx, RoundedXY(smoothed[idx], steps) );
				debug.sent += 1;
			} else {
				debug.skipped += 1;
			}
		}



		if (cont) {
			isSmoothing = true;
			window.requestAnimationFrame(smooth);
		} else {
			isSmoothing = false;
			endpoints = {};
		}
	}
	function  __areaTouchStart(e) {
		logEvent('areaTouchStart');
		const keys = Object.keys(e.touches);
		for (let i = 0; i < keys.length; i++) {
			const finger = keys[i];
			touchDown( parseInt(finger), e.touches[finger] );
		}
		e.preventDefault();
	}

	function  __areaMouseDown(e) {
		logEvent('areaMouseDown', key);
		touchDown( 0, e );
	}

	function  __windowMouseMove(e) {
		if (isEmptyObject(active)) return;
		logEvent('windowMouseMove', key);
		touchMove( 0, e );
	}
	function  __windowTouchMove(e) {

		if (isEmptyObject(active)) return;
		logEvent('windowTouchMove');


		const touchKeys = Object.keys(e.touches);
		const activeKeys = Object.keys(active);
		for (let i = 0; i < activeKeys.length; i++) {
			const idx = activeKeys[i];
			const finger = active[idx].finger;
			if ( touchKeys.indexOf(finger) == -1) {
				touchMove( finger, e.touches[finger] );
			}
		}
	}
	function  __windowMouseUp(e) {
		if (isEmptyObject(active)) return;
		logEvent('windowMouseUp', key);
		touchUp(0, e);
	}
	function  __windowTouchUp(e) {

		if (isEmptyObject(active)) return;
		logEvent('windowTouchUp');

		// returns an array of existing touches (which are filtered)...

		const touchKeys = Object.keys(e.touches);
		const activeKeys = Object.keys(active);

		for (let i = 0; i < activeKeys.length; i++) {
			const idx = activeKeys[i];
			const finger = active[idx].finger;
			if ( touchKeys.indexOf(finger) == -1) {

				// this touch has disappeared, so trigger default touchUp...

				touchUp(finger);
			}
		}
		e.preventDefault();
	}
</script>

<template>
	<svelte:window
		on:mousemove={__windowMouseMove}
		on:mouseup={__windowMouseUp}
		on:touchmove={__windowTouchMove}
		on:touchend={__windowTouchUp}
		/>
	<aside 
		ref="points"
		bind:this={area}
		on:mousedown={ __areaMouseDown}
		on:touchstart={ __areaTouchStart}
		on:drag={ e => e.preventDefault() }
		class="aui-points aui-area">
		{#if display}
			{#each points as p}
				<div class="aui-point" style="transform: translate({p.x*100}%, {p.y*100}%)">
					<span><span /></span>
				</div>
			{/each}
		{/if}
	
	</aside>
	
</template>