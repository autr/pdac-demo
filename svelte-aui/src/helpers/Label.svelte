<script>
  import { valueToHuman } from '../utilities/shared.js'
	
	export let a;

</script>

<template>
	<div class="aui-label">
		<label class="aui-label-name">{@html a.name}</label>
    <!-- <span class="aui-label-value">{valueToHuman(a)}</span> -->
	</div>
</template>