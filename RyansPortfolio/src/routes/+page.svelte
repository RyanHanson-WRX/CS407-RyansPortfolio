<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div>
		<h1 style="margin-bottom: 0px; font-weight: bold;">Created By:</h1>
		<pre style="margin-top: 0px; background-color: rgba(0, 0, 0, 0.89); margin-bottom: 0px; color: red;">
================= ========    =======  ===============   =======    ========
\\ . . . . . . .\\ \\ . .\\  // . .// //. . . . . . .\\  \\. . .\\  || . .//
||. . ._____. . .|| \\ . .\\//. . // // . ._____. . . \\ || . . .\\ ||. . ||
|| . .||   ||. . ||  \\ . .\/. . // || . .||   ||. . .|| ||. . . .\\|| . .||
||. . ||   || . .||   \\. . . . //  ||. . ||   || . . || || . . . .\||. . ||
||. . ||   // . .//    \\. . . //   || . .||   |/. . .|| ||. . |\. .\| . .||
|| . .||  //  . //      || . .||    ||. . ||_-' . . . || || .  ||\. .\ . .||
||. . ||_-'\  . ||      || . _||    || . . ______ . . || ||. . ||\\. . . .||
|| ._-||`' \\-_ -\\     ||_-` ||    ||_-' |//  \\| . .|| ||-_-.|| \\_|-_-.||
||-_.-||    \\  ` ||    ||    ||    ||    ||    ||_.-'|| ||  `-||  \||-`  ||
||    ||    ||    ||    ||    ||    ||    ||    ||    || ||    ||   ||    ||
||    ||    ||    ||    ||    ||    ||    ||    ||    || ||    ||   ||    ||
||    ||    ||    ||    ||    ||    ||    ||    ||    || ||    ||   ||    ||
||    ||    ||    ||    ||    ||    ||    ||    ||    || ||    ||   ||    ||
||    ||    ||    ||    ||    ||    ||    ||    ||    || ||    ||   ||    ||
\\    ||    \\    ||    \\    //    \\    //    \\    // \\    ||   ||    //
\====`|     \====`|     \====/      \====/      \====/   \====`|   |`====/
`---'       `---'       `--'        `--'        `--'     `---'     `---'
		</pre>
	</div>
	<h2> <span style="font-weight: bold; margin-top: 0;">Assignments:</span>	
		<ul>
			<li>
				<a href="/assignment2">Assignment2</a>
			</li>
			<li>
				<a href="/assignment3">Assignment3</a>
			</li>
		</ul>
	</h2>

</section>


<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
