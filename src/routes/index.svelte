<script>

	import { onMount } from 'svelte'
	import axios from 'axios'
	import { Any, Button, Column, Row, Block, Dropdown } from 'svelte-aui/src/index.js'
	import { info, overlay } from './stores.js'
	import { stores } from '@sapper/app';
	const { page } = stores();
	
	let waitMsg = "Waiting for Backend"; 
	onMount( async() => {
		console.log('[/:index.svelte] 📊 onMount main menu...')
		// await info.grab();
		// if (!infoBackend.active) {
		//   console.log('[/:index.svelte] ℹ ❌  no backend, looping...')
		//   overlay.set({type: "wait", message: waitMsg, close: "Skip"}) 
		//   setTimeout( loopUntilBackend, 3000);
		// } else if ( !wlan.ssid && ( $page.path == "/" || $page.path == "" )  ) {

		//   axios.get( '/ping?as=json' ).then( () => {
		//     console.log('[/:index.svelte] 🐇✅ directus successfully pinged');
		//   }).catch( () => {
		//     overlay.set({type: "wlan", message: "Could not connect to API", close: "Skip", actions: [ ['Setup WLAN', '/network'] ]})
		//   })
		// }

	});

	$: information = $info || {}
	$: wlan = information.wlan0 || {}
	$: infoBackend = information.backend || {}
	// preload data...

	async function loopUntilBackend() {

		await info.grab();

		console.log('[/:index.svelte] retrying for backend...')
		if (!infoBackend.active && $overlay) {
			if ($overlay.type == "wait" && $overlay.message == waitMsg) {
				console.log('[/:index.svelte] ℹ️ ⭕️  retrying for backend in 3 seconds')
				setTimeout( loopUntilBackend, 3000);
			} else {
				console.log('[/:index.svelte] ℹ️ ✅  cancelled wait for backend')
			}
		} else {
			overlay.set( undefined )
		}
	}


	import AllColors from './db.colors.js'

	let colorsDropdown = {
		options: AllColors.map( (color, index) => {
			return {
				...color,
				label: color.hostname
			}
		}), 
		placeholder: 'Change Device',
		key: 'label', 
		grow: true
	}

	function onChangeColor( index ) {
		console.log('🎨 SET NEW DEVICE', index.detail)
		if (index.detail != 0) info.setColorIndex( index.detail - 1 )
	}

	function iterateColor( amt ) {
		let newIndex = $info.colorIndex + amt
		if (newIndex < 0) newIndex = AllColors.length - 1
		if (newIndex >= AllColors.length) newIndex = 0
		info.setColorIndex( newIndex )
	}

	import Home from "svelte-material-icons/Home.svelte";
	import Human from "svelte-material-icons/Human.svelte";
	import Sync from "svelte-material-icons/Sync.svelte";
	import DramaMasks from "svelte-material-icons/DramaMasks.svelte";
	import Cogs from "svelte-material-icons/Cogs.svelte";
	import PaletteOutline from "svelte-material-icons/PaletteOutline.svelte";
	import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte";
	import ArrowRight from "svelte-material-icons/ArrowRight.svelte";
	import ChevronLeft from "svelte-material-icons/ChevronLeft.svelte";
	import ChevronRight from "svelte-material-icons/ChevronRight.svelte";


</script>

<style lang="sass">
	.link a
		/*display: block*/
</style>


<Row a={{grow: true}} className="mlr06 mt06"> 
	<Button a={{grow: true}} >
		<a class="grow flex plr06" 
			rel="prefetch" 
			style="justify-content: center;align-items: center;"
			href="/session">
			<Human size="1.6em" />
			<div class="ml04">Sessions</div>
		</a>
	</Button>
	<Button a={{grow: true}} >

		<a class="grow flex plr06" 
			rel="prefetch" 
			style="justify-content: center;align-items: center;"
			href="/sync">
			<Sync size="1.6em" />
			<div class="ml04">Sync</div>
		</a>
	</Button>
</Row>
<Row a={{grow: true}} className="mlr06" style="margin-bottom:0.6em"> 
	<Button a={{grow: true}} >
		<a class="grow flex plr06" 
			rel="prefetch" 
			style="justify-content: center;align-items: center;"
			href="/stage">
			<DramaMasks size="1.6em" />
			<div class="ml04">Stage</div>
		</a>
	</Button>
	<Button a={{grow: true}} >
		<a class="grow flex plr06" 
			rel="prefetch" 
			style="justify-content: center;align-items: center;"
			href="/system">
			<Cogs size="1.6em" />
			<div class="ml04">System</div>
		</a>
	</Button>
</Row>

