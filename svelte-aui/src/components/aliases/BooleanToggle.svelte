<script>
	import Boolean from '../Boolean.svelte'
	import { BTN, TOG, PROPS } from '../../Defines.js'

	export let a;
	a = {...PROPS[TOG], ...a};
	export let style = "";
	export let className = "";
</script> 

<template>
	<Boolean {a} {style} {className} >
		<slot />
	</Boolean>
</template>