<script>
	export let object
</script>

<template>
	<div class="aui-debug">
		{JSON.stringify(object, null, 2)}
	</div>
</template>