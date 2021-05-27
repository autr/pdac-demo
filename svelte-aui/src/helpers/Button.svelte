<script>
	export let ref;
	export let tabindex;
	export let className;
	export let style;
</script>

<template>
	<button {ref} {tabindex} class="aui-actual-button" on:click on:focus on:blur >
		<span class="aui-actual-button-inner">
			<slot />
		</span>
	</button>
</template>