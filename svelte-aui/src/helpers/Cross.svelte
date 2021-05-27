<script>

	import cssVars from 'svelte-css-vars'
	import { XY } from '../utilities/types.js'

	export let x;
	export let y;

	let CrossEl;

	$: vars = {position: (x*100)+'% '+(y*100)+'%'};

	$: xx = x*100;
	$: yy = y*100;

	const tl = XY( 0, 0 );
	const tr = XY( 100, 0 );
	const bl = XY( 0, 100 );
	const br = XY( 100, 100 );

	$: top = `${tl.x},${tl.y} ${tr.x},${tr.y} ${xx},${yy} `;
	$: right = `${tr.x},${tr.y} ${br.x},${br.y} ${xx},${yy} `;
	$: bottom = `${br.x},${br.y} ${bl.x},${bl.y} ${xx},${yy} `;
	$: left = `${tl.x},${tl.y} ${bl.x},${bl.y} ${xx},${yy} `;
	
</script>

<template>
	<svg bind:this={CrossEl} class="aui-cross-area" viewBox="0 0 100 100" preserveAspectRatio="none">
		<polygon class="top" points={top} />
		<polygon class="right" points={right} />
		<polygon class="bottom" points={bottom} />
		<polygon class="left" points={left} />
		<line class="tl" x2={xx} y2={yy} x1={tl.x} y1={tl.y}   />
		<line class="br" x2={xx} y2={yy} x1={br.x} y1={br.y}   />
		<line class="tr" x2={xx} y2={yy} x1={tr.x} y1={tr.y}   />
		<line class="bl" x2={xx} y2={yy} x1={bl.x} y1={bl.y}   />
		<line class="hz" x2={xx} y2="0%" x1={xx} y1="100%"  /> 
		<line class="vt" x2="0%" y2={yy} x1="100%" y1={yy}  />
	</svg>
</template>
