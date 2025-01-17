
<script>

	import { onMount } from 'svelte'
	import { Button, Column } from 'svelte-aui/src/index.js'
	import { Back } from 'svelte-touch-os/src/index.js'
	
	let data = [
		{ ssid: 'Example Home Network', frequency: 2412 }, // 2.4 GHz
		{ ssid: 'Example Office Network', frequency: 5180 }, // 5 GHz
		{ ssid: 'Example Cafe WiFi', frequency: 2437 },       // 2.4 GHz
		{ ssid: 'Example Guest Network', frequency: 5200 },   // 5 GHz
		{ ssid: 'Example Library WiFi', frequency: 2422 },    // 2.4 GHz
		{ ssid: 'Example Gym FreeWiFi', frequency: 5805 },    // 5 GHz
		{ ssid: 'Example School Network', frequency: 2407 },  // 2.4 GHz
		{ ssid: 'Example Airport WiFi', frequency: 5745 },    // 5 GHz
		{ ssid: 'Example Smart Home', frequency: 2462 },      // 2.4 GHz

	]

	$: sorted = data;//data.sort( (a,b) => Math.abs( parseInt(a.signal_level) ) - Math.abs( parseInt(b.signal_level) ) );

	$: freq = ( (num) => {
		if (num > 5000 && num < 6000) return "5ghz";
		if (num > 2400 && num < 2500) return "2.4ghz";
		return ((num/100)*10)+"ghz";
	});
	
</script>

<Back href="/network" />


<Column className="">
	{#each data as n}

		{#if n.ssid}
			<div class="bt2-solid mb0" >
				<a 
					href={`/network/connect?ssid=${n.ssid}`} class="p06 flex row"
					style="justify-content: space-between;align-items: center;"
					>
					<div>{n.ssid}</div>
					<div>{ freq(n.frequency) }</div>
				</a>
			</div>
		{/if}
	{/each}
</Column>