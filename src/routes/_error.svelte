<script>
	import { Back } from 'svelte-touch-os/src/index.js'
	export let status;
	export let error;
	export let message;
	export let response;

	import { Column, Button, Row } from 'svelte-aui/src/index.js'
	const dev = process.env.NODE_ENV === 'development';

	import { stores } from '@sapper/app'
	const { page } = stores();


	$: backHref = ( () => {
		const idx = $page.path.lastIndexOf('/')
		if ( idx == -1 ) return '/'
		return path.substring( 0, idx )
	});

</script>


<svelte:head>
	<title>{status}</title>
</svelte:head>

<Back href={backHref} />
<div class="bt2-solid p06 pb0">
	<h2>Error {status}</h2>
	{error.message}
</div>
<Row a={{grow: true}} className="p06">
	<Button a={{grow: true}} style="width:100%;min-height:3em;">
		<a href="/">Home</a>
	</Button>
	<Button a={{grow: true}} style="width:100%;min-height:3em;" on:click={ () => window.location = window.location } >
		<div class="centered">
			Refresh
		</div>
	</Button>
</Row>
<!-- {#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if} -->