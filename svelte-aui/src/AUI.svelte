<script>
	import { onMount, setContext } from 'svelte';
	import { store } from './Store.js'

	import { createEventDispatcher } from 'svelte';
	import { Clamp } from './utilities/toolkit.js'

	import { PROPS, COL } from './Defines.js'
	import Any from './helpers/Any.svelte';

	import { updateCallback, addCallback, destroyCallback, recursiveOperator } from './utilities/objects.js'

	import { observeMany } from 'svelte-extras';

	// dispatch...

	const dispatch = createEventDispatcher();

	export const clean = ( obj, counter ) => {

		// expand with defaults...

		obj = {...PROPS[obj.type], ...obj};
		let {children, ...o} = obj;
		const k = Object.keys( $store );
		const n = o.key || o.name || "Unknown";

		// generate unique key...

		if (k.indexOf(n) != -1) {
			let i = 1;
			while ( k.indexOf(n + i) != -1 ) i++;
			obj.key = n+i;
		} else {
			obj.key = n;
		}
		obj.tabindex = counter++;

		// iter...

		o.key = obj.key;
		o.tabindex = obj.tabindex;

		// set store...

		$store[obj.key] = o;

		if ( obj.children ) {
			for( let i = 0; i < obj.children.length; i++ ) {
				obj.children[i] = clean( obj.children[i], counter );
			}
		} 

		return obj;
	}


	export let a;
	export let className = "";

	$: classes = className + ' aui-root';


	function onValue( e ) {
		console.log('AUI received updated event:', a.children[0].children[0].value, e.detail);
		dispatch( 'value', e.detail );
	}

	function set( key, json ) {
		const res = recursiveOperator( key, null, json, a, updateCallback);
		a = res.object;
		return res;
	}

	function update( key, property, json ) {
		const res = recursiveOperator( key, property, json, a, updateCallback);
		a = res.object;
		return res;
	}

	function add( key, position, json ) {
		const res = recursiveOperator( key, position, json, a, addCallback);
		a = res.object;
		return res;
	}

	function destroy( key, position ) {
		const res = recursiveOperator( key, position, null, a, destroyCallback);
		a = res.object;
		return res;
	}


	onMount( async() => {
		console.log(1, a.name);
		if (!a.name) a.name = "Default";
		console.log(2, a.name);
		a = { ...PROPS[COL], ...a };
		console.log(3, a.name);
		a = clean( a, 0 );
		if (!window.aui) window.aui = {};
		window.aui[a.name] = {
			set, // sets raw json
			add, // add json child
			update, // updates property
			destroy // destroys json
		}
		console.log(4, a, window.aui);
	});


</script>

<template>
<Any className={classes} bind:a={a} on:value={onValue}><slot /></Any>
</template>

<style global lang="sass" >
@import 'styles/reset'
@import 'styles/main'
</style>