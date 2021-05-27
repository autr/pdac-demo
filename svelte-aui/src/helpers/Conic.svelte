<script>
	import { createEventDispatcher } from 'svelte';
	import Points from './Points.svelte'
	import { XY } from '../utilities/types.js'

	// dispatch...

	const dispatch = createEventDispatcher();
	
	export let stroke = 40;
	export let colors = [
		'rgb(255,0,0)',
		'rgb(255,0,255)',
		'rgb(0,0,255)',
		'rgb(0,255,255)',
		'rgb(0,255,0)',
		'rgb(255,255,0)',
		'rgb(255,0,0)'
	];
	export let pointsConfig = {
		points: [XY(0.5,0.5)],
		immediate: true,
		display: false,
		clamp: false,
		smoothing: 0
	};

	function onUpdated(e) {
		dispatch('updated', e.detail);
	}

	$: conicGradient = (() => {
		let s = 'conic-gradient('
		for(let i = 0; i < colors.length; i++) {
			s+= colors[i];
			if (i != colors.length-1) s+=',';
		}
		return s + ')';
	}); 

</script>

<template>
	<aside class="aui-helper-conic" style="padding: {stroke}px">
		<div class="ring"><span style="background: {conicGradient()}" /></div>
		<Points {...pointsConfig} :ref="points" on:updated={onUpdated} />
		<div class="inner" style="clip-path: circle( 49% at center); width: calc(100% - {stroke}px); height: calc(100% - {stroke}px)" >
			<slot></slot>
		</div>
	</aside>
</template>