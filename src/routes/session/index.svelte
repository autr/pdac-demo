

<script>

	import sessions from './sessions.json'

	import { info } from '../stores.js'
	import { Back } from 'svelte-touch-os/src/index.js'
	import { Any } from 'svelte-aui/src/index.js'
	export let data;
		
	$: dev = process.env.NODE_ENV === 'development';


	const directorsLookup = {
		4: 'MS',
		5: 'MG',
	}

	function FormatDate( date ) {
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
		})
	}


</script>


<Back href="/"/>
{#each sessions.data as session}
	{#if session.status}
		<a 
			class="flex align-center row plr06 ptb1 bt2-solid mb0" 
			style="justify-content: space-between;align-items: center;"
			href={`/session/${session.url}`}>
			<div>{session.title}</div>
			<div>{FormatDate(new Date(session.created_on))}</div>
			<!-- <div>{directorsLookup[d.modified_by.id]}</div> -->
		</a>
	{/if}
{/each}