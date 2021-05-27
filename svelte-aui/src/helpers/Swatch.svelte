<script>
	
	import { HSLA2CSS } from '../utilities/toolkit.js'
	export let color;

</script>

<template>
	<canvas width="1" height="1" class="swatch" style="background-color: { HSLA2CSS( color ) }" />
</template>