<script>

	import { onMount, onDestroy, createEventDispatcher } from 'svelte'

	/* defines */

	import { PROPS, DRP } from '../Defines.js'


	/* helpers */

	import Label from '../helpers/Label.svelte'
	
	/* shared */

	import { Helper, Event } from '../utilities/events.js'
	import { createClasses, createStyles } from '../utilities/shared.js'


	// dispatch...

	const dispatch = createEventDispatcher();

	export let a;
	export let className = "";
	export let style = "";
	a = { ...PROPS[DRP], ...a }

	let SelectEl;
	let selected = {};

	$: hasIndex = a.value >= 0 && a.value < a.options.length;
	$: current = a.options[a.value];

	function onChange(e) {
		a.value = a.options.indexOf(selected);
		SelectEl.blur();
		if ( ( a.placeholder && a.value != 0 ) || !a.placeholder ) dispatch('change', a.value);
	}
	function onKeyPress(e) {
		if (e.keyCode == 13) SelectEl.blur();
		dispatch('keypress', a.value);
	}

	$: classes = createClasses(a, `${className} aui-el aui-index` );
	$: styles = createStyles(a, style);
	$: opts = ([ { [a.key]: a.placeholder } ]).concat( a.options );
</script>

<template>
	<div class={classes} style={styles} data-key={a.key}>
		<Label {a} />
		<select
			data-key={a.key}
			tabindex={a.tabindex}
			bind:this={SelectEl} 
			bind:value={selected}
			on:click
			on:blur
			on:focus
			on:change={onChange}
			on:input
			on:keypress={onKeyPress}>
			{#each opts as o}
				<option value={o}>
					{o[a.key]}
				</option>
			{/each}
		</select>
		<div class="aui-index-inner">
			{#if hasIndex}
				{current[a.key]} 
			{:else}
				{a.placeholder}  
			{/if}
		</div>
	</div>
</template>