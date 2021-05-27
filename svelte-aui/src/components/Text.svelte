<script>
	
	import { onMount, onDestroy, createEventDispatcher } from 'svelte'

	/* defines */

	import { PROPS, TXT } from '../Defines.js'

	/* shared */

	import { createClasses, createStyles } from '../utilities/shared.js'

	/* utilities */

	import { Helper, Event } from '../utilities/events.js'
	import { store } from '../Store.js'

	/* helpers */

	import Label from '../helpers/Label.svelte'

	export let a;
	export let className = "";
	export let style = "";
	a = { ...PROPS[TXT], ...a }
	
	export let InputEl;

	let helper = new Helper();
	
	// dispatch...

	const dispatch = createEventDispatcher();


	

	function onFocus(e) {
		dispatch( 'focus', e );
		setTimeout( () => document.execCommand("selectall",null,false) ,1)
	}
	function onChange(e) {
		console.log('fdsfd');
		InputEl.blur();
		dispatch( 'value', a );
		dispatch( 'change', e );
	}
	function onKeyPress(e) {
		console.log('3213');
		if (e.keyCode == 13) InputEl.blur();
		dispatch( 'keypress', e );
	}

	$: classes = createClasses(a, `${className} aui-el aui-text` );

</script>

<template>
	<div class={classes} data-key={a.key}>
		<Label {a} />
		{#if a.variant === 'text' || !a.variant}
			<input 
				data-key={a.key}
				tabindex={a.tabindex}
				type='text'
				placeholder={a.placeholder}
				bind:value={a.value}
				bind:this={InputEl}
				on:blur
				on:click
				on:focus={onFocus}
				on:change={onChange}
				on:input
				on:keypress={onKeyPress}
				on:keydown /> 
		{:else if a.variant === 'textarea'}
			<textarea 
				data-key={a.key}
				tabindex={a.tabindex}
				type='text'
				placeholder={a.placeholder}
				bind:value={a.value}
				bind:this={InputEl}
				on:blur
				on:click
				on:focus={onFocus}
				on:change={onChange}
				on:input
				on:keypress={onKeyPress}
				on:keydown /> 
		{:else if a.variant === 'email'}
			<input 
				data-key={a.key}
				tabindex={a.tabindex}
				type='email'
				placeholder={a.placeholder}
				bind:value={a.value}
				bind:this={InputEl}
				on:blur
				on:click
				on:focus={onFocus}
				on:change={onChange}
				on:input
				on:keypress={onKeyPress}
				on:keydown /> 
		{:else if a.variant === 'number'}
			<input 
				data-key={a.key}
				tabindex={a.tabindex}
				type='number'
				placeholder={a.placeholder}
				bind:value={a.value}
				bind:this={InputEl}
				on:blur
				on:click
				on:focus={onFocus}
				on:change={onChange}
				on:input
				on:keypress={onKeyPress}
				on:keydown /> 
		{:else if a.variant === 'password'}
			<input 
				data-key={a.key}
				tabindex={a.tabindex}
				type='password'
				placeholder={a.placeholder}
				bind:value={a.value}
				bind:this={InputEl}
				on:blur
				on:click
				on:focus={onFocus}
				on:change={onChange}
				on:input
				on:keypress={onKeyPress}
				on:keydown /> 
		{:else}
			<span>No variant set!</span>
		{/if}
	</div>
</template>