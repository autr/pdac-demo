<script>

	import { onMount } from 'svelte'
	import { goto } from '@sapper/app';

	import sessions from '../sessions.json'

	// stores...

	import { info, overlay } from './../../stores.js'
	import { stores } from '@sapper/app';
	const { page } = stores();

	// icons ...

	import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte";
	import TimerSand from "svelte-material-icons/TimerSand.svelte";
	import RadioboxMarked from "svelte-material-icons/RadioboxMarked.svelte";
	import Alert from "svelte-material-icons/Alert.svelte";
	import Pause from "svelte-material-icons/Pause.svelte";
	import Play from "svelte-material-icons/Play.svelte";
	import Refresh from "svelte-material-icons/Refresh.svelte";

	// helpers...

	import { Timestamp, Timer, WebCam, Back, AudioLevels } from 'svelte-touch-os/src/index.js'
	import { Any, Button, Column, Row, Block } from 'svelte-aui/src/index.js'

	let paused = false;
	let recording = false;
	let restartTimer;

	let PDAC_MODE = process.env.PDAC_MODE;
	let PDAC_MODE_RECORD = "RECORD";
	let PDAC_MODE_STAGE = "STAGE";

	$: zeroIdx = parseInt( $page.params.idx, 10 ) - 1;
	$: humanIdx = parseInt( $page.params.idx, 10 );

	let data = sessions.data

	$: session = data.find( item => {
		return $page.params.slug == item.url
	})

	$: exercise = (session.exercises[zeroIdx]) ? session.exercises[zeroIdx].exercise_id : { example: { data: {} }};
	$: tags = exercise.tags || [];
	$: tags_mapped = tags.map( t => t.tag_id.url )


	$: _identifier = () => {

		let str = $info.hostname + '_';
		str += session.point_of_interest + '_';
		str += session.url + '_';
		str += humanIdx + '_';
		tags.forEach( (t, i) => {
			if (t.tag_id) {
				str += t.tag_id.url;
				if (i < tags.length - 1) str += '-';
			}
		});
		console.log('[SESSION] 🗯 🦆  returning ID:', str);
		return str;
	}

	$: identifier = _identifier();


	onMount( async() => {
 
		console.log('PDAC_MODE (client-side)', PDAC_MODE)
		console.log('[session:slug:idx] 🤳 idx:', humanIdx);

		if (process.browser) {

		}

	});


	$: recordingConfig = {
		'session-id': `${identifier}_${Timestamp()}`,
		sources: {
			audio: {
				active: true
			},
			video: {
				active: true
			},
			heartrate: {
				active: true
			}
		},
		sinks: {
			rstp: {
				active: false
			},
			file: {
				active: true
			},
			window: {
				active: false
			}
		}
	};

	function onIntroStart(e) {
		// console.log('[session:slug:idx] 🖖🏁 intro start:', e.detail);
		
	}
	function onRecordStart(e) {
		console.log('[session:slug:idx] 🔴🏁 record start:', e.detail);
	}

	function onIntroSecond( e ) {
		const t = parseInt( e.detail, 10);
		if (t <= 10 && t != 0) {
			const sequence = (t == 1) ? '50 50 11 0.001' : '100 100 1 0.001';
			console.log('Count', sequence, t);
			console.log('[session:slug:idx] 🖖 intro buzz:', e.detail);

		}
	}

	function onIntroEnd( e ) {
		console.log('[session:slug:idx] 🖖 INTRO ENDED RUNNING START:', e.detail);
		start();
	}
	function onRecordSecond( e ) {
		// console.log('[session:slug:idx] 🔴 recording:', e.detail);
	}

	function onRecordEnd( e ) {
		console.log('[session:slug:idx] 🔴✅  recording ended:', e.detail);
		stop();
	}

	function start( e ) {

		overlay.set({
			type: 'wait',
			status: '🤖',
			message: "Starting AI Session (Demo)"
		})

		const tags = [ 'liebe', 'trauer', 'wut', 'freude', 'uberraschung', 'verachtung', 'angst' ]
		let sTitle = 'none'
		tags_mapped.forEach( t => {
			if ( tags.indexOf( t ) != -1 ) sTitle = t
		})

		const conf = { 
			action: 'start', 
			title: sTitle, 
			tags: tags_mapped, 
			type: '🤖', 
			length: exercise.time, 
			timestamp: new Date().toISOString().substr(11, 8),
			message: `starting exercise: "${sTitle}" ${exercise.time}s`
		}

		console.log('[idx.svelte] 🤖 ⚡️ 💅  sending config START to AI...', conf)


		overlay.set({
			type: 'wait',
			message: "Opening Camera Backend (Demo)"
		})
		console.log('---> BEFORE SET TIMEOUT EVENT' )

		beginRecordingNum += 1
	}

	let beginRecordingNum = 0


	$: beginRecording( beginRecordingNum )

	function beginRecording( triggerNum ) {

		if (beginRecordingNum == 0) return

		setTimeout(() => {

			console.log('SET TIMEOUT EVENT')
			console.log('[session:slug:idx] 📸  begun recording ✅');
			recording = true;
			overlay.set( null );
			beginRecordingNum = 0
		}, 2000)
	}


	let triggerNextPage = 0

	function stop( e ) {


		overlay.set({
			type: 'wait',
			message: "Sending to AI (Demo)"
		})

		const conf = { action: 'stop', type: '🤖', timestamp: new Date().toISOString().substr(11, 8), message: 'stopping exercise' }
		console.log('[idx.svelte] 🤖 ⚡️ 💅  sending config STOP to AI...', conf)

		triggerNextPage += 1
	}

	$: triggerNext( triggerNextPage )

	function triggerNext( trigger ) {

		if (trigger == 0) return

		setTimeout( () => {
			recording = false;
			const url = (zeroIdx >= session.exercises.length - 1) ? '/session/' + session.url + '/complete' : '/session/' + session.url + '/' + ( humanIdx + 1);
			console.log( '[session:slug:idx] 🛫  goto: ', url, zeroIdx, session.exercises.length)
			goto( url ); 
			overlay.set( null );
			triggerNextPage = 0
		}, 2000)
	}

	let newTime = 0

	function clickRestart( time ) {
		console.log('WOOO', time)
		if (mainTimer) mainTimer.restart( time )

			requestAnimationFrame( () => {
				document.querySelectorAll('button').forEach( button => {
					button.classList.remove('active')
				})
			})
	}

	let mainTimer = null

</script>

<Block className="justify-center align-center mt3">
	{#if recording} 
		<Timer className="pulse" id="RECORD: {exercise.description}" on:start={onRecordStart} on:second={onRecordSecond} on:end={onRecordEnd} time={exercise.time} />
	{:else}
		<Timer className="spin" 
		id="INTRO: {exercise.description}" 
		bind:this={mainTimer}
		bind:restart={restartTimer} 
		on:start={onIntroStart} 
		on:second={onIntroSecond} 
		on:end={onIntroEnd} 
		time={ session.break_time + 0.999} 
		paused={paused} />
	{/if}
</Block>
<Row a={{grow: true}} className="align-center mlr06">

	{#if session.point_of_interest == 'sound' && exercise.example } 
		{#if exercise.example.data}
			<audio style="max-width:120px" class="mtb06 grow" src={exercise.example.data.full_url} autoplay controls />
		{/if}
	{/if}
	<div class="grow flex column">
		<div class="flex row mb02" style="font-size:1.6em;gap:0.1em;justify-content: center;">
			<!-- <span>Exercise</span> -->
			<span>{humanIdx}</span>
			<span>/</span>
			<span>{session.exercises.length}</span>
		</div>
		<div>{exercise.description}</div>
		<div class="">
			Tags:
			{#each exercise.tags as tag}
				<span>{tag.tag_id.title}&nbsp;</span>  
			{/each}
		</div>
	</div>
</Row>


{#if recording} 
	<Column a={{grow: true}} className="mlr06" >
		<Button 
			a={{grow: true, height: '60px'}} 
			className="pb1 flex row flex-grow"
			style="justify-items: center; align-items: stretch;"
			on:click={ stop }>
			<div class="centered">
				<Alert size="1.6em" />
				<div class="ml04">Panic!</div>
			</div>
		</Button>
	</Column>
{:else}
	<a 
		class="p1 row"
		style="justify-content:flex-start;align-items: center;position: absolute; top: 30px; left: 0px;flex-direction: row;align-items: center;" href="/session/{session.url}"><ArrowLeft /> Back</a>
	<Row a={{grow: true}} className="mlr06 pb06"> 
		<Button  
			id="buttonB"
			className="override-button"
			a={{grow: true}} 
			on:click={ () =>  clickRestart( session.break_time + 0.9999 ) } >
			<div class="centered">
				<span><Refresh size="2em" /></span>
			</div>
		</Button>
		<Button  
			a={{grow: true}} 
			on:click={ () => paused = !paused }>
			<div class="centered">
				{#if paused}
					<span><Play size="2em" /></span>
				{:else}
					<span><Pause size="2em" /></span>
				{/if}
			</div>
		</Button>
		<Button  
			id="buttonB"
			a={{grow: true}}
			className="override-button"
			on:click={ () => clickRestart( 5.99999 ) } >
			<div class="centered">
				5s
			</div>
		</Button>
	</Row>
{/if}

<!-- 

	function speak( text, speed ) {

		let speak = new SpeechSynthesisUtterance(text);
		speak.lang = 'de-DE';
		speak.pitch = 0;
		speak.rate = speed;
		let voices = window.speechSynthesis.getVoices();
		speak.voice = voices[3];
		window.speechSynthesis.speak(speak);
	}
 -->