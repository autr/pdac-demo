<script>

	import { onMount, onDestroy, createEventDispatcher } from 'svelte'

	/* defines */

	import  { PROPS, ROW, COL } from '../Defines.js'

	/* shared */

	import { createClasses, createStyles } from '../utilities/shared.js'

	/* helpers */

	import Any from '../helpers/Any.svelte';
	import Label from '../helpers/Label.svelte'

	// dispatch...

	const dispatch = createEventDispatcher();



	export let a;
	export let style = '';
	export let className = '';
	a = { ...PROPS[COL], ...a }
  // console.log('[Group.svelte]', JSON.stringify(a, null, 2));


	function donValue( e ) {
		dispatch( 'value', e.detail ); 
	}

	$: classes = createClasses(a, `${className} aui-group` );
	$: styles = createStyles(a, style);


</script>

<template>
	<section class={classes} style={styles} tabindex={a.tabindex} data-key={a.key}>
			<!-- <Label {a} /> -->
			<slot />
			{#each a.children as c}

				{#if c.type === ROW || c.type === COL }
					<svelte:self bind:a={c} on:value={donValue} />
				{:else}
					<Any bind:a={c}  on:value={donValue} />
				{/if}
			{/each}
	</section>

</template>
