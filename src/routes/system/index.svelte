<script context="module">
	import { AutoPreload } from 'svelte-touch-os/src/index.js'
	export async function preload( page, session ) { return AutoPreload(page, session, this) }
</script>

<script>
	import axios from 'axios'
	import { Back } from 'svelte-touch-os/src/index.js'
	import { Group, Button, Dropdown, Column, Row } from 'svelte-aui/src/index.js';

	// import {  overlay } from '../stores.js'

	import { info, overlay } from '../stores.js'
	import { getContext } from 'svelte';
	const page = getContext('page');
	const data = getContext('data');

	let turnOffOverlay = 0

	function noOverlay( turnOffOverlay ) {

		if (turnOffOverlay == 0) return

		setTimeout( () => {
			overlay.set(null)
			turnOffOverlay = 0
		}, 2000)
	}

	$: noOverlay( turnOffOverlay ? true : 0 )

	function update() {

		overlay.set({
			type: "wait",
			status: "🤖",
			message: "Update System Script Runs (Demo)"
		});

		turnOffOverlay += 10


		// axios.post('/system/update?as=json').then( res => {
		// 	console.log('[System] 📠  update');

		// }).catch(err => {
		// 	console.log('[System] 📠❌  update', err);

		// });
	}
	function calibrate() {

		overlay.set({
			type: "wait",
			status: "🤖",
			message: "Screen Calibrator Script Runs (Demo)"
		});

		turnOffOverlay += 10

		// axios.post('/system/calibrate?as=json').then( res => {
		// 	console.log('[System] 📠  calibrate');

		// }).catch(err => {
		// 	console.log('[System] 📠❌  calibrate', err);

		// });

	}
	function reboot() { 

		overlay.set({
			type: "wait",
			status: "🤖",
			message: "Reboot System Script Runs (Demo)"
		});

		turnOffOverlay += 10

		// axios.post('/system/reboot?as=json').then( res => {
		// 	console.log('[System] 📠  reboot');

		// }).catch(err => {
		// 	console.log('[System] 📠❌  reboot', err);

		// });

	}
	function shutdown() {

		overlay.set({
			type: "wait",
			status: "🤖",
			message: "Shutdown System Script Runs (Demo)"
		});

		turnOffOverlay += 10

		// axios.post('/system/shutdown?as=json').then( res => {
		// 	console.log('[System] 📠  shutdown');

		// }).catch(err => {
		// 	console.log('[System] 📠❌  shutdown', err);

		// });

	}

	function toggleDrafts() {
		info.toggleDrafts();
	}

	function updateSystem() {

		overlay.set({
			type: "wait",
			status: "🤖",
			message: "Update System Script Runs (Demo)"
		});

		turnOffOverlay = 1


		// console.log('[System] 📠  updating system...');
		// axios.post('/system/update?as=json').then( res => {
		// 	console.log('[System] 📠  updating');

		// }).catch(err => {
		// 	console.log('[System] 📠❌  updating', err);

		// });
	}

	import PowerStandby from "svelte-material-icons/PowerStandby.svelte";
	import Restart from "svelte-material-icons/Restart.svelte";
	import Overscan from "svelte-material-icons/Overscan.svelte";
	import Update from "svelte-material-icons/Update.svelte";
	import Wifi from "svelte-material-icons/Wifi.svelte";
	import Numeric from "svelte-material-icons/Numeric.svelte";
	import RenameBox from "svelte-material-icons/RenameBox.svelte";
	import Video from "svelte-material-icons/Video.svelte";
	import Watch from "svelte-material-icons/Watch.svelte";
	import FileEdit from "svelte-material-icons/FileEdit.svelte";
	import PaletteOutline from "svelte-material-icons/PaletteOutline.svelte";

</script>

<Back href="/" />
<!-- <Column> -->
	<Column a={{grow: true}} className="plr06 bt2-solid">
		<Row className="mb04 mt06" a={{grow: true}}>
			<Button a={{grow: true}} on:click={shutdown}>
				<!-- Shutdown -->
				<div class="centered">
					<PowerStandby size="1.2em" />
					<div class="ml04">Shutdown</div>
				</div>
			</Button>
			<Button a={{grow: true}} on:click={reboot}>
				<!-- Reboot -->
				<div class="centered">
					<Restart size="1.2em" />
					<div class="ml04">Reboot</div>
				</div>
			</Button>
		</Row>
		<Row className="mb04" a={{grow: true}}>
			<Button a={{grow: true}} on:click={calibrate}>
				<!-- Calibrate Screen -->
				<div class="centered">
					<Overscan size="1.2em" />
					<div class="ml04">Calibrate Screen</div>
				</div>
			</Button>
			<Button a={{grow: true}} on:click={updateSystem}>
				<!-- Update System -->
				<div class="centered">
					<Update size="1.2em" />
					<div class="ml04">Update System</div>
				</div>
			</Button>
		</Row>
		<Row className="mb06" a={{grow: true}}>
			<Button a={{grow: true}}>
				<a rel="prefetch" href="/network">
					<!-- WLAN / Wifi -->
					<Wifi size="1.2em" />
					<div class="ml04">WLAN</div>
				</a>
			</Button>
			<Button a={{grow: true}}>
				<a rel="prefetch" href="/system/dhcp">
					<!-- Static IP -->
					<Numeric size="1.2em" />
					<div class="ml04">Static IP</div>
				</a>
			</Button>
		</Row>
<!-- 	</Column>
	<Column className="plr06 bt2-solid">
		<div class="pt06">Admin Only!</div>
	</Column>
	<Column className="plr06 bt2-solid"> -->
		<Row className="mb04" a={{grow: true}}>
			<Button a={{grow: true}} >
				<a rel="prefetch" href="/system/hostname">
					<!-- Hostname -->
					<RenameBox size="1.2em" />
					<div class="ml04">Hostname</div>
				</a>
			</Button>
			<Button a={{grow: true}} >
				<a rel="prefetch" href="/camera">
					<!-- Calibrate Camera -->
					<Video size="1.2em" />
					<div class="ml04">Calibrate Camera</div>
				</a>
			</Button>
		</Row>
		<Row className="mb06" a={{grow: true}}>
			<Button a={{grow: true}} >
				<a rel="prefetch" href="/system/miband">
					<!-- MiBand -->
					<Watch size="1.2em" />
					<div class="ml04">MiBand</div>
				</a>
			</Button>
			<Button a={{grow: true}} on:click={toggleDrafts} >
				<!-- Drafts -->
				<a rel="prefetch" href="/system/color">
					<PaletteOutline size="1.2em" />
					<div class="ml04">Change Device</div>
				</a>
			</Button>
		</Row>
	</Column>
<!-- </Column> -->