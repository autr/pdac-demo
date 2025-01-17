<script>
	import Boolean from '../Boolean.svelte'
	import { BTN, TOG, PROPS } from '../../Defines.js'

	import CheckboxBlankOutline from "svelte-material-icons/CheckboxBlankOutline.svelte";
	import CheckboxMarked from "svelte-material-icons/CheckboxMarked.svelte";


	export let a;
	a = {...PROPS[BTN], ...a, isToggle:true};
	export let style = "";
	export let className = "";
</script> 

<template>
	<Boolean bind:a={a} {style} {className} >
		<div class="centered" style="display:flex;flex-direction: row;justify-content: center!important;align-items: center!important;justify-items: center!important;width:auto!important;min-width:auto!important">
			{#if a.value}
				<CheckboxMarked size="1.4em" />
			{:else}
				<CheckboxBlankOutline size="1.4em" />
			{/if}
			<div class="ml04"><slot /></div>
		</div>
	</Boolean>
</template>