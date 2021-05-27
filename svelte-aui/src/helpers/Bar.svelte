<script>

	import { onMount } from 'svelte';

	let PaperEl;
	
	export let low;
	export let high;

	let rot = true;

	$: transform = `transform: scale( ${high}, 1) translate( ${((low==0&&high==0)?0:low/high)*100}%, 0%)`;


	onMount( async() => { 

		// paper.setup( PaperEl );

		// console.log(paper);
		// // Create a Paper.js Path to draw a line into it:
		// var path = new paper.Path();
		// // Give the stroke a color
		// path.strokeColor = 'black';
		// var start = new paper.Point(0, 0);
		// // Move to start and draw a line from there
		// path.moveTo(start);
		// // Note that the plus operator on Point objects does not work
		// // in JavaScript. Instead, we need to call the add() function:
		// path.lineTo(start.add([ 200, -50 ]));
		// // Draw the view now:
		// paper.view.draw();

		// paper.view.onFrame = function(e) {
		// 	if (rot) path.rotate(3);
		// }
	});
</script>


<template>
	<!-- <canvas bind:this={PaperEl} resize /> -->
	<aside class="aui-bar">
		<div class="aui-bar-wrap">
			<div style={transform} class="aui-bar-fill">
				<span class="aui-bar-handle" />
				<span class="aui-bar-handle" />
			</div>
		</div>
	</aside>
</template>

