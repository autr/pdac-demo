<script>

	import Index from '../Index.svelte'
	import { DRP, PROPS } from '../../Defines.js'

	export let a;
	a = {...PROPS[DRP], ...a};
	export let style = "";
	export let className = "";


</script>

<template>
	<Index {a} {style} {className} on:click on:focus on:input on:blur on:change on:keypress>
		<slot />
	</Index>
</template> 