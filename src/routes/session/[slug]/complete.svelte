<script>

	import { onMount } from 'svelte'
	import { goto } from '@sapper/app';

	import sessions from '../sessions.json'
	// icons...

	// stores...

	import { info, overlay } from './../../stores.js'
	import { stores } from '@sapper/app';
	const { page } = stores();

	import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte";
	import Sync from "svelte-material-icons/Sync.svelte";

	import { Any, Button, Column, Row } from 'svelte-aui/src/index.js'

	let data = sessions.data

	$: session = data.find( item => {
		return $page.params.slug == item.url
	})

</script>

<Column a={{grow: true}} className="justify-center align-center" >
	<div class="" style="font-size: 1.2em">Complete</div>
	<div class="mb1">{session.title}</div>
	<Row a={{height: '60px'}}>
		<Button a={{grow: true}} style="min-width: 160px;border-width:2px;" >
			<a href="/session">
				<ArrowLeft size="1.4em" />
				<div class="ml04">Sessions</div>
			</a>
		</Button>
		<Button a={{grow: true}} style="min-width: 160px;border-width:2px;" >
			<a href="/sync">
				<Sync size="1.4em" />
				<div class="ml04">Sync</div>
			</a>
		</Button>
	</Row>
</Column>