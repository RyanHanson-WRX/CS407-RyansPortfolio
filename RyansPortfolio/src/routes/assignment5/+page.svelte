<script lang="ts">
    import "./src/main.css";
    import { onMount } from "svelte";
    import { World } from "./src/World/World.ts";
    let MyComponent;
    let world: World;
    let canvas: HTMLCanvasElement;
    let fps = 0;
    const width = 800;
    const height = 400;
    let keys = {
        w: false,
        a: false,
        d: false,
        " ": false
    }
    
    onMount(async () => {
        // const module = await import("./src/main.ts");
        // MyComponent = module;
        // if (MyComponent && typeof MyComponent.main === "function") {
        //     MyComponent.main();
        // }
        canvas.focus();
        world = new World(canvas);
        world.start();
        setInterval(() => {
            fps = world.getFrameRate();
        }, 2000);
        function animate() {
            for (let key in keys) {
                if (keys[key as keyof typeof keys]) {
                    world.onKeyDown({key} as KeyboardEvent);
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    });

    function onKeyDown(event: KeyboardEvent) {
        if (event.key in keys) {
            keys[event.key as keyof typeof keys] = true;
        }
    }
    function onKeyUp(event: KeyboardEvent) {
        if (event.key in keys) {
            keys[event.key as keyof typeof keys] = false;
        }
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
        <article id="scene" class="graphics" >
            <code>FPS: {Math.round(fps)}</code>
            <canvas 
            bind:this={canvas}
            tabindex="0"
            on:keydown={onKeyDown}
            on:keyup={onKeyUp}
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