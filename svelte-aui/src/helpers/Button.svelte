<script>
	export let ref;
	export let tabindex;
	export let className;
	export let style;

	let isDown = false
</script>

<svelte:window on:pointerup={ e => isDown = false } />

<template>
	<button {ref} {tabindex} 
		class:is-down={isDown}
		class="aui-actual-button" 

		on:pointerdown={ e => isDown = true}
		on:click 
		on:focus 
		on:blur >
		<span class="aui-actual-button-inner">
			<slot />
		</span>
	</button>
</template>