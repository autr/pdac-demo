<script>

	import sessions from '../sessions.json'

	import { onMount } from 'svelte'
	import { goto } from '@sapper/app';

	// stores...

	import { info, overlay } from './../../stores.js'
	import { stores } from '@sapper/app';
	const { page } = stores();

	// icons ...

	import TimerSand from "svelte-material-icons/TimerSand.svelte";
	import RadioboxMarked from "svelte-material-icons/RadioboxMarked.svelte";

	// helpers...

	import { Timestamp, Back, WebCam, AudioLevels }  from 'svelte-touch-os/src/index.js'
	import { Any, Button, Column, Row, Block } from 'svelte-aui/src/index.js'


	let data = sessions.data

	$: session = data.find( item => {
		return $page.params.slug == item.url
	})

	$: totalTime = (() => {
		let t = 0;
		session.exercises.forEach( e => {
			const ex = e.exercise_id;
			if (ex.time) t += ex.time;
		})
		return t;
	});


	let useHeartrate = true;
	$: isHRConnected = ($info) ? ($info.backend) ? $info.backend.miband.connected : false : false;

	onMount( async() => {
		console.log('[Session mount] 👥🌀')

	})

	const directorsLookup = {
		4: 'Michael Straeubig',
		5: 'Martin Grünheit',
	}

	function FormatDate( date ) {
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
		})
	}


</script>


	<!-- introduction -->

	<Back class="bb2-solid" href="/session/" />

<!--   {#if useHeartrate && !isHRConnected}
		<div style="margin: 0.5em 0em">MiBand is not connected<br />Address: {$info.backend.mac_address}</div>
		<Button on:click={reconnectHR}>Reconnect</Button>
		<Button on:click={ e => { useHeartrate = false } } >Skip</Button>
	{:else} -->
	<Block className="bt2-solid">
		<Block className="p06 bb2-solid">
			{session.title}: <br />
			{session.exercises.length} exercise(s), 
			{totalTime()} seconds in total
		</Block>
		<Block className="p06">
			{@html session?.description || 'No Description.'}
		</Block>
		<Block className="plr06 flex row" style="justify-content: space-between;align-items:center">
			<div>{directorsLookup[session.modified_by.id]}</div>
			<div>{FormatDate(new Date(session.modified_on))}</div>
		</Block>
		<Block className="p06">
				<Button a={{height: '80px'}}>
					<a href={$page.path + '/preview'}>Start Session</a>
				</Button>
		</Block>
	</Block>

<!--   {/if} -->

