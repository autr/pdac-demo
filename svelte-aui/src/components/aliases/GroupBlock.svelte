<script>
	import Group from '../Group.svelte'
	import { COL, PROPS } from '../../Defines.js'
	export let a;
	a = {...PROPS[COL], ...a};
	export let style = "";
	export let className = "";
</script>

<template>
	<Group {a} {style} {className} >
		<slot />
	</Group>
</template>
