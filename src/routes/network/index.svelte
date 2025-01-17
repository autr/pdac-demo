

<script>
	import { info } from '../stores.js'
	import { Back } from 'svelte-touch-os/src/index.js'
	import { Group, Button, Dropdown, Column, Row } from 'svelte-aui/src/index.js';

	export let data = {
		usbSSID: `D'Haus Private LAN 5GHZ`,
		usbPSK: 'sGF2BvKqsv6h9QQ'
	}

	import Pencil from "svelte-material-icons/Pencil.svelte";
	import Refresh from "svelte-material-icons/Refresh.svelte";
	
</script>

<Back href="/system" />
{#if $info}
	<Column class="bt2-solid p0">

		<div class="flex row bt2-solid p06" style="justify-content: space-between;">

			<div>WLAN</div>
			<div>{ $info.wlan0 }</div>
		</div>
		<div class="flex row bt2-solid p06" style="justify-content: space-between;">

			<div>USB</div>
			<div>{ data.usbSSID }</div>
		</div>

	</Column>

	<Button a={{grow: true}} className="mlr06">
		<a 
			style="justify-content: center;align-items: center;"
			href="/network/list">
			<Refresh size="1.6em" />
			<div class="ml04">Connect Manually</div>
		</a>
	</Button>

	{#if data.usbSSID}
		<Button a={{grow: true}} className="mlr06" style="margin-bottom: 0.6em">
			<a 
				style="justify-content: center;align-items: center;"
				href="/network/connect?ssid={data.usbSSID}">
				<Pencil size="1.6em" />
				<div class="ml04">Connect Automatically</div>
			</a>
		</Button>
	{/if}


{/if}

