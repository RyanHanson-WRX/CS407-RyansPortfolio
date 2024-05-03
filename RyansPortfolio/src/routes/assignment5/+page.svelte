<script lang="ts">
    import "./src/main.css";
    import { onMount } from "svelte";
    import { World } from "./src/World/World.ts";
    let world: World;
    let canvas: HTMLCanvasElement;
    let fps = 0;
    const width = 800;
    const height = 700;
    let keys = {
        w: false,
        a: false,
        d: false,
        " ": false
    }
    
    onMount(async () => {
        canvas.focus();
        world = new World(canvas);
        world.start();
        setInterval(() => {
            fps = world.getFrameRate();
        }, 2000);
    });

    function startOrStop() {
        const animateBtn = document.getElementById("animate-btn");
        if (animateBtn!.textContent === "Stop") {
            world.toggleAnimate();
            animateBtn!.textContent = "Start";
            animateBtn!.classList.remove("on");
        } else {
            world.toggleAnimate();
            animateBtn!.textContent = "Stop";
            animateBtn!.classList.add("on");
        }
    }
    function ToggleWireframe() {
        const wireframeBtn = document.getElementById("wireframe-btn");
        if (wireframeBtn!.classList.contains("on") === false) {
            wireframeBtn!.classList.add("on");
        } else {
            wireframeBtn!.textContent = "Wireframe";
            wireframeBtn!.classList.remove("on");
        }
        world.toggleWireframe();
    }

    function ToggleBloom() {
        const bloomBtn = document.getElementById("bloom-btn");
        if (bloomBtn!.classList.contains("on") === false) {
            bloomBtn!.classList.add("on");
        } else {
            bloomBtn!.textContent = "Bloom";
            bloomBtn!.classList.remove("on");
        }
        world.toggleBloom();
    }





</script>

<svelte:head>
    <title>Assignment 5</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="UTF-8" />
    <link
        rel="icon"
        href="https://discoverthreejs.com/favicon.ico"
        type="image/x-icon"
    />
</svelte:head>

<body id="back-color">
    <h1>Assignment 5</h1>
    <div id="scene-container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <article id="controls"> 
            <h2>Controls</h2>
            <btn id="animate-btn" on:click={startOrStop}>Start</btn>
            <btn id="wireframe-btn" on:click={ToggleWireframe}>Wireframe</btn>
            <btn id="bloom-btn" on:click={ToggleBloom}>Bloom</btn>
        </article>
        <article id="scene" class="graphics" >
            <code>FPS: {Math.round(fps)}</code>
            <canvas 
            bind:this={canvas}
            tabindex="0"
            width={width}
            height={height}></canvas>

        </article>
        <article class="description">
            <p>The goal of this assignment is to learn how geometries are organized, represented and delivered to OpenGL and the graphics card.</p>  <p>Requirements are:</p>
            <ul>
                <li>Construct a custom geometry object manually by specifying vertices and faces in an indexed buffer geometry.</li>
                <li>Use per-vertex colors so we can pass custom attribute data to the vertex shader</li>
                <li>Implement orbit and optionally camera navigation through the scene</li>
            </ul>
            <p>Use the mouse to orbit and pan the camera: left mouse click (hold down) or single finger swipe to orbit, right mouse click (hold down), arrow keys, or two-finger swipe to pan; zoom with the scroll wheel or pinch gesture.</p>
        </article>
    </div>
</body>

<footer>
    <p>Created by: Ryan Hanson</p>
</footer>

<style>
    article {
        flex: 200px;
        margin: 20px;
    }
    .graphics {
        flex: 4;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
    }
    .description {
        flex: 2 200px;
    }

</style>