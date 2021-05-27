<script>
	
	import { onMount, onDestroy, createEventDispatcher } from 'svelte'
	import { store } from '../Store.js'

	import { BTN, TOG, PROPS } from '../Defines.js'

	/* utilities */

	import { Helper, Event } from '../utilities/events.js' 
	import { XY } from '../utilities/types.js'
	import { Scale } from '../utilities/toolkit.js'

	/* defines */


	/* helpers */

	import Points from '../helpers/Points.svelte'
	import Label from '../helpers/Label.svelte'
	import Button from '../helpers/Button.svelte'

	/* shared */

	import { createClasses, createStyles } from '../utilities/shared.js'

	/* initialise */

	export let a;
	export let style = "";
	export let className = "";
	a = { ...PROPS[BTN], ...a }

	$: classes = createClasses(a, `${className} aui-el aui-boolean` );
	$: styles = createStyles(a, style);

	/* initialise */

	// dispatch...

	const dispatch = createEventDispatcher();
	
	let helper = new Helper();

	function Set( key, value ) {
		a = helper.set( key, value, a );
	}

	function onClick( e ) {
		if (a.type == BTN) {
			Set( 'value', true );
			setTimeout( e => Set( 'value', false, a ),50);


		} else if (a.type == TOG) {
			Set('value', !a.value);
		}
		dispatch('click', e.detail);
	}
</script>

<template>
	<div 
		class={classes}
		style={styles} 
		class:active={a.value} 
		class:vertical={a.vertical} 
		>
		<Label {a} />
		<button
			data-key={a.key}
			tabindex={a.tabindex} 
			class="aui-actual-button"
			on:click={onClick}
			on:focus 
			on:blur 
		>
			<span class="aui-actual-button-inner">
				<slot />
			</span>
		</button>
	</div>
</template>