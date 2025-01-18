<script>

	import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte";
	export let history = false;

	export let href = null


	$: hrefSafe = typeof href == 'string' ? href : '/'
	$: previousPageName = hrefSafe.split('/')[1].toLowerCase()

	
	import Home from "svelte-material-icons/Home.svelte";
	import Human from "svelte-material-icons/Human.svelte";
	import Sync from "svelte-material-icons/Sync.svelte";
	import DramaMasks from "svelte-material-icons/DramaMasks.svelte";
	import Cogs from "svelte-material-icons/Cogs.svelte";


</script>

<!-- {#if !history} -->

<div class="flex row mb0" style="width:100%;justify-content: space-between;align-items: center;justify-items: center;">
	<a 
		id="back" 
		class="flex row flex-grow plr06 w100pc"
		style="flex-grow: 1!important;justify-content: space-between;align-items: center;" 
		href={href} >
		<span class="flex row" style="justify-content: flex-start;align-items: center;">
			<ArrowLeft size="1.2em" />
			<span class="ml04">Back</span>
		</span>
		<div class="flex row" style="justify-content: flex-start;align-items: center;text-transform: capitalize;">
			{#if previousPageName == ''}
				<Home size="1.4em" />
				<!-- <span class="ml04">Home</span> -->
			{:else if previousPageName == 'session'}
				<Human size="1.4em" />
				<!-- <span class="ml04">Sessions</span> -->
			{:else if previousPageName == 'sync'}
				<Sync size="1.4em" />
				<!-- <span class="ml04">Sync</span> -->
			{:else if previousPageName == 'stage'}
				<DramaMasks size="1.4em" />
				<!-- <span class="ml04">Stage</span> -->
			{:else if previousPageName == 'system'}
				<Cogs size="1.4em" />
				<!-- <span class="ml04">System</span> -->
			{:else}
			{/if}
			<!-- {previousPageName} -->
		</div>
	</a>
</div>

<!-- {:else}

	<a id="back" class="plr06 mb0" on:click={previousInHistory} >
		<ArrowLeft />
		Back
	</a>
{/if}
 -->