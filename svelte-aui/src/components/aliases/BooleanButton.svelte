<script>
	import Boolean from '../Boolean.svelte'
	import { BTN, TOG, PROPS } from '../../Defines.js'

	export let a;
	a = {...PROPS[BTN], ...a};
	export let style = "";
	export let className = "";
</script>

<template>
	<Boolean {a} {style} {className} on:click on:blur on:focus >
		<slot />
	</Boolean>
</template> 