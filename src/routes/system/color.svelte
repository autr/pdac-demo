
<script>

	import AllColors from '../db.colors.js'
	import { Back } from 'svelte-touch-os/src/index.js'
	import { Any, Button, Column, Row, Block, Dropdown } from 'svelte-aui/src/index.js'

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

	import { info, overlay } from '../stores.js'
	import PaletteOutline from "svelte-material-icons/PaletteOutline.svelte";
	import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte";
	import ArrowRight from "svelte-material-icons/ArrowRight.svelte";
	import ChevronLeft from "svelte-material-icons/ChevronLeft.svelte";
	import ChevronRight from "svelte-material-icons/ChevronRight.svelte";

</script>

<Back href="/system" />

<Block className="p06 bt2-solid">

	<span>
		Each device is linked to stickers on the hardware.
	</span>
</Block>
<Row className="p06 pt0 pb0">
	<Block a={{grow: false}} className="relative" style="position:relative">
		<div style="position:absolute;top:1.25em;left:1em">
			<PaletteOutline 
				size="1.4em" />
		</div>
		<Dropdown 
			style="min-height:4em"
			className="icon-inset aui-dropdown"
			on:change={onChangeColor}
			a={{ ...colorsDropdown, value: $info.colorIndex + 1 }} />
		
	</Block>
</Row>
<Row a={{grow:true}} className="p06 cgrow pt0">
	
	<Button 	
		on:click={ e => iterateColor(-1) }
		style="min-width:2em">
		<div class="centered">
			<ChevronLeft size="1.6em" />
		</div>
	</Button>
	<Button 
		on:click={ e => iterateColor(1) }
		style="min-width:2em">
		<div class="centered">
			<ChevronRight size="1.6em" />
		</div>
	</Button>
</Row>