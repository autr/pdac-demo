
<script>

	import Eye from "svelte-material-icons/Eye.svelte";
	import Console from "svelte-material-icons/Console.svelte";
	import { onMount } from 'svelte'
	import { info, konsole, backend, eyeball } from './stores.js'
	import { Button } from 'svelte-aui/src/index.js'
	import { Back } from 'svelte-touch-os/src/index.js'
	import { API_ERROR, API_SUCCESS, API_TRY, API_VIZ } from './types.js'
	export let data;

	import Sessions from './session/sessions.json'
	import Exercises from './exercises.js'

	// console.log(Sessions, Exercises)

	let allExercisesSessions = []

	let demoIndex = 0
	let nextIndex = 0

	$: currentDemo = allExercisesSessions[ demoIndex ]
	$: nextDemo = allExercisesSessions[ nextIndex ]

	let presentation = true

	onMount( async() => {

		allExercisesSessions = [ 
			...Sessions.data, 
			...Exercises.data 
		].filter( item => item.status ).map( item => {
			return item.title
		})

		randomiseDemos()

		addConsoleMessage()
	})

	function randomiseDemos() {

		demoIndex = parseInt( Math.random() * allExercisesSessions.length )
		nextIndex = parseInt( Math.random() * allExercisesSessions.length )

	}

	function onButtonPress() {

		randomiseDemos()

		try {

			console.log('---> PDAC SENDS MESSAGE TO AV PC')
			// if (window.websocketsClient) {
			// 	console.log('[overview.svelte] 👈  🌐 sending websockets button press')
			// 	window.websocketsClient.send( JSON.stringify( { type: '👈', title: 'button', timestamp: new Date().toISOString().substr(11, 8), message: 'button pressed' }  ) )
			// } else {
			// 	console.log('[overview.svelte] ❌ no websockets client!')
			// }
		} catch(err) {

		}
	}

	let demoMessages = []

	const messageTypes = [ 
		API_SUCCESS, API_TRY, API_SUCCESS, API_TRY, API_SUCCESS, API_TRY, API_SUCCESS, API_TRY, 
		API_SUCCESS, API_TRY, API_SUCCESS, API_TRY, API_SUCCESS, API_TRY, API_SUCCESS, API_TRY, 
		API_ERROR 
	]

	function addConsoleMessage() {
		console.log('CONSOLE MESSAGE')
		if (!presentation) {
			demoMessages = [
				{
					type: messageTypes[ parseInt( Math.random() * messageTypes.length ) ],
					timestamp: new Date(),
					message: allExercisesSessions[ parseInt( Math.random() * allExercisesSessions.length ) ]
				},
				...demoMessages
			]
		}
		setTimeout( () => {
			addConsoleMessage()
		}, 500 + (Math.random() * 1000))
	}


		
	function FormatDate( date ) {
		return String(date.toLocaleDateString('en-GB', {
			// day: null,
			// month: null,
			// year: null,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		})).split(',')[1].substring(1)
	}

</script>

<div class="flex-row flex bb2-solid mb0 flex-grow">
	<Back href="/" className="flex-grow" />
	<Button 
		className="h100pc bl2-solid no-border mb0"
		style="border-radius:0px;border-width: 0px;background:inherit;border-left:2px solid var(--fg)"
		on:click={ e => presentation = !presentation }>
		<div class="centered">
			{#if !presentation}
				<Eye width="4em" height="1.6em" />
			{:else}
				<Console width="4em" height="1.6em"  />
			{/if}
		</div>
	</Button>
</div>

{#if presentation}
	<div class="plr06 flex flex-column align-center f5 grow">
		<div 
			class="flex row plr04"
			style="text-transform: capitalize;min-height:6em;justify-content: center;align-items: center;">
			{currentDemo || 'N/A'}
		</div>
		<!-- <div>{currentDemo?.description}</div> -->
		{#if nextDemo && presentation }
			<Button 
				className="align-self-stretch mtb08" 
				a={{grow: true}} 
				on:click={onButtonPress}>
				<div class="centered" style="text-transform: capitalize;font-size:1.2em">
					{nextDemo.split(' ')[0]}
				</div>
			</Button>
		{/if}
	</div>

{:else}
	<div class="konsole p06 grow">

		{#each demoMessages as m, i }
			{#if i < 200}
				<div>
					<span class="fade">[{FormatDate(m.timestamp)}]</span>
					<span
						class:success={m.type == API_SUCCESS}
						class:info={m.type == API_TRY}
						class:error={m.type == API_ERROR}>
						{m.message}
					</span>
				</div>
			{/if}
		{/each}

	</div>
{/if}