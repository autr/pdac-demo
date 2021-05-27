<script>
	import Group from '../Group.svelte'
	import { ROW, COL, PROPS } from '../../Defines.js'

	export let a;
	a = {...PROPS[COL], ...a};
  // console.log('[GroupColumn.svelte]', JSON.stringify(a, null, 2));
	export let style = "";
	export let className = "";
</script>

<template>
	<Group bind:a {style} {className} >
		<slot />
	</Group>
</template>
