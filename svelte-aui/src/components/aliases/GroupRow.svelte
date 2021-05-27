<script>
	import Group from '../Group.svelte'
	import { ROW, COL, PROPS } from '../../Defines.js'

	export let a;
	a = {...PROPS[ROW], ...a};
  // console.log('[GroupRow.svelte]', JSON.stringify(a, null, 2));
	export let style = "";
	export let className = "";
</script>

<template>
	<Group {a} {style} {className} >
		<slot />
	</Group>
</template>

