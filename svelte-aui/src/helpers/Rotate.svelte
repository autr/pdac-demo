<script>
	
	export let rotate;
	export let ref;
	let SlotEl;

	$: degrees = rotate - (rotate%90);
	$: vertical = (Math.abs(degrees) == 90);

	$: width = (() => {
		if (vertical && SlotEl) {
			return `${SlotEl.offsetHeight}px`;
		}
		return '100%';
	});
	$: height = (() => {
		if (vertical && SlotEl) {
			return `${SlotEl.offsetWidth}px`;
		}
		return '100%';
	});

	export function getHeight() {
		return (vertical) ? SlotEl.offsetWidth : SlotEl.offsetHeight;
	}
	export function getWidth() {
		return (vertical) ? SlotEl.offsetHeight : SlotEl.offsetWidth;
	}

	function translation() {
		if (degrees == -90) return "translate(-100%, 0%)";
		if (degrees == 90) return "translate(0%, -100%)";
		if (degrees == 180) return "translate(-100%, -100%)";
		return "translate(0%, 0%)";
	}


	$: transform = `width: ${width()}; height: ${height()}; transform: rotateZ(${ degrees }deg) ${translation()} `;
</script>

<template>
	{#if degrees == 0}
		<slot />
	{:else}
		<div class="aui-hidden">
			<slot />
		</div>
		<div {ref} bind:this={SlotEl} class="aui-rotate" >
			<div class="aui-rotate-el" style={transform}>
				<slot />
			</div>
		</div>
	{/if}
</template>