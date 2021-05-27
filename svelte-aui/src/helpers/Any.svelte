<script>

	import { store } from '../Store.js'
	import cssVars from 'svelte-css-vars'
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import * as d from '../Defines.js'
	import Any from './Any.svelte';
	import Group from '../components/Group.svelte'
	import Number from '../components/Number.svelte'
	import Vec2 from '../components/Vec2.svelte'
	import Boolean from '../components/Boolean.svelte'
	import Text from '../components/Text.svelte'
	import Colour from '../components/Colour.svelte'
	import Matrix from '../components/Matrix.svelte'
	import Index from '../components/Index.svelte'
	import Label from './Label.svelte'
	import Debug from '../helpers/Debug.svelte'
 

	export let a = {};
	export let style = "";
	export let className = "";

	// dispatch...

	const dispatch = createEventDispatcher();

	function onValue( e ) {
		dispatch( 'value', e.detail );
	}

</script>

<template>
	{#if a.type == d.NUL || !a} 
		<slot />
	{/if}
	{#if a.type == d.COL || a.type == d.ROW } 
		<Group bind:a {className} {style} on:value={onValue}  ><slot /></Group>
	{/if}
	{#if a.type == d.BTN || a.type == d.TOG} 
		<Boolean bind:a on:value={onValue} {className} {style} ><slot /></Boolean>
	{/if}
	{#if a.type == d.SLDR } 
		<Number bind:a on:value={onValue} {className} {style} ><slot /></Number>
	{/if}
	{#if a.type == d.TXT } 
		<Text bind:a on:value={onValue} {className} {style} ><slot /></Text>
	{/if}
	{#if a.type == d.RNG || a.type == d.AXS || a.type == d.JOY} 
		<Vec2 bind:a on:value={onValue} {className} {style} ><slot /></Vec2>
	{/if}
	{#if a.type == d.COLR} 
		<Colour bind:a on:value={onValue} {className} {style} ><slot /></Colour>
	{/if}
	{#if a.type == d.MTX} 
		<Matrix bind:a on:value={onValue} {className} {style} ><slot /></Matrix>
	{/if}
	{#if a.type == d.DRP} 
		<Index bind:a on:value={onValue} {className} {style} ><slot /></Index>
	{/if}
</template> 
